const express = require("express");
const router = express.Router()
const Customer = require('../models/customer-model.js')
const Invoice = require('../models/invoice-model')

// Index: GET all the Customers

function sortCustomersAlpha (sortedCustomers){

for(let j=0;j<sortedCustomers.length;j++){
  // compare each entry to the previous
    if( j == sortedCustomers.length-1){}
    else{
    
      if(sortedCustomers[j].name.toUpperCase().charCodeAt(0)>sortedCustomers[j+1].name.toUpperCase().charCodeAt(0)){
        let swap = sortedCustomers[j]
        sortedCustomers[j] =  sortedCustomers[j+1];
        sortedCustomers[j+1] = swap
      }
      else if(sortedCustomers[j].name.toUpperCase().charCodeAt(0)==sortedCustomers[j+1].name.toUpperCase().charCodeAt(0)){
        if(sortedCustomers[j].name.toUpperCase().charCodeAt(1)>sortedCustomers[j+1].name.toUpperCase().charCodeAt(1)){
          let swap1 = sortedCustomers[j]
        sortedCustomers[j] =  sortedCustomers[j+1];
        sortedCustomers[j+1] = swap1
        }
        
      }
    }
  }
return sortedCustomers
}

router.get("/list", (req, res, next) => {
  Customer.find({})
      .then(customers => {
        let sortedCustomers = []
        // looping through the custome object
        for(let i =0;i<customers.length;i++){
          // Add the customer to the list
            sortedCustomers.push(customers[i])
    
          // need to now loop through sorted customers, compare the current customer on the top loop, to uppercase for the comparison of first letter
          sortedCustomers = sortCustomersAlpha(sortedCustomers)
        }
        // loop through again
        for(let v =0;v<1000;v++){
          sortedCustomers = sortCustomersAlpha(sortedCustomers)
        }
        customers = sortedCustomers
        res.render('customerIndex',{customers})})
        
      .catch(next);
  });

router.get("/", (req, res, next) => {
  let invoices =[]
  Customer.find({})
      .then(customers => {
        Invoice.find({}).then(result=>{invoices.push(result)
         // loop through customers
         for(let i=0;i<customers.length;i++){
           customers[i].invoicenumber=0
           customers[i].invoicetotal=0
          //loop through invoices
          for(let j=0;j<result.length;j++){
            // if the customer name matches the invoice name increase the invoice count
            if(customers[i].name == result[j].customer){
              customers[i].invoicenumber++
              customers[i].invoicetotal= customers[i].invoicetotal+result[j].amount
            }
          }
         }
         // getting the countrys
         let customerCountry =[]
         customers.forEach(cust=>{
           customerCountry.push(cust.country)
         })
         let countryCount = {};
         let countryNameArr =[];
         let countryCountArr = []
         customerCountry.forEach(country => countryCount[country] = 1  + (countryCount[country] || 0))

         for (const property in countryCount) {
          countryNameArr.push(`${property}`);
          countryCountArr.push(`${countryCount[property]}`);
        }



          let data = {"customers":customers,"invoices":invoices,"countryNameArr":countryNameArr,"countryCountArr":countryCountArr}
          res.render(`index`,{data});
        })
      })
      .catch(console.error);
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
  
  