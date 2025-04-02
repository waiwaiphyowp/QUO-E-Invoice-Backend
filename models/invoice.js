const mongoose = require('mongoose');

const lineItemSchema = new mongoose.Schema({
  itemNo: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  amount: { type: Number, required: true }
});

const invoiceSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  lineItems: [lineItemSchema],
  discount: { type: Number, default: 0 },
  gst: { type: Number, default: 0 },
  subtotal: { type: Number, required: true },
  total: { type: Number, required: true },
  status: { type: String, enum: ['paid', 'unpaid', 'draft'], required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Invoice', invoiceSchema);