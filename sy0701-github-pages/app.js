// ===== STATE =====
let currentMode = 'all';       // 'all' | 'mistakes'
let deck = [];                 // current set of question indices
let deckIndex = 0;             // position in deck
let isFlipped = false;

// LocalStorage keys
const LS_MASTERED = 'sy0701_mastered';
const LS_MISTAKES = 'sy0701_mistakes';

// ===== DATA ACCESS =====
function getMastered() {
    try {
        return JSON.parse(localStorage.getItem(LS_MASTERED) || '[]');
    } catch { return []; }
}

function setMastered(arr) {
    localStorage.setItem(LS_MASTERED, JSON.stringify(arr));
}

function getMistakes() {
    try {
        return JSON.parse(localStorage.getItem(LS_MISTAKES) || '[]');
    } catch { return []; }
}

function setMistakes(arr) {
    localStorage.setItem(LS_MISTAKES, JSON.stringify(arr));
}

// ===== INIT =====
function init() {
    updateHomeStats();
    setupKeyboard();
    setupSwipe();
}

function updateHomeStats() {
    const mastered = getMastered();
    const mistakes = getMistakes();
    const total = QUESTIONS.length;
    const masteredCount = mastered.length;
    const remaining = total - masteredCount;

    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-mastered').textContent = masteredCount;
    document.getElementById('stat-remaining').textContent = remaining;

    const pct = total > 0 ? Math.round((masteredCount / total) * 100) : 0;
    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('progress-pct').textContent = pct + '%';

    // Update menu counts
    document.getElementById('count-all').textContent = total + '問';
    document.getElementById('count-mistakes').textContent = mistakes.length + '問';

    // Disable mistakes button if no mistakes
    const mistakesBtn = document.getElementById('btn-mistakes');
    if (mistakes.length === 0) {
        mistakesBtn.setAttribute('disabled', '');
    } else {
        mistakesBtn.removeAttribute('disabled');
    }
}

// ===== NAVIGATION =====
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function goHome() {
    updateHomeStats();
    showScreen('home-screen');
}

// ===== START MODE =====
function startMode(mode) {
    currentMode = mode;
    const mastered = getMastered();
    const mistakes = getMistakes();

    if (mode === 'all') {
        // All questions (excluding mastered)
        deck = QUESTIONS
            .map((q, i) => i)
            .filter(i => !mastered.includes(QUESTIONS[i].num));
        document.getElementById('card-mode-label').textContent = '全問モード';
        document.getElementById('card-mode-label').style.background = 'var(--accent-soft)';
        document.getElementById('card-mode-label').style.color = 'var(--accent)';
    } else {
        // Mistakes only
        deck = QUESTIONS
            .map((q, i) => i)
            .filter(i => mistakes.includes(QUESTIONS[i].num) && !mastered.includes(QUESTIONS[i].num));
        document.getElementById('card-mode-label').textContent = '復習モード';
        document.getElementById('card-mode-label').style.background = 'var(--orange-soft)';
        document.getElementById('card-mode-label').style.color = 'var(--orange)';
    }

    if (deck.length === 0) {
        showComplete();
        return;
    }

    // Shuffle
    shuffleArray(deck);
    deckIndex = 0;
    isFlipped = false;

    showScreen('card-screen');
    renderCard();
}

function shuffleDeck() {
    shuffleArray(deck);
    deckIndex = 0;
    isFlipped = false;
    renderCard();
    showToast('シャッフルしました');
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// ===== RENDER CARD =====
function renderCard() {
    if (deckIndex < 0) deckIndex = 0;
    if (deckIndex >= deck.length) {
        showComplete();
        return;
    }

    const q = QUESTIONS[deck[deckIndex]];
    const flashcard = document.getElementById('flashcard');

    // Reset flip
    flashcard.classList.remove('flipped');
    isFlipped = false;

    // Counter
    document.getElementById('card-counter').textContent = `${deckIndex + 1} / ${deck.length}`;

    // Mini progress
    const pct = ((deckIndex + 1) / deck.length) * 100;
    document.getElementById('card-mini-progress-fill').style.width = pct + '%';

    // Front
    const qNum = String(q.num).padStart(3, '0');
    document.getElementById('card-q-number').textContent = `QUESTION ${qNum}`;
    document.getElementById('card-q-text').textContent = q.question;

    // Choices
    const choicesEl = document.getElementById('card-choices');
    choicesEl.innerHTML = '';
    if (q.choices && q.choices.length > 0) {
        q.choices.forEach(c => {
            const div = document.createElement('div');
            div.className = 'choice-item';
            div.innerHTML = `<span class="choice-letter">${c.letter}.</span><span class="choice-text">${escapeHtml(c.text)}</span>`;
            choicesEl.appendChild(div);
        });
    }

    // Back - Answer
    if (q.type === 'lab') {
        document.getElementById('card-answer').textContent = '📋 シミュレーション問題';
    } else {
        document.getElementById('card-answer').textContent = `正解：${q.answer}`;
    }

    // Back - Explanation
    const explEl = document.getElementById('card-explanation');
    if (q.explanation) {
        // Truncate very long explanations
        let explText = q.explanation;
        if (explText.length > 600) {
            explText = explText.substring(0, 600) + '…';
        }
        explEl.innerHTML = `<h4>解説</h4><p>${escapeHtml(explText)}</p>`;
    } else {
        explEl.innerHTML = '';
    }

    // Back - Incorrect choices explanations
    const incorrectEl = document.getElementById('card-incorrect');
    if (q.incorrect_explanations && q.incorrect_explanations.length > 0) {
        let html = '<h4>不正解の選択肢の補足</h4>';
        q.incorrect_explanations.forEach(ie => {
            html += `<div class="incorrect-item"><span class="choice-letter">${ie.letter}.</span><span><strong>${escapeHtml(ie.text)}</strong>：${escapeHtml(ie.reason)}</span></div>`;
        });
        incorrectEl.innerHTML = html;
    } else if (q.choices && q.choices.length > 0 && q.answer && q.type === 'mc') {
        const correctLetters = q.answer.split(',').map(s => s.trim());
        const incorrectChoices = q.choices.filter(c => !correctLetters.includes(c.letter));
        if (incorrectChoices.length > 0) {
            let html = '<h4>不正解の選択肢の補足</h4>';
            incorrectChoices.forEach(c => {
                html += `<div class="incorrect-item"><span class="choice-letter">${c.letter}.</span><span>${escapeHtml(c.text)}</span></div>`;
            });
            incorrectEl.innerHTML = html;
        } else {
            incorrectEl.innerHTML = '';
        }
    } else {
        incorrectEl.innerHTML = '';
    }

    // Update action button states
    updateActionButtons(q.num);
}

function updateActionButtons(qNum) {
    const mistakes = getMistakes();
    const mastered = getMastered();

    const mistakeBtn = document.getElementById('btn-mark-mistake');
    const masteredBtn = document.getElementById('btn-mastered');

    if (mistakes.includes(qNum)) {
        mistakeBtn.classList.add('active');
    } else {
        mistakeBtn.classList.remove('active');
    }

    if (mastered.includes(qNum)) {
        masteredBtn.classList.add('active');
    } else {
        masteredBtn.classList.remove('active');
    }
}

// ===== CARD INTERACTIONS =====
function flipCard() {
    const flashcard = document.getElementById('flashcard');
    isFlipped = !isFlipped;
    flashcard.classList.toggle('flipped', isFlipped);
}

function nextCard() {
    if (deckIndex < deck.length - 1) {
        deckIndex++;
        renderCard();
    } else {
        showComplete();
    }
}

function prevCard() {
    if (deckIndex > 0) {
        deckIndex--;
        renderCard();
    }
}

function markMistake() {
    const q = QUESTIONS[deck[deckIndex]];
    const mistakes = getMistakes();

    if (mistakes.includes(q.num)) {
        // Remove from mistakes
        setMistakes(mistakes.filter(n => n !== q.num));
    } else {
        // Add to mistakes
        mistakes.push(q.num);
        setMistakes(mistakes);
    }

    updateActionButtons(q.num);
}

function markMastered() {
    const q = QUESTIONS[deck[deckIndex]];
    const mastered = getMastered();

    if (mastered.includes(q.num)) {
        // Un-master
        setMastered(mastered.filter(n => n !== q.num));
        updateActionButtons(q.num);
    } else {
        // Mark as mastered & remove from deck
        mastered.push(q.num);
        setMastered(mastered);

        // Also remove from mistakes if present
        const mistakes = getMistakes();
        if (mistakes.includes(q.num)) {
            setMistakes(mistakes.filter(n => n !== q.num));
        }

        // Remove from current deck
        deck.splice(deckIndex, 1);
        if (deck.length === 0) {
            showComplete();
            return;
        }
        if (deckIndex >= deck.length) {
            deckIndex = deck.length - 1;
        }
        renderCard();
        showToast('覚えた！ デッキから除外しました');
    }
}

// ===== COMPLETE SCREEN =====
function showComplete() {
    const mastered = getMastered();
    document.getElementById('complete-reviewed').textContent = QUESTIONS.length - deck.length;
    document.getElementById('complete-mastered').textContent = mastered.length;

    if (currentMode === 'mistakes') {
        document.getElementById('complete-message').textContent = '復習カードをすべて確認しました！';
    } else {
        document.getElementById('complete-message').textContent = 'すべてのカードを確認しました！';
    }

    showScreen('complete-screen');
}

// ===== RESET =====
function confirmReset() {
    document.getElementById('modal-title').textContent = 'データリセット';
    document.getElementById('modal-message').textContent = '「覚えた」「もう一度」のマークをすべて削除します。この操作は取り消せません。';
    document.getElementById('modal-confirm-btn').textContent = 'リセット';
    document.getElementById('modal-confirm-btn').onclick = () => {
        localStorage.removeItem(LS_MASTERED);
        localStorage.removeItem(LS_MISTAKES);
        updateHomeStats();
        closeModal();
        showToast('リセットしました');
    };
    document.getElementById('modal-overlay').classList.add('active');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
}

// ===== KEYBOARD =====
function setupKeyboard() {
    document.addEventListener('keydown', (e) => {
        // Only on card screen
        if (!document.getElementById('card-screen').classList.contains('active')) return;

        switch (e.key) {
            case ' ':
            case 'Enter':
                e.preventDefault();
                flipCard();
                break;
            case 'ArrowRight':
            case 'l':
                nextCard();
                break;
            case 'ArrowLeft':
            case 'h':
                prevCard();
                break;
            case 'x':
            case 'm':
                markMistake();
                break;
            case 'o':
            case 'k':
                markMastered();
                break;
            case 'Escape':
                goHome();
                break;
        }
    });
}

// ===== SWIPE =====
function setupSwipe() {
    let startX = 0;
    let startY = 0;
    let isDragging = false;

    const area = document.getElementById('card-area');

    area.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
    }, { passive: true });

    area.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = endX - startX;
        const diffY = endY - startY;

        // Only horizontal swipe (not scroll)
        if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
            if (diffX < 0) {
                nextCard();
            } else {
                prevCard();
            }
        }
    }, { passive: true });
}

// ===== TOAST =====
let toastTimer;
function showToast(msg) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 2000);
}

// ===== UTILS =====
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ===== BOOT =====
document.addEventListener('DOMContentLoaded', init);
