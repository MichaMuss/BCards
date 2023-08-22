const mongoose = require("mongoose");
const Name = require("./Name");
const Image = require("../../../cards/models/mongodb/image");
const Address = require("../../../cards/models/mongodb/address");
const Logins = require("./Logins");
const { randomUUID } = require('crypto');

const schema = new mongoose.Schema({
  name: Name,
  phone: {
    type: String,
    required: true,
    match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
  },
  email: {
    type: String,
    required: true,
    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  image: Image,
  address: Address,
  isAdmin: { type: Boolean, default: false },
  isBusiness: { type: Boolean, default: false },
  isLocked: { type: Boolean, default: false },
  Logins: Logins,
  favoriteIdentifier: {
    type: String,
    default: () => randomUUID(),
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", schema);

module.exports = User;
