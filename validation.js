const Joi = require("joi");

//若是有人想註冊系統,須通過registerValidation
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().min(3).max(30).required().email(),
    // password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    password: Joi.string().alphanum().min(3).max(30).required(),
    role: Joi.string().required().valid("student", "instructor"),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(data);
};

const courseValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(6).max(50).required(),
    description: Joi.string().min(6).max(50).required(),
    price: Joi.number().min(10).max(9999).required(),
    image: Joi.string(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.courseValidation = courseValidation;
