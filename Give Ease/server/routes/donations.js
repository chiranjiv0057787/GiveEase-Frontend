const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

// Create a new donation request
router.post('/', async (req, res) => {
  try {
    const { items, institutionId, status = 'pending' } = req.body;
    const donationRef = admin.firestore().collection('donations').doc();
    
    await donationRef.set({
      items,
      institutionId,
      status,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(201).json({ id: donationRef.id, message: 'Donation request created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all donations for an institution
router.get('/institution/:id', async (req, res) => {
  try {
    const donationsRef = admin.firestore().collection('donations');
    const snapshot = await donationsRef
      .where('institutionId', '==', req.params.id)
      .orderBy('createdAt', 'desc')
      .get();

    const donations = [];
    snapshot.forEach(doc => {
      donations.push({ id: doc.id, ...doc.data() });
    });

    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update donation status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const donationRef = admin.firestore().collection('donations').doc(req.params.id);
    
    await donationRef.update({
      status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({ message: 'Donation status updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
