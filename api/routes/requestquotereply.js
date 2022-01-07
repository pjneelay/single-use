var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const transporter = require('../helpers/config');
const userCredential = require("../helpers/credentialConfig");
var flag=true;
/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("Request quote Reply is working");
});


router.post("/", (req, res) => {
  
  const { to, subject, text, html, name, email,message } = req.body;
 
  const mailData = {
    from: userCredential.userName ,
    to: email,
    subject: "MyManifold Auto-Reply E-Mail",
    html: "<div><p>Thank you for your interest in MyManifold, we received your message. Our team will take care of your inquiry immediately and answer you as soon as possible.</p><p><b>Simplify your process to your optimized fluid flow.</p><p><b>Streamline your process.</b></p><p><b>Accelerate your purchase of manifolds.</b></p><p></br></br>MyManifold. It’s all about connections.</p></div>"
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log("Questions API error =>",error);
      
    }
    res.status(200).send({ message: "Reply  sent", message_id: info.messageId });
    
  });

});


module.exports = router;
