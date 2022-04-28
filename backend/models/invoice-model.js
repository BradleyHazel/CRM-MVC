// require the mongoose package from the connection pool
const mongoose = require("../connection");

const invoiceSchema = new mongoose.Schema({
  owner: { type: String },
  customer: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: String, required: true },
  invoiceDate: { type: String, required: true },
  contactName: { type: String },
  contactNumber: { type: String },
  paid: { type: Boolean, default: false },
  billingAddress: { type: String },
  invoiceLineItems: { type: String },
  memo: { type: String },
  createdDate: { type: String },
  paymentInfo: { type: String }
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

// export the newly created model
module.exports = Invoice;
