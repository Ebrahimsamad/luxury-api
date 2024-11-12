const express = require("express");
const router = express.Router();
const {
  creatAdmin,
  editAdmin,
  deleteAdmin,
  getAllAdmin,
  login,
} = require("../controller/admin");
const isSuperAdminCheck = require("../middleware/roleCheck");
const auth = require("../middleware/auth");
const validation = require("../middleware/joiValidation");
const {
  createAdminValidation,
  updateAdminValidation,
  loginvalidation,
} = require("../utils/validation/admin");

router.post("/login", validation(loginvalidation), login);

router.post(
  "/admin",
  auth,
  isSuperAdminCheck(true),
  validation(createAdminValidation),
  creatAdmin
);
router.get("/admin", auth, isSuperAdminCheck(true), getAllAdmin);
router.patch(
  "/admin/:id",
  auth,
  isSuperAdminCheck(true),
  validation(updateAdminValidation),
  editAdmin
);
router.delete("/admin/:id", auth, isSuperAdminCheck(true), deleteAdmin);

module.exports = router;
