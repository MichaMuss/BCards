const jwt = require("jsonwebtoken");
require("dotenv").config();

//const key = process.env.SECRET_KEY;
const key = "somesecretkey";

const generateAuthToken = (user) => {
  const {
    _id,
    isBusiness,
    isAdmin,
    name: { first },
    image: { url },
    favoriteIdentifier,
  } = user;
  const payloadData = { _id, isAdmin, isBusiness, first,url, favoriteIdentifier, id: _id };
  const token = jwt.sign(payloadData, key);
  return token;
};

const verifyToken = (tokenFromClient) => {
  try {
    const userData = jwt.verify(tokenFromClient, key);
    return userData;
  } catch (error) {
    return null;
  }
};

exports.generateAuthToken = generateAuthToken;
exports.verifyToken = verifyToken;
