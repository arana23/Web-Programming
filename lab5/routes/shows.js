const express = require('express');
const axios = require('axios')
const router = express.Router();

router.get('/', async (req, res) => {
    try {
    const {data} = await axios.get("http://api.tvmaze.com/shows")
    res.json(data);
  } 
  catch (e) {
    // Something went wrong with the server!
    res.status(500).send();
  }
});

router.get('/:id', async (req, res) => {
    try {
    //Route parameters are named URL segments that are used to capture the values specified at their position in the URL
      const {id} = req.params
      
      if (isNaN(id)) {
        res.status(404).json({ message: 'Error: Invalid ID input' });
      }
      // assume it's a float first
      if ((!Number.isInteger(parseFloat(id))) || (parseFloat(id) < 0)) {
        res.status(404).json({ message: 'Error: ID must be a positive whole number' });
      }
  
      const {data} = await axios.get(`http://api.tvmaze.com/shows/${id}`)
      res.json(data);
    } 
    catch (e) {
        // Something went wrong with the server!
        res.status(500).send();
    }
  });

module.exports = router;