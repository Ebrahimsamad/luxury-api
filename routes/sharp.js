const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createSharp,
  getAllSharps,
  editSharp,
  deleteSharp,
} = require("../controller/sharp");
const {
  createSharpValidation,
  updateSharpValidation,
} = require("../utils/validation/sharp");
const uploadImage = require("../middleware/uploadSingileimage");
const validation = require("../middleware/joiValidation");
const multer = require("multer");
const upload = multer();

router.post(
  "/",
  auth,
  upload.single("image"),
  validation(createSharpValidation),
  uploadImage("sharp"),
  createSharp
);

router.get("/", auth, getAllSharps);

router.patch(
  "/:id",
  auth,
  upload.single("image"),
  validation(updateSharpValidation),
  uploadImage("sharp"),
  editSharp
);

router.delete("/:id", auth, deleteSharp);

module.exports = router;
