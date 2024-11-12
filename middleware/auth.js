const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const util = require("util");
const jwtVerify = util.promisify(jwt.verify);
const CustomError = require("../utils/customError");

module.exports = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    if (!token || !token.startsWith("Bearer ")) {
      return next(
        new CustomError("No token provided or token format is incorrect", 401)
      );
    }

    const tokenValue = token.split(" ")[1];

    const payload = await jwtVerify(
      tokenValue,
      process.env.JWT_SECRET_ACCESS_TOKEN
    );
    if (!payload.userId || !payload.exp) {
      return next(new CustomError("Invalid token payload", 401));
    }
    const admin = await Admin.findById(payload.userId);
    if (!admin) {
      return next(new CustomError("User not found", 404));
    }

    req.user = admin;
    next();
  } catch (err) {
    return next(new CustomError(err.message, 500));
  }
};
