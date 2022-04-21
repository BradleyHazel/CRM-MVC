const express = require("express");
const router = express.Router()
const Invoice = require('../models/invoice-model')
const Customer = require('../models/customer-model')



function sortInvoicesAlpha (sortedInvoices){

  for(let j=0;j<sortedInvoices.length;j++){
    // compare each entry to the previous
      if( j == sortedInvoices.length-1){}
      else{
      
        if(sortedInvoices[j].customer.toUpperCase().charCodeAt(0)>sortedInvoices[j+1].customer.toUpperCase().charCodeAt(0)){
          let swap = sortedInvoices[j]
          sortedInvoices[j] =  sortedInvoices[j+1];
          sortedInvoices[j+1] = swap
        }
        else if(sortedInvoices[j].customer.toUpperCase().charCodeAt(0)==sortedInvoices[j+1].customer.toUpperCase().charCodeAt(0)){
          if(sortedInvoices[j].customer.toUpperCase().charCodeAt(1)>sortedInvoices[j+1].customer.toUpperCase().charCodeAt(1)){
            let swap1 = sortedInvoices[j]
          sortedInvoices[j] =  sortedInvoices[j+1];
          sortedInvoices[j+1] = swap1
          }


        else if(sortedInvoices[j].customer.toUpperCase().charCodeAt(1)==sortedInvoices[j+1].customer.toUpperCase().charCodeAt(1)){
          if(sortedInvoices[j].customer.toUpperCase().charCodeAt(2)>sortedInvoices[j+1].customer.toUpperCase().charCodeAt(2)){
            let swap1 = sortedInvoices[j]
            sortedInvoices[j] =  sortedInvoices[j+1];
            sortedInvoices[j+1] = swap1
          }
          
        }
          
        }
      }
    }
  return sortedInvoices
  }

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
    
            else if(sortedCustomers[j].name.toUpperCase().charCodeAt(1)==sortedCustomers[j+1].name.toUpperCase().charCodeAt(1)){
              if(sortedCustomers[j].name.toUpperCase().charCodeAt(2)>sortedCustomers[j+1].name.toUpperCase().charCodeAt(2)){
                let swap1 = sortedCustomers[j]
              sortedCustomers[j] =  sortedCustomers[j+1];
              sortedCustomers[j+1] = swap1
              }
              
            }
            
          }
        }
      }
    return sortedCustomers
    }

    function runSortCustomers(customers){

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
      return sortedCustomers
    }

    function runSortInvoices(invoices){

      let sortedInvoices = []
      // looping through the custome object
      for(let i =0;i<invoices.length;i++){
        // Add the customer to the list
        sortedInvoices.push(invoices[i])
  
        // need to now loop through sorted customers, compare the current customer on the top loop, to uppercase for the comparison of first letter
        sortedInvoices = sortInvoicesAlpha(sortedInvoices)
      }
      // loop through again
      for(let v =0;v<1000;v++){
        sortedInvoices = sortInvoicesAlpha(sortedInvoices)
      }
      return sortedInvoices
    }

// Index: GET all the Invoices
router.get("/list", (req, res, next) => {
  Invoice.find({})
      .then(invoices => {
       
        invoices = runSortInvoices(invoices)
        res.render('invoiceIndex',{invoices})})
        
      .catch(next);
  });

  

  router.get("/add", (req, res, next) => {
    Customer.find({})
    .then(customers => {
      customers = runSortCustomers(customers)
      res.render('addinvoice',{customers})})
    .catch(next);
    });




router.get("/:id", (req, res, next) => {

  Invoice.findById(req.params.id)
    .then((invoice) => {
      Customer.find({name:invoice.customer}).then((customer)=>{
        Customer.find({}).then((customers)=>{
          customer = customer[0]

          customers =runSortCustomers(customers)

          let data = {"invoice":invoice,"customer":customer,"customers":customers}
          res.render(`invoice`,{data});

        }
        
      )}).catch(console.error);
      
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