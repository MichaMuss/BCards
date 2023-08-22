const Joi = require("joi");
const passwordSchema = require("./passwordSchema");

const passwordValidation = (password) => {
    const joiObj = Joi.object({
      password: passwordSchema,
    });
    return joiObj.validate({password: password});
  };
  
  module.exports = passwordValidation;
  