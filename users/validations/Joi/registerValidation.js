const Joi = require("joi");
const passwordSchema = require("./passwordSchema");

const registerValidation = (user) => {
  const schema = Joi.object({
    name: Joi.object()
      .keys({
        first: Joi.string().min(2).max(256).required(),
        middle: Joi.string().min(2).max(256).allow(""),
        last: Joi.string().min(2).max(256).required(),
      })
      .required(),
    isBusiness: Joi.boolean().required(),
    phone: Joi.string()
      .ruleset.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)

      .rule({ message: 'user "phone" mast be a valid phone number' })
      .required(),
    email: Joi.string()
      .ruleset.pattern(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      )
      .rule({ message: 'user "mail" mast be a valid mail' })
      .required(),
    password: passwordSchema,
    image: Joi.object()
      .keys({
        url: Joi.string()
          .ruleset.regex(
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
          )
          .rule({ message: "user image mast be a valid url" })
          .allow(""),
        alt: Joi.string().min(2).max(256).allow(""),
      })
      .required(),
    address: Joi.object()
      .keys({
        state: Joi.string().allow(""),
        country: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        houseNumber: Joi.number().required(),
        zip: Joi.number(),
      })
      .required(),
    isAdmin: Joi.boolean().allow(""),
  });
  return schema.validate(user);
};

module.exports = registerValidation;
