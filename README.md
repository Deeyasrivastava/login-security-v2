# Login Security Enhancer (login-security-v2)

A secure Node.js authentication backend featuring **brute-force attack detection**, **account lockout**, **IP rate limiting**, **Argon2 password hashing**, and **structured logging**.  
Built for security-focused internship projects (Flipkart, etc.) and production-ready backend systems.

 Features

Password Security
- Secure password hashing with **Argon2id**
- Salted & memory-hard hashing

Brute-Force Protection
- Tracks failed login attempts
- Exponential account lockout after multiple failures
- `lockUntil` timestamp prevents further login attempts

Rate Limiting
- IP-based request limiting using `rate-limiter-flexible`
- Prevents automated attacks & spamming

 Database (MongoDB)
- Stores login attempts, lockout timestamps, and password hashes
- Mongoose schema with timestamps

Logging
- Centralized logging with **Winston**
- Each login attempt logged with timestamp

 Environment Config
- `.env` for secrets (JWT key, MongoDB URL, port)
- `.env.example` included for reference

--
