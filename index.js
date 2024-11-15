require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const CustomError = require("./utils/customError");
const Admin = require("./models/admin");
const adminRouter = require("./routes/admin");
const colorRouter = require("./routes/color");
const sharpRouter = require("./routes/sharp");
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");
const contactUs=require("./routes/contact-us")
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.use("/color", colorRouter);
app.use("/sharp", sharpRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/contact-us",contactUs);
app.use(adminRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: `this route: ${req.url} not found` });
});
app.use((err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
});

mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    try {
      const { ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASS } = process.env;
      const existingAdmin = await Admin.findOne({ email: ADMIN_EMAIL });
      if (!existingAdmin) {
        const admin = new Admin({
          userName: ADMIN_USERNAME,
          email: ADMIN_EMAIL,
          password: ADMIN_PASS,
          isSuperAdmin: true,
        });
        await admin.save();
      }
      app.listen(process.env.PORT || PORT, () => {
        console.log(
          `started with URL: http://localhost:${process.env.PORT || PORT}/`
        );
      });
    } catch (error) {
      console.error("Error during database initialization:", error);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });

module.exports = app;
