# 🛒 MERN E-Commerce Platform

A full-stack e-commerce web application built using the MERN stack. The application provides user authentication, product browsing, filtering, cart management, address management, image uploads, and an admin dashboard for product management.

## 🚀 Features

### 👤 User Features

- User registration and login
- JWT-based authentication
- Browse products
- Product filtering
- Product details
- Add products to cart
- Update cart quantity
- Remove products from cart
- Manage delivery addresses
- Responsive user interface

### 🛠️ Admin Features

- Admin authentication
- Admin dashboard
- Add new products
- Edit existing products
- Delete products
- Upload product images
- Product management

### ⚙️ Backend Features

- RESTful API architecture
- JWT authentication
- Protected API routes
- MongoDB database
- Mongoose ODM
- Cloudinary image storage
- Express.js backend
- CORS configuration

## 🧰 Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios
- Radix UI

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Cloudinary
- Multer

## 🏗️ Application Architecture

```text
                    ┌─────────────────────┐
                    │     React Client    │
                    │  Vite + Tailwind    │
                    │    Redux Toolkit    │
                    └──────────┬──────────┘
                               │
                             Axios
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Express.js API    │
                    │      Node.js        │
                    └───────┬─────┬───────┘
                            │     │
                 ┌──────────┘     └──────────┐
                 ▼                           ▼
        ┌─────────────────┐         ┌─────────────────┐
        │     MongoDB     │         │    Cloudinary   │
        │    Mongoose     │         │  Image Storage  │
        └─────────────────┘         └─────────────────┘
```

## 📁 Project Structure

```text
mern-ecommerce/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── assets/
│   │   └── ...
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── helpers/
│   └── ...
│
├── .gitignore
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/shwetanknigam2/mern-ecommerce.git
cd mern-ecommerce
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Install Backend Dependencies

Open another terminal and run:

```bash
cd server
npm install
```

## 🔐 Environment Variables

Create a `.env` file inside the `server` directory.

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> Never commit your actual `.env` file or API credentials to GitHub.

## ▶️ Running the Application

### Start the Backend

Inside the `server` directory:

```bash
npm run dev
```

### Start the Frontend

Inside the `client` directory:

```bash
npm run dev
```

The frontend and backend run separately during development.

## 🔄 Application Flow

```text
User
 │
 ▼
React Frontend
 │
 │ Axios Requests
 ▼
Express REST API
 │
 ├──────────────► JWT Authentication
 │
 ├──────────────► MongoDB
 │
 └──────────────► Cloudinary
                       │
                       ▼
                  Product Images
```

## 🗄️ Main Data Models

The application uses MongoDB with Mongoose for data modeling.

### User

```text
User
├── name
├── email
├── password
└── role
```

### Product

```text
Product
├── title
├── description
├── category
├── brand
├── price
├── salePrice
└── image
```

### Cart

```text
Cart
├── userId
└── products
```

### Address

```text
Address
├── userId
├── address
├── city
├── pincode
└── phone
```

## 🔑 Authentication

Authentication is implemented using JSON Web Tokens (JWT).

JWT-based authentication is used to protect user-specific and admin-specific functionality.

## ☁️ Image Uploads

Product images are uploaded through the backend and stored using Cloudinary.

```text
Frontend
   │
   ▼
Image Upload
   │
   ▼
Express API
   │
   ▼
Cloudinary
   │
   ▼
Image URL
   │
   ▼
MongoDB
```



## 🛡️ Security

- JWT-based authentication
- Protected backend routes
- Role-based access for admin functionality
- Environment variables for sensitive credentials
- CORS configuration
- Passwords are not stored as plain text


