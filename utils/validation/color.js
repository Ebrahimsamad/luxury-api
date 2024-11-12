const Joi = require("joi");
const createColorValidation = Joi.object({
  code: Joi.string().required().messages({
    "string.base": "Color code must be a string.",
    "string.empty": "Color code is required.",
    "any.required": "Color code is required.",
  }),
  colorHex: Joi.string().required().messages({
    "string.base": "Color hex must be a string.",
    "string.empty": "Color hex is required.",
    "any.required": "Color hex is required.",
  }),
  image: Joi.object({
    buffer: Joi.binary().messages({
      "binary.base": "color image file data must be provided",
    }),
    mimetype: Joi.string()
      .regex(/^image\//)
      .messages({
        "string.base": "color image type must be a string",
        "string.pattern.base": "Invalid color image type",
      }),
  })
    .required()
    .messages({
      "any.required": "color image is required.",
      "object.base": "color image must be an object",
    }),
});
const updateColorValidation = Joi.object({
  code: Joi.string().messages({
    "string.base": "Color code must be a string.",
  }),
  colorHex: Joi.string().messages({
    "string.base": "Color hex must be a string.",
  }),
  image: Joi.object({
    buffer: Joi.binary().messages({
      "binary.base": "color image file data must be provided",
    }),
    mimetype: Joi.string()
      .regex(/^image\//)
      .messages({
        "string.base": "color image type must be a string",
        "string.pattern.base": "Invalid color image type",
      }),
  }).messages({
    "object.base": "color image must be an object",
  }),
});
module.exports = {
  createColorValidation,
  updateColorValidation,
};
