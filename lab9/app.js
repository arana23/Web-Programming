//Reference: https://codeforgeek.com/render-html-file-expressjs/

const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.use(express.static(path.join(__dirname, 'public')));

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/interface.html'));

});

router.get("*", (req, res) => {
    res.redirect('/');
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log("We've now got a server!");
console.log('Your routes will be running on http://localhost:3000');