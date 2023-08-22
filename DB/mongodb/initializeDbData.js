const { registerUser } = require("../../users/models/usersAccessDataService");
const { generateUserPassword } = require("../../users/helpers/bcrypt");
const Card = require("../../cards/models/mongodb/card");
const User = require("../../users/models/mongodb/User");
const config = require("config");
const siteUrl = config.get("defaultSiteUrl");

const initializeCards = [{
    "title": "microsoft",
    "subtitle": "be what's next",
    "description": "Microsoft Corporation is an American multinational technology corporation. Microsoft's best-known software products are the Windows line of operating systems, the Microsoft 365 suite of productivity applications.",
    "phone": "050-5554444",
    "email": "maggie@bcards.com",
    "web": "http://www.microsoft.com/",
    "image": {
      "url": "http://127.0.0.1:3000/assets/images/cards/microsoft.jpg",
      "alt": "microsoft headquarter",
    },
    "address": {
      "state": "Washington",
      "country": "united states",
      "city": "redmond",
      "street": "one microsoft way",
      "houseNumber": 6,
      "zip": 98052,
    },
    "bizNumber": 2414475,
    "likes": []
  },
  {
    "title": "apple",
    "subtitle": "think different",
    "description": "Apple is an American multinational technology company. it's the world's largest technology company by revenue, with US$394.3 billion in 2022 revenue. As of March 2023, Apple is the world's biggest company by market capitalization.",
    "phone": "054-4454456",
    "email": "doby@nana.com",
    "web": "http://www.apple.com",
    "image": {
      "url": "http://127.0.0.1:3000/assets/images/cards/apple.jpg",
      "alt": "apple headquarter",
    },
    "address": {
      "state": "California",
      "country": "united states",
      "city": "cupertino",
      "street": "1 apple park way",
      "houseNumber": 2,
      "zip": 95014,
    },
    "bizNumber": 6976688,
    "likes": [],
  },
  {
    "title": "samsung",
    "subtitle": "designed for human",
    "description": "Samsung is a South Korean multinational manufacturing conglomerate headquartered in Samsung Digital City, Suwon, South Korea. It comprises numerous affiliated businesses, most of them united under the Samsung brand, and is the largest South Korean chaebol.",
    "phone": "055-5555554",
    "email": "micha@walla.net",
    "web": "https://www.samsung.com",
    "image": {
      "url": "http://127.0.0.1:3000/assets/images/cards/samsung.jpg",
      "alt": "samsung headquarter",
    },
    "address": {
      "state": "Gyeonggi-do",
      "country": "south korea",
      "city": "suwon-si",
      "street": "129 samsung-ro",
      "houseNumber": 1,
      "zip": 0,
    },
    "bizNumber": 9029833,
    "likes": [],
  },
  {
    "title": "hewlett-packard",
    "subtitle": "make it matter.",
    "description": "HP Inc. (formerly an acronym for Hewlett-Packard) is an American multinational information technology company headquartered in Palo Alto, California, that develops personal computers (PCs), printers and related supplies, as well as 3D printing solutions.",
    "phone": "055-55044345",
    "email": "info@hp.com",
    "web": "http://www.hp.com",
    "image": {
      "url": "http://127.0.0.1:3000/assets/images/cards/hp.jpg",
      "alt": "hp headquarter",
    },
    "address": {
      "state": "California",
      "country": "united states",
      "city": "palo alto",
      "street": "3000 hanover st",
      "houseNumber": 0,
      "zip": 94304,
    },
    "bizNumber": 4546231,
    "likes": [],
  }];
  
  User.exists().then((result) => {
    if (result===null){
      registerUser(
        {
          name:{first: "Owner", middle: "", last: "BCards"},
          email: process.env.DEFAULT_MAIL,
          password: generateUserPassword(process.env.DEFAULT_PASS),
          phone: "055-5555555",
          image: {url: siteUrl + "/assets.images/avatar.png", alt: "User avatar"},
          address: {street: "25 haboersh", houseNumber: 0, city:"Tel Aviv", state: "Center District", country: "Israel",zip: "000000"} ,
          isBusiness: true,

        }
      ).then((result) => {
        console.log("user created successfuly");
        User.findByIdAndUpdate(result._id,{ isAdmin: true }).then((user) => {
        console.log("user updated successfuly");
        initializeCards.forEach(crd => {
            crd.user_id = result._id;
        });
            Card.insertMany(initializeCards).then((data) => {
                console.log("cards inserted");
            }).catch(error => console.log("failed to insert cards: " + error?.message) );
        }).catch(error => console.log("failed to update cards: " + error?.message));
      }).catch(error => console.log("filed to create user: " + error?.message));
    }
  });