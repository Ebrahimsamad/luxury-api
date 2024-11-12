const Category = require("../models/category");
const Color = require("../models/color");
const Sharp = require("../models/sharp");
const CustomError = require("../utils/customError");

const checkIfIdsExist = async (Model, ids) => {
  const existingItems = await Model.find({ _id: { $in: ids } });
  return existingItems.length === ids.length;
};

const categoryController = {
  async createCategory(req, res , next) {
    const { name, image, colorIds, sharpIds } = req.body;

    const colorsExist = await checkIfIdsExist(Color, colorIds);
    if (!colorsExist) {
      return next(new CustomError("One or more color IDs are invalid", 400));
    }

    const sharpsExist = await checkIfIdsExist(Sharp, sharpIds);
    if (!sharpsExist) {
      return next(new CustomError("One or more sharp IDs are invalid", 400));
    }

    const newCategory = new Category({ name, image, colorIds, sharpIds });
    await newCategory.save();
    res
      .status(201)
      .send({
        message: "category created successfully",
        category: newCategory,
      });
  },

  async addColor(req, res , next) {
    const { colorId } = req.body;

    const colorExists = await Color.findById(colorId);
    if (!colorExists) {
      return next(new CustomError("Color ID is invalid", 400));
    }

    const category = await Category.findByIdAndUpdate(
        req.params.id,
      { $addToSet: { colorIds: colorId } },
      { new: true }
    );
    res
      .status(200)
      .send({ message: "Color added successfully", category: category });
  },

  async addSharp(req, res , next) {
    const { sharpId } = req.body;

    const sharpExists = await Sharp.findById(sharpId);
    if (!sharpExists) {
      return next(new CustomError("Sharp ID is invalid", 400));
    }

    const category = await Category.findByIdAndUpdate(
        req.params.id,
      { $addToSet: { sharpIds: sharpId } },
      { new: true }
    );
    res
      .status(200)
      .send({ message: "Sharp added successfully", category: category });
  },

  async removeColor(req, res , next) {
    const { colorId } = req.body;
    const category = await Category.findByIdAndUpdate(
        req.params.id,
      { $pull: { colorIds: colorId } },
      { new: true }
    );
    res
      .status(200)
      .send({ message: "color removed successfully", category: category });
  },

  async removeSharp(req, res , next) {
    const { sharpId } = req.body;
    const category = await Category.findByIdAndUpdate(
        req.params.id,
      { $pull: { sharpIds: sharpId } },
      { new: true }
    );
    res.status(200).send({ message: "sharp removed successfully", category });
  },

  async updateCategory(req, res , next) {
    const { name, image } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
      { ...(name && { name }), ...(image && { image }) },
      { new: true }
    );

    if (!updatedCategory) {
      return next(new CustomError("Category not found", 404));
    }

    res
      .status(200)
      .send({ message: "category updated successfully", updatedCategory });
  },

  async deleteCategory(req, res , next) {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return next(new CustomError("Category not found", 404));
    }

    res.status(200).send({ message: "Category deleted successfully" });
  },

  async getAllCategories(req, res , next) {
    const categories = await Category.find()
      .populate("colorIds")
      .populate("sharpIds");
    res.status(200).send({ message: "Fetched all categories", categories });
  },

  async getCategoryById(req, res , next) {
    const category = await Category.findById(req.params.id)
      .populate("colorIds")
      .populate("sharpIds");

    if (!category) {
      return next(new CustomError("Category not found", 404));
    }

    res.status(200).send({ message: "Fetched category", category });
  },
};

module.exports = categoryController;
