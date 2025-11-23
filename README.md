Login Security Enhancer (Node.js + Express + MongoDB)

A secure authentication system built with Node.js and MongoDB that protects against:

 Brute-force attacks
 Excessive login attempts
 Account lockouts
Weak security practices

Features include hashed passwords, login attempt tracking, IP-based rate limiting, and JWT authentication (extendable).

 Features

Secure Registration & Login

argon2id Password Hashing

Rate Limiting (IP-based)

Brute-Force Attack Prevention

Account Lockout Logic

Helmet Security Headers

CORS Enabled

Cookie Parser Support

MongoDB User Tracking

Static Frontend Login Page

Tech Stack

Folder Structure
login-security-v2
│── public/
│   └── login.html
│── src/
│   ├── config/db.js
│   ├── models/User.js
│   ├── middleware/
│   │   ├── bruteForce.js
│   │   └── rateLimiter.js
│   ├── routes/auth.js
│   └── utils/logger.js
│── server.js
│── package.json
│── .env.example
│── README.md

📸 Screenshots (Add Your Own)

Upload screenshots in a /screenshots folder and link them here.

 Server Running
[Server running on port 4000]
[MongoDB connected]

MongoDB User Document

Shows passwordHash, failed attempts, lockUntil timestamp, etc.

Environment Variables

Create a .env file:

PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/login-security-v2
JWT_SECRET=supersecretkey123

 Account Lockout Logic
Failed Attempts	Action
1–4	Normal login errors
5	Account locked for 2 minutes
6+	Each failed login doubles the lock time
After lock time	User can retry

This protects against brute-force attacks.

🔗API Endpoints
Register
POST /api/auth/register


Body:

{
  "email": "test@example.com",
  "password": "TestPass123"
}

Login
POST /api/auth/login


Body:

{
  "email": "test@example.com",
  "password": "TestPass123"
}

 Frontend Login Page

Static login page served at:

http://localhost:4000/


Located in:

public/login.html

 Running the Project Locally
1. Install dependencies
npm install

2️. Start MongoDB
Make sure your local MongoDB server is running.

3️. Start the server
npm run dev


Server runs at:

http://localhost:4000

 Future Enhancements

Add JWT Access + Refresh Tokens

Add Email Verification

Add Forgot Password (OTP / Email Reset)

Add Admin Dashboard for User Management

Add Redis-based rate limiting

Deploy backend on Render or Railway

Build full frontend with dashboards

 Author

Deeya Srivastava
🔗 GitHub: https://github.com/Deeyasrivastava
