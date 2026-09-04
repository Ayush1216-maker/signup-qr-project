# QR Signup Application

A full-stack signup application that allows users to create an account through a responsive web form or by scanning a QR code with their mobile device.

The application uses React for the frontend, Node.js and Express for the backend, and MongoDB Atlas for storing user data securely. The application is deployed using Vercel and Render.

## 🚀 Live Demo

**Frontend:**  
https://YOUR-VERCEL-URL.vercel.app

**Backend API:**  
https://signup-qr-project.onrender.com

## 📌 Features

- User registration through a web form
- QR code-based access to the signup page
- Responsive design for desktop and mobile devices
- REST API for user registration
- MongoDB Atlas database integration
- Password hashing using bcrypt
- Duplicate email detection
- Form validation
- CORS-enabled backend
- Environment variables for configuration
- Cloud deployment
- API testing using Postman

## 🛠️ Tech Stack

### Frontend
- React
- JavaScript
- Vite
- CSS
- qrcode.react

### Backend
- Node.js
- Express.js
- Mongoose
- bcryptjs
- CORS
- dotenv

### Database
- MongoDB Atlas

### Deployment
- Vercel — Frontend
- Render — Backend
- GitHub — Source Code

## 🏗️ Project Architecture

```text
                  QR Code
                     |
                     ↓
              React Frontend
                 (Vercel)
                     |
                     | POST /api/signup
                     ↓
             Express REST API
                 (Render)
                     |
                     ↓
              MongoDB Atlas
                  Database
