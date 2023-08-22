const Joi = require("joi");
const passwordSchema = require("./passwordSchema");

const loginValidation = (user) => {
  const schema = Joi.object({
    email: Joi.string()
      .ruleset.pattern(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      )
      .rule({ message: 'user "mail" mast be a valid mail' })
      .required(),

    password: passwordSchema,
  });
  return schema.validate(user);
};

module.exports = loginValidation;
