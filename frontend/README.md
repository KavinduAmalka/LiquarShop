# 🍷 LiquarShop - Premium Liquor E-commerce Platform

<div align="center">
  <img src="src/assets/logo.png" alt="LiquarShop Logo" width="200"/>
  
  **A modern, full-stack e-commerce platform for premium liquor delivery**
  
  [![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen.svg)](https://mongodb.com/)
  [![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC.svg)](https://tailwindcss.com/)
</div>

## 🌟 Features

### 🛒 Customer Features
- **Product Catalog**: Browse premium liquors across multiple categories (Whiskey, Vodka, Rum, Gin, Wine, Beer, Champagne, Cocktails & Mixers)
- **Smart Search & Filtering**: Find products by category, price, and popularity
- **Shopping Cart**: Add, remove, and update quantities with real-time price calculations
- **User Authentication**: Secure login/register with JWT tokens
- **Address Management**: Save and manage multiple delivery addresses
- **Order Management**: Track order history and current orders
- **Payment Integration**: Cash on Delivery (COD) and Stripe payment gateway
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 👨‍💼 Seller/Admin Features
- **Product Management**: Add, edit, and manage product inventory
- **Stock Control**: Toggle product availability and manage inventory
- **Order Processing**: View and manage customer orders
- **Image Upload**: Cloudinary integration for product images
- **Dashboard Analytics**: Track sales and product performance

### 🚀 Technical Features
- **Real-time Updates**: Live cart synchronization across devices
- **Secure Authentication**: JWT-based auth for users and sellers
- **Cloud Storage**: Cloudinary integration for image management
- **Payment Processing**: Stripe integration for secure payments
- **Responsive UI**: Mobile-first design with TailwindCSS
- **Error Handling**: Comprehensive error handling with user feedback
- **Loading States**: Smooth loading indicators for better UX

## 🛠️ Technology Stack

### Frontend
- **React 19.1** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **TailwindCSS 4.1** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Beautiful notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Image storage and optimization
- **Stripe** - Payment processing
- **CORS** - Cross-origin resource sharing

## 📂 Project Structure

```
LiquarShop/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── Categories.jsx
│   │   │   ├── BestSeller.jsx
│   │   │   ├── MainBanner.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ...
│   │   ├── pages/           # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── MyOrders.jsx
│   │   │   └── seller/      # Seller dashboard pages
│   │   ├── context/         # React Context for state
│   │   ├── assets/          # Images and static files
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
├── backend/                 # Node.js API server
│   ├── controllers/         # Business logic
│   │   ├── userController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   └── ...
│   ├── models/             # Database schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Address.js
│   ├── routes/             # API routes
│   ├── middlewares/        # Authentication middleware
│   ├── configs/            # Database and service configs
│   ├── package.json
│   └── server.js
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Cloudinary account
- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KavinduAmalka/LiquarShop.git
   cd LiquarShop
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the backend directory:
   ```env
   PORT=4000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   
   # Stripe Configuration
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

4. **Start Backend Server**
   ```bash
   npm start
   # or for development
   npm run server
   ```

5. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

6. **Start Frontend Development Server**
   ```bash
   npm run dev
   ```

7. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:4000`

## 📱 Usage

### For Customers
1. **Browse Products**: Visit the homepage to see featured categories and best sellers
2. **Search & Filter**: Use the search bar or category filters to find specific products
3. **Add to Cart**: Click the cart icon on product cards to add items
4. **Checkout**: Review your cart, add delivery address, and choose payment method
5. **Track Orders**: View order history and status in "My Orders" section

### For Sellers/Admins
1. **Access Admin Panel**: Navigate to `/seller` route
2. **Add Products**: Use the "Add Product" form with images and descriptions
3. **Manage Inventory**: Toggle product stock status and edit details
4. **Process Orders**: View and update order statuses

## 🔧 API Endpoints

### User Authentication
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `GET /api/user/logout` - User logout

### Products
- `GET /api/product/list` - Get all products
- `POST /api/product/add` - Add new product (Admin)
- `POST /api/product/stock` - Update stock status (Admin)

### Cart & Orders
- `POST /api/cart/update` - Update cart items
- `POST /api/order/cod` - Place COD order
- `POST /api/order/stripe` - Place order with Stripe
- `GET /api/order/user` - Get user orders

### Address Management
- `GET /api/address/get` - Get user addresses
- `POST /api/address/add` - Add new address

## 🎨 Design Features

- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Mobile Responsive**: Optimized for all screen sizes
- **Dark/Light Theme**: Consistent color scheme throughout
- **Loading States**: Skeleton screens and loading indicators
- **Error Handling**: User-friendly error messages and fallbacks
- **Accessibility**: Keyboard navigation and screen reader support

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **CORS Protection**: Configured for specific origins
- **Input Validation**: Server-side validation for all inputs
- **Secure Payments**: Stripe integration with webhook verification

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
vercel --prod
```

### Backend (Vercel/Heroku)
```bash
cd backend
npm start
# Deploy using your preferred platform
```

## 📈 Performance Optimizations

- **Image Optimization**: Cloudinary auto-optimization
- **Lazy Loading**: Components and images loaded on demand
- **Code Splitting**: Route-based code splitting
- **Caching**: Efficient caching strategies
- **Debounced Updates**: Cart updates with debouncing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Kavindu Amalka**
- GitHub: [@KavinduAmalka](https://github.com/KavinduAmalka)

## 🙏 Acknowledgments

- React team for the amazing framework
- Stripe for secure payment processing
- Cloudinary for image optimization
- TailwindCSS for the utility-first approach
- MongoDB for the flexible database solution

---

<div align="center">
  <p>Made with ❤️ for premium liquor enthusiasts</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
