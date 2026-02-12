# 🗺️ ArcadeHub - User Flow & Navigation Guide

## 📱 Complete User Journey

### 🎯 First-Time User Flow

```
Landing Page (/)
    ↓
    ├─→ Click "Start Playing" → Signup Page (/signup)
    │                              ↓
    │                         Create Account
    │                              ↓
    │                         Auto Login
    │                              ↓
    └─→ Click "Login" ────────→ Login Page (/login)
                                   ↓
                              Enter Credentials
                                   ↓
                              Dashboard (/dashboard)
```

### 🎮 Authenticated User Flow

```
Dashboard (/dashboard)
    │
    ├─→ View Stats (Games, Wins, Streak, Win Rate)
    │
    ├─→ Quick Play Section
    │   ├─→ Rock Paper Scissors (/games/rps)
    │   ├─→ Memory Cards (/games/memory)
    │   └─→ Guess The Number (/games/guess)
    │
    ├─→ Recent Games History
    │
    └─→ Navbar Navigation
        ├─→ Dashboard (/dashboard)
        ├─→ Games (/games) → redirects to Dashboard
        ├─→ Leaderboard (/leaderboard)
        ├─→ Help Us Improve (/feedback)
        └─→ Logout → Landing Page (/)
```

---

## 🎮 Game Flows

### Rock Paper Scissors Flow

```
Game Page (/games/rps)
    ↓
Select Mode
    ├─→ Best of 5
    └─→ Best of 10
    ↓
Play Round
    ├─→ Choose: Rock / Paper / Scissors
    ↓
View Result
    ├─→ Win (streak++)
    ├─→ Lose (streak = 0)
    └─→ Draw
    ↓
Next Round or Game Over
    ↓
Victory/Defeat Screen
    ├─→ View Final Stats
    └─→ Play Again (reset) or Exit
```

### Memory Cards Flow

```
Game Page (/games/memory)
    ↓
Game Starts (timer begins on first click)
    ↓
Click Card 1 (flips)
    ↓
Click Card 2 (flips)
    ↓
Match Check
    ├─→ Match → Cards stay flipped (green glow)
    └─→ No Match → Cards flip back
    ↓
Repeat until all matched
    ↓
Game Complete
    ├─→ View Stats (Moves, Time, Accuracy)
    └─→ Play Again or Exit
```

### Guess The Number Flow

```
Game Page (/games/guess)
    ↓
Random Number Generated (1-100)
    ↓
Enter Guess
    ↓
Submit
    ↓
Feedback
    ├─→ Too High 📉
    ├─→ Too Low 📈
    └─→ Correct! 🎉
    ↓
If Correct:
    ├─→ View Stats (Attempts)
    └─→ Play Again or Exit
```

---

## 📊 Data Flow

### Score Saving Flow

```
Game Completed
    ↓
Calculate Score
    ↓
API Call: POST /api/games/save-score
    ↓
Backend:
    ├─→ Verify JWT Token
    ├─→ Save to scores.json
    ├─→ Update user stats
    └─→ Return success
    ↓
Frontend:
    └─→ Show completion screen
```

### Leaderboard Flow

```
Visit Leaderboard Page
    ↓
API Call: GET /api/games/leaderboard
    ↓
Backend:
    ├─→ Verify JWT Token
    ├─→ Read users.json
    ├─→ Read scores.json
    ├─→ Calculate rankings
    └─→ Return sorted data
    ↓
Frontend:
    └─→ Display rankings with highlights
```

---

## 🔐 Authentication Flow

### Signup Flow

```
Signup Page (/signup)
    ↓
Enter: Username, Email, Password
    ↓
Submit Form
    ↓
API Call: POST /api/auth/signup
    ↓
Backend Validation:
    ├─→ Check email unique
    ├─→ Check username unique
    ├─→ Hash password
    ├─→ Create user
    ├─→ Generate JWT token
    └─→ Return user + token
    ↓
Frontend:
    ├─→ Store token in localStorage
    ├─→ Store user in context
    └─→ Redirect to Dashboard
```

### Login Flow

```
Login Page (/login)
    ↓
Enter: Email, Password
    ↓
Submit Form
    ↓
API Call: POST /api/auth/login
    ↓
Backend Validation:
    ├─→ Find user by email
    ├─→ Compare password hash
    ├─→ Generate JWT token
    └─→ Return user + token
    ↓
Frontend:
    ├─→ Store token in localStorage
    ├─→ Store user in context
    └─→ Redirect to Dashboard
```

### Logout Flow

```
Click Logout (Navbar)
    ↓
Frontend:
    ├─→ Clear localStorage
    ├─→ Clear auth context
    └─→ Redirect to Landing Page
```

---

## 💡 Feedback Flow

```
Feedback Page (/feedback)
    ↓
Select Category:
    ├─→ Improve existing game
    ├─→ Suggest new game
    ├─→ Report a bug
    └─→ General feedback
    ↓
If "Improve" or "Bug":
    └─→ Select Game (RPS/Memory/Guess)
    ↓
Enter Message
    ↓
Rate Experience (1-5 stars)
    ↓
Submit
    ↓
API Call: POST /api/feedback/submit
    ↓
Backend:
    ├─→ Validate data
    ├─→ Save to feedback.json
    └─→ Return success
    ↓
Frontend:
    └─→ Show success message
```

---

## 🎨 Page Structure

### Landing Page
```
┌─────────────────────────────────┐
│         Navbar (minimal)        │
├─────────────────────────────────┤
│                                 │
│    Hero Section                 │
│    - Title                      │
│    - Subtitle                   │
│    - CTA Buttons                │
│    - Visual Icons               │
│                                 │
├─────────────────────────────────┤
│                                 │
│    Featured Games               │
│    - RPS Card                   │
│    - Memory Card                │
│    - Guess Card                 │
│                                 │
├─────────────────────────────────┤
│                                 │
│    CTA Section                  │
│    - Join message               │
│    - Signup button              │
│                                 │
└─────────────────────────────────┘
```

### Dashboard
```
┌─────────────────────────────────┐
│    Navbar (full navigation)     │
├─────────────────────────────────┤
│                                 │
│    Welcome Header               │
│    - Username                   │
│    - Motivational text          │
│                                 │
├─────────────────────────────────┤
│                                 │
│    Stats Grid (4 cards)         │
│    - Total Games                │
│    - Total Wins                 │
│    - Best Streak                │
│    - Win Rate                   │
│                                 │
├─────────────────────────────────┤
│                                 │
│    Quick Play (3 game cards)    │
│    - Clickable game cards       │
│                                 │
├─────────────────────────────────┤
│                                 │
│    Recent Games (list)          │
│    - Last 5 games               │
│                                 │
└─────────────────────────────────┘
```

### Game Page (Generic)
```
┌─────────────────────────────────┐
│    Navbar (full navigation)     │
├─────────────────────────────────┤
│                                 │
│    Game Title                   │
│                                 │
├─────────────────────────────────┤
│                                 │
│    Game Stats Bar               │
│    - Score/Moves/Time           │
│                                 │
├─────────────────────────────────┤
│                                 │
│    Game Area                    │
│    - Interactive elements       │
│    - Animations                 │
│                                 │
├─────────────────────────────────┤
│                                 │
│    Controls/Actions             │
│    - Buttons/Inputs             │
│                                 │
└─────────────────────────────────┘
```

### Leaderboard
```
┌─────────────────────────────────┐
│    Navbar (full navigation)     │
├─────────────────────────────────┤
│                                 │
│    Page Title                   │
│    - Trophy icon                │
│    - Subtitle                   │
│                                 │
├─────────────────────────────────┤
│                                 │
│    Leaderboard Table            │
│    ┌──────────────────────────┐│
│    │ Rank | Player | Stats    ││
│    ├──────────────────────────┤│
│    │ 🥇  | User1  | ...       ││
│    │ 🥈  | User2  | ...       ││
│    │ 🥉  | User3  | ...       ││
│    │ #4  | User4  | ...       ││
│    └──────────────────────────┘│
│                                 │
└─────────────────────────────────┘
```

---

## 🔄 State Management

### Global State (AuthContext)
- user (object or null)
- token (string or null)
- isAuthenticated (boolean)
- login(userData, token)
- logout()

### Local State (per component)
- Form inputs
- Game state
- Loading states
- Error messages
- UI toggles

---

## 🎯 Navigation Rules

### Public Routes (No Auth Required)
- `/` - Landing
- `/login` - Login
- `/signup` - Signup

### Protected Routes (Auth Required)
- `/dashboard` - Dashboard
- `/games` - Redirects to Dashboard
- `/games/rps` - Rock Paper Scissors
- `/games/memory` - Memory Cards
- `/games/guess` - Guess The Number
- `/leaderboard` - Leaderboard
- `/feedback` - Feedback

### Redirect Logic
- Not authenticated + protected route → `/login`
- Authenticated + landing page → `/dashboard`

---

## 🎮 User Actions Summary

**Can Do Without Login:**
- View landing page
- Read about games
- Access signup
- Access login

**Can Do After Login:**
- Play all games
- View personal stats
- Check leaderboard
- Submit feedback
- Track progress
- Compete with others

---

**This is the complete user journey through ArcadeHub! 🎮**
