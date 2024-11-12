const CustomError = require("../utils/customError");

module.exports = (role) => async (req, res, next) => {
  if (role === req.user.isSuperAdmin) return next();
  return next(new CustomError("Not authorized", 403));
};
