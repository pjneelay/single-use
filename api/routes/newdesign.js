var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const downloadsFolder = require("downloads-folder");
const pdf = require('pdf-creator-node');
const options = require('../helpers/options');
const data = require('../helpers/data');
const transporter = require('../helpers/config');
const userCredential = require("../helpers/credentialConfig");
// const generatePdf = require("../controllers/homeController");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("Email send api is working");
});


const getMostRecentFile = async (dir) => {
  const files = await orderReccentFiles(dir);
  return files.length ? files[0] : undefined;
};

const orderReccentFiles = dir => {
  return fs
    .readdirSync(dir)
    .filter(file => fs.lstatSync(path.join(dir, file)).isFile())
    .map(file => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
};

var recentFileName = '';

const generatePdf = async (pdfdata, imgsrc) => {
  // console.log("pdfdata", pdfdata)
  recentFileName = '';
  
    
}
router.post("/", async (req, res) => {
  // console.log(req.body);
  const { to, subject, text, productId, pdfName, email, userSelectedItems, imageSource} = req.body;
  // const createPdfDoc = await generatePdf(userSelectedItems, imageSource);
  // console.log("createPdfDoc response ", createPdfDoc);
  // let splitres = createPdfDoc.split('/');
  // let recentFileName = splitres.slice(-1).pop();
  // console.log("recent file name",recentFileName);

  // const getRecentFile = await getMostRecentFile(`./docs/`);
    // console.log("userSelectedItems from UI", userSelectedItems);
  const html = fs.readFileSync(path.join(__dirname, '../views/newdesignTemplate.html'), 'utf-8');
  const filename = Math.random() + '_doc' + '.pdf';
  let array = [];
  let rowData = [];
  let innerItemPush = [];
  let imageSourcePdf = imageSource;
  const captureNewitems = (items) =>{
    if(items.length > 0){
      let innerItm = {
        innerHead: items[0],
        innerValue: items[1]
      }
      innerItemPush.push(innerItm);
      return innerItemPush;
    }
  }

  if(userSelectedItems !== null){
    for(let item of userSelectedItems){
      let prod = {
        heading: item[0],
        arrayData: item[1],
        newItems: item[1].length > 0 ? captureNewitems(item[1]) : '',
      };      
      rowData.push(prod);
    }
  }

  
  // console.log("rowdata array", JSON.stringify(rowData));
  
  let currentDateTime = Date().toLocaleString();
  const tableData = {
    tableRowData: rowData,
    // prodlist: array,
    imageSource: imageSourcePdf,
    currentDateTime: currentDateTime
  }
  const document = {
      html: html,
      data: {
        products: tableData
      },
      path: './docs/' + filename
  }
  pdf.create(document, options)
      .then(res => {
          console.log("pdf created res", res);
          let splitres = res.filename.split('\\');
          let recentFileName = splitres.slice(-1).pop();
          const mailData = {
            from: userCredential.userName,
            to: email ? email : userCredential.userName,
            subject: "Thank you for using mymanifold.com!",
            html: "<div>Your configuration is saved and accessible under: https://configurator.mymanifold.com/new-design/"+productId+"</div></br><div>We are happy to help you finalize your single-use manifold.</div></br><div>Please contact us at office@mymanifold.com</div>",
            attachments: [
              {
                filename: "newDesign.pdf",
                path: res.filename,
                contentType: "application/pdf"
              }
            ]
          };
          // console.log("attachments", mailData.attachments);
           sendMailAction(mailData);
      }).catch(error => {
          console.log(error);
      });

      const sendMailAction = (mailData) => {
        transporter.sendMail(mailData, (error, info) => {
          if (error) {
            return console.log("Api error main not send =>",error);
          }
          res.status(200).send({ message: "Your new design sent successfully.", message_id: info.messageId });
        });
      }
});

module.exports = router;