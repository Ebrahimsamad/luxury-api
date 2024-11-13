const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsByFilter,
}=require("../controller/product");
const {
    createProductSchema,
    updateProductSchema,
    filterProductSchema,
} = require("../utils/validation/product");
const uploadImage = require("../middleware/uploadSingileimage");
const validation = require("../middleware/joiValidation");
const multer = require("multer");
const upload = multer();

router.post("/", auth, upload.single("image"), uploadImage("product"), validation(createProductSchema), createProduct);

router.get("/", auth, getAllProducts);

router.post("/custom", validation(filterProductSchema), getProductsByFilter);

router.get("/:id", auth, getProductById);

router.patch("/:id", auth, upload.single("image"), uploadImage("product"), validation(updateProductSchema), updateProduct);

router.delete("/:id", auth, deleteProduct);


module.exports = router;