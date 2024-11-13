const express = require("express");
const router = express.Router();
const {
    contactUs
}=require("../controller/contact-us");

router.post("/", contactUs);

module.exports = router;