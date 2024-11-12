const Admin = require("../models/admin");
const CustomError = require("../utils/customError");
const util = require("util");
const jwt = require("jsonwebtoken");
const jwtSign = util.promisify(jwt.sign);
const bcrypt = require("bcrypt");

exports.creatAdmin = async (req, res, next) => {
  const { userName, email, password, isSuperAdmin } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return next(new CustomError("Email is already in use.", 409));
    }
    const admin = new Admin({ userName, email, password, isSuperAdmin });
    await admin.save();
    res.status(201).send({ message: "Admin created successfully", admin });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

exports.getAllAdmin = async (req, res, next) => {
  try {
    const admins = await Admin.find();
    res.status(200).send({ message: "All Admin", admins });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

exports.editAdmin = async (req, res, next) => {
  try {
    const body = req.body;
    const admin = await Admin.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });
    if (!admin) {
      return next(new CustomError("Admin not found.", 404));
    }

    res.status(200).send({ message: "Updated successfully", admin });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

exports.deleteAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return next(new CustomError("Admin not found.", 404));
    }
    res.status(200).send({ message: "Deleted successfully", admin });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return next(new CustomError("Invalid email or password", 401));
    }
    const isMatched = await bcrypt.compare(password, admin.password);
    if (isMatched) {
      const token = await jwtSign(
        { userId: admin._id },
        process.env.JWT_SECRET_ACCESS_TOKEN,
        {
          expiresIn: "30d",
        }
      );

      res.status(200).send({ message: "User logged in", token });
    } else {
      return next(new CustomError("Invalid email or password", 401));
    }
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
