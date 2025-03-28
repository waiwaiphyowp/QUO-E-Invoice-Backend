const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  phoneNumber: { type: String, required: true }, 
  address: { type: String, required: true },
  invoiceNo: { type: Number, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  amount: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  discount: { type: String, required: false }, 
  gst: { type: Number, required: false }, 
  total: { type: Number, required: true },
  status: { type: String, enum: ['select', 'paid', 'unpaid'], default: 'select' },
});

module.exports = mongoose.model('Invoice', invoiceSchema);