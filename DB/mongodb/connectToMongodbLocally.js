const mongoose = require("mongoose");
const config = require("config");

mongoose
  //.connect("mongodb://127.0.0.1:27017/card_test_db")
  .connect("mongodb://127.0.0.1:27017/business_card_app")
  .then(() => {
    
    console.log("connected to MongoDb Locally!");

    const ENVIRONMENT = config.get("ENVIRONMENT");
    if (ENVIRONMENT === "development"){
      require("./initializeDbData");
    }

  } 
  ).catch((error) => console.log(`could not connect to mongoDb: ${error}`));

  
    
  