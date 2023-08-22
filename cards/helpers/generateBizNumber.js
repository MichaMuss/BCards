const _ = require("lodash");
const Card = require("../models/mongodb/card");
const { createError } = require("../../utils/handleErrors");

const generateBizNumber = async () => {
  try {
    const random = _.random(1_000_000, 9_999_999);
    const card = await Card.findOne({ bizNumber: random });
    if (card) generateBizNumber();
    return random;
  } catch (error) {
    createError("Generate biz number", error);
  }
};

module.exports = generateBizNumber;
