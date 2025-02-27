const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

// Get all verified institutions
router.get('/', async (req, res) => {
  try {
    const institutionsRef = admin.firestore().collection('institutions');
    const snapshot = await institutionsRef
      .where('verified', '==', true)
      .get();

    const institutions = [];
    snapshot.forEach(doc => {
      institutions.push({ id: doc.id, ...doc.data() });
    });

    res.json(institutions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get institution by ID
router.get('/:id', async (req, res) => {
  try {
    const institutionRef = admin.firestore().collection('institutions').doc(req.params.id);
    const institution = await institutionRef.get();

    if (!institution.exists) {
      return res.status(404).json({ error: 'Institution not found' });
    }

    res.json({ id: institution.id, ...institution.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new institution (requires admin verification)
router.post('/', async (req, res) => {
  try {
    const { name, address, contactPerson, phone, email } = req.body;
    const institutionRef = admin.firestore().collection('institutions').doc();

    await institutionRef.set({
      name,
      address,
      contactPerson,
      phone,
      email,
      verified: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(201).json({ 
      id: institutionRef.id, 
      message: 'Institution created and pending verification' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update institution verification status (admin only)
router.put('/:id/verify', async (req, res) => {
  try {
    const { verified } = req.body;
    const institutionRef = admin.firestore().collection('institutions').doc(req.params.id);

    await institutionRef.update({
      verified,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({ message: 'Institution verification status updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
