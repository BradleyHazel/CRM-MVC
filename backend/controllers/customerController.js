const express = require("express");
const router = express.Router();
const Customer = require("../models/customer-model.js");
const Invoice = require("../models/invoice-model");





router.get("/list", (req, res, next) => {
  Customer.find({ owner: (req.user._id? req.user._id : req.user.id)})
    .then((customers) => {
      customers.sort((a, b) => a.name.localeCompare(b.name));

      let data = { customers: customers, username: (req.user._id? req.user.username : req.user.displayName) };
      res.render(`customerIndex`, { data });
    })

    .catch(next);
});


router.get("/", (req, res, next) => {

  let invoices = [];
  Customer.find({ owner: (req.user._id? req.user._id : req.user.id)  })
    .then((customers) => {
      Invoice.find({ owner: (req.user._id? req.user._id : req.user.id)      }).then((result) => {
        invoices.push(result);
        // loop through customers
        for (let i = 0; i < customers.length; i++) {
          customers[i].invoicenumber = 0;
          customers[i].invoicetotal = 0;
          //loop through invoices
          for (let j = 0; j < result.length; j++) {
            // if the customer name matches the invoice name increase the invoice count
            if (customers[i].name == result[j].customer) {
              customers[i].invoicenumber++;
              customers[i].invoicetotal =
                customers[i].invoicetotal + result[j].amount;
            }
          }
        }
        // getting the countrys
        let customerCountry = [];
        customers.forEach((cust) => {
          customerCountry.push(cust.country);
        });
        let countryCount = {};
        let countryNameArr = [];
        let countryCountArr = [];
        customerCountry.forEach(
          (country) =>
            (countryCount[country] = 1 + (countryCount[country] || 0))
        );

        for (const property in countryCount) {
          countryNameArr.push(`${property}`);
          countryCountArr.push(`${countryCount[property]}`);
        }
        customers.sort((a, b) => a.name.localeCompare(b.name));

        let data = {
          customers: customers,
          invoices: invoices,
          countryNameArr: countryNameArr,
          countryCountArr: countryCountArr,
          username: (req.user._id? req.user.username : req.user.displayName),
        };
        res.render(`index`, { data });
      });
    })
    .catch(console.error);
});

router.get("/add", (req, res, next) => {
  Customer.find({ owner: (req.user._id? req.user._id : req.user.id) })
    .then((customers) => {
      let data = { customers: customers, username: (req.user._id? req.user.username : req.user.displayName) };
      res.render(`add`, { data });
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  let invoices = [];
  Customer.findById(req.params.id)
    .then((customers) => {
      Invoice.find({ customer: customers.name, owner: (req.user._id? req.user._id : req.user.id) }).then(
        (result) => {
          invoices.push(result);

          let data = {
            customers: customers,
            invoices: invoices,
            username: (req.user._id? req.user.username : req.user.displayName),
          };
          res.render(`customer`, { data });
        }
      );
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
  req.body.owner = (req.user._id? req.user._id : req.user.id);
  Customer.create(req.body).then(res.redirect("/customers"));
});

router.delete("/:customerId", (req, res) => {
  Customer.findOneAndDelete({
    _id: req.params.customerId,
    owner: (req.user._id? req.user._id : req.user.id),
  }).then((customer) => {
    Invoice.deleteMany({
      customer: customer.name,
      owner: (req.user._id? req.user._id : req.user.id),
    }).then(() => {
      res.redirect("/customers");
    });
  });
});

router.put("/:customerId", (req, res) => {
  let invoices = [];
  Customer.findById(req.params.customerId)
    .then((customers) => {
      Invoice.find({ customer: customers.name, owner: (req.user._id? req.user._id : req.user.id) }).then(
        (result) => {
          invoices.push(result);

          Invoice.updateMany(
            { customer: customers.name, owner: (req.user._id? req.user._id : req.user.id) },
            { customer: req.body.name }
          )
            .then((invoice) => {})
            .then(() => {
              Customer.findOneAndUpdate(
                { _id: req.params.customerId, owner: (req.user._id? req.user._id : req.user.id) },
                req.body,
                { new: true }
              )
                .then((customer) => {
                  res.redirect(`/customers/${req.params.customerId}`);
                })
                .catch(console.error);
            })
            .catch(console.error);
        }
      );
    })
    .catch(console.error);
});

const customerController = router;
module.exports = customerController;
