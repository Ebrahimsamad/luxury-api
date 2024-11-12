const { model, Schema } = require("mongoose");

const colorSchema = new Schema({
  code: {
    type: String,
  },
  colorHex: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Color = model("Color", colorSchema);

module.exports = Color;
