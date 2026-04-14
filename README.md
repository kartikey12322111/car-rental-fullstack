# 🚗 Car Rental Full Stack Web App

A modern and fully responsive **Car Rental Web Application** built using the **MERN Stack**. This platform allows users to browse cars, make bookings, and manage rentals, while admins can control inventory and bookings efficiently.

---

## 🌟 Live Demo

🔗 **LINK:** car-rental-fullstack-iota.vercel.app  

---

## 📌 Features

### 👤 User Side
- 🔐 User Authentication (Login / Register with JWT)
- 🚘 Browse available cars
- 📅 Book cars with date selection
- 📖 View booking history
- ❌ Cancel bookings

### 🛠️ Admin Panel
- ➕ Add new cars  
- ✏️ Edit car details  
- ❌ Delete cars  
- 📊 Manage all bookings  
- 👥 View registered users  

---

## 🧑‍💻 Tech Stack

### 🎨 Frontend
- React.js (Vite)  
- Tailwind CSS  
- Axios  
- React Router DOM  

### ⚙️ Backend
- Node.js  
- Express.js  
- JWT Authentication  
- REST API Architecture  

### 🗄️ Database
- MongoDB (Mongoose)  

### 🚀 Deployment
- Frontend: Vercel  
- Backend: Render  

---

## 📂 Folder Structure

car-rental/

├── client/                 # Frontend (React)  
│   ├── src/  
│   ├── components/  
│   ├── pages/  

├── server/                 # Backend (Node + Express)  
│   ├── controllers/  
│   ├── models/  
│   ├── routes/  
│   ├── middleware/  

├── .env  
├── package.json  
└── README.md  

---

## ⚙️ Installation & Setup

### 2️⃣ Backend Setup
cd server  
npm install  
npm run dev  

### 3️⃣ Frontend Setup
cd client  
npm install  
npm run dev  

--- 


## 🔌 API Endpoints (Sample)

| Method | Endpoint              | Description        |
|--------|----------------------|--------------------|
| POST   | /api/user/register   | Register user      |
| POST   | /api/user/login      | Login user         |
| GET    | /api/cars            | Get all cars       |
| POST   | /api/bookings        | Book a car         |
| GET    | /api/bookings/user   | User bookings      |

---

## 🚀 Future Improvements

- 💳 Payment Integration (Stripe / Razorpay)  
- ⭐ Reviews & Ratings  
- 📍 Location-based car search  
- 🔔 Notifications system  
- 📱 Mobile App (React Native)  

---

## 🐞 Common Issues & Fixes

- **CORS Error** → Enable CORS in backend  
- **API not connecting** → Check `.env` API base URL in frontend  
- **405 Method Not Allowed** → Verify correct HTTP method  

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository  
2. Create your feature branch  
3. Commit your changes  
4. Push to the branch  
5. Open a Pull Request  

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**KARTIKEY**  
GitHub: https://github.com/kartikey12322111/
LinkedIn: https://www.linkedin.com/in/kartikey-rao/  

---

## ⭐ Show Your Support

If you like this project, please ⭐ the repository!
