# 🏥 Medix QR — Full Stack App
Stack: Node.js + Express + MongoDB + HTML/CSS/JS
Port: 3000

## ✅ Setup Steps (Mac)

### Step 1 — MongoDB Start karo
Terminal mein:
  mongod
Agar error aaye:
  brew services start mongodb-community

### Step 2 — VS Code mein open karo
  File → Open Folder → medixqr folder select karo

### Step 3 — Backend folder mein jao
VS Code terminal (Ctrl+`) mein:
  cd backend

### Step 4 — Install karo (sirf pehli baar)
  npm install

### Step 5 — App run karo
  npm run dev

Terminal mein dikhega:
  ✅ MongoDB Connected
  🚀 Medix QR running at: http://localhost:3000

### Step 6 — Browser mein kholo
  http://localhost:3000/pages/index.html

---

## ⚠️ Common Errors

Port 3000 busy hai:
  kill -9 $(lsof -ti :3000)
  npm run dev

Galat folder mein ho:
  cd backend
  npm run dev

MongoDB connect nahi hua:
  mongod

---

## API Endpoints
POST /api/auth/register
POST /api/auth/login
GET  /api/profile
POST /api/profile
GET  /api/profile/view/:userId
GET  /api/qr/generate
