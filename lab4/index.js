const movies = require('./data/movies');
const connection = require('./config/mongoConnection');

const main = async () => {
    const db = await connection();
    
    const firstmovie = await movies.create("Black Panther","After the death of his father, T'Challa returns home to the African nation of Wakanda to take his rightful place as king.","PG-13", "2hr 14min","Sci-Fi",["Chadwick Boseman","Michael B. Jordan"],{director: "Ryan Coogler", yearReleased: 2018});
    console.log(firstmovie);
    const secondmovie = await movies.create("Aparajita","A movie about Aparajita's life","G", "24hr 0min","Sci-Fi",["Aparajita Rana"],{director: "Aparajita Rana", yearReleased: 2020});
    const allMovies = await movies.getAll();
    console.log(allMovies);
    const testinmovie = await movies.create("Movie Testing","Web Dev MongoDb of movies","R", "2hr 30 min","Sci-Fi",["Patrick Hill"],{director: "Patrick Hill", yearReleased: 2021});
    console.log(testinmovie);
    const renamedTest = await movies.rename(firstmovie._id, "Renamed 1st Movie");
    console.log(renamedTest);
    const removemovie = await movies.remove(secondmovie._id);
    console.log(removemovie);
    const allMovies2 = await movies.getAll();
    console.log(allMovies2);

    try {
        await movies.create("yikes");
    } catch(e) {
        console.log("Create errors successfully");
        console.log(e);
    }
   
    try {
        await movies.remove("123");
    } catch(e) {
        console.log("Remove errors successfully");
        console.log(e);
    }

    try {
        await movies.rename("Renamed Movie Movie");
    } catch(e) {
        console.log("Rename errors successfully");
        console.log(e);
    }

    try {
        await movies.rename("603eeb331348a58596d274bb", 111);
    } catch(e) {
        console.log("Rename errors again successfully");
        console.log(e);
    }

    try {
        await movies.get("2382194ssj12fj39jf");
    } catch(e) {
        console.log("Get errors successfully");
        console.log(e);
    }

    await db.serverConfig.close();
};
main();
