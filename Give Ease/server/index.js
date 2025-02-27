const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const admin = require('firebase-admin');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: process.env.FIREBASE_PROJECT_ID
});

// Routes
const authRoutes = require('./routes/auth');
const donationRoutes = require('./routes/donations');
const institutionRoutes = require('./routes/institutions');
const shopkeeperRoutes = require('./routes/shopkeepers');

app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/institutions', institutionRoutes);
app.use('/api/shopkeepers', shopkeeperRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
