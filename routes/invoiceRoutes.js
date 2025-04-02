const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');
const verifyToken = require('../middleware/verify-token');

router.get('/', verifyToken, async (req, res) => {
  try {
    const invoices = await Invoice.find({ userId: req.user._id });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invoices', error: error.message });
  }
});

router.get('/:status', verifyToken, async (req, res) => {
  try {
    const invoices = await Invoice.find({ 
      userId: req.user._id,
      status: req.params.status 
    });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invoices', error: error.message });
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    const invoiceData = { ...req.body, userId: req.user._id };
    const newInvoice = new Invoice(invoiceData);
    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;