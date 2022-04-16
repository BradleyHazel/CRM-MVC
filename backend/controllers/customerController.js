const express = require("express");
const router = express.Router()
const Customer = require('../models/customer-model.js')


// Index: GET all the Customers
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
  
  let customers = Customer.find({});

  Customer.findById(req.params.id)
    .then((customer) => {
      res.render(`customer`,{customer});
    })
    .catch(console.error);
  });

router.post("/add", (req, res) => {
  Customer.create(req.body).then(res.redirect("/customers"))
  });

router.put("/:customerId", (req, res) => {
  Customer.findOneAndUpdate({_id:req.params.customerId},req.body,{ new: true }).then(() => {
    res.redirect(`/customers/${req.params.customerId}`);
  })
  .catch(console.error);
});


router.delete("/:customerId", (req, res) => {
  Customer.findOneAndDelete({_id:req.params.customerId},()=>{
    res.redirect("/customers");
})
});

  const gifController = router
  module.exports = gifController;