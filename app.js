// ===== STATE =====
let currentMode = 'all';       // 'all' | 'mistakes' | 'v22_new' | 'v21_only'
let orderMode = 'random';      // 'random' | 'sequential'
let deck = [];                 // current set of question indices
let deckIndex = 0;             // position in deck
let isFlipped = false;
let activeQuestions = null;    // reference to current question set (null = QUESTIONS)
let reviewFilter = { correct: false, unsure: true, incorrect: true };

// LocalStorage keys
const LS_MASTERED = 'sy0701_mastered';
const LS_MISTAKES = 'sy0701_mistakes';
const LS_GEMINI_KEY = 'sy0701_gemini_key';
const LS_GEMINI_MODEL = 'sy0701_gemini_model';
const LS_LAST_SESSION = 'sy0701_last_session';
const LS_MEMO = 'sy0701_memo';
const LS_HISTORY = 'sy0701_history';

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

function getHistory() {
    try {
        return JSON.parse(localStorage.getItem(LS_HISTORY) || '{}');
    } catch { return {}; }
}

function setHistory(obj) {
    localStorage.setItem(LS_HISTORY, JSON.stringify(obj));
}

function recordResult(qNum, result) {
    const history = getHistory();
    if (!history[qNum]) {
        history[qNum] = { correct: 0, incorrect: 0, unsure: 0, last: null, lastDate: null };
    }
    // Backward compatibility: ensure unsure counter exists
    if (history[qNum].unsure === undefined) {
        history[qNum].unsure = 0;
    }
    history[qNum][result]++;
    history[qNum].last = result;
    history[qNum].lastDate = Date.now();
    setHistory(history);
}

// ===== ACTIVE QUESTION SET =====
function getActiveQuestions() {
    return activeQuestions || QUESTIONS;
}

function startDiffMode(mode, order) {
    currentMode = mode;
    orderMode = order || 'random';

    if (mode === 'v22_new') {
        activeQuestions = QUESTIONS_V22_NEW;
        document.getElementById('card-mode-label').textContent = 'V22 新規問題';
        document.getElementById('card-mode-label').style.background = '#d1fae5';
        document.getElementById('card-mode-label').style.color = '#059669';
    } else if (mode === 'v21_only') {
        activeQuestions = QUESTIONS_V21_ONLY;
        document.getElementById('card-mode-label').textContent = 'V21 削除問題';
        document.getElementById('card-mode-label').style.background = '#fef3c7';
        document.getElementById('card-mode-label').style.color = '#d97706';
    }

    const qs = getActiveQuestions();
    deck = qs.map((q, i) => i);

    if (orderMode === 'random') {
        shuffleArray(deck);
    }
    deckIndex = 0;
    isFlipped = false;

    document.getElementById('btn-shuffle').style.display = '';
    document.getElementById('btn-jump').style.display = 'none';
    closeJumpInput();

    showScreen('card-screen');
    renderCard();
}

// ===== INIT =====
function init() {
    updateHomeStats();
    updateResumeCard();
    updateApiStatusDot();
    initMemo();
    setupKeyboard();
    setupSwipe();
}

function updateHomeStats() {
    const total = QUESTIONS.length;

    document.getElementById('stat-total').textContent = total;

    // Calculate rates from history
    const history = getHistory();
    let totalCorrect = 0, totalUnsure = 0, totalIncorrect = 0, totalAttempts = 0;
    Object.values(history).forEach(h => {
        totalCorrect += h.correct;
        totalUnsure += h.unsure || 0;
        totalIncorrect += h.incorrect;
        totalAttempts += h.correct + h.incorrect + (h.unsure || 0);
    });

    document.getElementById('stat-accuracy').textContent =
        totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) + '%' : '-';
    document.getElementById('stat-unsure-rate').textContent =
        totalAttempts > 0 ? Math.round((totalUnsure / totalAttempts) * 100) + '%' : '-';
    document.getElementById('stat-incorrect-rate').textContent =
        totalAttempts > 0 ? Math.round((totalIncorrect / totalAttempts) * 100) + '%' : '-';

    // Progress bar: show attempted/total ratio
    const attemptedCount = Object.keys(history).length;
    const pct = total > 0 ? Math.round((attemptedCount / total) * 100) : 0;
    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('progress-pct').textContent = pct + '%';

    // Update menu counts
    document.getElementById('count-all').textContent = total + '問';
    document.getElementById('count-all-seq').textContent = total + '問';

    // Update review mode filter counts
    updateReviewFilterCounts();

    // Update diff counts
    if (typeof QUESTIONS_V22_NEW !== 'undefined') {
        document.getElementById('count-v22-new').textContent = QUESTIONS_V22_NEW.length + '問';
    }
    if (typeof QUESTIONS_V21_ONLY !== 'undefined') {
        document.getElementById('count-v21-only').textContent = QUESTIONS_V21_ONLY.length + '問';
    }

    // Update glossary count
    if (typeof GLOSSARY !== 'undefined') {
        document.getElementById('count-glossary').textContent = GLOSSARY.length + '語';
    }
}

// ===== NAVIGATION =====
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function goHome() {
    activeQuestions = null;
    updateHomeStats();
    updateResumeCard();
    showScreen('home-screen');
}

// ===== START MODE =====
function startMode(mode, order) {
    currentMode = mode;
    orderMode = order || 'random';
    activeQuestions = null; // reset to default QUESTIONS
    const mastered = getMastered();
    const mistakes = getMistakes();

    if (mode === 'all') {
        // All questions (excluding mastered)
        deck = QUESTIONS
            .map((q, i) => i)
            .filter(i => !mastered.includes(QUESTIONS[i].num));
        const label = orderMode === 'sequential' ? '全問モード（順番）' : '全問モード（ランダム）';
        document.getElementById('card-mode-label').textContent = label;
        document.getElementById('card-mode-label').style.background = 'var(--accent-soft)';
        document.getElementById('card-mode-label').style.color = 'var(--accent)';
    } else {
        // Review mode - filtered by correct/unsure/incorrect
        const history = getHistory();
        deck = QUESTIONS
            .map((q, i) => i)
            .filter(i => {
                const qNum = QUESTIONS[i].num;
                if (mastered.includes(qNum)) return false;
                const hist = history[qNum];
                const inMistakes = mistakes.includes(qNum);

                // Correct: has history with last='correct' and NOT in mistakes
                if (!inMistakes && hist && hist.last === 'correct') return reviewFilter.correct;
                // Unsure: in mistakes and last='unsure'
                if (inMistakes && hist && hist.last === 'unsure') return reviewFilter.unsure;
                // Incorrect: in mistakes and (last='incorrect' or no history)
                if (inMistakes) return reviewFilter.incorrect;

                return false;
            });
        const activeFilters = [
            reviewFilter.correct ? '正解' : '',
            reviewFilter.unsure ? '微妙' : '',
            reviewFilter.incorrect ? '不正解' : ''
        ].filter(Boolean);
        const filterLabel = activeFilters.length === 3 ? '復習モード'
            : '復習（' + activeFilters.join('・') + '）';
        document.getElementById('card-mode-label').textContent = filterLabel;
        document.getElementById('card-mode-label').style.background = 'var(--orange-soft)';
        document.getElementById('card-mode-label').style.color = 'var(--orange)';
    }

    if (deck.length === 0) {
        showComplete();
        return;
    }

    // Shuffle only in random mode
    if (orderMode === 'random') {
        shuffleArray(deck);
    }
    deckIndex = 0;
    isFlipped = false;

    // Show/hide shuffle/jump buttons based on order mode
    document.getElementById('btn-shuffle').style.display =
        orderMode === 'sequential' ? 'none' : '';
    document.getElementById('btn-jump').style.display =
        orderMode === 'sequential' ? '' : 'none';
    closeJumpInput();

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

// ===== JUMP TO QUESTION =====
function showJumpInput() {
    const popover = document.getElementById('jump-popover');
    const input = document.getElementById('jump-input');
    popover.classList.toggle('active');
    if (popover.classList.contains('active')) {
        input.value = '';
        input.focus();
    }
}

function closeJumpInput() {
    document.getElementById('jump-popover').classList.remove('active');
}

function jumpToQuestion() {
    const input = document.getElementById('jump-input');
    const num = parseInt(input.value, 10);
    const qs = getActiveQuestions();
    if (isNaN(num) || num < 1 || num > qs.length) {
        showToast(`1〜${qs.length} の番号を入力してください`);
        return;
    }

    // Find the deck index for this question number
    const targetDeckIndex = deck.findIndex(i => qs[i].num === num);
    if (targetDeckIndex === -1) {
        showToast(`問題 ${num} は現在のデッキにありません（覚えた済み）`);
        return;
    }

    deckIndex = targetDeckIndex;
    closeJumpInput();
    renderCard();
    showToast(`問題 ${num} に移動しました`);
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

    const q = getActiveQuestions()[deck[deckIndex]];
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

    // History badge
    const historyBadge = document.getElementById('card-history-badge');
    const hist = getHistory()[q.num];
    if (hist && hist.last) {
        const isCorrect = hist.last === 'correct';
        const isUnsure = hist.last === 'unsure';
        const total = hist.correct + hist.incorrect + (hist.unsure || 0);
        let badgeClass, badgeIcon, badgeLabel;
        if (isCorrect) {
            badgeClass = 'badge-correct';
            badgeIcon = '○';
            badgeLabel = '前回 正解';
        } else if (isUnsure) {
            badgeClass = 'badge-unsure';
            badgeIcon = '△';
            badgeLabel = '前回 微妙';
        } else {
            badgeClass = 'badge-incorrect';
            badgeIcon = '×';
            badgeLabel = '前回 不正解';
        }
        historyBadge.className = 'card-history-badge ' + badgeClass;
        let statsText = '';
        if (total > 1) {
            statsText = `${hist.correct}正解`;
            if (hist.unsure) statsText += ` / ${hist.unsure}微妙`;
            statsText += ` / ${hist.incorrect}不正解`;
        }
        historyBadge.innerHTML =
            `<span class="badge-icon">${badgeIcon}</span>` +
            `<span class="badge-label">${badgeLabel}</span>` +
            (statsText ? `<span class="badge-stats">${statsText}</span>` : '');
        historyBadge.style.display = '';
    } else {
        historyBadge.style.display = 'none';
    }

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

    // Back - Answer Flag (suspected wrong answer)
    const flagEl = document.getElementById('card-answer-flag');
    if (q.answer_flag) {
        flagEl.innerHTML = '<strong>⚠ 答えに誤りの可能性</strong><p>' + escapeHtml(q.answer_flag) + '</p>';
        flagEl.style.display = '';
    } else {
        flagEl.style.display = 'none';
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

    // Detailed explanation (pre-generated or AI)
    const aiResponse = document.getElementById('ai-explain-response');
    const aiText = document.getElementById('ai-explain-text');
    const aiBtn = document.getElementById('ai-explain-btn');
    document.getElementById('ai-explain-loading').style.display = 'none';
    document.getElementById('ai-explain-error').style.display = 'none';

    // Reset followup section
    const followupSection = document.getElementById('ai-followup-section');
    const followupInput = document.getElementById('ai-followup-input');
    const followupResponse = document.getElementById('ai-followup-response');
    const followupLoading = document.getElementById('ai-followup-loading');
    const followupError = document.getElementById('ai-followup-error');
    followupSection.style.display = 'none';
    followupInput.value = '';
    followupResponse.style.display = 'none';
    followupResponse.innerHTML = '';
    followupLoading.style.display = 'none';
    followupError.style.display = 'none';

    if (q.detailed_explanation) {
        // 事前生成済みの詳細解説を表示
        aiText.innerHTML = formatAiResponse(q.detailed_explanation);
        aiResponse.style.display = 'block';
        // Show followup section if API key is set
        if (getApiKey()) {
            followupSection.style.display = '';
        }
    } else {
        aiResponse.style.display = 'none';
    }
    // AIボタンは常に表示（APIキーがあれば）
    aiBtn.style.display = getApiKey() ? '' : 'none';

    // Auto-save session progress
    saveSession();

    // Update action button states
    updateActionButtons(q.num);
}

function updateActionButtons(qNum) {
    const mistakes = getMistakes();
    const hist = getHistory()[qNum];

    const mistakeBtn = document.getElementById('btn-mark-mistake');
    const unsureBtn = document.getElementById('btn-mark-unsure');

    // 不正解: active when in mistakes AND last result was 'incorrect' (or no history)
    const isInMistakes = mistakes.includes(qNum);
    const isIncorrect = isInMistakes && (!hist || hist.last === 'incorrect');
    mistakeBtn.classList.toggle('active', isIncorrect);

    // 微妙: active when last result was 'unsure'
    unsureBtn.classList.toggle('active', !!(hist && hist.last === 'unsure'));
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
    const q = getActiveQuestions()[deck[deckIndex]];
    const mistakes = getMistakes();
    const hist = getHistory()[q.num];

    if (hist && hist.last === 'incorrect') {
        // Already marked incorrect → toggle off
        setMistakes(mistakes.filter(n => n !== q.num));
        showToast('不正解マークを解除しました');
    } else {
        // Mark as incorrect
        if (!mistakes.includes(q.num)) {
            mistakes.push(q.num);
            setMistakes(mistakes);
        }
        recordResult(q.num, 'incorrect');
        showToast('不正解を記録しました');
    }

    updateActionButtons(q.num);
}

function markMastered() {
    const q = getActiveQuestions()[deck[deckIndex]];
    const mastered = getMastered();

    if (mastered.includes(q.num)) {
        // Un-master
        setMastered(mastered.filter(n => n !== q.num));
        updateActionButtons(q.num);
    } else {
        // Record as correct
        recordResult(q.num, 'correct');

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

function markCorrect() {
    const q = getActiveQuestions()[deck[deckIndex]];
    recordResult(q.num, 'correct');

    // Remove from mistakes if present
    const mistakes = getMistakes();
    if (mistakes.includes(q.num)) {
        setMistakes(mistakes.filter(n => n !== q.num));
    }

    updateActionButtons(q.num);
    showToast('正解を記録しました');
}

function markUnsure() {
    const q = getActiveQuestions()[deck[deckIndex]];
    const mistakes = getMistakes();
    const hist = getHistory()[q.num];

    if (hist && hist.last === 'unsure') {
        // Already marked unsure → toggle off
        setMistakes(mistakes.filter(n => n !== q.num));
        showToast('微妙マークを解除しました');
    } else {
        // Mark as unsure
        if (!mistakes.includes(q.num)) {
            mistakes.push(q.num);
            setMistakes(mistakes);
        }
        recordResult(q.num, 'unsure');
        showToast('微妙を記録しました');
    }

    updateActionButtons(q.num);
}

// ===== COMPLETE SCREEN =====
function showComplete() {
    const mastered = getMastered();
    document.getElementById('complete-reviewed').textContent = getActiveQuestions().length - deck.length;
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
        localStorage.removeItem(LS_HISTORY);
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

        // Handle jump input when active
        const jumpPopover = document.getElementById('jump-popover');
        if (jumpPopover.classList.contains('active')) {
            if (e.key === 'Enter') {
                e.preventDefault();
                jumpToQuestion();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                closeJumpInput();
            }
            return;
        }

        // Guard: ignore keyboard shortcuts when followup input is focused
        const followupInput = document.getElementById('ai-followup-input');
        if (document.activeElement === followupInput) {
            return;
        }

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
            case 'u':
                markUnsure();
                break;
            case 'o':
            case 'k':
                markMastered();
                break;
            case 'Escape':
                goHome();
                break;
            case 'g':
                if (orderMode === 'sequential') {
                    showJumpInput();
                }
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

// ===== SESSION / MEMO =====
function saveSession() {
    const q = getActiveQuestions()[deck[deckIndex]];
    const session = {
        mode: currentMode,
        order: orderMode,
        qNum: q.num,
        deckPos: deckIndex + 1,
        deckTotal: deck.length,
        time: Date.now()
    };
    localStorage.setItem(LS_LAST_SESSION, JSON.stringify(session));
}

function getLastSession() {
    try {
        return JSON.parse(localStorage.getItem(LS_LAST_SESSION));
    } catch { return null; }
}

function clearSession() {
    localStorage.removeItem(LS_LAST_SESSION);
}

function updateResumeCard() {
    const card = document.getElementById('resume-card');
    const session = getLastSession();

    if (!session) {
        card.style.display = 'none';
        return;
    }

    // Check if this question is still in the deck (not mastered)
    const mastered = getMastered();
    if (mastered.includes(session.qNum)) {
        card.style.display = 'none';
        return;
    }

    const modeLabel = session.mode === 'mistakes' ? '復習モード'
        : session.order === 'sequential' ? '全問・順番' : '全問・ランダム';
    const qLabel = `QUESTION ${String(session.qNum).padStart(3, '0')}`;
    const timeAgo = formatTimeAgo(session.time);

    document.getElementById('resume-mode').textContent = modeLabel;
    document.getElementById('resume-question').textContent = qLabel;
    document.getElementById('resume-time').textContent = timeAgo;
    card.style.display = '';
}

function resumeSession() {
    const session = getLastSession();
    if (!session) return;

    // Start the mode
    currentMode = session.mode;
    orderMode = session.order || 'random';
    const mastered = getMastered();
    const mistakes = getMistakes();

    activeQuestions = null; // default
    if (session.mode === 'v22_new') {
        activeQuestions = QUESTIONS_V22_NEW;
    } else if (session.mode === 'v21_only') {
        activeQuestions = QUESTIONS_V21_ONLY;
    }
    const qs = getActiveQuestions();

    if (session.mode === 'all') {
        deck = qs.map((q, i) => i)
            .filter(i => !mastered.includes(qs[i].num));
        const label = orderMode === 'sequential' ? '全問モード（順番）' : '全問モード（ランダム）';
        document.getElementById('card-mode-label').textContent = label;
        document.getElementById('card-mode-label').style.background = 'var(--accent-soft)';
        document.getElementById('card-mode-label').style.color = 'var(--accent)';
    } else if (session.mode === 'v22_new') {
        deck = qs.map((q, i) => i);
        document.getElementById('card-mode-label').textContent = 'V22 新規問題';
        document.getElementById('card-mode-label').style.background = '#d1fae5';
        document.getElementById('card-mode-label').style.color = '#059669';
    } else if (session.mode === 'v21_only') {
        deck = qs.map((q, i) => i);
        document.getElementById('card-mode-label').textContent = 'V21 削除問題';
        document.getElementById('card-mode-label').style.background = '#fef3c7';
        document.getElementById('card-mode-label').style.color = '#d97706';
    } else {
        const history = getHistory();
        deck = qs.map((q, i) => i)
            .filter(i => {
                const qNum = qs[i].num;
                if (mastered.includes(qNum)) return false;
                const hist = history[qNum];
                const inMistakes = mistakes.includes(qNum);
                if (!inMistakes && hist && hist.last === 'correct') return reviewFilter.correct;
                if (inMistakes && hist && hist.last === 'unsure') return reviewFilter.unsure;
                if (inMistakes) return reviewFilter.incorrect;
                return false;
            });
        document.getElementById('card-mode-label').textContent = '復習モード';
        document.getElementById('card-mode-label').style.background = 'var(--orange-soft)';
        document.getElementById('card-mode-label').style.color = 'var(--orange)';
    }

    if (deck.length === 0) { showComplete(); return; }

    // For sequential, deck is already in order. For random, we can't restore exact shuffle,
    // but we place the target question at front so user resumes from there.
    if (orderMode !== 'sequential') {
        shuffleArray(deck);
    }

    // Find the saved question in deck
    const targetIdx = deck.findIndex(i => qs[i].num === session.qNum);
    deckIndex = targetIdx !== -1 ? targetIdx : 0;
    isFlipped = false;

    document.getElementById('btn-shuffle').style.display =
        orderMode === 'sequential' ? 'none' : '';
    document.getElementById('btn-jump').style.display =
        orderMode === 'sequential' ? '' : 'none';
    closeJumpInput();

    showScreen('card-screen');
    renderCard();
}

function formatTimeAgo(ts) {
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return 'たった今';
    if (diff < 3600) return Math.floor(diff / 60) + '分前';
    if (diff < 86400) return Math.floor(diff / 3600) + '時間前';
    return Math.floor(diff / 86400) + '日前';
}

function getMemo() {
    return localStorage.getItem(LS_MEMO) || '';
}

function saveMemo() {
    const val = document.getElementById('memo-input').value;
    localStorage.setItem(LS_MEMO, val);
}

function initMemo() {
    const el = document.getElementById('memo-input');
    el.value = getMemo();
}

// ===== AI EXPLANATION =====
const GEMINI_MODELS = [
    { id: 'gemini-2.5-flash-lite', label: 'Gemini 2.5 Flash Lite（推奨・最新）' },
    { id: 'gemini-2.0-flash-lite', label: 'Gemini 2.0 Flash Lite（軽量）' },
    { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash（高性能）' },
];

function getApiKey() {
    return localStorage.getItem(LS_GEMINI_KEY) || '';
}

function getGeminiModel() {
    return localStorage.getItem(LS_GEMINI_MODEL) || GEMINI_MODELS[0].id;
}

function getGeminiApiUrl() {
    const model = getGeminiModel();
    return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
}

function showApiSettings() {
    const input = document.getElementById('api-key-input');
    input.value = getApiKey();
    input.type = 'password';

    // Populate model selector
    const select = document.getElementById('api-model-select');
    const currentModel = getGeminiModel();
    select.innerHTML = '';
    GEMINI_MODELS.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = m.label;
        if (m.id === currentModel) opt.selected = true;
        select.appendChild(opt);
    });

    document.getElementById('api-modal-overlay').classList.add('active');
}

function closeApiSettings() {
    document.getElementById('api-modal-overlay').classList.remove('active');
}

function toggleApiKeyVisibility() {
    const input = document.getElementById('api-key-input');
    input.type = input.type === 'password' ? 'text' : 'password';
}

function saveApiKey() {
    const key = document.getElementById('api-key-input').value.trim();
    const model = document.getElementById('api-model-select').value;

    if (key) {
        localStorage.setItem(LS_GEMINI_KEY, key);
    } else {
        localStorage.removeItem(LS_GEMINI_KEY);
    }
    localStorage.setItem(LS_GEMINI_MODEL, model);

    updateApiStatusDot();
    closeApiSettings();
    showToast(key ? '設定を保存しました' : 'APIキーを削除しました');
}

async function testApiConnection() {
    const key = document.getElementById('api-key-input').value.trim();
    const model = document.getElementById('api-model-select').value;
    const resultEl = document.getElementById('api-test-result');
    const btn = document.getElementById('api-test-btn');

    if (!key) {
        resultEl.className = 'api-test-result error';
        resultEl.textContent = 'APIキーを入力してください';
        resultEl.style.display = 'block';
        return;
    }

    btn.disabled = true;
    btn.textContent = 'テスト中...';
    resultEl.style.display = 'none';

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: 'テスト。「OK」とだけ返してください。' }] }],
                generationConfig: { maxOutputTokens: 10 }
            })
        });

        const data = await res.json();

        if (res.ok) {
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '(応答あり)';
            resultEl.className = 'api-test-result success';
            resultEl.textContent = `接続成功！ モデル: ${model} ／応答: ${text.substring(0, 50)}`;
        } else {
            const errMsg = data?.error?.message || `HTTP ${res.status}`;
            resultEl.className = 'api-test-result error';
            resultEl.innerHTML = `<strong>エラー (${res.status}):</strong> ${escapeHtml(errMsg)}`;
        }
    } catch (err) {
        resultEl.className = 'api-test-result error';
        resultEl.textContent = `通信エラー: ${err.message}`;
    }

    resultEl.style.display = 'block';
    btn.disabled = false;
    btn.textContent = '接続テスト';
}

function updateApiStatusDot() {
    const dot = document.getElementById('api-status-dot');
    dot.className = 'api-status-dot' + (getApiKey() ? ' connected' : '');
}

async function requestAiExplanation(event) {
    if (event) event.stopPropagation();

    const apiKey = getApiKey();
    if (!apiKey) {
        showApiSettings();
        return;
    }

    const q = getActiveQuestions()[deck[deckIndex]];
    const btn = document.getElementById('ai-explain-btn');
    const loading = document.getElementById('ai-explain-loading');
    const response = document.getElementById('ai-explain-response');
    const textEl = document.getElementById('ai-explain-text');
    const errorEl = document.getElementById('ai-explain-error');

    // Hide previous results
    btn.style.display = 'none';
    errorEl.style.display = 'none';
    response.style.display = 'none';
    loading.style.display = 'flex';

    // Build prompt
    let choicesText = '';
    if (q.choices && q.choices.length > 0) {
        choicesText = q.choices.map(c => `${c.letter}. ${c.text}`).join('\n');
    }

    const prompt = `あなたはCompTIA Security+ (SY0-701) の試験対策の専門家です。
以下の問題について、IT初心者でも理解できるように詳しく日本語で解説してください。

【問題】
${q.question}

【選択肢】
${choicesText}

【正解】
${q.answer}

以下の4セクション構成で解説してください。各セクションに見出し（##）をつけてください。

## 正解の解説
- なぜこの答えが正解なのか、技術的な根拠と背景を詳しく説明
- 具体的な使用例やシナリオがあれば含める

## 不正解の選択肢の分析
- 各不正解の選択肢について、それぞれなぜ不正解なのかを個別に説明
- 正解の選択肢との違いを明確に
- ひっかけポイントがあれば指摘

## 関連する重要概念
- この問題に関連するセキュリティの概念・用語・技術を説明
- 関連する他の技術やプロトコルとの関係性
- 実務での具体的な適用例

## 試験対策のポイント
- この問題で問われている知識の要点をまとめる
- 類似問題が出た場合の判断基準
- 覚えるべきキーワードや区別のコツ

丁寧で分かりやすい解説をお願いします。`;

    try {
        const apiUrl = getGeminiApiUrl();
        const maxRetries = 3;
        let lastError = null;
        let aiText = null;

        for (let attempt = 0; attempt < maxRetries; attempt++) {
            if (attempt > 0) {
                const waitSec = attempt * 3;
                loading.querySelector('span').textContent = `レート制限中...${waitSec}秒後にリトライ (${attempt + 1}/${maxRetries})`;
                await new Promise(r => setTimeout(r, waitSec * 1000));
                loading.querySelector('span').textContent = `AIが解説を生成中... (リトライ ${attempt + 1}/${maxRetries})`;
            }

            const res = await fetch(`${apiUrl}?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.3,
                        maxOutputTokens: 4096
                    }
                })
            });

            if (res.ok) {
                const data = await res.json();
                aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                break;
            }

            const errData = await res.json().catch(() => ({}));
            const errMsg = errData?.error?.message || `HTTP ${res.status}`;

            // Retryable: 429 rate limit
            if (res.status === 429 || errMsg.includes('quota') || errMsg.includes('Quota')) {
                lastError = 'QUOTA';
                continue;
            }
            // Non-retryable errors
            if (res.status === 400 && errMsg.includes('API key')) {
                throw new Error('APIキーが無効です。AI設定で正しいキーを入力してください。');
            }
            if (res.status === 404) {
                throw new Error('MODEL_NOT_FOUND');
            }
            if (res.status === 403) {
                throw new Error('API_KEY_INVALID');
            }
            throw new Error(errMsg);
        }

        if (!aiText && lastError === 'QUOTA') {
            throw new Error('QUOTA');
        }

        if (!aiText) {
            throw new Error('AIからの応答が空でした');
        }

        loading.style.display = 'none';
        textEl.innerHTML = formatAiResponse(aiText);
        response.style.display = 'block';

        // Show followup section
        if (getApiKey()) {
            document.getElementById('ai-followup-section').style.display = '';
        }
    } catch (err) {
        loading.style.display = 'none';
        loading.querySelector('span').textContent = 'AIが解説を生成中...';
        btn.style.display = '';

        if (err.message === 'QUOTA') {
            const model = getGeminiModel();
            errorEl.innerHTML =
                `<strong>無料枠の制限に達しました（3回リトライ済み）</strong><br>` +
                `現在のモデル: ${escapeHtml(model)}<br><br>` +
                `<button onclick="this.parentElement.style.display='none';requestAiExplanation()" ` +
                `style="padding:8px 16px;margin:8px 0;border-radius:8px;border:1.5px solid var(--accent);background:transparent;color:var(--accent);cursor:pointer;font-size:0.85rem;">` +
                `もう一度試す</button><br>` +
                `それでもダメな場合:<br>` +
                `・30秒ほど待ってから再試行<br>` +
                `・AI設定で別のモデルに切り替える`;
        } else if (err.message === 'MODEL_NOT_FOUND') {
            const model = getGeminiModel();
            errorEl.innerHTML =
                `<strong>モデルが見つかりません</strong><br>` +
                `現在のモデル: ${escapeHtml(model)}<br><br>` +
                `AI設定で別のモデルに切り替えてください。`;
        } else if (err.message === 'API_KEY_INVALID') {
            errorEl.innerHTML =
                `<strong>APIキーが無効または失効しています</strong><br><br>` +
                `<a href="https://aistudio.google.com/apikey" target="_blank" style="color:var(--accent);">Google AI Studio</a> で新しいAPIキーを作成し、AI設定に入力してください。`;
        } else if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
            const isFileProtocol = location.protocol === 'file:';
            errorEl.innerHTML = isFileProtocol
                ? `<strong>file:// からはAPI呼び出しができません</strong><br><br>` +
                  `ブラウザのセキュリティ制限により、ローカルファイルから外部APIを呼べません。<br><br>` +
                  `対処法:<br>` +
                  `・GitHub Pagesにデプロイして使う<br>` +
                  `・ターミナルで以下を実行してローカルサーバーを起動:<br>` +
                  `<code style="display:block;margin-top:6px;padding:8px;background:var(--bg);border-radius:6px;font-size:0.78rem;">cd ${escapeHtml(location.pathname.replace(/\/[^/]*$/, ''))}<br>python3 -m http.server 8080</code>` +
                  `<br>その後 <a href="http://localhost:8080" style="color:var(--accent);">http://localhost:8080</a> を開く`
                : `<strong>通信エラー</strong><br>ネットワーク接続を確認してください。`;
        } else {
            errorEl.textContent = 'エラー: ' + err.message;
        }
        errorEl.style.display = 'block';
    }
}

function formatAiResponse(text) {
    // Simple markdown-like formatting
    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/^### (.+)$/gm, '<h5>$1</h5>')
        .replace(/^## (.+)$/gm, '<h5>$1</h5>')
        .replace(/^# (.+)$/gm, '<h5>$1</h5>')
        .replace(/^[-*] (.+)$/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
        .replace(/<\/ul>\s*<ul>/g, '')
        .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
        .replace(/^/, '<p>')
        .replace(/$/, '</p>');
}

// ===== FOLLOWUP QUESTION =====
async function sendFollowupQuestion(event) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }

    const input = document.getElementById('ai-followup-input');
    const sendBtn = document.getElementById('ai-followup-send-btn');
    const loadingEl = document.getElementById('ai-followup-loading');
    const responseEl = document.getElementById('ai-followup-response');
    const errorEl = document.getElementById('ai-followup-error');

    const question = input.value.trim();
    if (!question) return;

    const apiKey = getApiKey();
    if (!apiKey) {
        showApiSettings();
        return;
    }

    const q = getActiveQuestions()[deck[deckIndex]];

    // Show loading
    sendBtn.disabled = true;
    loadingEl.style.display = 'flex';
    errorEl.style.display = 'none';

    // Build context
    let choicesText = '';
    if (q.choices && q.choices.length > 0) {
        choicesText = q.choices.map(c => `${c.letter}. ${c.text}`).join('\n');
    }

    const prompt = `あなたはCompTIA Security+ (SY0-701) の試験対策の専門家です。
以下の問題についてのフォローアップ質問に回答してください。

【問題】
${q.question}

【選択肢】
${choicesText}

【正解】
${q.answer}

【解説】
${q.explanation || ''}

【ユーザーの質問】
${question}

IT初心者にもわかるように、丁寧に日本語で回答してください。`;

    try {
        const apiUrl = getGeminiApiUrl();
        const res = await fetch(`${apiUrl}?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.3,
                    maxOutputTokens: 4096
                }
            })
        });

        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            const errMsg = errData?.error?.message || `HTTP ${res.status}`;
            throw new Error(errMsg);
        }

        const data = await res.json();
        const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!aiText) {
            throw new Error('AIからの応答が空でした');
        }

        loadingEl.style.display = 'none';
        responseEl.innerHTML = formatAiResponse(aiText);
        responseEl.style.display = 'block';
        input.value = '';
    } catch (err) {
        loadingEl.style.display = 'none';
        errorEl.textContent = 'エラー: ' + err.message;
        errorEl.style.display = 'block';
    }

    sendBtn.disabled = false;
}

// ===== GLOSSARY =====
let glossaryFilter = 'all';

function showGlossary() {
    glossaryFilter = 'all';
    document.getElementById('glossary-search').value = '';
    document.getElementById('glossary-search-clear').style.display = 'none';
    renderGlossaryCategories();
    renderGlossaryList();
    showScreen('glossary-screen');
}

function renderGlossaryCategories() {
    const cats = ['all', ...new Set(GLOSSARY.map(g => g.category))];
    const el = document.getElementById('glossary-categories');
    el.innerHTML = '';
    cats.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'glossary-cat-btn' + (cat === glossaryFilter ? ' active' : '');
        btn.textContent = cat === 'all' ? 'すべて' : cat;
        btn.onclick = () => {
            glossaryFilter = cat;
            renderGlossaryCategories();
            renderGlossaryList();
        };
        el.appendChild(btn);
    });
}

function filterGlossary() {
    const clearBtn = document.getElementById('glossary-search-clear');
    const query = document.getElementById('glossary-search').value;
    clearBtn.style.display = query ? '' : 'none';
    renderGlossaryList();
}

function clearGlossarySearch() {
    document.getElementById('glossary-search').value = '';
    document.getElementById('glossary-search-clear').style.display = 'none';
    renderGlossaryList();
}

function renderGlossaryList() {
    const query = document.getElementById('glossary-search').value.toLowerCase().trim();
    const listEl = document.getElementById('glossary-list');
    listEl.innerHTML = '';

    let items = GLOSSARY;

    // Filter by category
    if (glossaryFilter !== 'all') {
        items = items.filter(g => g.category === glossaryFilter);
    }

    // Filter by search query
    if (query) {
        items = items.filter(g =>
            g.term.toLowerCase().includes(query) ||
            g.reading.toLowerCase().includes(query) ||
            g.definition.toLowerCase().includes(query) ||
            g.category.toLowerCase().includes(query)
        );
    }

    // Update count
    document.getElementById('glossary-result-count').textContent = items.length + '語';

    if (items.length === 0) {
        listEl.innerHTML = '<div class="glossary-empty">該当する用語が見つかりません</div>';
        return;
    }

    items.forEach(g => {
        const item = document.createElement('div');
        item.className = 'glossary-item';
        item.innerHTML =
            `<div class="glossary-item-header">` +
                `<span class="glossary-term">${escapeHtml(g.term)}</span>` +
                `<span class="glossary-reading">${escapeHtml(g.reading)}</span>` +
            `</div>` +
            `<span class="glossary-cat-tag">${escapeHtml(g.category)}</span>` +
            `<p class="glossary-def">${escapeHtml(g.definition)}</p>`;
        listEl.appendChild(item);
    });
}

// ===== REVIEW FILTER =====
function toggleReviewFilter(type) {
    reviewFilter[type] = !reviewFilter[type];
    // Ensure at least one is selected
    if (!reviewFilter.correct && !reviewFilter.unsure && !reviewFilter.incorrect) {
        reviewFilter[type] = true;
        showToast('少なくとも1つのフィルターを選択してください');
        return;
    }
    updateReviewFilterUI();
    updateReviewFilterCounts();
}

function updateReviewFilterUI() {
    document.getElementById('filter-correct-btn').classList.toggle('active', reviewFilter.correct);
    document.getElementById('filter-unsure-btn').classList.toggle('active', reviewFilter.unsure);
    document.getElementById('filter-incorrect-btn').classList.toggle('active', reviewFilter.incorrect);
}

function updateReviewFilterCounts() {
    const mistakes = getMistakes();
    const mastered = getMastered();
    const history = getHistory();
    const allNums = QUESTIONS.map(q => q.num);

    let correctCount = 0, unsureCount = 0, incorrectCount = 0;

    // Count unsure/incorrect from mistakes list
    mistakes.forEach(num => {
        if (mastered.includes(num)) return;
        const hist = history[num];
        if (hist && hist.last === 'unsure') unsureCount++;
        else incorrectCount++;
    });

    // Count correct from history (questions with last='correct' that are not in mistakes/mastered)
    allNums.forEach(num => {
        if (mastered.includes(num) || mistakes.includes(num)) return;
        const hist = history[num];
        if (hist && hist.last === 'correct') correctCount++;
    });

    document.getElementById('count-filter-correct').textContent = correctCount;
    document.getElementById('count-filter-unsure').textContent = unsureCount;
    document.getElementById('count-filter-incorrect').textContent = incorrectCount;

    let totalCount = 0;
    if (reviewFilter.correct) totalCount += correctCount;
    if (reviewFilter.unsure) totalCount += unsureCount;
    if (reviewFilter.incorrect) totalCount += incorrectCount;
    document.getElementById('count-mistakes').textContent = totalCount + '問';

    const btn = document.getElementById('btn-mistakes');
    if (totalCount === 0) {
        btn.setAttribute('disabled', '');
    } else {
        btn.removeAttribute('disabled');
    }
}

// ===== BACKUP / RESTORE =====
function exportData() {
    const data = {};
    const keys = [LS_MASTERED, LS_MISTAKES, LS_HISTORY, LS_LAST_SESSION, LS_MEMO, LS_GEMINI_KEY, LS_GEMINI_MODEL];
    keys.forEach(key => {
        const val = localStorage.getItem(key);
        if (val !== null) data[key] = val;
    });

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sy0701_backup_' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('バックアップをダウンロードしました');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                const validKeys = [LS_MASTERED, LS_MISTAKES, LS_HISTORY, LS_LAST_SESSION, LS_MEMO, LS_GEMINI_KEY, LS_GEMINI_MODEL];
                let count = 0;
                validKeys.forEach(key => {
                    if (data[key] !== undefined) {
                        localStorage.setItem(key, data[key]);
                        count++;
                    }
                });
                updateHomeStats();
                updateResumeCard();
                initMemo();
                showToast(count + '件のデータを復元しました');
            } catch (err) {
                showToast('ファイルの読み込みに失敗しました');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// ===== UTILS =====
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ===== BOOT =====
document.addEventListener('DOMContentLoaded', init);

// Close jump popover when clicking outside
document.addEventListener('click', (e) => {
    const popover = document.getElementById('jump-popover');
    const jumpBtn = document.getElementById('btn-jump');
    if (popover.classList.contains('active') &&
        !popover.contains(e.target) &&
        e.target !== jumpBtn && !jumpBtn.contains(e.target)) {
        closeJumpInput();
    }
});
