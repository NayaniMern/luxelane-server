﻿# luxelane-server

 🧠 Luxelane – E-Commerce Admin CMS (Backend)
This is the backend server of Luxelane, a full-stack admin and content management system for a fictional fashion e-commerce platform. It provides secure JWT-based authentication and RESTful APIs to manage products, blogs, enquiries, and user data.

🔧 Tech Stack
Node.js

Express.js

MongoDB (MongoDB Atlas)

Mongoose ODM

JWT (JSON Web Tokens)

CORS

Body Parser

dotenv

💡 Features
✅ Admin login with JWT authentication
✅ Protected routes using token middleware
✅ CRUD operations for:

Men / Women / Kids fashion products

Footwear & Accessories

Blogs, Enquiries, and User Signups
✅ Modular architecture (routes, models, middleware)
✅ MongoDB schema validation via Mongoose
✅ Cloud-ready setup using environment variables

📁 Project Structure
📦 luxelane-backend
┣ 📂model/ → Schemas for Products, Blogs, Enquiries, Users
┣ 📂routes/ → Route definitions by module
┣ 📂middleware/ → Token validation logic
┣ 📜index.js → Main server entry point
┣ 📜db.js → MongoDB connection config
┗ 📜.env → Secret keys and DB URI (excluded in public)

🚀 Getting Started
bash
Copy
Edit
# Clone the repository
git clone https://github.com/NayaniMern/luxelane-server/

# Install dependencies
npm install

# Start the server
node index.js
📌 Ensure MongoDB is running (local or cloud via MongoDB Atlas).
Add your MongoDB URI and JWT secret in a .env file.

📌 Use Cases
🔐 Admin backend for fashion e-commerce system
🛒 Secure content management for multiple product categories
📝 RESTful APIs for blogs, enquiries, and user tracking
📚 Learning resource for building scalable Node.js + MongoDB apps

🎓 Purpose
To design and develop a backend infrastructure for a full-stack admin CMS that allows secure data operations, route protection, and modular control of e-commerce content and user interaction.

🏁 Outcome
Successfully created a scalable API server with secure authentication and structured data modeling. Enabled real-time CRUD operations, route protection, and admin-side access management for a complete e-commerce CMS.

📬 Contact
💼 LinkedIn: linkedin.com/in/sivatri-nayani
🐙 GitHub: github.com/NayaniMern
✉️ Email: sivatrinayani.v@gmail.com

📜 License
This project is open-source and intended for educational and portfolio showcase purposes only.


