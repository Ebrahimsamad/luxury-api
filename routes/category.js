const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    addColor,
    addSharp,
    removeColor,
    removeSharp,
}=require("../controller/category");
const {
    createCategoryValidation,
    updateCategoryValidation,
    addColorValidation,
    addSharpValidation,
}=require("../utils/validation/category");
const uploadImage = require("../middleware/uploadSingileimage");
const validation = require("../middleware/joiValidation");
const multer = require("multer");
const upload = multer();

router.post("/", auth, upload.single("image"), uploadImage("category"), validation(createCategoryValidation), createCategory);

router.get("/", getAllCategories);

router.get("/:id", getCategoryById);

router.patch("/:id", auth, upload.single("image"),uploadImage("category"), validation(updateCategoryValidation), updateCategory);

router.delete("/:id", auth, deleteCategory);

router.post("/:id/add-color", auth, validation(addColorValidation), addColor);

router.post("/:id/add-sharp", auth, validation(addSharpValidation), addSharp);

router.post("/:id/remove-color", auth, validation(addColorValidation), removeColor);

router.post("/:id/remove-sharp", auth, validation(addSharpValidation), removeSharp);

module.exports = router;