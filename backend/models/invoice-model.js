// require the mongoose package from the connection pool
const mongoose = require("../connection")

const invoiceSchema = new mongoose.Schema({
  customer: {type: String, required:true},
  amount:{type:Number},
  dueDate:{type:String},
  invoiceDate:{type:String},
  contactName:{type:String},
  contactNumber:{type:String},
  paid:{type:Boolean, default:false},
  billingAddress:{type:String},
  invoiceLineItems:{type:String},
  memo:{type:String},
  createdDate:{type:String}
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

// export the newly created model
module.exports = Invoice;