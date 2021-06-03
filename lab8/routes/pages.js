const express = require('express');
const axios = require('axios')
//var hbs = require('express-handlebars');
const router = express.Router();

//reference: https://stackoverflow.com/questions/21470267/interpret-html-string-using-handlebars-but-escape-script-tags
/* Handlebars.registerHelper('strip-scripts', function(context) {
    var html = context;
    // context variable is the HTML you will pass into the helper
    // Strip the script tags from the html, and return it as a Handlebars.SafeString
    return new Handlebars.SafeString(html);
  }); */

router.get('/', async (req, res) => {
    try {
        //res.sendFile('showfinder.html');
        res.render("pages/showfinder", {title: "Show Finder"})
      } catch (e) {
        res.status(400).json({ error: 'show finder not found' });
      }
  });

router.post("/search", async (req,res) => {
    if(!req.body){
        res.status(400).render("pages/error");
        return;
    }
    const {searchTerm} = req.body
    if(searchTerm.trim().length === 0){
        res.status(400).render("pages/error");
        return;
    }
    try{
        //const {searchTerm} = req.body
        const {data} = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`);
        //only get the first 20 (if less, shouldn't error)
        data.slice(0, 20);
        res.render("pages/showsfound",{title: "Shows Found", showAmount:(data.length !== 0), shows: data, searchTerm: searchTerm});
    }
    catch(e){
        res.sendStatus(500);
    }
});

router.get("/shows/:id",async (req,res) => {
    try{
        const {id} = req.params
      
        if (isNaN(id)) {
            res.status(404).render("pages/error");
        }
        // assume it's a float first
        if ((!Number.isInteger(parseFloat(id))) || (parseFloat(id) < 0)) {
            //res.status(404).json({ message: 'Error: ID must be a positive whole number' });
            res.status(404).render("pages/error");
        }
    
        const {data} = await axios.get(`http://api.tvmaze.com/shows/${id}`);
        data.summary = data.summary.replace(/(<([^>]+)>)/gi, "");

        res.render("pages/showfound",{title: data.name, show: data});
    }
    catch(e){
        res.sendStatus(500);
    }
});


module.exports = router;