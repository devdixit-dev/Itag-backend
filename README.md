# 🧠 ITAG Backend API

A robust and scalable **backend API** built with **Node.js** and **Express**, designed to manage authentication, users, jobs, reports, and media services.  
This project provides a well-structured MVC architecture with secure middleware, efficient database integration, and reusable service modules.

---

## 🚀 Overview

**ITAG Backend** serves as the core API for the ITAG ecosystem — handling all server-side logic, authentication, admin management, and CRUD operations for users, jobs, and multimedia content.

It follows **clean architecture principles** and is production-ready for deployment with Docker, PM2, or cloud environments like AWS, Vercel, or Render.

---

## 🧩 Features

- **User Authentication** — JWT-based login and registration system  
- **Admin Management** — Admin-level access for sensitive actions  
- **Database Integration** — MongoDB-based models with schema validation  
- **File Uploads** — Multer-based file handling for images and videos  
- **Email Service** — Integrated mailing system for notifications  
- **Error Handling** — Centralized and structured error responses  
- **Security** — Auth middleware, input sanitization, and secure headers  
- **Extensible Architecture** — Clean separation of concerns with controllers, models, and routes  

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Runtime | Node.js (v18+) |
| Framework | Express.js |
| Database | MongoDB (Mongoose ODM) |
| File Uploads | Multer |
| Authentication | JWT |
| Mailing | Nodemailer |
| Middleware | Custom Auth + Express Middleware |
| Services | Mailer Service, Multer Service |

---

## 📁 Project Structure

```
Itag-backend-main/
├── app.js                  # Main entry point
├── config/
│   └── db.js               # MongoDB connection
├── controllers/
│   ├── admin.controller.js
│   ├── auth.controller.js
│   └── user.controller.js
├── middlewares/
│   └── AuthMiddleware.js   # JWT authentication middleware
├── models/
│   ├── client.model.js
│   ├── email.model.js
│   ├── guide.model.js
│   ├── job.model.js
│   ├── jobApp.model.js
│   ├── report.model.js
│   └── video.model.js
├── routes/
│   ├── admin.route.js
│   ├── auth.route.js
│   └── user.route.js
├── services/
│   ├── mailer.service.js
│   └── multer.service.js
├── images/
│   ├── logo.png
│   └── logo.svg
├── package.json
└── .gitignore
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/Itag-backend-main.git
cd Itag-backend-main
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Create `.env` File
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/itag
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_password
```

### 4️⃣ Start the Development Server
```bash
npm start
```
or for live-reload:
```bash
npm run dev
```

Server runs at:  
👉 **http://localhost:5000**

---

## 🔗 API Endpoints

### **Auth**
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login existing user |

### **Admin**
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/admin/users` | Get all users |
| DELETE | `/api/admin/user/:id` | Delete user |
| POST | `/api/admin/announce` | Send announcement email |

### **User**
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/user/profile` | Get user profile |
| PUT | `/api/user/update` | Update profile |
| GET | `/api/user/jobs` | Get available jobs |

### **Jobs**
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/jobs` | Get all jobs |
| POST | `/api/jobs/create` | Create new job |
| PUT | `/api/jobs/update/:id` | Update job |
| DELETE | `/api/jobs/delete/:id` | Delete job |

---

## 🧰 Scripts

| Command | Description |
|----------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with nodemon |
| `npm test` | Run tests (if configured) |
| `npm run lint` | Lint code for style issues |

---

## 🔒 Security & Best Practices

- Uses **JWT** for secure authentication  
- Protects routes with **AuthMiddleware**  
- Sanitizes user inputs to prevent XSS/SQL injection  
- Uses **Helmet.js** and **CORS** for secure HTTP headers  
- Environment variables managed via `.env`  

---

## 🧪 Testing

Run test suites (if available):
```bash
npm test
```

To test APIs manually, import the provided **Postman collection** or use any REST client like Thunder Client.

---

## 🚀 Deployment

1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Deploy MongoDB on Atlas or self-host
4. Use PM2 or Docker for runtime process management
5. Enable HTTPS with NGINX or Reverse Proxy

---

## 📬 Contact

**Author:** Dev Dixit  
**Email:** [your.email@example.com](mailto:your.email@example.com)  
**GitHub:** [https://github.com/yourusername](https://github.com/yourusername)

---

## 📝 License

This project is licensed under the **MIT License**.
