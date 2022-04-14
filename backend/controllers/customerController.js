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

router.get("/:id", (req, res, next) => {
  Customer.findById(req.params.id)
    .then((customer) => {
      res.send(customer);
    })
    .catch(console.error);
  });

router.post("/", (req, res) => {
  Customer.create(req.body).then(res.redirect("/customers"))
  });

router.put("/:customerId", (req, res) => {
  Customer.findOneAndUpdate({_id:req.params.customerId},req.body,{ new: true }).then(() => {
    res.redirect("/customers");
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