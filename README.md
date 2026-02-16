# Echo

**Echo** is a simple social media platform where users can connect, follow each other, and share short posts.  
It includes authentication, OTP verification, password reset, profiles, likes, and a personalized feed.

Built using the **MERN Stack** (MongoDB, Express, React, Node.js).

---

## 🚀 Features

### 🔐 Authentication
- Signup with email, username, and password
- Email OTP verification (via SendGrid)
- Secure login with JWT
- Forgot password (OTP-based reset)
- Logout functionality
- Delete account (password confirmation required)

### 👥 Social
- View all users (People page)
- Follow other users
- View profiles
- Followers & following count

### 📰 Feed
- Create posts
- Edit your own posts
- Delete your own posts
- Like / Unlike posts
- View posts from users you follow

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- bcryptjs (Password hashing)
- SendGrid (Email OTP)

### Frontend
- React
- React Router
- Axios
- Context API (Authentication state)

---

## 📂 Project Structure

```
echo/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── feed.js
│   │   └── people.js
│   ├── middleware/
│   │   └── requireAuth.js
│   └── utils/
│       └── sendOtp.js
│
├── frontend/
│   ├── pages/
│   ├── components/
│   ├── context/
│   └── api/
```

---

## ⚙️ Environment Variables (Backend)

Create a `.env` file inside your backend folder:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key

SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=your_verified_sender_email
```

---

## ▶️ Running the Project

### 1️⃣ Backend

```
cd backend
npm install
npm run dev
```

Backend runs at:
```
http://localhost:3000
```

---

### Frontend

```
cd frontend
npm install
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---

## Authentication Flow

### Signup Flow
1. User registers
2. OTP is sent to email
3. User verifies OTP
4. JWT token is generated
5. User redirected to Feed

### Login Flow
1. Email + Password
2. JWT issued
3. Token stored in localStorage

---

## Feed Logic

- Feed displays posts only from users you follow
- Like button toggles like/unlike
- Users can edit or delete only their own posts

---

## Security

- Passwords hashed using bcrypt
- JWT expires after 7 days
- OTP expires in 5 minutes
- Protected routes secured with `requireAuth` middleware

---

## Future Improvements

- Comments system
- Image uploads
- Notifications
- Improved UI styling
- Dark mode
- Pagination
- Real-time updates (Socket.io)

---





This project is for learning purposes.
