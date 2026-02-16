# echo_aClone

# Mini Social (Twitter-ish Clone)

This is a small full-stack social media app I built using the MERN stack.  
The goal wasn’t to build the next Twitter — it was to understand how everything actually connects in a real app:

Auth → Users → Followers → Feed → Posts → Permissions.

Most of the focus went into backend logic, authentication flow, and route protection rather than fancy UI.

---

## What This App Does

### Authentication
- Signup with OTP email verification
- Login with JWT
- Logout
- Forgot password (OTP-based reset)
- Reset password
- Delete account (with password + confirmation text)

### Users
- Unique username + email
- View all users
- Follow other users
- See follower / following counts
- Visit profile pages

### Posts
- Create posts
- View feed (posts from users you follow)
- Like / Unlike posts
- Edit your own posts
- Delete your own posts
- Timestamps + edited flag

---

## Tech Stack

**Frontend**
- React
- React Router
- Axios
- Context API (for auth state)

**Backend**
- Node.js
- Express
- MongoDB
- Mongoose
- JWT authentication
- SendGrid for OTP emails
- Express-session (optional session handling)

---

## Project Structure (Backend)

server/
│
├── models/
│   ├── User.js
│   └── Post.js
│
├── routes/
│   ├── auth.js
│   ├── feed.js
│   └── people.js
│
├── middleware/
│   └── requireAuth.js
│
├── utils/
│   └── sendOtp.js
│
└── server.js

---

## Database Models

### User
- username (unique)
- email (unique)
- passwordHash
- followers [UserId]
- following [UserId]
- otp
- otpExpiry
- otpVerified

### Post
- authorId
- content
- likes [UserId]
- edited (boolean)
- timestamps

---

## API Routes

All routes are prefixed with:

/api

---

### Auth Routes

POST /api/auth/signup  
POST /api/auth/verify-otp  
POST /api/auth/login  
POST /api/auth/forgot  
POST /api/auth/forgot/verify-otp  
POST /api/auth/reset-password  
POST /api/auth/logout  
POST /api/auth/delete-account  

---

### Feed Routes

GET /api/feed  
POST /api/feed/create  
POST /api/feed/:id/like  
PUT /api/feed/posts/:id  
DELETE /api/feed/posts/:id  

---

### People Routes

GET /api/people  
GET /api/people/:id  
POST /api/people/:id/follow  

---

## How Authentication Works

Protected routes use a custom middleware called `requireAuth`.

It:
1. Reads the Bearer token
2. Verifies it using JWT
3. Fetches the user from MongoDB
4. Attaches the user to `req.currentUser`

If anything fails → 401 Unauthorized.

---

## Environment Variables

Create a `.env` file inside the backend folder:

MONGO_URI=your_mongodb_uri  
JWT_SECRET=your_secret  
SESSION_SECRET=your_session_secret  
CLIENT_URL=http://localhost:5173  
SENDGRID_API_KEY=your_key  
FROM_EMAIL=verified_sender_email  

---

## Running The Project

### Backend

cd server  
npm install  
npm run dev  

Runs on:
http://localhost:3000  

---

### Frontend

cd client  
npm install  
npm run dev  

Runs on:
http://localhost:5173  

---

## Why I Built This

I wanted to understand how a real social app works under the hood:

- How JWT auth actually connects frontend and backend
- How to manage relationships like followers
- How to protect routes properly
- How to control permissions (edit/delete only your posts)
- How to structure routes cleanly

This project is more about flow and system thinking than UI design.

---

## Possible Improvements

- Comments system
- Profile pictures
- Feed pagination
- Real-time notifications
- Rate limiting on OTP endpoints
- Cleaner UI design
- Admin moderation tools

---

That’s it.

It’s a learning project, but it covers the core mechanics of a real social platform.
