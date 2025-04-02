const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');
const verifyToken = require('../middleware/verify-token');

// GET all invoices for user
router.get('/', verifyToken, async (req, res) => {
  try {
    const invoices = await Invoice.find({ userId: req.user._id });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invoices', error: error.message });
  }
});

// GET invoices by status
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

// CREATE new invoice
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

// UPDATE existing invoice
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    
    if (!updatedInvoice) {
      return res.status(404).json({ message: 'Invoice not found or unauthorized' });
    }
    
    res.status(200).json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ message: 'Error updating invoice', error: error.message });
  }
});

// DELETE invoice
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const invoice = await Invoice.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found or unauthorized' });
    }

    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting invoice', 
      error: error.message 
    });
  }
});

module.exports = router;