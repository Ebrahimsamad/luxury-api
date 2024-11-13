const CustomError = require("../utils/customError");
const Color = require("../models/color");
const Category = require("../models/category");
const Product = require("../models/product");

exports.createColor = async (req, res, next) => {
  const { name, colorHex, image } = req.body;

  const colorSaved = await Color.findOne({ name });

  if (colorSaved) {
    return next(new CustomError("Color with this name already exists.", 409));
  }

  const color = new Color({ name, colorHex, image });

  try {
    const savedColor = await color.save();
    res
      .status(201)
      .send({ message: "Color created successfully", color: savedColor });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

exports.getAllColors = async (req, res, next) => {
  try {
    const colors = await Color.find();
    res.status(200).send({ message: "All Colors", colors });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

exports.editColor = async (req, res, next) => {
  try {
    const body = req.body;
    if (body.name) {
      const colorSaved = await Color.findOne({ name: body.name });

      if (colorSaved) {
        return next(
          new CustomError("Color with this name already exists.", 409)
        );
      }
    }
    const color = await Color.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });
    if (!color) {
      return next(new CustomError("Color not found.", 404));
    }

    res.status(200).send({ message: "Updated successfully", color });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

exports.deleteColor = async (req, res, next) => {
  try {
    const color = await Color.findByIdAndDelete(req.params.id);
    if (!color) {
      return next(new CustomError("Color not found.", 404));
    }
    await Category.updateMany(
      { colorIds: color._id },
      { $pull: { colorIds: color._id } }
    );
    await Product.deleteMany({colorId:color._id})
    res.status(200).send({ message: "Deleted successfully", color });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
