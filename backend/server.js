// https://www.geeksforgeeks.org/login-form-using-node-js-and-mongodb/

require("dotenv").config();



const express = require("express");
const cors = require("cors");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");
const app = express();

const flash = require('connect-flash');

app.use(flash());

app.use(
  require("express-session")({
    secret: process.env.DEV_USER_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(expressLayouts);

app.set("layout login", false);
app.set("layout register", false);
app.set("layout forgot", false);
app.set("layout confirmation", false);
app.set("layout reset", false);

app.use(cors());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

app.set("port", process.env.PORT || 8001);

app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${app.get("port")} 🌟`);
});

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/register", (req, res) => {
  res.render("register", { layout: "register" });
});

(mongoose = require("mongoose")), (passport = require("passport"));
const LocalStrategy = require("passport-local").Strategy;

User = require("./models/user-model");

//Showing login form
app.get("/login", function (req, res) {
  res.render("login", { layout: "login" });
});

//Handling user login
app.post( "/login",
  passport.authenticate("local", {
    successRedirect: "/customers",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

app.set("view engine", "ejs");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post("/register", function (req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  User.register(
    new User({ username: username, email: email }),
    password,
    function (err, user) {
      if (err) {
        console.log(err);
        return res.render('confirmation',{ layout: "confirmation",message:err});
      }

      passport.authenticate("local")(req, res, function () {
        res.render("login", { layout: "login" });
      });
    }
  );
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    //req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    res.redirect("/login");
  }
}

const customerController = require("./controllers/customerController.js");
app.use("/customers", checkAuthentication, customerController);

const invoiceController = require("./controllers/invoiceController.js");
app.use("/invoices", checkAuthentication, invoiceController);

// rate limit to stop bruteforce attacks
const rateLimit =  require('express-rate-limit')

const loginlimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 5, // Limit each IP to 5 requests per `window` (here, per 10 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use('/login', loginlimiter)




const nodemailer = require('nodemailer');

app.get("/confirmation", function (req, res) {
  res.render("confirmation", { layout: "confirmation" });
});

app.get("/forgot", function (req, res) {
  res.render("forgot", { layout: "forgot" });
});

app.get("/reset", function (req, res) {
  res.render("reset", { layout: "reset" });
});

// source https://stackoverflow.com/questions/1497481/javascript-password-generator
function generatePassword() {
  var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

app.post("/forgot", function (req, res) {

  User.findByUsername(req.body.username).then(function(sanitizedUser){
    if (sanitizedUser){
      let temp = generatePassword()
        sanitizedUser.setPassword(temp, function(){
            sanitizedUser.save();


    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
      user: process.env.DEV_EMAIL,
      pass: process.env.DEV_PASSWORD
        }
      });

      var mailOptions = {
      from: process.env.DEV_EMAIL,
      to: sanitizedUser.email,
      subject: 'CRM Password Reset',
      text: `Temp password: ${temp}`
        };



    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
            res.render('confirmation',{ layout: "confirmation",message:"Temporary Password Sent"});
        });
    } else {
      res.render('confirmation',{ layout: "confirmation",message:"This user does not exist!"});
    }
},function(err){
    console.error(err);
})


});




app.post("/reset", function (req, res) {

  User.findByUsername(req.body.username).then(function(sanitizedUser){
    if (sanitizedUser){
      
        sanitizedUser.changePassword(req.body.oldpassword, req.body.newpassword, function(){
            sanitizedUser.save();


            res.render('confirmation',{ layout: "confirmation",message:"Password Reset!"});
        });
    } else {
      res.render('confirmation',{ layout: "confirmation",message:"This user does not exist!"});

    }
},function(err){
    console.error(err);
})


});