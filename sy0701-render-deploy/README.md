# SY0-701 Security+ 単語帳アプリ

CompTIA Security+ SY0-701（日本語版）全711問のフラッシュカードアプリです。

## Render へのデプロイ手順

### 方法1: GitHubリポジトリ経由（推奨）

1. このフォルダの中身をGitHubリポジトリにpush
2. [Render Dashboard](https://dashboard.render.com/) にログイン
3. **New** → **Static Site** を選択
4. GitHubリポジトリを接続
5. 以下を設定:
   - **Name**: `sy0701-flashcard`（任意）
   - **Branch**: `main`
   - **Build Command**: `echo "No build needed"`
   - **Publish Directory**: `./public`
6. **Deploy** をクリック

### 方法2: render.yaml Blueprint

1. GitHubにpush後、Render Dashboardで **New** → **Blueprint** を選択
2. リポジトリを選択すると `render.yaml` が自動認識される
3. **Apply** をクリック

### ファイル構成

```
render-deploy/
├── render.yaml          # Render設定ファイル
├── README.md            # このファイル
└── public/              # 静的ファイル（公開ディレクトリ）
    ├── index.html       # メインHTML
    ├── style.css        # スタイルシート
    ├── app.js           # アプリケーションロジック
    └── data.js          # 全711問の問題データ
```

## 機能

- **全問モード**: 711問すべてをランダム出題
- **復習モード**: 間違えた問題のみを出題
- **覚えた機能**: 覚えた問題はデッキから除外
- **進捗管理**: localStorageで学習データを永続化
- **スワイプ/キーボード対応**: モバイル・PC両対応
