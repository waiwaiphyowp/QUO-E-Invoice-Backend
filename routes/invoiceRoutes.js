const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice'); 
const verifyToken = require('../middleware/verify-token');

// GET 
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invoices', error: error.message });
  }
});

// GET 
router.get('/user/:userId', verifyToken, async (req, res) => {
  try {
    if (req.user._id !== req.params.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const invoices = await Invoice.find({ userId: req.params.userId });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user invoices', error: error.message });
  }
});

// POST
router.post('/', async (req, res) => {
  try {
    const invoiceData = req.body;
    const newInvoice = new Invoice(invoiceData);
    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    res.status(400).json({ message: 'Error saving invoice', error: error.message });
  }
});

// POST
router.post('/:userId', verifyToken, async (req, res) => {
  try {
    if (req.user._id !== req.params.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const invoiceData = { ...req.body, userId: req.params.userId };
    const newInvoice = new Invoice(invoiceData);
    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;