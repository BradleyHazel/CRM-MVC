require('dotenv').config()

const express = require('express')
const cors = require('cors')
const methodOverride = require("method-override")
const expressLayouts = require('express-ejs-layouts');
const app = express();


app.use(require("express-session")({
  secret: process.env.DEV_USER_SECRET,
  resave: false,
  saveUninitialized: false
}));


app.use(expressLayouts);

app.set("layout login", false);
app.set("layout register", false);

app.use(cors())
app.use(methodOverride('_method'))
app.set("view engine", "ejs")

app.set("port", process.env.PORT || 8001);

app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${app.get("port")} 🌟`);
});

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get('/',(req,res)=>{
  res.redirect('/login')
})


app.get('/register',(req,res)=>{
  res.render('register', { layout: 'register' });
})

mongoose = require("mongoose"),
passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

User = require("./models/user-model");
 

//Showing login form
app.get("/login", function (req, res) {
  res.render("login", { layout: 'login' });
});

//Handling user login
app.post("/login", passport.authenticate("local", {
  successRedirect: "/customers",
  failureRedirect: "/login"
}), function (req, res) {
});
    
app.set("view engine", "ejs");
 
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(passport.initialize());
app.use(passport.session());
 

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.post("/register", function (req, res) {
  var username = req.body.username
  var email = req.body.email
  var password = req.body.password
  User.register(new User({ username: username, email: email}),
          password, function (err, user) {
      if (err) {
          console.log(err);
          return res.render("register");
      }

      passport.authenticate("local")(
          req, res, function () {
          res.render("login", { layout: 'login' });
      });
  });
});





app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});


function checkAuthentication(req,res,next){
  if(req.isAuthenticated()){
      //req.isAuthenticated() will return true if user is logged in
      next();
  } else{
      res.redirect("/login");
  }
}

const customerController = require('./controllers/customerController.js');
app.use('/customers',checkAuthentication, customerController);

const invoiceController = require('./controllers/invoiceController.js');
app.use('/invoices',checkAuthentication, invoiceController);