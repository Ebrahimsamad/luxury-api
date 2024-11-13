const Product = require("../models/product");
const Color = require("../models/color");
const Sharp = require("../models/sharp");
const Category = require("../models/category");
const CustomError = require("../utils/customError");

async function checkReferences(colorId, sharpId, categoryId) {
  const colorExists = await Color.findById(colorId);
  const sharpExists = await Sharp.findById(sharpId);
  const categoryExists = await Category.findById(categoryId);
  return colorExists && sharpExists && categoryExists;
}

exports.createProduct = async (req, res,next) => {
  const { code, image, colorId, sharpId, categoryId } = req.body;

  if (!(await checkReferences(colorId, sharpId, categoryId))) {
    return next(new CustomError("Invalid colorId, sharpId, or categoryId.", 400));
  }

  const product = new Product({ code, image, colorId, sharpId, categoryId });
  await product.save();
  res.status(201).send({message:"product created successfully",product});
};

exports.updateProduct = async (req, res,next) => {
    const { id } = req.params;
    const { colorId, sharpId, categoryId, ...updateData } = req.body;
  
    if (colorId && !(await Color.findById(colorId))) {
      return next(new CustomError("Invalid colorId." , 400));
    }
    if (sharpId && !(await Sharp.findById(sharpId))) {
      return next(new CustomError("Invalid sharpId.", 400));
    }
    if (categoryId && !(await Category.findById(categoryId))) {
      return next(new CustomError("Invalid categoryId.", 400));
    }
  
    if (colorId) updateData.colorId = colorId;
    if (sharpId) updateData.sharpId = sharpId;
    if (categoryId) updateData.categoryId = categoryId;
  
    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!product) return next(new CustomError( "Product not found.", 404));
    res.status(200).send({message:"product updated successfully",product});
  };
  

exports.deleteProduct = async (req, res,next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) return next(new CustomError( "Product not found.", 404));
  res.status(200).send({ message: "Product deleted successfully." });
};

exports.getAllProducts = async (req, res,next) => {
  const products = await Product.find().populate("colorId sharpId categoryId");
  res.status(200).send({message:"Fetched all products",products});
};

exports.getProductById = async (req, res,next) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate("colorId sharpId categoryId");
  if (!product) return next(new CustomError( "Product not found.", 404));
  res.status(200).send({message:"Fetched product",product});
};

exports.getProductsByFilter = async (req, res,next) => {
  const { colorId, sharpId, categoryId } = req.body;
  const product = await Product.findOne({colorId, sharpId, categoryId}).populate("colorId sharpId categoryId");
  if (!product) return next(new CustomError( "Product not found.", 404));
  res.status(200).send({message:"Fetched product",product});
};
