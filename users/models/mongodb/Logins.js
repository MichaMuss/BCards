const configurations = require("./LoginSettings");
const mongoose = require("mongoose");

const Logins = new mongoose.Schema({
  lastLogin: {
    type: Date,
},
  leftAttempts: {
    type: Number,
    min: 0,
    max: configurations.MAX_LOGIN_ATTEMPTS,
    default: configurations.MAX_LOGIN_ATTEMPTS,
    required: true,
  },
  lastLoginAttempt: {
    type: Date,
    default: 0,
    required: true,
  },
});

module.exports = Logins;
