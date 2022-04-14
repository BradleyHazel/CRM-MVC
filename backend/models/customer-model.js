// require the mongoose package from the connection pool
const mongoose = require("../connection.js");

const customerSchema = new mongoose.Schema({
  name: {type: String, required:true},
  email: {type:String, required:true}
});

const Customer = mongoose.model("Customer", customerSchema);

// export the newly created model
module.exports = Customer;