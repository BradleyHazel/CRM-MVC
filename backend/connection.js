const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://test1234:test1234@cluster0.ic7bm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

//process.env.DEV_DB_URL


mongoose
  .connect(mongoURI)
  .then((instance) =>
    console.log(`Connected to db: ${instance.connections[0].name}`)
  )
  .catch((error) => console.log('Connection failed!', error));

module.exports = mongoose;

