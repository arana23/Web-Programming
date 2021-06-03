const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const aboutme = {
      "name": "Aparajita Rana",
      "cwid": "10440384",
      "biography": "Aparajita Rana was born April 23rd, 2000 in California. She moved around through California, Georgia, and Minnesota before settling into New Jersey when she was 4. \n Now she is a 3/4 Computer Science student at Stevens Institute of Technology. She is President of Stevens Women in CS and a sister in Sigma Delta Tau. She wants COVID to end because she misses hanging out with large groups of people and hugs.",
      "favoriteShows": ["Person of Interest", "Gossip Girl", "WandaVision", "House of Cards", "Criminal Minds"]
    }
    res.json(aboutme);
  } 
  catch (e) {
    res.status(500).send();
  }
});

module.exports = router;