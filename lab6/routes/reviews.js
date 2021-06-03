const express = require('express');
const router = express.Router();
const bookData = require('../data/books');
const reviewData = require('../data/reviews');
//const bookData = data.reviews;

router.get('/:id', async (req, res) => {
    try {
      const thisBook = await bookData.get(req.params.id);
      if(thisBook.reviews.length==0){
        res.status(404).json({ error: 'No reviews for this book' });
        return;
      }
      res.json(thisBook.reviews);
      res.status(200).json({ message: "Book review successfully found"});
    
    } catch (e) {
      res.status(404).json({ error: 'Book not found' });
    }
  });

  router.post('/:id', async (req, res) => {
    const body = req.body;
    if (!body.title) {
        res.status(400).json({ error: 'You must provide review title' });
        return;
    }
    if (!body.reviewer) {
        res.status(400).json({ error: 'You must provide reviewer' });
        return;
    }
    if (!body.rating) {
        res.status(400).json({ error: 'You must provide rating' });
        return;
    }
    if (!body.dateOfReview) {
        res.status(400).json({ error: 'You must provide dateOfReview' });
        return;
    }
    if (!body.review) {
        res.status(400).json({ error: 'You must provide review' });
        return;
    }
    try {
      await bookData.get(req.params.id);
      //res.json(post);
      //res.status(200).json({ message: "Book successfully found"});
    } catch (e) {
      res.status(404).json({ error: 'Book not found' });
    }

    try {
      const updatedBook = await reviewData.update(req.params.id, body);
      res.json(updatedBook);
      res.status(200).json({ message: "Book reviews successfully updated"});
    
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });


  router.get('/review/:id', async (req, res) => {

    const reviewId = req.params.id
    try {
       const review = await reviewData.get(reviewId)
       res.status(200).json(review)
    } catch (error) {
      res.status(404).json({ message: "Review ID not found"});
    }

  })


  router.delete('/:id', async (req, res) => {
    const reviewId = req.params.id

    try {
      const review = await reviewData.delete(reviewId)

      if(review){
        res.status(200).json({
          reviewId: reviewId, 
          deleted: true
        })
      }
   } catch (error) {
     res.status(500).json({ error: e });
   }
  })
    module.exports = router;