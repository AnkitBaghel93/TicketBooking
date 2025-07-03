const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketNo: { type: String, required: true },
  date: { type: String, required: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  subject: { type: String, required: true },
  category: { type: String },
  description: { type: String },
  type: { type: String },
  priority: { type: String },
  status: { type: String, default: "In Progress" },
  assignedTo: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
