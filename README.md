# Naduvan Industry — MERN E-commerce

A natural skincare e-commerce starter based on the requested UI.

## Features
- React + Vite frontend
- Express + MongoDB backend
- Admin-only JWT authentication
- Admin dashboard to view customer orders
- Customer checkout without customer login
- Product listing and product detail pages
- Cart stored in browser localStorage
- Order creation with customer name, phone, email, address and items
- Responsive green/cream skincare UI
- No star ratings on product cards
- No discount badges on product cards
- Gallery in navbar
- "Just Landed" removed

## 1. Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Set `MONGO_URI` in `.env`.

Default admin seed:
- Email: admin@naduvan.com
- Password: Admin@123

The admin is automatically created on backend startup if it does not exist.

Backend runs on `http://localhost:5000`.

## 2. Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## 3. Admin

Open:

`http://localhost:5173/admin/login`

Login with the default admin credentials above.

Admin dashboard shows:
- Total orders
- Total customers/orders
- Total sales
- Recent orders
- Full customer/order details
- Order status update

## MongoDB Atlas

Create a MongoDB Atlas database and put the connection string in:

`backend/.env`

Example:

```env
PORT=5000
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/naduvan
JWT_SECRET=change-this-secret
ADMIN_EMAIL=admin@naduvan.com
ADMIN_PASSWORD=Admin@123
```

## Product media & pricing update
- Products support up to 4 image URLs (front/back/side/detail).
- Each size/ML/L variant supports buying price, original/MRP price and offer/selling price.
- Shop shows an image slider, size dropdown, struck original price and offer price.
- Admin product cards show Buying / Selling / Profit for the first variant.
- Add a product Video URL in Admin Products; enabled product videos automatically appear in Gallery.
- Copy `backend/.env.example` to `backend/.env` and set your MongoDB/JWT values before running the backend.
