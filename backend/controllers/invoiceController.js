const express = require("express");
const router = express.Router()
const Invoice = require('../models/invoice-model')


// Index: GET all the Invoices
router.get("/list", (req, res, next) => {
  Invoice.find({})
      .then(invoices => {
        res.render('invoiceIndex',{invoices})})
      .catch(next);
  });

  

  router.get("/add", (req, res, next) => {
    Invoice.find({})
        .then(invoices => {
          res.render('addinvoice',{invoices})})
        .catch(next);
    });

router.get("/:id", (req, res, next) => {
  
  let invoices = Invoice.find({});

  Invoice.findById(req.params.id)
    .then((invoice) => {
      res.render(`invoice`,{invoice});
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
  req.body.paid = false;
  Invoice.create(req.body).then(res.redirect("/invoices/list")).catch(console.error);

  
  });


  router.delete("/:invoiceId", (req, res, next) => {
    Invoice.findOneAndDelete({_id:req.params.invoiceId},()=>{
      res.redirect("/invoices/list");;
  }) .catch(console.error);
  });

router.put("/:invoiceId", (req, res) => {
  Invoice.findOneAndUpdate({_id:req.params.invoiceId},req.body,{ new: true }).then(() => {
    res.redirect(`/invoices/${req.params.invoiceId}`);
  })
  .catch(console.error);
});




const invoiceController = router
module.exports = invoiceController;