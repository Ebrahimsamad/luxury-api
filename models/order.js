const { model, Schema } = require("mongoose");

const orderSchema = new Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    nots: {
      type: String,
    },
    colorName: {
      type: String,
    },
    doorCode: {
      type: String,
    },
    doorImage: {
      type: String,
    },
    categoryName: {
      type: String,
    },
    quantity: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;
