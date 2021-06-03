const express = require('express');
const app = express();
const configRoutes = require('./routes');
const dbConnection = require('./config/mongoConnection')
const seed = require('./seed');


app.use(express.json());

configRoutes(app);

app.listen(3000, () => {
  seed();
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});

process.on("SIGINT", async function () {
  try {
    const db = await dbConnection();
    await db.collection("books").drop();
    console.log("Successfully removed books collection!");
    return process.exit(1);
  } catch(err) {
    console.log(err)
    return process.exit(1);
  }
  
});

