# 🍷 LiquarShop - Premium Liquor E-commerce Platform

<div align="center">
  <img src="frontend/src/assets/logo.png" alt="LiquarShop Logo" width="200"/>
  
  **A modern, full-stack e-commerce platform for premium liquor delivery**
  
  [![React](https://img.shields.io/badge/React-19.1-blue.svg)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen.svg)](https://mongodb.com/)
  [![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC.svg)](https://tailwindcss.com/)
  [![Vercel](https://img.shields.io/badge/Deployed-Vercel-black.svg)](https://vercel.com/)
</div>

## 🌟 Overview

LiquarShop is a comprehensive e-commerce platform designed for premium liquor delivery. Built with modern technologies, it offers a seamless shopping experience for customers and powerful management tools for sellers. The platform features real-time cart synchronization, secure payments, and an intuitive admin dashboard.

### 🔗 Live Demo
- **Frontend**: [https://liquar-shop.vercel.app](https://liquar-shop.vercel.app)
- **API**: Deployed on Vercel

## ✨ Key Features

### 🛒 **Customer Experience**
- **Multi-Category Browsing**: Whiskey, Vodka, Rum, Gin, Wine, Beer, Champagne, and Cocktail Mixers
- **Intelligent Search**: Filter by category, price range, and popularity
- **Smart Cart Management**: Real-time synchronization across devices
- **Secure Authentication**: JWT-based login system
- **Multiple Payment Options**: Cash on Delivery (COD) and Stripe integration
- **Address Management**: Save multiple delivery addresses
- **Order Tracking**: Complete order history and status updates
- **Mobile-First Design**: Responsive across all devices

### 👨‍💼 **Admin Dashboard**
- **Product Management**: Add, edit, and manage inventory
- **Stock Control**: Real-time inventory updates
- **Order Processing**: Comprehensive order management
- **Image Upload**: Cloudinary integration for product photos
- **Analytics**: Sales tracking and performance metrics

### 🔧 **Technical Excellence**
- **Real-time Updates**: Live cart and inventory synchronization
- **Cloud Integration**: Cloudinary for image optimization
- **Secure Payments**: Stripe webhook integration
- **Performance Optimized**: Lazy loading and code splitting
- **Error Handling**: Comprehensive error management
- **SEO Friendly**: Optimized for search engines

## 🏗️ Architecture

```
LiquarShop/
├── 🎨 frontend/          # React + Vite Application
│   ├── src/
│   │   ├── components/   # Reusable UI Components
│   │   ├── pages/        # Route Components
│   │   ├── context/      # State Management
│   │   └── assets/       # Static Resources
│   └── package.json
│
├── ⚙️ backend/           # Node.js + Express API
│   ├── controllers/      # Business Logic
│   ├── models/           # Database Schemas
│   ├── routes/           # API Endpoints
│   ├── middlewares/      # Authentication & Validation
│   ├── configs/          # Database & Service Configuration
│   └── server.js
│
└── 📖 README.md
```

## 🛠️ Technology Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 19.1, Vite, TailwindCSS 4.1, React Router DOM, Axios |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose, JWT |
| **Authentication** | JSON Web Tokens, Bcrypt |
| **Payments** | Stripe API, Webhooks |
| **Storage** | Cloudinary (Images), MongoDB (Data) |
| **Deployment** | Vercel (Frontend & Backend) |
| **Development** | ESLint, Nodemon, Hot Module Replacement |

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)
- Cloudinary Account
- Stripe Account

### 1. Clone Repository
```bash
git clone https://github.com/KavinduAmalka/LiquarShop.git
cd LiquarShop
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
echo "PORT=4000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret" > .env

# Start server
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Access Application
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:4000

## 📱 Product Categories

<div align="center">

| 🥃 Whiskey | 🍸 Vodka | 🏴‍☠️ Rum | 🌿 Gin |
|------------|----------|-----------|--------|
| Premium Scotch | Premium Vodka | White & Dark Rum | London Dry Gin |
| Bourbon | Flavored Variants | Spiced Rum | Botanical Gin |

| 🍷 Wine | 🍺 Beer | 🥂 Champagne | 🍹 Mixers |
|---------|---------|-------------|-----------|
| Red & White Wine | Local & Import | French Champagne | Cocktail Mixers |
| Sparkling Wine | Craft Beer | Prosecco | Garnishes |

</div>

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Encryption**: Bcrypt hashing
- **CORS Protection**: Origin-specific access control
- **Input Validation**: Server-side data validation
- **Secure Payments**: Stripe's secure payment processing
- **Environment Variables**: Sensitive data protection

## 📊 Performance Metrics

- **Page Load Time**: < 2 seconds
- **Mobile Performance**: 95+ Lighthouse score
- **Image Optimization**: Automatic via Cloudinary
- **Caching Strategy**: Efficient browser and CDN caching
- **Bundle Size**: Optimized with code splitting

## 🌐 API Documentation

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/product/list` | Fetch all products |
| `POST` | `/api/user/register` | User registration |
| `POST` | `/api/user/login` | User authentication |
| `POST` | `/api/cart/update` | Update cart items |
| `POST` | `/api/order/cod` | Place COD order |
| `POST` | `/api/order/stripe` | Process Stripe payment |

## 🚀 Deployment

### Vercel Deployment (Recommended)

**Frontend:**
```bash
cd frontend
npm run build
vercel --prod
```

**Backend:**
```bash
cd backend
vercel --prod
```

### Environment Configuration
```env
# Production Environment Variables
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/liquarshop
JWT_SECRET=your-super-secure-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
STRIPE_SECRET_KEY=sk_live_your_stripe_secret
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📈 Roadmap

- [ ] **Mobile App**: React Native implementation
- [ ] **Recommendation Engine**: AI-powered product suggestions
- [ ] **Inventory Analytics**: Advanced reporting dashboard
- [ ] **Multi-vendor Support**: Marketplace functionality
- [ ] **Subscription Service**: Recurring deliveries
- [ ] **Social Features**: Reviews and ratings system


## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Kavindu Amalka**
- **GitHub**: [@KavinduAmalka](https://github.com/KavinduAmalka)
- **LinkedIn**: [Connect with me](https://www.linkedin.com/in/kavindu-amalka-0443462a3/)

## 🙏 Acknowledgments

- **React Team** - For the incredible framework
- **Vercel** - For seamless deployment platform
- **Stripe** - For secure payment infrastructure
- **Cloudinary** - For image optimization services
- **MongoDB** - For flexible database solutions
- **TailwindCSS** - For beautiful, utility-first styling

---

<div align="center">
  <h3>🍻 Cheers to Great Code! 🥂</h3>
  <p>
    <strong>Made with ❤️ for premium liquor enthusiasts</strong><br>
    ⭐ Star this repo if you found it helpful!
  </p>
  
  <img src="https://visitor-badge.laobi.icu/badge?page_id=KavinduAmalka.LiquarShop" alt="Visitor Count"/>
</div>
