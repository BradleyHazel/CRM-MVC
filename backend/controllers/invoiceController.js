const express = require("express");
const router = express.Router();
const Invoice = require("../models/invoice-model");
const Customer = require("../models/customer-model");
const Log = require("../models/log-model");

function generateLog(reqBodyOwner,reqBody,message){

  let stamp = Date();
  let logdata = {owner:reqBodyOwner,timestamp:stamp,details:reqBody,action:message}

  Log.create(logdata).then(()=>{
    console.log(logdata)
  })
}

// Index: GET all the Invoices
router.get("/list", (req, res, next) => {
  Invoice.find({ owner: (req.user._id? req.user._id : req.user.id) })
    .then((invoices) => {
      invoices.sort((a, b) => a.customer.localeCompare(b.customer));
      let data = { invoices: invoices, username: (req.user._id? req.user.username : req.user.displayName) };
      res.render(`invoiceIndex`, { data });
    })
    .catch(next);
});

router.get("/add", (req, res, next) => {
  Customer.find({ owner: (req.user._id? req.user._id : req.user.id) })
    .then((customers) => {
      customers.sort((a, b) => a.name.localeCompare(b.name));
      let data = { customers: customers, username: (req.user._id? req.user.username : req.user.displayName) };
      res.render(`addinvoice`, { data });
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  Invoice.findById(req.params.id)
    .then((invoice) => {
      Customer.find({ name: invoice.customer, owner: (req.user._id? req.user._id : req.user.id) })
        .then((customer) => {
          Customer.find({ owner: (req.user._id? req.user._id : req.user.id) }).then((customers) => {
            customer = customer[0];

            customers.sort((a, b) => a.name.localeCompare(b.name));

            let data = {
              invoice: invoice,
              customer: customer,
              customers: customers,
              username: (req.user._id? req.user.username : req.user.displayName),
            };
            res.render(`invoice`, { data });
          });
        })
        .catch(console.error);
    })
    .catch(console.error);
});

function getTodaysDate() {
  let today = new Date();
  let year = today.getFullYear();
  year = year.toString();
  let month = today.getMonth();
  month = month + 1;
  month = month.toString();
  let day = today.getDate();
  day = day.toString();
  let hour = today.getHours();
  hour = hour.toString();
  let minute = today.getMinutes();
  minute = minute.toString();
  let seconds = today.getSeconds();
  seconds = seconds.toString();
  if (seconds.length < 2) {
    seconds = `0${seconds}`;
  }
  let date = `${month}/${day}/${year} ${hour}:${minute}:${seconds}`;
  return date;
}

router.post("/add", (req, res) => {
  // getting the current time
  let date = getTodaysDate();
  req.body.createdDate = `${date}`;
  req.body.paid = false;
  req.body.owner = (req.user._id? req.user._id : req.user.id);
  Invoice.create(req.body)
    .then(res.redirect("/invoices/list"))
    .catch(console.error);
  generateLog(req.body.owner,req.body,"New Invoice created.")
});

router.delete("/:invoiceId", (req, res, next) => {

  let owner = (req.user._id? req.user._id : req.user.id)
  
  Invoice.findOneAndDelete(
    { _id: req.params.invoiceId, owner: owner },
    () => {
      generateLog(owner,req.params.invoiceId,"Invoice deleted.")
      res.redirect("/invoices/list");
    }
  ).catch(console.error);
});

router.put("/:invoiceId", (req, res) => {
  Invoice.findOneAndUpdate(
    { _id: req.params.invoiceId, owner: (req.user._id? req.user._id : req.user.id) },
    req.body,
    { new: true }
  )
    .then((invoice) => {

      generateLog(invoice.owner,req.body,"Invoice updated ");
      res.redirect(`/invoices/${req.params.invoiceId}`);
    })
    .catch(console.error);
});

router.put("/fromcustomer/:invoiceId", (req, res) => {
  Invoice.findOneAndUpdate(
    { _id: req.params.invoiceId, owner: (req.user._id? req.user._id : req.user.id) },
    req.body,
    { new: true }
  )
    .then((inv) => {

      generateLog(inv.owner,req.body,"Invoice updated ");

      Customer.find({ name: inv.customer, owner: (req.user._id? req.user._id : req.user.id) })
        .then((customer) => {
          res.redirect(`/customers/${customer[0]._id}`);
        })
   
    })
    .catch(console.error);
});

const invoiceController = router;
module.exports = invoiceController;
