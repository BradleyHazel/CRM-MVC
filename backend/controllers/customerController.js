const express = require("express");
const router = express.Router();
const Customer = require("../models/customer-model.js");
const Invoice = require("../models/invoice-model");
const Log = require("../models/log-model");


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

       
        // need two data sets
        // months where the last month is the current month
        // invoice amount per month of the last year
        let today = new Date();
        let thisyear = today.getFullYear();
        thisyear = thisyear.toString();
        let thismonth = today.getMonth();
        thismonth = thismonth + 1;
        thismonth = thismonth.toString();

        let jan = {amount:0,name:"January"};
        let feb = {amount:0,name:"February"};
        let mar = {amount:0,name:"March"};
        let apr = {amount:0,name:"April"};
        let may = {amount:0,name:"May"};
        let jun = {amount:0,name:"June"};
        let jul = {amount:0,name:"July"};
        let aug = {amount:0,name:"August"};
        let sep = {amount:0,name:"September"};
        let oct = {amount:0,name:"October"};
        let nov = {amount:0,name:"November"};
        let dec = {amount:0,name:"December"};

       

        for(let c =0;c<result.length;c++){
          
          if(result[c].dueDate.slice(0,4) == thisyear){
        
            // this year
            if(parseInt(result[c].dueDate.slice(5,7))<=parseInt(thismonth)){
              // this month or less
              if((result[c].dueDate.slice(5,7))=="01"){
                jan.amount =  jan.amount+parseInt(result[c].amount)
              }
              else if((result[c].dueDate.slice(5,7))=="02"){
                feb.amount =  feb.amount+parseInt(result[c].amount)
              }
              else if((result[c].dueDate.slice(5,7))=="03"){
                mar.amount =  mar.amount+parseInt(result[c].amount)
              }
              else if((result[c].dueDate.slice(5,7))=="04"){
                apr.amount =  apr.amount+parseInt(result[c].amount)
              }
              else if((result[c].dueDate.slice(5,7))=="05"){
                may.amount =  may.amount+parseInt(result[c].amount)
              }
              else if((result[c].dueDate.slice(5,7))=="06"){
                jun.amount =  jun.amount+parseInt(result[c].amount)
              }
              else if((result[c].dueDate.slice(5,7))=="07"){
                jul.amount =  jul.amount+parseInt(result[c].amount)
              }
              else if((result[c].dueDate.slice(5,7))=="08"){
                aug.amount =  aug.amount+parseInt(result[c].amount)
              }
              else if((result[c].dueDate.slice(5,7))=="09"){
                sep.amount =  sep.amount+parseInt(result[c].amount)
              }
              else if((result[c].dueDate.slice(5,7))=="10"){
                oct.amount =  oct.amount+parseInt(result[c].amount)
              }
              else if((result[c].dueDate.slice(5,7))=="11"){
                nov.amount =  nov.amount+parseInt(result[c].amount)
              }
              else if((result[c].dueDate.slice(5,7))=="12"){
                dec.amount =  dec.amount+parseInt(result[c].amount)
              }
               
            }
          }
          else if(result[c].dueDate.slice(0,4) == (parseInt(thisyear)-1).toString()){

            if(parseInt(result[c].dueDate.slice(5,7))>parseInt(thismonth)){
              // last year not including the months past 12 months
       

              if((result[c].dueDate.slice(5,7))=="01"){
                jan.amount =  jan.amount+parseInt(result[c].amount)
              }
              else if((result[c].dueDate.slice(5,7))=="02"){
                feb.amount =  feb.amount+parseInt(result[c].amount)
              }
              else if((result[c].dueDate.slice(5,7))=="03"){
                mar.amount =  mar.amount+parseInt(result[c].amount)
              }
              else if((result[c].dueDate.slice(5,7))=="04"){
                apr.amount =  apr.amount+parseInt(result[c].amount)
              }
              else if((result[c].dueDate.slice(5,7))=="05"){
                may.amount =  may.amount+parseInt(result[c].amount)
              }
              else if((result[c].dueDate.slice(5,7))=="06"){
                jun.amount =  jun.amount+parseInt(result[c].amount)
              }
              else if((result[c].dueDate.slice(5,7))=="07"){
                jul.amount =  jul.amount+parseInt(result[c].amount)
              }
              else if((result[c].dueDate.slice(5,7))=="08"){
                aug.amount =  aug.amount+parseInt(result[c].amount)
              }
              else if((result[c].dueDate.slice(5,7))=="09"){
                sep.amount =  sep.amount+parseInt(result[c].amount)
              }
              else if((result[c].dueDate.slice(5,7))=="10"){
                oct.amount =  oct.amount+parseInt(result[c].amount)
              }
              else if((result[c].dueDate.slice(5,7))=="11"){
                nov.amount =  nov.amount+parseInt(result[c].amount)
              }
              else if((result[c].dueDate.slice(5,7))=="12"){
                dec.amount =  dec.amount+parseInt(result[c].amount)
              }
           
            }

          }
         
         
          
        }
        let monthArr ;


        if(thismonth == "1"){
          monthArr = [feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec,jan]
        }
        else if(thismonth == "2"){
          monthArr = [mar,apr,may,jun,jul,aug,sep,oct,nov,dec,jan,feb]
        }
        else if(thismonth == "3"){
          monthArr = [apr,may,jun,jul,aug,sep,oct,nov,dec,jan,feb,mar]
        }
        else if(thismonth == "4"){
          monthArr = [may,jun,jul,aug,sep,oct,nov,dec,jan,feb,mar,apr]
        }
        else if(thismonth == "5"){
          monthArr = [jun,jul,aug,sep,oct,nov,dec,jan,feb,mar,apr,may]
        }
        else if(thismonth == "6"){
          monthArr = [jul,aug,sep,oct,nov,dec,jan,feb,mar,apr,may,jun]
        }
        else if(thismonth == "7"){
          monthArr = [aug,sep,oct,nov,dec,jan,feb,mar,apr,may,jun,jul]
        }
        else if(thismonth == "8"){
          monthArr = [sep,oct,nov,dec,jan,feb,mar,apr,may,jun,jul,aug]
        }
        else if(thismonth == "9"){
          monthArr = [oct,nov,dec,jan,feb,mar,apr,may,jun,jul,aug,sep]
        }
        else if(thismonth == "10"){
          monthArr = [nov,dec,jan,feb,mar,apr,may,jun,jul,aug,sep,oct]
        }
        else if(thismonth == "11"){
          monthArr = [dec,jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov]
        }
        else if(thismonth == "12"){
          monthArr = [jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec]
        }

        let monthNameArr=[]
        let monthAmountArr=[]
        for(let i =0;i<monthArr.length;i++){
          monthNameArr.push(monthArr[i].name)
          monthAmountArr.push(monthArr[i].amount)
        }

        // loop through customers
        for (let i = 0; i < customers.length; i++) {
          customers[i].invoicenumber = 0;
          customers[i].invoicetotal = 0;
          //loop through invoices
          for (let j = 0; j < result.length; j++) {
            // if the customer name matches the invoice name increase the invoice count
            if (customers[i].name == result[j].customer) {
              if(result[j].paid == false){
              customers[i].invoicenumber++;
            
              }
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
          monthNameArr:monthNameArr,
          monthAmountArr:monthAmountArr

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

function generateLog(reqBodyOwner,reqBody,message){

  let stamp = Date();
  let logdata = {owner:reqBodyOwner,timestamp:stamp,details:reqBody,action:message}

  Log.create(logdata).then(()=>{
    console.log(logdata)
  })
}

router.post("/:customerId/add-customerpage", (req, res) => {
  // getting the current time
  let date = getTodaysDate();
  req.body.createdDate = `${date}`;
  req.body.paid = false;
  req.body.owner = (req.user._id? req.user._id : req.user.id);

  
  
  Customer.find({ owner:req.body.owner, name:req.body.customer})
    .then((customer) => {
      Invoice.create(req.body)
      .then(res.redirect(`/customers/`+req.params.customerId))
      .catch(console.error);

      generateLog(req.body.owner,req.body,"Invoice created from customer page")
      

    })
    .catch(console.error);
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
            pageid:req.params.id,
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

  generateLog(req.body.owner,req.body,"New Customer created.")
      
});

router.delete("/:customerId", (req, res) => {
  Customer.findOneAndDelete({
    _id: req.params.customerId,
    owner: (req.user._id? req.user._id : req.user.id),
  }).then((customer) => {
    generateLog(customer.owner,customer,"Customer and invoices deleted");
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
                  generateLog(customer.owner,req.body,"Customer updated ");
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
