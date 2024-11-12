const CustomError = require("../utils/customError");

module.exports = (schema) => async (req, res, next) => {
  try {
    let bodyValidation = { ...req.body };

    if (req.files && req.files["image"]) {
      bodyValidation = {
        ...bodyValidation,
        image: {
          buffer: req.files["image"][0].buffer,
          mimetype: req.files["image"][0].mimetype,
        },
      };
    }

    await schema.validateAsync(bodyValidation, { abortEarly: false });
    next();
  } catch (err) {
    const messages = err.details.map((detail) => detail.message).join(", ");
    return next(new CustomError(messages, 400));
  }
};
