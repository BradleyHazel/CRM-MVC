// require the mongoose package from the connection pool
const mongoose = require("../connection")
var passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username : {type: String, unique: true},
  email : {type: String, unique: true},
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);


// export the newly created model
module.exports = User;