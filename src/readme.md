# 🚀 DevSync — Collaborative Task Management Platform

A production-ready full-stack SaaS application that enables teams to collaborate using workspaces and a drag-and-drop Kanban board.

🔗 **Live Demo:** https://your-frontend.vercel.app  
🛠 Backend API: https://your-backend.onrender.com  

---

## ✨ Features

- 🔐 Secure Authentication (JWT-based login & signup)
- 🏢 Workspace-based collaboration
- 📩 Invite code system to join teams
- 📋 Kanban board (Todo / In Progress / Done)
- 🖱 Drag & Drop task management
- 🛡 Protected routes (frontend & backend)
- 🌐 Fully deployed (Render + Vercel)
- 🗄 PostgreSQL database (Supabase)

---

## 🧠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- dnd-kit (Drag & Drop)
- Axios
- React Router

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (Supabase)
- JWT Authentication

### Deployment
- Backend: Render
- Frontend: Vercel
- Database: Supabase

---

## 🏗 Architecture Overview

```
Client (React)  
      ↓
Express API (Render)  
      ↓
Prisma ORM  
      ↓
PostgreSQL (Supabase)
```

---

## 🔐 Authentication Flow

1. User signs up / logs in
2. JWT token generated
3. Token stored in localStorage
4. Protected routes verify token
5. Backend middleware validates JWT

---

## 📂 Folder Structure

### Backend

```
src/
 ├── controllers/
 ├── routes/
 ├── middleware/
 ├── lib/
 └── index.js
```

### Frontend

```
src/
 ├── pages/
 ├── components/
 ├── api/
 └── App.jsx
```

---

## 🚀 How to Run Locally

### Backend

```bash
npm install
npx prisma generate
node src/index.js
```

### Frontend

```bash
npm install
npm run dev
```

---

## 📸 Screenshots

![alt text](<../img/Screenshot 2026-03-03 231011.png>)

![alt text](<../img/Screenshot 2026-03-03 231038.png>)
![alt text](<../img/Screenshot 2026-03-03 231056.png>)
---

## 💡 Key Learnings

- Designing workspace-based multi-tenant systems
- Implementing JWT authentication securely
- Managing relational data using Prisma
- Building drag-and-drop UI using dnd-kit
- Deploying full-stack applications to production

---

## 📈 Future Improvements

- Real-time updates (WebSockets)
- Task comments
- Activity logs
- Role-based access control
- Notifications system

---

## 👨‍💻 Author

Built by Vivek  
GitHub: https://github.com/CoderninjaX 

---

⭐ If you like this project, consider giving it a star!