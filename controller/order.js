const Order = require("../models/order");
const transporter = require("../utils/nodemialer");
const CustomError = require("../utils/customError");

const sendMail = async (emailObject) => {
  const mailOptions = {
    from: `فخامه باب <${process.env.NODEMAILER_EMAIL}>`,
    to: emailObject.emailSender,
    subject: emailObject.subject,
    html: `<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                }
                .email-container {
                width: 100%;
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                }
                .header {
                background-color: #2b3c5a;
                color: #ffffff;
                text-align: center;
                padding: 20px;
                }
                .header img {
                max-width: 300px;
                margin-bottom: 30px;
                }
                .header h1 {
                font-size: 28px;
                margin: 0;
                color: #ffff;
                }
                .content {
                padding: 20px;
                color: #333333;
                }
                .content strong {
                font-size: 18px;
                color: #2b3c5a;
                margin-bottom: 10px;
                display: inline-block;
                }
                .content p {
                font-size: 16px;
                color: #2b3c5a;
                margin: 8px 0;
                }
                .content p span {
                color: #d09423;
                font-weight: bold;
                }
                .door-image {
                display: block;
                width: 100%;
                max-width: 400px;
                margin: 20px auto;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }
            </style>
            </head>
            <body>
            <div class="email-container">
                <div class="header">
                <img src="https://ik.imagekit.io/0gx97mdtkc/Logo/log.png?updatedAt=1731495442904" alt="Logo">
                <h1>${emailObject.header}</h1>
                </div>
                <div class="content">
                <strong>Personal Information:</strong>
                <p>Full Name: <span>${emailObject.fullName}</span></p>
                <p>Email: <span>${emailObject.email}</span></p>
                <p>Phone: <span>${emailObject.phone}</span></p>

                <strong>Door Information:</strong>
                <p>Door Code: <span>${emailObject.doorCode}</span></p>
                <p>Door Color Name: <span>${emailObject.colorName}</span></p>
                <p>Door Category Name: <span>${emailObject.categoryName}</span></p>
                <p>Notes: <span>${emailObject.nots||"not have nots"}</span></p>

                <strong>Door Image:</strong>
                <img src=${emailObject.doorImage} alt="Door Image" class="door-image">
                </div>
            </div>
            </body>
            </html> 
              `,
  };

  await transporter.sendMail(mailOptions);
};

const createOrder = async (req, res, next) => {
  try {
    const order = new Order(req.body);
    await order.save();
    const firstEmailObject = {
      emailSender: order.email,
      subject: "Your Order Received",
      header: "Your Order Received",
      fullName: order.fullName,
      email: order.email,
      phone: order.phoneNumber,
      nots: order.nots,
      colorName: order.colorName,
      doorCode: order.doorCode,
      doorImage: order.doorImage,
      categoryName: order.categoryName,
    };
    const secondEmailObject = {
      emailSender: process.env.LUXURY_EMAIL,
      subject: "New Order Received",
      header: "New Order Received",
      fullName: order.fullName,
      email: order.email,
      phone: order.phoneNumber,
      nots: order.nots,
      colorName: order.colorName,
      doorCode: order.doorCode,
      doorImage: order.doorImage,
      categoryName: order.categoryName,
    };
    await sendMail(firstEmailObject);
    await sendMail(secondEmailObject);
    console.log(firstEmailObject)
    console.log(secondEmailObject)

    res.status(201).send({ message: "Order created successfully", order });
  } catch (err) {
    next(new CustomError(err.message, 500));
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).send({ message: "All Orders", orders });
  } catch (err) {
    next(new CustomError(error.message, 500));
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return next(new CustomError("Order not found.", 404));
    }
    res.status(200).send({ message: "order", order });
  } catch (err) {
    next(new CustomError(error.message, 500));
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
};
