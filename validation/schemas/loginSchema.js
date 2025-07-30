const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().min(6).max(50).required().email(),
  password: Joi.string().min(6).max(255).required(),
});

module.exports = loginSchema;
