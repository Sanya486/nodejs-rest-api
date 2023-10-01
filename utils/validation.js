const Joi = require("joi");

const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegEx).required(),
  password: Joi.string().min(8).required(),
  subscription: Joi.string(),
}).error(new Error("Помилка від Joi або іншої бібліотеки валідації"));

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegEx).required(),
  password: Joi.string().min(8).required(),
}).error(new Error("Помилка від Joi або іншої бібліотеки валідації"));

const postSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const putSchema = Joi.object().min(1).error(new Error("missing fields"));

const favoriteFieldSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  postSchema,
  putSchema,
  favoriteFieldSchema,
  registerSchema,
  loginSchema,
  subscriptionSchema,
};
