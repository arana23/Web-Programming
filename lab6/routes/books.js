const express = require('express');
//const axios = require('axios')
const router = express.Router();
const bookData = require('../data/books');
//const bookData = data.books;

router.get('/', async (req, res) => {
    try {
        const books = await bookData.getAll();
        const vals = books.map(({_id, title}) => {return {_id, title};});
        res.json(vals);
      } catch (e) {
        res.status(400).json({ error: 'Books not found' });
      }
  });

  router.post('/', async (req, res) => {
    const booksData = req.body;
    if (!booksData.title) {
        res.status(400).json({ error: 'You must provide book post title' });
        return;
    }
    if (!booksData.author) {
        res.status(400).json({ error: 'You must provide book author' });
        return;
    }
    if (!booksData.genre) {
        res.status(400).json({ error: 'You must provide a genre' });
        return;
    }
    if (!booksData.datePublished) {
        res.status(400).json({ error: 'You must provide a published date' });
        return;
    }
    if (!booksData.summary) {
        res.status(400).json({ error: 'You must provide a summary' });
        return;
    }
/*     if (!booksData.reviews) {
        res.status(400).json({ error: 'You must provide reviews' });
        return;
    } */
    booksData.reviews = []
    try {
        //booksData.reviews = []
        //const { title, author, genre, datePublished, summary, reviews } = bookData;
        const newBook = await bookData.create(booksData.title, booksData.author, booksData.genre, booksData.datePublished, booksData.summary, booksData.reviews);
        res.json(newBook);
        res.status(200).json({ message: "Book successfully created"});
    } catch (e) {
        res.status(500).json({ error: e });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const post = await bookData.get(req.params.id);
      res.json(post);
      res.status(200).json({ message: "Book successfully found"});
    
    } catch (e) {
      res.status(404).json({ error: 'Book not found' });
    }
  });
// ALL values are filled out
  router.put('/:id', async (req, res) => {
    const updatedData = req.body;
    if (!updatedData) {
      res.status(400).json({ error: 'You must enter values to update' });
      return;
    }
    if (!updatedData.title) {
        res.status(400).json({ error: 'You must enter title to update' });
        return;
    }
    if (!updatedData.author) {
        res.status(400).json({ error: 'You must enter author to update' });
        return;
    }
    if (!updatedData.genre) {
        res.status(400).json({ error: 'You must enter genre to update' });
        return;
    }
    if (!updatedData.datePublished) {
        res.status(400).json({ error: 'You must enter datePublished to update' });
        return;
    }
    if (!updatedData.summary) {
        res.status(400).json({ error: 'You must enter summary to update' });
        return;
    }

    try {
      await bookData.get(req.params.id);
    } catch (e) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }

    try {
      //updatedData.reviews=bookData.get(req.params.id).reviews;
      const updatedBook = await bookData.update(req.params.id, updatedData);
      res.json(updatedBook);
      res.status(200).json({ message: "Book successfully updated"});
    
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });


  router.patch('/:id', async (req, res) => {
    const updatedData = req.body;
    if (!updatedData) {
      res.status(400).json({ error: 'You must enter values to update' });
      return;
    }
    if (updatedData.reviews) {
        res.status(400).json({ error: 'You cannot edit reviews' });
        return;
      }
    try {
      await bookData.get(req.params.id);
    } catch (e) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }
  
    try {
        if(updatedData.genre){

          const bookcheck = await bookData.get(req.params.id);
          const oldgenres = bookcheck.genre;
          const newgenres = updatedData.genre;
          const temp = newgenres.concat(oldgenres);
          updatedData.genre = [...new Set(temp)];
        }
      const updatedBook = await bookData.update(req.params.id, updatedData);
      res.json(updatedBook);
      res.status(200).json({ message: "Book successfully updated"});
    
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });

  router.delete('/:id', async (req, res) => {
    if (!req.params.id) throw 'You must specify an ID to delete';
    try {
      await bookData.get(req.params.id);
    } catch (e) {
      res.status(404).json({ error: 'ID not found' });
      return;
    }
  
    try {
      await bookData.delete(req.params.id);
      //const ret = {"bookId": req.params.id, "deleted": true};
      res.status(200).json({"bookId": req.params.id, "deleted": true});
    } catch (e) {
      res.sendStatus(500);
    }
  });

module.exports = router;