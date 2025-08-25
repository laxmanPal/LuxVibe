# LuxVibe – Fashion eCommerce Platform  

LuxVibe is a **full-stack fashion eCommerce platform** built with the **MERN stack**.  
It delivers a modern shopping experience for clothing, footwear, bags, jewelry, and more — with a dedicated admin panel to manage products, users, and orders.

![LuxVibe Home Page](https://github.com/user-attachments/assets/67f7e047-acab-4c46-8cfa-0701327515bb)

## Live Demo

[LuxVibe Store](https://luxvibe.netlify.app/)


#### Demo Admin Access
```bash
email : demo.admin@gmail.com
password : demoAdminPass
```

## Table of Contents  

- [Features](#features)  
  - [User Features](#user-features)  
  - [Admin Features](#admin-features)  
- [Tech Stack](#️tech-stack)  
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites) 
- [Installation](#installation)  
  - [Backend Setup](#backend-setup)  
  - [Frontend Setup](#frontend-setup)  
- [Screenshots](#screenshots)  
- [What I Learned](#what-i-learned)  
- [Roadmap / Future Improvements](#roadmap--future-improvements)  
- [Author](#author)  

---

## Features  

### User Features  
- Browse products by categories (Clothes, Shoes, Bags, Jewelry, Glasses, etc.)  
- View Product details  
- Add to Cart & Wishlist (one persistent cart per user) 
- Address management & checkout flow
- Order tracking with statuses (Pending → Delivered)
- Place orders with shipping details  
- Secure Payment with Stripe (test mode, INR supported)
- Secure authentication (Register, Login, Logout) with JWT & HTTP-only cookies  

### Admin Features  
- Dashboard with statistics, recent orders & top products  
- Manage products, categories, and users (CRUD) 
- Order management: update status (Confirmed, Processing, Shipped, Delivered, Cancelled)
- Order Creation by Stripe webhook
- Image upload & management via Cloudinary

---

## Tech Stack  
*Frontend*  
- [React.js](https://react.dev/) + [Vite](https://vite.dev/)  
- [Tailwind CSS](https://tailwindcss.com/) + [Material UI](https://mui.com/) + [React Icons](https://react-icons.github.io/react-icons/) 
- [React Router (with protected routes) ](https://reactrouter.com/) 

*Backend*  
- [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)  
- [Cloudinary (image uploads)](https://cloudinary.com/)
- [Stripe (payment integration)](https://stripe.com/)

*Authentication*  
- [JWT (stored in HTTP-only cookies)](https://www.jwt.io/)  

---

## Project Structure
```
LuxVibe/                        → Root directory
│
├── backend/                    → Express.js + MongoDB (API + server logic)
│   ├── config/                 → Cloudinary config
│   ├── controllers/            → Business logic (request handlers)
│   ├── middlewares/            → Auth & multer middlewares
│   ├── models/                 → Mongoose schemas
│   ├── routes/                 → API routes
│   ├── utils/                  → Helper functions
│   ├── seed.js                 → Database seeding script
│   └── server.js               → Backend entry point
│
├── frontend/                   → React + Vite (client-side app)
│   ├── public/                 → Static assets
│   ├── src/
│   │   ├── assets/             → Images, icons, fonts
│   │   ├── components/         → Reusable UI components
│   │   │   ├── admin/          → Admin components
│   │   │   ├── client/         → Client components
│   │   │   ├── routes/         → Route-based components
│   │   │   └── UI/             → Generic UI elements
│   │   ├── config/             → Currency Formatter helper function
│   │   ├── layouts/            → Layout wrappers (Admin, Auth, Client)
│   │   ├── pages/              → Application pages
│   │   │   ├── admin/          → Admin pages
│   │   │   ├── auth/           → Auth pages
│   │   │   ├── client/         → Client pages
│   │   │   └── NotFound.jsx    → 404 Page
│   │   ├── payments/           → Payment integration
│   │   ├── store/              → State management
│   │   ├── utils/              → Helper utilities
│   │   ├── App.jsx             → Root component
│   │   ├── App.css             → App-level styles
│   │   ├── main.jsx            → Frontend entry point
│   │   └── index.css           → Global styles
│   └── vite.config.js          → Vite configuration
│
└── README.md                   → Project documentation



```
## Prerequisites
- Node.js: [https://nodejs.org/](https://nodejs.org/)
- MongoDB: [https://www.mongodb.com/](https://www.mongodb.com/)
- Stripe Account: [https://stripe.com/](https://stripe.com/)
- Cloudinary Acount: [https://cloudinary.com/](https://cloudinary.com/)

# Installation

#### Make sure you follow step-by-step instructions for getting the project up and running locally.

    
   ### Step 1. Clone or Download the repository

```bash
  git clone https://github.com/laxmanPal/LuxVibe.git
  cd LuxVibe
```
  ### Step 2. Backend Setup

```bash
  cd backend
  npm install
```

Create a `.env` file inside `backend/` and Set your environment variables with:
```bash
MONGO_URI
JWT_SECRET_KEY
ACCESS_TOKEN_SECRET_KEY
REFRESH_TOKEN_SECRET_KEY
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_SECRET_KEY
CLIENT_URL
NODE_ENV
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
```
Seed Database
- Inside backend you will find seed.js file it contains some products and categories to seed your MongoDB

  ```bash
  node seed.js
  ```

Run the backend:
```bash
npm run dev
```
### Step 3. Frontend Setup
Open a new terminal in the project root:
```bash
cd frontend
npm install
```
Create a `.env` file inside `frontend/` and Set your environment variables with:
```bash
VITE_API_URL
VITE_STRIPE_PUBLIC_KEY
```
Run the frontend:
```bash
npm run dev
```
## Screenshots
<img width="1920" height="1080" alt="Shop" src="https://github.com/user-attachments/assets/4809a1b6-5d61-409c-9367-bcfd5f4a2a99" />
<img width="1920" height="1080" alt="Admin Dashboard" src="https://github.com/user-attachments/assets/3d37142c-84f0-44f2-b321-6e38781512a0" />
<img width="1920" height="1080" alt="Register" src="https://github.com/user-attachments/assets/05a52988-990e-4fb7-8cd1-d1bba294ddb4" />
<img width="1920" height="1080" alt="Product Details" src="https://github.com/user-attachments/assets/4268d92a-05e6-4929-a70f-452114e1643e" />

## What I Learned
- Builing a full production-grade eCommerce system from scratch (not just a tutorial clone).
- Using HTTP-only cookies for more secure JWT authentication.
- Structuring a scalable MERN application with both client and admin layouts.
- Handling secure authentication & route protection in a full-stack app.
- Integrating payment gateway (Stripe).
- Managing real-world eCommerce logic ( order status, cart management).
- Working with webhooks and event-driven backend flows.
- Creating a production-ready API with error handling & validations.
- Working with React Router , Context API , Tailwind CSS , Material UI.

## Roadmap / Future Improvements
- Improve mobile responsiveness
- Add product reviews & ratings
- Advanced order tracking
- Email/SMS notifications
- Multiple payment gateways (PayPal, Razorpay, COD).
- Search 
- Filter by categories
- Pagination
- and many more.

## Author
Design & Developed by [Laxman Pal](https://laxmanpal.netlify.app/).

