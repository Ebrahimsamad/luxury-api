const Joi = require("joi");
const { Types } = require("mongoose");

const objectId = (value, helpers) => {
  if (!Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid ObjectId");
  }
  return value;
};

const createProductSchema = Joi.object({
  code: Joi.string().required().messages({
    "string.base": "Code should be a string.",
    "string.empty": "Code cannot be empty.",
    "any.required": "Code is required.",
  }),
  image: Joi.object({
    buffer: Joi.binary().messages({
      "binary.base": "Product image file data must be provided",
    }),
    mimetype: Joi.string()
      .regex(/^image\//)
      .messages({
        "string.base": "Product image type must be a string",
        "string.pattern.base": "Invalid Product image type",
      }),
  })
    .required()
    .messages({
      "any.required": "Product image is required.",
      "object.base": "Product image must be an object",
    }),
  colorId: Joi.string().custom(objectId).required().messages({
    "string.base": "Color ID should be a string.",
    "any.required": "Color ID is required.",
    "any.custom": "Invalid Color ID.",
  }),
  sharpId: Joi.string().custom(objectId).required().messages({
    "string.base": "Sharp ID should be a string.",
    "any.required": "Sharp ID is required.",
    "any.custom": "Invalid Sharp ID.",
  }),
  categoryId: Joi.string().custom(objectId).required().messages({
    "string.base": "Category ID should be a string.",
    "any.required": "Category ID is required.",
    "any.custom": "Invalid Category ID.",
  }),
});

const updateProductSchema = Joi.object({
  code: Joi.string().optional().messages({
    "string.base": "Code should be a string.",
  }),
  image: Joi.object({
    buffer: Joi.binary().messages({
      "binary.base": "Product image file data must be provided",
    }),
    mimetype: Joi.string()
      .regex(/^image\//)
      .messages({
        "string.base": "Product image type must be a string",
        "string.pattern.base": "Invalid Product image type",
      }),
  }).messages({
    "object.base": "Product image must be an object",
  }),
  colorId: Joi.string().custom(objectId).optional().messages({
    "string.base": "Color ID should be a string.",
    "any.custom": "Invalid Color ID.",
  }),
  sharpId: Joi.string().custom(objectId).optional().messages({
    "string.base": "Sharp ID should be a string.",
    "any.custom": "Invalid Sharp ID.",
  }),
  categoryId: Joi.string().custom(objectId).optional().messages({
    "string.base": "Category ID should be a string.",
    "any.custom": "Invalid Category ID.",
  }),
});

const filterProductSchema = Joi.object({
  colorId: Joi.string().custom(objectId).required().messages({
    "string.base": "Color ID should be a string.",
    "any.required": "Color ID is required.",
    "any.custom": "Invalid Color ID.",
  }),
  sharpId: Joi.string().custom(objectId).required().messages({
    "string.base": "Sharp ID should be a string.",
    "any.required": "Sharp ID is required.",
    "any.custom": "Invalid Sharp ID.",
  }),
  categoryId: Joi.string().custom(objectId).required().messages({
    "string.base": "Category ID should be a string.",
    "any.required": "Category ID is required.",
    "any.custom": "Invalid Category ID.",
  }),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  filterProductSchema,
};
