const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const{
    createOrder,
    getAllOrders,
    getOrderById,
}=require("../controller/order");
const {
    orderValidationSchema,
} = require("../utils/validation/order");
const validation = require("../middleware/joiValidation");


router.post("/", validation(orderValidationSchema), createOrder);

router.get("/", auth, getAllOrders);

router.get("/:id", auth, getOrderById);

module.exports = router;
