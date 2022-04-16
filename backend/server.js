const express = require('express')
const cors = require('cors')
const methodOverride = require("method-override")
const ejsLayouts = require('express-ejs-layouts');
const app = express();

app.use(ejsLayouts);

app.use(cors())
app.use(methodOverride('_method'))
app.set("view engine", "ejs")

app.set("port", process.env.PORT || 8000);

app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${app.get("port")} 🌟`);
});

app.use(express.static('public')); 

//const methodOverride = require('method-override');

//app.use(methodOverride('_method'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const customerController = require('./controllers/customerController.js');
app.use('/customers', customerController);