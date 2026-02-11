// ===== STATE =====
let currentMode = 'all';       // 'all' | 'mistakes'
let orderMode = 'random';      // 'random' | 'sequential'
let deck = [];                 // current set of question indices
let deckIndex = 0;             // position in deck
let isFlipped = false;

// LocalStorage keys
const LS_MASTERED = 'sy0701_mastered';
const LS_MISTAKES = 'sy0701_mistakes';
const LS_GEMINI_KEY = 'sy0701_gemini_key';
const LS_GEMINI_MODEL = 'sy0701_gemini_model';
const LS_LAST_SESSION = 'sy0701_last_session';
const LS_MEMO = 'sy0701_memo';

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
    updateResumeCard();
    updateApiStatusDot();
    initMemo();
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
    document.getElementById('count-all-seq').textContent = total + '問';
    document.getElementById('count-mistakes').textContent = mistakes.length + '問';

    // Update glossary count
    if (typeof GLOSSARY !== 'undefined') {
        document.getElementById('count-glossary').textContent = GLOSSARY.length + '語';
    }

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
    updateResumeCard();
    showScreen('home-screen');
}

// ===== START MODE =====
function startMode(mode, order) {
    currentMode = mode;
    orderMode = order || 'random';
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
    if (isNaN(num) || num < 1 || num > QUESTIONS.length) {
        showToast(`1〜${QUESTIONS.length} の番号を入力してください`);
        return;
    }

    // Find the deck index for this question number
    const targetDeckIndex = deck.findIndex(i => QUESTIONS[i].num === num);
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

    // Reset AI explanation
    document.getElementById('ai-explain-btn').style.display = getApiKey() ? '' : 'none';
    document.getElementById('ai-explain-response').style.display = 'none';
    document.getElementById('ai-explain-loading').style.display = 'none';
    document.getElementById('ai-explain-error').style.display = 'none';

    // Auto-save session progress
    saveSession();

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
    const q = QUESTIONS[deck[deckIndex]];
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

    if (session.mode === 'all') {
        deck = QUESTIONS.map((q, i) => i)
            .filter(i => !mastered.includes(QUESTIONS[i].num));
        const label = orderMode === 'sequential' ? '全問モード（順番）' : '全問モード（ランダム）';
        document.getElementById('card-mode-label').textContent = label;
        document.getElementById('card-mode-label').style.background = 'var(--accent-soft)';
        document.getElementById('card-mode-label').style.color = 'var(--accent)';
    } else {
        deck = QUESTIONS.map((q, i) => i)
            .filter(i => mistakes.includes(QUESTIONS[i].num) && !mastered.includes(QUESTIONS[i].num));
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
    const targetIdx = deck.findIndex(i => QUESTIONS[i].num === session.qNum);
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
    { id: 'gemini-2.0-flash-lite', label: 'Gemini 2.0 Flash Lite（推奨・最軽量）' },
    { id: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash（安定）' },
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

    const q = QUESTIONS[deck[deckIndex]];
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
以下の問題について、初心者にもわかるように詳しく日本語で解説してください。

【問題】
${q.question}

【選択肢】
${choicesText}

【正解】
${q.answer}

以下のポイントを含めて解説してください：
1. なぜその答えが正解なのか（根拠と背景）
2. 各不正解の選択肢が間違いである理由
3. この問題に関連する重要な概念やキーワード
4. 試験で覚えておくべきポイント

わかりやすく、簡潔に解説してください。`;

    try {
        const apiUrl = getGeminiApiUrl();
        const res = await fetch(`${apiUrl}?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.3,
                    maxOutputTokens: 2048
                }
            })
        });

        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            const errMsg = errData?.error?.message || `HTTP ${res.status}`;

            // Detect quota error and show friendly message
            if (res.status === 429 || errMsg.includes('quota') || errMsg.includes('Quota')) {
                throw new Error('QUOTA');
            }
            if (res.status === 400 && errMsg.includes('API key')) {
                throw new Error('APIキーが無効です。AI設定で正しいキーを入力してください。');
            }
            throw new Error(errMsg);
        }

        const data = await res.json();
        const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!aiText) {
            throw new Error('AIからの応答が空でした');
        }

        loading.style.display = 'none';
        textEl.innerHTML = formatAiResponse(aiText);
        response.style.display = 'block';
    } catch (err) {
        loading.style.display = 'none';
        btn.style.display = '';

        if (err.message === 'QUOTA') {
            const model = getGeminiModel();
            errorEl.innerHTML =
                `<strong>無料枠の制限に達しました</strong><br>` +
                `現在のモデル: ${escapeHtml(model)}<br><br>` +
                `対処法:<br>` +
                `・少し時間をおいて再試行する<br>` +
                `・AI設定で別のモデルに切り替える<br>` +
                `・<a href="https://aistudio.google.com/apikey" target="_blank" style="color:var(--accent);">Google AI Studio</a> で課金設定を有効にする`;
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
