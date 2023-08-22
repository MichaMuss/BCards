const express = require("express");
const chalk = require("chalk");
const cors = require("./middlewares/cors");
const logger = require("./logger/loggerService");
const router = require("./router/router");
const connectToDb = require("./DB/dbService");
const { handleError } = require("./utils/handleErrors");
const User = require("./users/models/mongodb/User");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8181;

app.use(cors);
app.use(logger);
app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  res.send("welcome to cards server");
});
app.use((err, req, res, next) => {
  handleError(res, 500, "Internal error " + err.message);
});

app.listen(PORT, () => {
  console.log(chalk.yellow("The server is listening to port " + PORT));
  connectToDb();
});
