# 🎯 離職集點卡

蒐集每一個想離職的瞬間，集滿就自由！

---

## 快速開始

### 1. 設定 Firebase

1. 前往 [Firebase Console](https://console.firebase.google.com/)，建立新專案
2. 進入「Authentication」→「Sign-in method」→ 啟用 **Google**
3. 進入「Firestore Database」→ 建立資料庫（選 **production mode**）
4. 設定 Firestore 安全性規則（貼上以下內容）：

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

5. 進入「專案設定」→「你的應用程式」→ 新增 Web App，取得設定值

### 2. 設定環境變數

```bash
cp .env.example .env
```

填入你的 Firebase 設定值到 `.env`

### 3. 本機執行

```bash
npm install
npm run dev
```

### 4. 部署到 GitHub Pages（免費！）

**a. 建立 GitHub Repo**，把程式碼 push 上去

**b. 設定 Secrets**
在 GitHub Repo → Settings → Secrets → Actions，新增以下 6 個 secrets：
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

**c. 啟用 GitHub Pages**
Repo → Settings → Pages → Source 選 **GitHub Actions**

**d. Push 到 main 分支**，GitHub Actions 會自動建置並部署！

**e. 修改 Firebase 授權網域**
Firebase Console → Authentication → Settings → Authorized domains
加入你的 `你的帳號.github.io`

---

## 功能說明

- 🎯 Google 帳號登入
- 🖊️ 新增集點（8 種事件類型 + 自定義）
- 📊 集點卡視覺化，10 點達標慶祝
- 📜 蓋章歷史紀錄
- 📱 RWD，手機電腦都好用
- ☁️ 即時同步 Firestore

---

## 技術架構

| 項目 | 工具 | 費用 |
|---|---|---|
| 前端 | React + Tailwind CSS | 免費 |
| Hosting | GitHub Pages | 免費 |
| 登入 | Firebase Auth | 免費 |
| 資料庫 | Firebase Firestore | 免費（Spark 方案） |
| CI/CD | GitHub Actions | 免費 |
