//I pledge my honor that I have abided byt the Stevens Honor System - Aparajita Rana 
const session = require('express-session');
const express = require("express");
const app = express();
const configRoutes = require("./routes");
const exphbs = require("express-handlebars");
app.use('/public', express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    name: 'AuthCookie',
    secret: 'supersecretstring',
    resave: false,
    saveUninitialized: true
  }));

app.engine('handlebars', exphbs({defaultLayout : "main"}));

app.set('view engine', 'handlebars');

//logging middleware
app.use('*',(req, res, next)=>{
    console.log("[%s]: %s %s (%s)", new Date().toUTCString(), req.method, req.originalUrl, `${req.session.user ? "Authenticated User" : "Non-Authenticated User"}`);
    next();
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});