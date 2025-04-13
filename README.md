# 🎓 University Management System – Backend API

A full-featured backend system for managing university operations built with **Node.js**, **Express**, and **MongoDB**.  
It supports authentication, course management, online exams, QR attendance, GPA calculation, payments, and more.

---

## 🚀 Features

- ✅ User Roles (Student, Professor, TA, Staff, Guest)
- 🛡️ Authentication with JWT (register/login/reset password)
- 📟 Course & Material Management
- 📚 Post & Announcement System
- 📝 Exam Creation and Auto-Grading
- 📥 Upload Files (PDFs, Videos, etc.)
- 💳 Payment Integration (Stripe)
- 🎓 GPA Calculator
- 📸 QR Code Attendance System
- 📦 REST API with Swagger Documentation
- ✅ Unit & Integration Tests (Jest + Supertest)

---

## 🛠️ Tech Stack

| Layer        | Technology                   |
|--------------|-------------------------------|
| **Backend**  | Node.js, Express              |
| **Database** | MongoDB + Mongoose            |
| **Uploads**  | Multer + Cloudinary           |
| **Auth**     | JWT + Bcrypt + Cookies        |
| **Payments** | Stripe API                    |
| **Docs**     | Swagger (OpenAPI Spec)        |
| **Testing**  | Jest + Supertest              |

---

## 📁 Project Structure

```
project-root/
│
├── src/
│   ├── config/         # DB config & environment setup
│   ├── controllers/    # Logic for handling routes
│   ├── models/         # Mongoose schemas for each entity (User, Course, Exam, etc.)
│   ├── routes/         # All API route definitions
│   ├── middleware/     # Middlewares (auth, error handling, file uploads, etc.)
│   ├── utils/          # Helper functions (email, QR code, GPA calc, etc.)
│   └── app.js          # Main app entry point
│
├── tests/              # Unit & integration tests
├── swagger.yaml        # API Documentation (Swagger/OpenAPI Spec)
├── .env                # Environment variables (NOT committed)
├── .env.example        # Example environment file
├── package.json        # Project metadata & scripts
└── README.md           # This file
```

---

## 📦 Installation & Setup

Follow these steps to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/university-management-system.git
cd university-management-system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment variables

```bash
cp .env.example .env
```

Fill in the values in `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

### 4. Run the server

```bash
# With nodemon (recommended for development)
npm run dev

# Or normal node
npm start
```

Server should be running at: `http://localhost:5000`

---

## 📄 API Documentation

Once server is running, open your browser:

👉 `http://localhost:5000/api-docs`  

Explore all endpoints using Swagger UI.

---

## 🧪 Running Tests

```bash
npm test
```

---

## ✈️ Deployment

Ready for deployment on:

- **Render**
- **Railway**
- **Heroku**
- **Vercel (serverless API)**
- **AWS EC2 + MongoDB Atlas**

---

## 🧠 Future Features

- Admin dashboard for managing users & content
- Live chat between students and professors
- Mobile app support with shared API
- Real-time push notifications (WebSockets)

---

## 🤝 Contributing

Got ideas or found a bug? Feel free to open issues or submit pull requests.

---

## 📧 Author

Developed by **Mohamed Elsery**  
GitHub: [@mohamednnj](https://github.com/mohamednnj)

