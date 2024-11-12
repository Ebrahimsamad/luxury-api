const { model, Schema, Types } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  colorIds: [
    {
      type: Types.ObjectId,
      ref: "Color", 
    },
  ],
  sharpIds: [
    {
      type: Types.ObjectId,
      ref: "Sharp", 
    },
  ],
});

const Category = model("Category", categorySchema);

module.exports = Category;
