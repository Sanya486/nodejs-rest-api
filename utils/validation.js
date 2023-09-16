const Joi = require("joi");

const postSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
});

const putSchema = Joi.object().min(1).error(new Error("missing fields"));

const favoriteFieldSchema = Joi.object({
  favorite: Joi.boolean().required()
})

module.exports = {
  postSchema,
  putSchema,
  favoriteFieldSchema,
};
