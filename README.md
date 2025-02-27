# GiveEase

A full-stack web application designed to connect donors, institutions, and shopkeepers for transparent donations.

## 🌟 Features

### 👤 User Panel
- User Authentication (Google & Email login)
- Item-Based Donation System
- Real-Time Donation Tracking
- Feedback System
- Shopkeeper Order Management

### 🛠 Admin Panel
- Dashboard Overview
- Institution & Shop Management
- Fraud Detection System
- Transaction Monitoring
- Reports & Analytics

## 💻 Tech Stack

- Frontend: React.js + Tailwind CSS
- Backend: Node.js + Express.js
- Database: Firebase Firestore
- Authentication: Firebase Auth
- Hosting: Firebase Hosting/Vercel

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd client && npm install
   ```
3. Set up environment variables:
   - Create `.env` file in root directory
   - Add Firebase configuration

4. Run the development server:
   ```bash
   # Run backend
   npm run dev
   
   # Run frontend
   npm run client
   ```

## 📁 Project Structure

```
give-ease/
├── client/              # React frontend
├── server/              # Express backend
├── .env                 # Environment variables
└── package.json         # Project dependencies
```
