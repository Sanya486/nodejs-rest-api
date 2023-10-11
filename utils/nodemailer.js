const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "nadzugalex@meta.ua",
    pass: META_PASSWORD,
  },
});

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "nadzugalex@meta.ua" };
      await transporter.sendMail(email);
      console.log("Email send success")
  } catch (error) {
      console.log(error)
  }
};

module.exports = sendEmail;
