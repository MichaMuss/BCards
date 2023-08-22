const config = require("config");
const validateCardWithJoi = require("./Joi/validateCardWithJoi");

const validator = config.get("validator");

const validateCard = (card) => {
  if (validator == "Joi") {
    const { error } = validateCardWithJoi(card);
    if (error) return error.details[0].message;
    return false;
  }
};

module.exports = validateCard;
