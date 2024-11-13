const transporter = require("../utils/nodemialer");
const CustomError = require("../utils/customError");

exports.contactUs=async (req,res,next) => {
    const { name, email, message } = req.body;

    try {
        const mailOptions = {
            from: `فخامه باب <${process.env.NODEMAILER_EMAIL}>`,
            to: process.env.LUXURY_EMAIL,
            subject: "New Message from Contact Us",
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
                <h1>New Message from Contact Us</h1>
                </div>
                <div class="content">
                <strong>contact-us Information:</strong>
                <p>Name: <span>${name}</span></p>
                <p>Email: <span>${email}</span></p>
                <p>Message: <span>${message}</span></p>

                
                </div>
            </div>
            </body>
            </html> 
              `,
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).send({ message: "Email sent successfully" });
    } catch (error) {
        console.error(error);
        return next(new CustomError("Failed to send email. Please try again later.", 500));
    }
}