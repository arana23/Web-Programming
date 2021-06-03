const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;
let { ObjectId } = require('mongodb');

module.exports = {
  async get(id) {
    if (!id) throw new Error('You must provide an id to search for');
    if (typeof id !== 'string' || id === "") throw new Error('Id not valid input');

    //convert to correct type
    let parsedId = ObjectId(id);
    const movieCollection = await movies();
    const movie = await movieCollection.findOne({ _id: parsedId });
    if (movie === null) throw 'No movie with that id';
    let x = parsedId.toString(); // converts the Object ID to string

    return {
      _id: x,
      title: movie.title,
      plot: movie.plot,
      rating: movie.rating,
      runtime: movie.runtime,
      genre: movie.genre,
      cast: movie.cast,
      info: movie.info
  };
  },

  async create(title, plot, rating, runtime, genre, cast, info) {
    if (!title || !plot || !rating || !runtime || !genre || !cast || !info) throw new Error("All fields need to have valid values");
    if (typeof title !== 'string' || typeof plot !== 'string' || typeof rating !== 'string' || typeof runtime !== 'string' || typeof genre !== 'string') throw new Error("title, plot, rating, runtime, and genre must be 'string's");
    if (title === "" || plot === "" || rating === "" || runtime === "" || genre === "") throw new Error("title, plot, rating, runtime, or genre can't be empty");
    if (!Array.isArray(cast)) throw new Error("cast must be an array")
    const result = cast.filter(word => typeof word === 'string');
    if (result.length < 0) throw new Error("Cast does not have at least one element in it that is a valid 'string'")
    const res2 = result.filter(word => word === "")
    if (res2.length > 0) throw new Error("Cast empty strings")
    if (typeof info !== 'object') throw new Error("Info is not an object")
    if (!info.director || typeof info.director !== 'string' || info.director === "") throw new Error("info.director has invalid input")
    if (!info.yearReleased) throw new Error("info is null")
    if (info.yearReleased.toString().length !== 4) throw new Error("info.yearReleased must have a length of 4")
    if (info.yearReleased < 1930 || info.yearReleased > 2026) throw new Error("yearReleasednumber is out of bounds")

    let newMovie = {
      title: title,
      plot: plot,
      rating: rating,
      runtime: runtime,
      genre: genre,
      cast: cast,
      info: info
    };

    const movieCollection = await movies();
    const insertInfo = await movieCollection.insertOne(newMovie);

    if (insertInfo.insertedCount === 0) throw 'Could not add movie';

    const newId = insertInfo.insertedId;
    let x = newId.toString(); // converts the Object ID to string
    const movie = await this.get(x);
    return movie;
    //return newMovie;
  },

  async getAll() {
    const movieCollection = await movies();
    //movieCollection.forEach(element => await this.get(element._id));
    //await movieCollection.find({}).toArray();
    const movieList = await movieCollection.find({}).toArray();
    const realList = [];
    for(let x = 0; x<movieList.length; x++){
      let temp = movieList[x];
      let temp2 = {
        _id: temp._id.toString(),
        title: temp.title,
        plot: temp.plot,
        rating: temp.rating,
        runtime: temp.runtime,
        genre: temp.genre,
        cast: temp.cast,
        info: temp.info
      };
      realList.push(temp2);
    }
    return realList;
  },

  async remove(id) {
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string' || id === "") throw new Error('Id not valid input');
    const temp = await this.get(id);
    const name = temp.title;

    const movieCollection = await movies();
    let parsedId = ObjectId(id);
    const deletionInfo = await movieCollection.deleteOne({ _id: parsedId });

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete movie with id of ${id}`;
    }
    return name +' was successfully deleted';
  },

  async rename(id, newTitle) {
    if (!id) throw new Error('You must provide an id to search for');
    if (typeof id !== 'string' || id === "") throw new Error('Id not valid input');

    if (!newTitle) throw new Error('You must provide the title to your movie');
    if (typeof newTitle !== 'string' || newTitle === "") throw new Error('Title not valid input');
    let parsedId = ObjectId(id);

    const movieCollection = await movies();
    const updatedMovie = {
      title: newTitle
    };

    const updatedInfo = await movieCollection.updateOne(
      { _id: parsedId },
      { $set: updatedMovie }
    );
    if (updatedInfo.modifiedCount === 0) {
      throw 'could not update movie successfully';
    }

    return await this.get(id);
  }
};