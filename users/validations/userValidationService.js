const registerValidation = require("./Joi/registerValidation");
const loginValidation = require("./Joi/loginValidation");
const passwordValidation = require("./Joi/passwordValidation");

const validator = undefined || "Joi";

const validateRegistration = (user) => {
  if (validator === "Joi") return registerValidation(user);
};

const validateLogin = (user) => {
  if (validator === "Joi") return loginValidation(user);
};

const validatePassword = (password) => {
  if(validator === "Joi") return passwordValidation(password);
}

exports.validateRegistration = validateRegistration;
exports.validateLogin = validateLogin;
exports.validatePassword = validatePassword;
