#!/usr/bin/env node
/**
 * Gemini APIを使って全問題の詳細解説を生成し、data.jsに保存するスクリプト
 *
 * 使い方:
 *   node generate-explanations.js YOUR_GEMINI_API_KEY
 *
 * オプション:
 *   --start=N     N番目の問題から開始（デフォルト: 0）
 *   --model=MODEL モデル指定（デフォルト: gemini-2.0-flash-lite）
 *   --delay=MS    リクエスト間の待機時間ms（デフォルト: 5000）
 *
 * 例:
 *   node generate-explanations.js AIzaSy... --start=100 --delay=6000
 *
 * 途中で中断しても、進捗は data_with_details.js に保存されるので
 * --start で再開できます。
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

// ===== 引数解析 =====
const args = process.argv.slice(2);
const API_KEY = args.find(a => !a.startsWith('--'));
if (!API_KEY) {
    console.error('使い方: node generate-explanations.js YOUR_API_KEY [--start=N] [--model=MODEL] [--delay=MS]');
    process.exit(1);
}

const START_INDEX = parseInt((args.find(a => a.startsWith('--start=')) || '').split('=')[1]) || 0;
const MODEL = (args.find(a => a.startsWith('--model=')) || '').split('=')[1] || 'gemini-2.0-flash-lite';
const DELAY_MS = parseInt((args.find(a => a.startsWith('--delay=')) || '').split('=')[1]) || 5000;

// ===== データ読み込み =====
const dataPath = path.join(__dirname, 'data.js');
const outputPath = path.join(__dirname, 'data_with_details.js');
const content = fs.readFileSync(dataPath, 'utf-8');
const start = content.indexOf('[');
const end = content.lastIndexOf(']') + 1;
const questions = JSON.parse(content.substring(start, end));

// 既存の進捗を読み込む
let existingData = null;
if (fs.existsSync(outputPath)) {
    try {
        const existing = fs.readFileSync(outputPath, 'utf-8');
        const s = existing.indexOf('[');
        const e = existing.lastIndexOf(']') + 1;
        existingData = JSON.parse(existing.substring(s, e));
        console.log(`既存の進捗ファイルを検出: ${existingData.filter(q => q.detailed_explanation).length}問 生成済み`);
        // Merge existing detailed_explanations
        existingData.forEach((eq, i) => {
            if (eq.detailed_explanation && !questions[i].detailed_explanation) {
                questions[i].detailed_explanation = eq.detailed_explanation;
            }
        });
    } catch (e) {
        console.log('既存ファイルの読み込みに失敗、最初から開始します');
    }
}

console.log(`\n全${questions.length}問中、問題${START_INDEX + 1}から開始`);
console.log(`モデル: ${MODEL}`);
console.log(`リクエスト間隔: ${DELAY_MS}ms\n`);

// ===== API呼び出し =====
function callGemini(prompt) {
    return new Promise((resolve, reject) => {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
        const body = JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 4096
            }
        });

        const urlObj = new URL(url);
        const options = {
            hostname: urlObj.hostname,
            path: urlObj.pathname + urlObj.search,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (res.statusCode === 429) {
                        reject(new Error('RATE_LIMIT'));
                        return;
                    }
                    if (res.statusCode !== 200) {
                        reject(new Error(`HTTP ${res.statusCode}: ${json?.error?.message || data.substring(0, 200)}`));
                        return;
                    }
                    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (!text) {
                        reject(new Error('空の応答'));
                        return;
                    }
                    resolve(text);
                } catch (e) {
                    reject(e);
                }
            });
        });
        req.on('error', reject);
        req.write(body);
        req.end();
    });
}

function buildPrompt(q) {
    let choicesText = '';
    if (q.choices && q.choices.length > 0) {
        choicesText = q.choices.map(c => `${c.letter}. ${c.text}`).join('\n');
    }

    return `あなたはCompTIA Security+ (SY0-701) の試験対策の専門家です。
以下の問題について、初心者にもわかるように詳しく日本語で解説してください。

【問題】
${q.question}

【選択肢】
${choicesText}

【正解】
${q.answer}

以下の構成で解説してください：

## 1. なぜ「${q.answer}」が正解なのか？
正解の根拠と背景知識を、具体例を交えて丁寧に説明してください。

## 2. 各不正解の選択肢が間違いである理由
各不正解選択肢について、なぜ不正解なのかを具体的に説明してください。

## 3. この問題に関連する重要な概念やキーワード
試験に出る可能性のある関連用語や概念を、それぞれ簡単な説明付きでリストアップしてください。

## 4. 試験で覚えておくべきポイント
この問題から学べる試験対策のポイントを箇条書きでまとめてください。

わかりやすく、体系的に解説してください。`;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function saveProgress() {
    const output = 'const QUESTIONS = ' + JSON.stringify(questions, null, 2) + ';\n';
    fs.writeFileSync(outputPath, output, 'utf-8');
}

// ===== メイン処理 =====
async function main() {
    let generated = questions.filter(q => q.detailed_explanation).length;
    let errors = 0;

    for (let i = START_INDEX; i < questions.length; i++) {
        const q = questions[i];

        // 既に生成済みならスキップ
        if (q.detailed_explanation) {
            console.log(`[${i + 1}/${questions.length}] Q${q.num} ✓ スキップ（生成済み）`);
            continue;
        }

        const prompt = buildPrompt(q);
        let retries = 0;
        const maxRetries = 5;

        while (retries < maxRetries) {
            try {
                process.stdout.write(`[${i + 1}/${questions.length}] Q${q.num} 生成中...`);
                const result = await callGemini(prompt);
                q.detailed_explanation = result;
                generated++;
                console.log(` ✓ (${generated}問完了)`);

                // 10問ごとに保存
                if (generated % 10 === 0) {
                    saveProgress();
                    console.log(`  → 進捗を保存しました`);
                }
                break;
            } catch (err) {
                if (err.message === 'RATE_LIMIT') {
                    retries++;
                    const wait = DELAY_MS * retries * 2;
                    console.log(` ⏳ レート制限、${wait / 1000}秒待機... (${retries}/${maxRetries})`);
                    await sleep(wait);
                } else {
                    console.log(` ✗ エラー: ${err.message}`);
                    errors++;
                    break;
                }
            }
        }

        if (retries >= maxRetries) {
            console.log(`  ✗ Q${q.num}: リトライ上限に達しました。スキップします。`);
            errors++;
        }

        // 通常のリクエスト間隔
        await sleep(DELAY_MS);
    }

    // 最終保存
    saveProgress();

    console.log(`\n===== 完了 =====`);
    console.log(`生成済み: ${generated}/${questions.length}`);
    console.log(`エラー: ${errors}`);
    console.log(`出力: ${outputPath}`);

    if (generated === questions.length) {
        console.log(`\n全問完了！ 以下のコマンドでdata.jsを置き換えてください:`);
        console.log(`  cp ${outputPath} ${dataPath}`);
    } else {
        console.log(`\n未完了の問題があります。以下で再開できます:`);
        const nextUnfinished = questions.findIndex((q, idx) => idx >= START_INDEX && !q.detailed_explanation);
        if (nextUnfinished >= 0) {
            console.log(`  node generate-explanations.js ${API_KEY.substring(0, 8)}... --start=${nextUnfinished}`);
        }
    }
}

main().catch(err => {
    console.error('致命的なエラー:', err);
    saveProgress();
    console.log('進捗を保存しました。');
    process.exit(1);
});
