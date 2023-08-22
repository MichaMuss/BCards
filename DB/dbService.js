const config = require("config");

const ENVIRONMENT = config.get("ENVIRONMENT");

const connectToDb = () => {
  if (ENVIRONMENT === "development")
    require("./mongodb/connectToMongodbLocally");
  if (ENVIRONMENT === "production") require("./mongodb/connectToAtlas");
};

module.exports = connectToDb;
