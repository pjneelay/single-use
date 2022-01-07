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
  res.send("Questions api is working");
});

console.log("transporter",transporter);

router.post("/", (req, res) => {
  
  const { to, subject, text, html, name, email,message } = req.body;
  
  const mailData = {
    from: userCredential.userName ,
    to: "office@mymanifold.com", 
    subject: "Thank you for your message !!!",
    html: "<h3>Questions and comments from customer </h3></br><div>Customer Name:"+name+"</div></br><div>Message:"+message+"</div><div>Customer Email:"+email+"</div></br>",
    
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log("Questions API error =>",error);
      
    }
    res.status(200).send({ message: "Questions sent", message_id: info.messageId });
    
  });

});


module.exports = router;
