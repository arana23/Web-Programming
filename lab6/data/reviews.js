const mongoCollections = require('../config/mongoCollections');
const books = mongoCollections.books;
const booksFunc = require("./books");
let { ObjectId, ObjectID } = require('mongodb');

module.exports = {
    async get(id) {
      if (!id) throw new Error('You must provide an id to search for');
      if (typeof id !== 'string' || id === "") throw new Error('Id not valid input');
  
      //convert to correct type
      let parsedId = ObjectId(id);
      const bookTotal = await booksFunc.getAll();
      const reviewList = bookTotal.map(temp => temp.reviews);
      const reviewTotal = reviewList.flat();
      //reference: https://stackoverflow.com/questions/55458675/filter-is-not-a-function
      const reviewA = reviewTotal.filter(y => y._id == id)[0];

      if (reviewA === null) throw new Error('No review with that id');
      let x = parsedId.toString(); // converts the Object ID to string
  
      return {
        _id: x,
        title: reviewA.title,
        reviewer: reviewA.reviewer,
        rating: reviewA.rating,
        dateOfReview: reviewA.dateOfReview,
        review: reviewA.review
    };
    },
  
    async create(id, title, reviewer, rating, dateOfReview, review) {
      if (!title || !reviewer || !rating || !dateOfReview || !review) throw new Error("All fields need to have valid values");
      if (typeof title !== 'string' || typeof dateOfReview !== 'string' || typeof reviewer !== 'string') throw new Error("title, dateOfReview, and reviewer must be 'string's");
      if (title === "" || reviewer === "" || dateOfReview === "") throw new Error("title, dateOfReview or reviewer can't be empty");

      if (!Number.isInteger(rating) || rating<1 || rating>5) throw new Error("Rating is invalid input, must be a number")
      const checkDate = new Date(dateOfReview)
      if(!(checkDate instanceof Date) || isNaN(checkDate.valueOf()) || isNaN(checkDate)) throw new Error("Date is invalid")
      
      let reviewid = ObjectId();
      let newreview = {
        _id: reviewid,
        title: title,
        reviewer: reviewer,
        rating: rating,
        dateOfReview: dateOfReview,
        review: review
      };
      try{
      const book = await booksFunc.get(id);
      const bookid = ObjectId(id);  
      const bookCollection = await books();

      const insertInfo = await bookCollection.updateOne(
        { _id: bookid },
        { $set: { reviews: [newreview, ...book.reviews]} }
      );
  
      if (insertInfo.insertedCount === 0) throw 'Could not add book';
      const bookcheck = await booksFunc.get(id);
      return bookcheck;
    } catch (error){
      throw "Could not update reviews";
    }
    },
  
    async getAll() {
      const bookTotal = await booksFunc.getAll();
      const reviewList = bookTotal.map(temp => temp.reviews);
      const realList = [];
      //title, author, genre, datePublished, summary, reviews
      for(let x = 0; x<reviewList.length; x++){
        let temp = reviewList[x];
        let temp2 = {
          _id: temp._id.toString(),
          title: temp.title,
          reviewer: temp.reviewer,
          rating: temp.rating,
          dateOfReview: temp.dateOfReview,
          review: temp.review
        };
        realList.push(temp2);
      }
      return realList;
    },
  
    async delete(id) {
      if (!id) throw 'You must provide an id to search for';
      if (typeof id !== 'string' || id === "") throw new Error('Id not valid input');
      
      const bookTotal = await booksFunc.getAll();
      const bookCollection = await books();
      let deletion = null;

      for (let i = 0; i<bookTotal.length; i++){

        for(let j = 0; j < bookTotal[i].reviews.length; j++){

          if(bookTotal[i].reviews[j]._id==id){
            deletion = bookTotal[i];
            break;
          }
        }
      }
      if(deletion == null){
        throw "Review with given ID not found"
      }

      const removedReviews = deletion.reviews.filter(temp => temp._id === id);

      console.log(removedReviews)

      const bookid = ObjectId(deletion._id)
      
      const insertInfo = await bookCollection.updateOne(
        { _id: bookid },
        { $set: { reviews: removedReviews} }
      );
  
      if (insertInfo.insertedCount === 0) throw 'Could not add book';
      return true;
    },
  
    async update(id, vals) {
      if (!id) throw new Error('You must provide an id to search for');
      if (typeof id !== 'string' || id === "") throw new Error('Id not valid input');
      if(vals.rating>5 || vals.rating<1) throw new Error("Rating is out of bounds")
      if (!vals) throw new Error('You must provide the items you want to update to your review');

      const totalBooks = await booksFunc.getAll()

      let book = null;

      for(let i = 0; i < totalBooks.length; i++){
        if(totalBooks[i]._id === id){
          book = totalBooks[i]
        }      
      }
      let newRev = {_id: ObjectID(), ...vals}
      let newRevs = [newRev, ...book.reviews]
      const bookCollection = await books();

      const bookId = ObjectID(book._id)

      const updateBook = await bookCollection.updateOne(
        { _id: bookId},
        { $set: {reviews: newRevs}})

      if (updateBook.modifiedCount === 0) {
        throw 'could not update review successfully';
      }
  
      return await booksFunc.get(id);
    }
  };

  