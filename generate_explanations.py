#!/usr/bin/env python3
"""
Gemini API で全問題に detailed_explanation を生成。
progress.json に進捗保存。中断しても再実行で続きから。
"""
import json, sys, time, os, urllib.request, urllib.error

PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data.js')
PROGRESS = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'progress.json')
API_KEY = 'AIzaSyCJgfa_csIOYy8MzAPTF2OtP1wH43avDgc'
MODEL = 'gemini-2.5-flash-lite'
WAIT = 4
MAX_RETRIES = 10

def load_questions():
    with open(PATH, 'r', encoding='utf-8') as f:
        c = f.read()
    return json.loads(c[c.index('['):].rstrip().rstrip(';'))

def save_data_js(qs):
    with open(PATH, 'w', encoding='utf-8') as f:
        f.write('const QUESTIONS = ' + json.dumps(qs, ensure_ascii=False, separators=(',', ': ')) + ';\n')

def load_progress():
    if os.path.exists(PROGRESS):
        with open(PROGRESS, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

def save_progress(p):
    with open(PROGRESS, 'w', encoding='utf-8') as f:
        json.dump(p, f, ensure_ascii=False)

def build_prompt(q):
    ct = '\n'.join(f"{c['letter']}. {c['text']}" for c in q.get('choices', []))
    return f"""あなたはCompTIA Security+ (SY0-701) の試験対策の専門家です。
以下の問題について、IT初心者でも理解できるように詳しく日本語で解説してください。

【問題】
{q['question']}

【選択肢】
{ct}

【正解】
{q['answer']}

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

丁寧で分かりやすい解説をお願いします。"""

def call_gemini(prompt):
    url = f'https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}'
    payload = json.dumps({
        'contents': [{'parts': [{'text': prompt}]}],
        'generationConfig': {'temperature': 0.3, 'maxOutputTokens': 4096}
    }).encode('utf-8')
    req = urllib.request.Request(url, data=payload, headers={'Content-Type': 'application/json'})
    for attempt in range(MAX_RETRIES):
        try:
            with urllib.request.urlopen(req, timeout=60) as res:
                data = json.loads(res.read().decode('utf-8'))
                text = data.get('candidates', [{}])[0].get('content', {}).get('parts', [{}])[0].get('text', '')
                if text:
                    return text
                raise Exception('Empty response')
        except urllib.error.HTTPError as e:
            body = e.read().decode('utf-8', errors='replace')
            if e.code == 429 or 'quota' in body.lower():
                wait = (attempt + 1) * 15
                print(f'  Rate limited, waiting {wait}s...')
                time.sleep(wait)
                continue
            raise Exception(f'HTTP {e.code}: {body[:200]}')
        except urllib.error.URLError as e:
            if attempt < MAX_RETRIES - 1:
                time.sleep(5)
                continue
            raise
    raise Exception('Max retries exceeded')

def main():
    questions = load_questions()
    progress = load_progress()
    # Q1 already has detailed_explanation in original data
    to_do = [q for q in questions if str(q['num']) not in progress and (q['num'] == 1 and q.get('detailed_explanation') or q['num'] != 1)]
    # Actually: skip Q1 (already has it), skip ones in progress
    to_do = []
    for q in questions:
        qn = str(q['num'])
        if qn in progress:
            continue
        if q['num'] == 1 and q.get('detailed_explanation'):
            continue
        to_do.append(q)

    print(f'残り{len(to_do)}問を生成 (推定{len(to_do)*WAIT//60}分)')

    for i, q in enumerate(to_do):
        try:
            print(f'[{i+1}/{len(to_do)}] Q{q["num"]}...', end='', flush=True)
            text = call_gemini(build_prompt(q))
            progress[str(q['num'])] = text
            save_progress(progress)
            print(f' OK ({len(text)}字)')
            time.sleep(WAIT)
        except KeyboardInterrupt:
            print('\n中断。再実行で続きから。')
            break
        except Exception as e:
            print(f' ERROR: {e}')
            time.sleep(60)

    # Apply to data.js
    print('data.js に反映中...')
    applied = 0
    for q in questions:
        qn = str(q['num'])
        if qn in progress:
            q['detailed_explanation'] = progress[qn]
            applied += 1
    save_data_js(questions)
    missing = sum(1 for q in questions if not q.get('detailed_explanation'))
    print(f'{applied}問反映完了。残り{missing}問。')

if __name__ == '__main__':
    main()
