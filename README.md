# 🎮 ArcadeHub - Interactive Mini Game Platform

A full-stack interactive gaming website with authentication, multiple games, leaderboards, and player feedback system.

## 🎯 Features

### Games
- **Rock Paper Scissors** - Tournament mode (Best of 5/10)
- **Memory Cards** - Flip and match card game
- **Guess The Number** - Number guessing challenge

### Platform Features
- User authentication (Signup/Login)
- Personal dashboard with stats
- Global leaderboard
- Score tracking & win streaks
- Player feedback system
- Dark neon gaming theme UI

## 🚀 Tech Stack

**Frontend:**
- React
- React Router
- Axios
- CSS3 with animations

**Backend:**
- Node.js
- Express.js
- JWT Authentication
- File-based storage

## 📦 Installation

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

Server runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Dependencies are already installed

3. Start the React app:
```bash
npm start
```

App runs on `http://localhost:3000`

## 🎮 How to Use

1. **Sign Up** - Create a new account
2. **Login** - Access your dashboard
3. **Play Games** - Choose from 3 different games
4. **Track Progress** - View your stats and scores
5. **Compete** - Check the leaderboard
6. **Give Feedback** - Help improve the platform

## 📁 Project Structure

```
backend/
├── data/           # Data storage
├── middleware/     # Auth middleware
├── routes/         # API routes
└── server.js       # Main server

frontend/
├── src/
│   ├── components/ # Reusable components
│   ├── pages/      # Page components
│   ├── games/      # Game components
│   ├── utils/      # API & Auth utilities
│   └── styles/     # CSS files
```

## 🎨 Design Philosophy

- Game-first platform (no traditional About/Contact pages)
- Every page increases engagement
- Smooth animations and micro-interactions
- Dark neon gaming aesthetic
- Mobile responsive

## 🔐 Security

- Passwords hashed with bcrypt
- JWT token authentication
- Protected routes
- Secure API endpoints

## 🎯 Future Enhancements

- More games
- Multiplayer modes
- Achievements system
- Social features
- Admin dashboard

---

Built with ❤️ for gamers who can't stop playing "just one more game"
