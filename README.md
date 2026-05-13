# 🏥 Medix QR — Full Stack Application

A healthcare-based QR management system built using **Node.js, Express.js, MongoDB, HTML, CSS, and JavaScript**.

## 🚀 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Frontend:** HTML, CSS, JavaScript
- **Authentication:** JWT
- **Port:** 3000

---

# ✅ Setup Guide (Mac)

## Step 1 — Start MongoDB

Open Terminal and run:
bash
mongod


If you get an error, run:

bash
brew services start mongodb-community

---

## Step 2 — Open Project in VS Code

1. Open **VS Code**
2. Go to **File → Open Folder**
3. Select the **medixqr** project folder

---

## Step 3 — Navigate to Backend Folder

Open terminal in VS Code (`Ctrl + \``) and run:

bash
cd backend

---

## Step 4 — Install Dependencies

Run this command (only first time):

bash
npm install


---

## Step 5 — Start the Application

Run:

bash
npm run dev


You should see:

text
✅ MongoDB Connected
🚀 Medix QR running at: http://localhost:3000
📄 Open: http://localhost:3000/pages/index.html

---

## Step 6 — Open in Browser

Open:

text
http://localhost:3000/pages/index.html


---

# ⚠️ Common Errors & Fixes

## Port 3000 Already in Use

Run:

bash
kill -9 $(lsof -ti :3000)
npm run dev


---

## Wrong Folder Error

Make sure you are inside the backend folder:

bash
cd backend
npm run dev


## MongoDB Not Connected

Run:

bash
mongod


Or:

bash
brew services start mongodb-community

---

# 🔗 API Endpoints

## Authentication APIs

```http
POST /api/auth/register
POST /api/auth/login
```

## Profile APIs

http
GET  /api/profile
POST /api/profile
GET  /api/profile/view/:userId


## QR Code APIs

http
GET /api/qr/generate


---

# 📂 Project Structure

text
medixqr/
│── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── .env
│
│── frontend/
│   ├── pages/
│   ├── css/
│   ├── js/
│
└── README.md

---

# 🌐 Local Development URL

text
http://localhost:3000

