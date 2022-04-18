// require the mongoose package from the connection pool
const mongoose = require("../connection")

const customerSchema = new mongoose.Schema({
  name: {type: String, required:true},
  email: {type:String},
  phone: {type:String},
  address:{type:String},
  city:{type:String},
  zip:{type:String},
  photo:{type:String},
  notes:{type:String},
  website:{type:String},
  createdDate:{type:String}
});

const Customer = mongoose.model("Customer", customerSchema);

// export the newly created model
module.exports = Customer;