const nodemailer = require("nodemailer");
const userCredential = require("./credentialConfig");

const transporter = nodemailer.createTransport({
    service: "Outlook365",
    auth: {
      user: userCredential.userName,
      pass: userCredential.password
    },
    secure: true // upgrades later with STARTTLS -- change this based on the PORT
  });

  module.exports = transporter;