const dbConnection = require('./config/mongoConnection');
const data = require('./data');
const books = data.books;
const mongoCollections = require('./config/mongoCollections');
const bookCol = mongoCollections.books;
let { ObjectId } = require('mongodb');

async function main() {
  const db = await dbConnection();
  const bookCollection = await bookCol();

  //await db.dropDatabase();
  books.create("Hello World", {authorFirstName: "Girl", authorLastName: "WhoCode"},["sci-fi", "nonfiction"], "06/23/2010","idek i just want this to work plz",[{},{},{}]);
  books.create("Rev Test", {authorFirstName: "Aparajita", authorLastName: "Rana"},["sci-fi", "comedy"], "04/23/2000","aparajita tries making a book",[{"title": "This book scared me to death!!",
  "reviewer": "scaredycat",
  "rating": 5,
  "dateOfReview": "10/7/2020",
  "review": "This book was creepy!!! It had me at the edge of my seat.  One of Stephan King's best work!"}]);
  
  await bookCollection.insertOne(
    { 
      _id: ObjectId("603d965568567f396ca44a72"),
      title: "The Shining",
      author: {authorFirstName: "Stephen", authorLastName: "King"},
      genre: ["Novel", "Horror fiction", "Gothic fiction", "Psychological horror", "Occult Fiction"],
      datePublished: "1/28/1977",
      summary: "Jack Torrance’s new job at the Overlook Hotel is the perfect chance for a fresh start. As the off-season caretaker at the atmospheric old hotel, he’ll have plenty of time to spend reconnecting with his family and working on his writing. But as the harsh winter weather sets in, the idyllic location feels ever more remote . . . and more sinister. And the only one to notice the strange and terrible forces gathering around the Overlook is Danny Torrance, a uniquely gifted five-year-old..",
      reviews: [{ 
      _id: ObjectId("603d992b919a503b9afb856e"),
      title: "This book scared me to death!!",
      reviewer: "scaredycat",
      rating: 5,
      dateOfReview: "10/7/2020",
      review: "This book was creepy!!! It had me at the edge of my seat.  One of Stephan King's best works!"
    }] //array of all the reviews for this book
    }
  )
  console.log('Done seeding database');

  //await db.serverConfig.close();
}

//main();

module.exports = main;