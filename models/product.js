const { model, Schema, Types } = require("mongoose");

const productSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  colorId: {
    type: Types.ObjectId,
    ref: "Color",
    required: true,
  },
  sharpId: {
    type: Types.ObjectId,
    ref: "Sharp",
    required: true,
  },
  categoryId: {
    type: Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const Product = model("Product", productSchema);

module.exports = Product;
