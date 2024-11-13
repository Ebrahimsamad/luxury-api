const Joi = require("joi");

const orderValidationSchema = Joi.object({
  fullName: Joi.string().required().messages({
    "any.required": "Full Name is required.",
    "string.empty": "Full Name cannot be empty.",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required.",
    "string.email": "Email must be a valid email address.",
    "string.empty": "Email cannot be empty.",
  }),
  phoneNumber: Joi.string().required().messages({
    "any.required": "Phone Number is required.",
    "string.empty": "Phone Number cannot be empty.",
  }),
  nots: Joi.string().optional().messages({
    "any.required": "Notes are required.",
    "string.empty": "Notes cannot be empty.",
  }),
  colorName: Joi.string().required().messages({
    "any.required": "Color Name is required.",
    "string.empty": "Color Name cannot be empty.",
  }),
  doorCode: Joi.string().required().messages({
    "any.required": "Door Code is required.",
    "string.empty": "Door Code cannot be empty.",
  }),
  doorImage: Joi.string().required().messages({
    "any.required": "Door Image is required.",
    "string.empty": "Door Image cannot be empty.",
  }),
  categoryName: Joi.string().required().messages({
    "any.required": "Category Name is required.",
    "string.empty": "Category Name cannot be empty.",
  }),
  quantity: Joi.number().integer().required().messages({
    "any.required": "Quantity is required.",
    "number.base": "Quantity must be a number.",
    "number.integer": "Quantity must be an integer.",
  }),
 
});

module.exports = { orderValidationSchema };
