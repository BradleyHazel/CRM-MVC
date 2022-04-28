// require the mongoose package from the connection pool
const mongoose = require("../connection");

const logSchema = new mongoose.Schema({
  owner: { type: String},
  timestamp: { type: String},
  details: { type: Object},
  action: {type:String}
});


const Log = mongoose.model("Log", logSchema);

// export the newly created model
module.exports = Log;
