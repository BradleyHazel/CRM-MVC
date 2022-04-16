const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://test1234:1234@cluster0.ic7bm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

/*
  //check if the node environment is production
  process.env.NODE_ENV === "production"
    ? //if so, use DB_URL as the database location
      process.env.DB_URL
    : //if not, use the book-e db on the MongoDB's local server
      "mongodb://localhost/";
*/

mongoose
  .connect(mongoURI)
  .then((instance) =>
    console.log(`Connected to db: ${instance.connections[0].name}`)
  )
  .catch((error) => console.log('Connection failed!', error));

module.exports = mongoose;

