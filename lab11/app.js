//I pledge my honor that I have abided byt the Stevens Honor System - Aparajita Rana 
const express = require('express');
const app = express();

const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'ejs');


configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});