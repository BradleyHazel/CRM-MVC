require('dotenv').config()

const express = require('express')
const cors = require('cors')
const methodOverride = require("method-override")
const ejsLayouts = require('express-ejs-layouts');
const app = express();


app.use(ejsLayouts);

app.use(cors())
app.use(methodOverride('_method'))
app.set("view engine", "ejs")

app.set("port", process.env.PORT || 8001);

app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${app.get("port")} 🌟`);
});

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const customerController = require('./controllers/customerController.js');
app.use('/customers', customerController);

const invoiceController = require('./controllers/invoiceController.js');
app.use('/invoices', invoiceController);

app.get('/',(req,res)=>{
  res.redirect('/customers')
})




