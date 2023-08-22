const Joi = require("joi");

const passwordSchema = Joi.string().ruleset.regex(
  /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
)
.rule({
  message:
    'user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-',
})
.required();

module.exports = passwordSchema;