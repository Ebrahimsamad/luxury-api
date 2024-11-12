const { model, Schema } = require("mongoose");

const sharpSchema = new Schema({
  code: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Sharp = model("Sharp", sharpSchema);

module.exports = Sharp;
