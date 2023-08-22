const mongoose = require("mongoose");
require("dotenv").config();

const userName = process.env.ATLAS_USER_NAME;
const password = process.env.ATLAS_PASSWORD;
console.log(userName);
mongoose
  .connect(
    `mongodb+srv://${userName}:${password}@cluster0.x6eafhe.mongodb.net/`
  )
  .then(() => console.log("connected to MongoDb Atlas!"))
  .catch((error) => console.log(`could not connect to mongoDb: ${error}`));
