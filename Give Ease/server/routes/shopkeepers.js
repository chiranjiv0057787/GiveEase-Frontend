const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

// Get all verified shopkeepers
router.get('/', async (req, res) => {
  try {
    const shopkeepersRef = admin.firestore().collection('shopkeepers');
    const snapshot = await shopkeepersRef
      .where('verified', '==', true)
      .get();

    const shopkeepers = [];
    snapshot.forEach(doc => {
      shopkeepers.push({ id: doc.id, ...doc.data() });
    });

    res.json(shopkeepers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get shopkeeper orders
router.get('/:id/orders', async (req, res) => {
  try {
    const ordersRef = admin.firestore().collection('orders');
    const snapshot = await ordersRef
      .where('shopkeeperId', '==', req.params.id)
      .orderBy('createdAt', 'desc')
      .get();

    const orders = [];
    snapshot.forEach(doc => {
      orders.push({ id: doc.id, ...doc.data() });
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status
router.put('/orders/:orderId', async (req, res) => {
  try {
    const { status } = req.body;
    const orderRef = admin.firestore().collection('orders').doc(req.params.orderId);

    await orderRef.update({
      status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new shopkeeper (requires admin verification)
router.post('/', async (req, res) => {
  try {
    const { name, shopName, address, phone, email } = req.body;
    const shopkeeperRef = admin.firestore().collection('shopkeepers').doc();

    await shopkeeperRef.set({
      name,
      shopName,
      address,
      phone,
      email,
      verified: false,
      rating: 0,
      totalRatings: 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(201).json({ 
      id: shopkeeperRef.id, 
      message: 'Shopkeeper profile created and pending verification' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
