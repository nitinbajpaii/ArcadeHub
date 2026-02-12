# 📡 ArcadeHub - API Documentation

## Base URL
```
http://localhost:5000/api
```

---

## 🔐 Authentication Endpoints

### 1. Signup
Create a new user account.

**Endpoint:** `POST /auth/signup`

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "username": "player123",
  "email": "player@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1234567890",
    "username": "player123",
    "email": "player@example.com",
    "stats": {
      "totalGames": 0,
      "totalWins": 0,
      "bestStreak": 0
    }
  }
}
```

**Error Responses:**
- `400` - Email already exists
- `400` - Username already taken
- `400` - All fields required
- `500` - Server error

---

### 2. Login
Authenticate existing user.

**Endpoint:** `POST /auth/login`

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "email": "player@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1234567890",
    "username": "player123",
    "email": "player@example.com",
    "stats": {
      "totalGames": 5,
      "totalWins": 3,
      "bestStreak": 2
    }
  }
}
```

**Error Responses:**
- `400` - Invalid credentials
- `400` - All fields required
- `500` - Server error

---

## 🎮 Game Endpoints

### 3. Save Score
Save game result and update user stats.

**Endpoint:** `POST /games/save-score`

**Authentication:** Required (JWT Token)

**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Request Body (Rock Paper Scissors):**
```json
{
  "game": "rps",
  "score": 50,
  "details": {
    "wins": 5,
    "losses": 3,
    "draws": 2,
    "won": true,
    "streak": 3,
    "mode": 10
  }
}
```

**Request Body (Memory Cards):**
```json
{
  "game": "memory",
  "score": 850,
  "details": {
    "moves": 15,
    "time": 45,
    "accuracy": 87,
    "won": true
  }
}
```

**Request Body (Guess The Number):**
```json
{
  "game": "guess",
  "score": 700,
  "details": {
    "attempts": 6,
    "won": true,
    "targetNumber": 42
  }
}
```

**Success Response (200):**
```json
{
  "success": true,
  "score": {
    "id": "1234567890",
    "userId": "user123",
    "game": "rps",
    "score": 50,
    "details": { ... },
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `401` - Access denied (no token)
- `401` - Invalid token
- `500` - Server error

---

### 4. Get Leaderboard
Fetch global player rankings.

**Endpoint:** `GET /games/leaderboard`

**Authentication:** Required (JWT Token)

**Headers:**
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response (200):**
```json
[
  {
    "username": "player1",
    "totalWins": 25,
    "totalGames": 30,
    "bestStreak": 8,
    "totalScore": 2500
  },
  {
    "username": "player2",
    "totalWins": 20,
    "totalGames": 28,
    "bestStreak": 5,
    "totalScore": 2100
  }
]
```

**Error Responses:**
- `401` - Access denied
- `401` - Invalid token
- `500` - Server error

---

### 5. Get My Stats
Fetch current user's statistics and game history.

**Endpoint:** `GET /games/my-stats`

**Authentication:** Required (JWT Token)

**Headers:**
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response (200):**
```json
{
  "user": {
    "username": "player123",
    "stats": {
      "totalGames": 15,
      "totalWins": 10,
      "bestStreak": 5
    }
  },
  "gameStats": {
    "rps": [
      {
        "id": "123",
        "game": "rps",
        "score": 50,
        "details": { ... },
        "timestamp": "2024-01-15T10:30:00.000Z"
      }
    ],
    "memory": [ ... ],
    "guess": [ ... ]
  },
  "recentGames": [
    {
      "id": "123",
      "userId": "user123",
      "game": "rps",
      "score": 50,
      "details": {
        "won": true,
        "streak": 3
      },
      "timestamp": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `401` - Access denied
- `401` - Invalid token
- `404` - User not found
- `500` - Server error

---

## 💡 Feedback Endpoints

### 6. Submit Feedback
Submit user feedback, suggestions, or bug reports.

**Endpoint:** `POST /feedback/submit`

**Authentication:** Not Required (but can be used)

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "email": "player@example.com",
  "category": "improve",
  "game": "rps",
  "message": "Add multiplayer mode!",
  "rating": 5
}
```

**Field Options:**

**category:**
- `"improve"` - Improve existing game
- `"new-game"` - Suggest new game
- `"bug"` - Report a bug
- `"general"` - General feedback

**game:** (optional, shown when category is "improve" or "bug")
- `"rps"` - Rock Paper Scissors
- `"memory"` - Memory Cards
- `"guess"` - Guess The Number
- `"general"` - Not game-specific

**rating:** (optional)
- Integer from 1 to 5

**Success Response (200):**
```json
{
  "success": true,
  "message": "Feedback submitted successfully!"
}
```

**Error Responses:**
- `400` - Category and message required
- `500` - Server error

---

## 🔒 Authentication Flow

### How JWT Works in This API

1. **Signup/Login:**
   - User provides credentials
   - Server validates and creates JWT token
   - Token returned to client

2. **Storing Token:**
   - Client stores token in localStorage
   - Token included in subsequent requests

3. **Protected Requests:**
   - Client sends token in Authorization header
   - Server verifies token with middleware
   - If valid, request proceeds
   - If invalid, returns 401 error

4. **Token Format:**
   ```
   Authorization: Bearer <token>
   ```

---

## 📊 Data Models

### User Model
```javascript
{
  id: String,              // Unique identifier
  username: String,        // Unique username
  email: String,          // Unique email
  password: String,       // Hashed password
  createdAt: String,      // ISO timestamp
  stats: {
    totalGames: Number,   // Total games played
    totalWins: Number,    // Total wins
    bestStreak: Number    // Best win streak
  }
}
```

### Score Model
```javascript
{
  id: String,              // Unique identifier
  userId: String,          // Reference to user
  game: String,           // Game type (rps/memory/guess)
  score: Number,          // Calculated score
  details: Object,        // Game-specific details
  timestamp: String       // ISO timestamp
}
```

### Feedback Model
```javascript
{
  id: String,              // Unique identifier
  email: String,          // User email (or "anonymous")
  category: String,       // Feedback category
  game: String,           // Related game (or "general")
  message: String,        // Feedback message
  rating: Number,         // Star rating (0-5)
  timestamp: String       // ISO timestamp
}
```

---

## 🧪 Testing with cURL

### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"test123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Save Score (with token)
```bash
curl -X POST http://localhost:5000/api/games/save-score \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"game":"rps","score":50,"details":{"won":true,"streak":3}}'
```

### Get Leaderboard
```bash
curl -X GET http://localhost:5000/api/games/leaderboard \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Submit Feedback
```bash
curl -X POST http://localhost:5000/api/feedback/submit \
  -H "Content-Type: application/json" \
  -d '{"category":"general","message":"Great game!","rating":5}'
```

---

## 🧪 Testing with Postman

1. **Import Collection:**
   - Create new collection "ArcadeHub API"
   - Add base URL variable: `{{baseUrl}}` = `http://localhost:5000/api`

2. **Setup Environment:**
   - Create variable `token` for storing JWT
   - Use `{{token}}` in Authorization headers

3. **Test Sequence:**
   1. Signup → Save token
   2. Login → Update token
   3. Save Score → Use token
   4. Get Leaderboard → Use token
   5. Get My Stats → Use token
   6. Submit Feedback → No token needed

---

## ⚠️ Error Handling

All endpoints return consistent error format:

```json
{
  "error": "Error message description"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request (validation error)
- `401` - Unauthorized (auth error)
- `404` - Not Found
- `500` - Internal Server Error

---

## 🔧 Rate Limiting

Currently: No rate limiting implemented

**Future Consideration:**
- Implement rate limiting for production
- Suggested: 100 requests per 15 minutes per IP

---

## 📝 Notes

- All timestamps are in ISO 8601 format
- Passwords are hashed with bcrypt (10 rounds)
- JWT tokens don't expire (consider adding expiration in production)
- File-based storage (consider database for production)
- CORS enabled for all origins (restrict in production)

---

**API Version:** 1.0.0
**Last Updated:** 2024
**Status:** ✅ Fully Functional
