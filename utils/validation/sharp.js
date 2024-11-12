const Joi = require("joi");
const createSharpValidation = Joi.object({
  code: Joi.string().required().messages({
    "string.base": "Sharp code must be a string.",
    "string.empty": "Sharp code is required.",
    "any.required": "Sharp code is required.",
  }),
  image: Joi.object({
    buffer: Joi.binary().messages({
      "binary.base": "Sharp image file data must be provided",
    }),
    mimetype: Joi.string()
      .regex(/^image\//)
      .messages({
        "string.base": "Sharp image type must be a string",
        "string.pattern.base": "Invalid sharp image type",
      }),
  })
    .required()
    .messages({
      "any.required": "Sharp image is required.",
      "object.base": "Sharp image must be an object",
    }),
});
const updateSharpValidation = Joi.object({
  code: Joi.string().messages({
    "string.base": "Sharp code must be a string.",
  }),
  image: Joi.object({
    buffer: Joi.binary().messages({
      "binary.base": "Sharp image file data must be provided",
    }),
    mimetype: Joi.string()
      .regex(/^image\//)
      .messages({
        "string.base": "Sharp image type must be a string",
        "string.pattern.base": "Invalid sharp image type",
      }),
  }).messages({
    "object.base": "Sharp image must be an object",
  }),
});
module.exports = {
  createSharpValidation,
  updateSharpValidation,
};
