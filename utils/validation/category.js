const Joi = require("joi");

const createCategoryValidation = Joi.object({
    name: Joi.string().required().messages({
        "string.base": "Category name must be a string.",
        "string.empty": "Category name is required.",
        "any.required": "Category name is required.",
    }),
    image: Joi.object({
        buffer: Joi.binary().messages({
          "binary.base": "Color image file data must be provided",
        }),
        mimetype: Joi.string()
          .regex(/^image\//)
          .messages({
            "string.base": "Color image type must be a string",
            "string.pattern.base": "Invalid color image type",
          }),
      })
        .required()
        .messages({
          "any.required": "Color image is required.",
          "object.base": "Color image must be an object",
        }),
    colorIds: Joi.array().min(1).required().messages({
        "array.base": "Color IDs must be an array.",
        "array.min": "At least one color ID is required.",
        "any.required": "Color IDs are required.",
    }),
    sharpIds: Joi.array().min(1).required().messages({
        "array.base": "Sharp IDs must be an array.",
        "array.min": "At least one sharp ID is required.",
        "any.required": "Sharp IDs are required.",
    }),
});

const updateCategoryValidation = Joi.object({
    name: Joi.string().messages({
        "string.base": "Category name must be a string.",
    }),
    image: Joi.object({
        buffer: Joi.binary().messages({
          "binary.base": "Color image file data must be provided",
        }),
        mimetype: Joi.string()
          .regex(/^image\//)
          .messages({
            "string.base": "Color image type must be a string",
            "string.pattern.base": "Invalid color image type",
          }),
      }).messages({
        "object.base": "Color image must be an object",
      }),
    colorIds: Joi.array().min(1).messages({
        "array.base": "Color IDs must be an array.",
        "array.min": "At least one color ID is required.",
    }),
    sharpIds: Joi.array().min(1).messages({
        "array.base": "Sharp IDs must be an array.",
        "array.min": "At least one sharp ID is required.",
    }),
});

const addColorValidation = Joi.object({
    colorId: Joi.string().required().messages({
        "string.base": "Color ID must be a string.",
        "string.empty": "Color ID is required.",
        "any.required": "Color ID is required.",
    })
});

const addSharpValidation = Joi.object({
    sharpId: Joi.string().required().messages({
        "string.base": "Sharp ID must be a string.",
        "string.empty": "Sharp ID is required.",
        "any.required": "Sharp ID is required.",
    })
});

module.exports = {
    createCategoryValidation,
    updateCategoryValidation,
    addColorValidation,
    addSharpValidation,
};
