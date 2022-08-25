import nodeMailer from "nodemailer";
import asyncPromiseError from "../middleware/asyncPromiseError.js";

export const sendEmail = asyncPromiseError(async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: options.email,
    subject: "Recover your password",
    text: `Your reset password link is : - \n ${options.resetPasswordUrl}\n If you did not want to reset your password, ignore it`,
    html: `<p>Your reset password link is : - \n <a href=${options.resetPasswordUrl}>${options.resetPasswordUrl}</a>\n If you did not want to reset your password, ignore it</p>`,
  };
  console.log("Hello Email is send");
  await transporter.sendMail(mailOptions);
});
