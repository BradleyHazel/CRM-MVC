const express = require("express");
const router = express.Router()
const Customer = require('../models/customer-model.js')
const Invoice = require('../models/invoice-model')

// Index: GET all the Customers



router.get("/list", (req, res, next) => {
  Customer.find({})
      .then(customers => {
        res.render('customerIndex',{customers})})
      .catch(next);
  });

router.get("/", (req, res, next) => {
  Customer.find({})
      .then(customers => {
        res.render('index',{customers})})
      .catch(next);
  });



  router.get("/add", (req, res, next) => {
    Customer.find({})
        .then(customers => {
          res.render('add',{customers})})
        .catch(next);
    });

router.get("/:id", (req, res, next) => {
  let invoices =[]
  Customer.findById(req.params.id)
    .then((customers) => {
      Invoice.find({customer:customers.name}).then(result=>{invoices.push(result)
    
        let data = {"customers":customers,"invoices":invoices}
        res.render(`customer`,{data});
      })
      
      
    })
    .catch(console.error);
  });

function getTodaysDate(){
  let today = new Date()
  let year = today.getFullYear();
  year = year.toString()
  let month = today.getMonth();
  month = month.toString()
  let day = today.getDate();
  day = day.toString()
  let hour = today.getHours()
  hour = hour.toString()
  let minute = today.getMinutes()
  minute = minute.toString()
  let seconds = today.getSeconds()
  seconds = seconds.toString()
  if(seconds.length <2){
    seconds = `0${seconds}`
  }
  let date = `${month}/${day}/${year} ${hour}:${minute}:${seconds}`
  return date
}

router.post("/add", (req, res) => {
  // getting the current time 
  let date = getTodaysDate()
  req.body.createdDate = `${date}`;
  Customer.create(req.body).then(res.redirect("/customers"))

  
  });


  router.delete("/:customerId", (req, res) => {
    Customer.findOneAndDelete({_id:req.params.customerId},()=>{
      res.redirect("/customers");
  })
  });

router.put("/:customerId", (req, res) => {
  Customer.findOneAndUpdate({_id:req.params.customerId},req.body,{ new: true }).then(() => {
    res.redirect(`/customers/${req.params.customerId}`);
  })
  .catch(console.error);
});




  const customerController = router
  module.exports = customerController;