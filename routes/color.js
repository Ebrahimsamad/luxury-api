const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createColor,
  getAllColors,
  editColor,
  deleteColor,
} = require("../controller/color");
const {
  createColorValidation,
  updateColorValidation,
} = require("../utils/validation/color");
const uploadImage = require("../middleware/uploadSingileimage");
const validation = require("../middleware/joiValidation");
const multer = require("multer");
const upload = multer();

router.post(
  "/",
  auth,
  upload.single("image"),
  validation(createColorValidation),
  uploadImage("color"),
  createColor
);

router.get("/", auth, getAllColors);

router.patch(
  "/:id",
  auth,
  upload.single("image"),
  validation(updateColorValidation),
  uploadImage("color"),
  editColor
);

router.delete("/:id", auth, deleteColor);

module.exports = router;
