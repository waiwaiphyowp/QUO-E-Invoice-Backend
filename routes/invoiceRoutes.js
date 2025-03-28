const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice'); 

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

// GET
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invoices', error: error.message });
  }
});

module.exports = router;