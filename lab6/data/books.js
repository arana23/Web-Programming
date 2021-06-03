const mongoCollections = require('../config/mongoCollections');
const books = mongoCollections.books;
let { ObjectId } = require('mongodb');

module.exports = {
    async get(id) {
      if (!id) throw new Error('You must provide an id to search for');
      if (typeof id !== 'string' || id === "") throw new Error('Id not valid input');
  
      //convert to correct type
      let parsedId = ObjectId(id);
      const bookCollection = await books();
      const book = await bookCollection.findOne({ _id: parsedId });
      if (book === null) throw 'No book with that id';
      let x = parsedId.toString(); // converts the Object ID to string
  
      return {
        _id: x,
        title: book.title,
        author: book.author,
        genre: book.genre,
        datePublished: book.datePublished,
        summary: book.summary,
        reviews: book.reviews,
    };
    },
  
    async create(title, author, genre, datePublished, summary, reviews) {
      if (!title || !author || !genre || !datePublished || !summary || !reviews) throw new Error("All fields need to have valid values");
      if (typeof title !== 'string' || typeof summary !== 'string') throw new Error("title and summary must be 'string's");
      if (title === "" || summary === "") throw new Error("title or summary can't be empty");

      if (!Array.isArray(genre)) throw new Error("genre must be an array")
      const result = genre.filter(word => typeof word === 'string');
      if (result.length != genre.length) throw new Error("genre's elements must be valid 'string'")
      const res2 = result.filter(word => word === "")
      if (res2.length > 0) throw new Error("genre has empty strings")

      if (!Array.isArray(reviews)) throw new Error("reviews must be an array")

      if (typeof author !== 'object') throw new Error("Author is not an object")
      if (!author.authorFirstName || typeof author.authorFirstName !== 'string' || author.authorFirstName === "") throw new Error("author.authorFirstName has invalid input")
      if (!author.authorLastName || typeof author.authorLastName !== 'string' || author.authorLastName === "") throw new Error("author.authorLastName has invalid input")
      
      if (isNaN(Date.parse(datePublished))) throw new Error("Date is invalid")
  
      //title, author, genre, datePublished, summary, reviews
      let newbook = {
        title: title,
        author: author,
        genre: genre,
        datePublished: datePublished,
        summary: summary,
        reviews: reviews,
      };
  
      const bookCollection = await books();
      const insertInfo = await bookCollection.insertOne(newbook);
  
      if (insertInfo.insertedCount === 0) throw 'Could not add book';
  
      const newId = insertInfo.insertedId;
      let x = newId.toString(); // converts the Object ID to string
      const book = await this.get(x);
      return book;
      //return newbook;
    },
  
    async getAll() {
      const bookCollection = await books();
      
      const bookList = await bookCollection.find({}).toArray();
      const realList = [];
      //title, author, genre, datePublished, summary, reviews
      for(let x = 0; x<bookList.length; x++){
        let temp = bookList[x];
        let temp2 = {
          _id: temp._id.toString(),
          title: temp.title,
          author: temp.author,
          genre: temp.genre,
          datePublished: temp.datePublished,
          summary: temp.summary,
          reviews: temp.reviews
        };
       // console.log(typeof temp2._id);
        realList.push(temp2);
      }
      return realList;
    },
  
    async delete(id) {
      if (!id) throw 'You must provide an id to search for';
      if (typeof id !== 'string' || id === "") throw new Error('Id not valid input');
      const temp = await this.get(id);
      const name = temp.title;
  
      const bookCollection = await books();
      let parsedId = ObjectId(id);
      const deletionInfo = await bookCollection.deleteOne({ _id: parsedId });
  
      if (deletionInfo.deletedCount === 0) {
        throw `Could not delete book with id of ${id}`;
      }
      //{"bookId": "603d965568567f396ca44a72", "deleted": true}.
      return name +' was successfully deleted';
    },
  
    async update(id, vals) {
      if (!id) throw new Error('You must provide an id to search for');
      if (typeof id !== 'string' || id === "") throw new Error('Id not valid input');
  
      if (!vals) throw new Error('You must provide values you want to update');
      if (typeof vals !== 'object' || JSON.stringify(vals)==='{}') throw new Error('values are not valid input');
      let parsedId = ObjectId(id);
  
      const bookCollection = await books();
      const updatedbook = {};
      //title, author, genre, datePublished, summary, reviews
      if(vals.hasOwnProperty('title')) updatedbook.title=vals.title;
      if(vals.hasOwnProperty('author')) updatedbook.author=vals.author;
      if(vals.hasOwnProperty('genre')) updatedbook.genre=vals.genre;
      if(vals.hasOwnProperty('datePublished')) updatedbook.datePublished=vals.datePublished;
      if(vals.hasOwnProperty('summary')) updatedbook.summary=vals.summary;
      //if(vals.hasOwnProperty('reviews')) updatedbook.title=vals.reviews;

      const updatedInfo = await bookCollection.updateOne(
        { _id: parsedId },
        { $set: updatedbook }
      );
      if (updatedInfo.modifiedCount === 0) {
        throw 'could not update book successfully';
      }
  
      return await this.get(id);
    }
  };