import React, { useState, useEffect } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import "./pdfGenerator.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { EMAIL_SEND_PDF } from "../../api/baseUrl";
import { get, post } from "../../api/api";
import Threekit_Player from '../Threekit/Player';
import manifoldImg from "../../../assets/manifold.png";
// import Threekit_Player from "../../components/Threekit/Player";
import threekitHelper from "../../util/threekit";
import threekitConfig from "../../../config/threekitConfig";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import { UpdateModels } from "../../redux/modelsHandling/action";

const volumnJson = [
  {
    amount: "2",
    category: "Tubing",
    company: "Saint-Gobain",
    label: "C-Flex",
    material: "Silicone",
    ID: "1/8",
    OD: "3/8",
    wall: "3/4",
    length: "1m",
    fillingVol: "-",
    holdupVol: "8 ml"
  },
  {
    amount: "5",
    category: "Bags",
    company: "Entegris",
    label: "",
    material: "PP",
    ID: "-",
    OD: "-",
    wall: "-",
    length: "-",
    fillingVol: "5 L",
    holdupVol: "-"
  }
];
const PdfGeneratorComp = ({ props }) => {
  const asset = sessionStorage.getItem("currentIdPresetOnFocusTwoD") ? sessionStorage.getItem("currentIdPresetOnFocusTwoD") : 'b1024215-eb9a-4c47-9b4b-7a50799f7ab9';

  const { UserSelections } = useSelector(state => state);


  const actions = useActions({
    UpdateModels,
  });

  const [pdfRowData, setPdfRowData] = useState([]);
  const [apiMessage, setApiMessage] = useState("");
  const [imageSource, setImageSource] = useState("");
  const [pdfConcatedName, setPdfName] = useState("");
  const [currentDateTime, setTime] = useState(Date().toLocaleString());
  const [itemsAttribute, setItemsAttribute] = useState({});
  const [tableData, setTableData] = useState({
    tableRowData: null
  })
  const [dataTbl, setRowDataTbl] = useState(null);

  const setpdfData = async () => {
    let email = "";
    let pathname = window.location.pathname.split("/");
    if (pathname.length > 2) {
      email = pathname[2];
    }
    let productId = sessionStorage.getItem("currentIdPresetOnFocusThreeD");
    let imgSrc = `https://preview.threekit.com/api/assets/thumbnail/${productId}?orgId=0db40a8d-a8fd-4900-8258-963ab37d7eb9&failOnEmpty=true&cacheMaxAge=300&cacheScope=thumbnail&bearer_token=31755654-4081-45d7-88e1-ee46a673b350`;
    setImageSource(imgSrc);
    let products = await threekitHelper.fetchProducts(threekitConfig.productId);
    const currentProd = products.filter(item => {
      if (item.id == productId) {
        return item;
      }
      return;
    });
    // code uncommented
    setPdfRowData(volumnJson);
    // console.log("pdf data", pdfRowData);
    const input = document.querySelector("#divToPrint"); //docPdf();
    let random_string = (Math.random() + 1).toString(36).substring(7);
    let pdfName = `download_${random_string}.pdf`;
    // code uncommented
    // html2canvas(input, {
    //   logging: true,
    //   letterRendering: 1,
    //   allowTaint: false,
    //   useCORS: true
    // }).then(canvas => {
    //   // document.body.appendChild(canvas);
    //   const imgData = canvas.toDataURL("image/png");
    //   // const saveDir = ""
    //   const pdf = new jsPDF();
    //   pdf.addImage(imgData, "JPEG", 0, 0);
    //   // pdf.output("dataurlnewwindow");
    //   // setPdfName(pdfName);
    //   // console.log(pdfConcatedName)
    //   pdf.save(pdfName);
    // });

    const bodyParser = {
      to: "",
      html: input
    };
    return
    const reqObj = {
      productId: sessionStorage.getItem("currentIdPresetOnFocusTwoD"),
      pdfName: pdfName,
      email: email
      // linkpreview: products.attributes.images[0]
    };
    console.log("reqObj", reqObj);
    // post(EMAIL_SEND_PDF, reqObj)
    //   .then(res => {
    //     console.log("Mail send response response => ", res);
    //     setTimeout(() => {
    //       window.close();
    //     }, 200);
    //   })
    //   .catch(err => {
    //     console.log("Error response => ", err);
    //   });
  };

  const getConfigurationData = async () => {
    if (window.twoDPlayer.player !== undefined) {
      const configurateDetails = window.twoDPlayer.player.api.getConfigurator();
      configurateDetails.then((res) => {
        const dotPlayAtt = res.getDisplayAttributes();
        // dotPlayAtt[0].visible = false;
        // dotPlayAtt[0].values[0].visible = false;
        // dotPlayAtt[0].values[1].visible = false;
        window.twoDPlayer.getConfigurator().then(result => {
          const itemAtt = result.getAttributes();
          // console.log("itemAtt => ", itemAtt);
          setItemsAttribute(itemAtt);
          const filterItem = itemsAttribute.filter(item => {
            // if(item.name == selectedItem){
            //   return item
            // }
          });
        });
        // res.setConfiguration({"Dot_Play": true});
        // return dotPlayAtt;
      });
    }
  }

  const generateTable = () => {
    let listObj = {
      "Nissan": [
        {
          "model": "Sentra",
          "doors": 4
        },
        {
          "model": "Maxima",
          "doors": 4
        },
        {
          "model": "Skyline",
          "doors": 2
        }
      ],
      "Ford": [
        {
          "model": "Taurus",
          "doors": 4
        },
        {
          "model": "Escort",
          "doors": 4
        }
      ]
    }



    let tblHead = [];
    let tblData = [];

    for (let itm of Object.entries(listObj)) {
      let heading = {
        heading: itm[0],
        arrayData: itm[1],
      }
      tblHead.push(heading);
    }


    setTableData({
      tableRowData: tblHead,
    })

  }

  useEffect(() => {
    setpdfData();
    // getConfigurationData();
  }, []);

  return (
    <Document>
      <Page size="A4">
        <div id="divToPrint" className="mt4">
          <div>
            <input type="button" onClick={generateTable} value="Generate Table" />
          </div>
          <table style={{ textAlign: 'center', marginLeft: 0, marginRight: 0 }}>
            <tbody>
              <tr>
                <td>
                  <div
                    id="threekit-embed"
                    style={{
                      height: "100%",
                      width: "100%",
                      position: "relative",
                      bottom: "33%"
                    }}
                  >
                    <div id='threekit-embed' style={{ height: '100%', width: '100%', position: 'relative', bottom: '5%' }}>
                      <Threekit_Player className="threekit-preview" idSelector='threekit-embed' model={asset} />
                    </div>
                    <img src={imageSource} alt="" width="85%" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          {/* <table style={{textAlign: 'center'}}>
            <tbody>
              <tr className="table-row-custom">
                <th style={{ fontSize: 11 }}>Amount</th>
                <th style={{ fontSize: 11 }}>Category</th>
                <th style={{ fontSize: 11 }}>Company</th>
                <th style={{ fontSize: 11 }}>Label</th>
                <th style={{ fontSize: 11 }}>Material</th>
                <th style={{ fontSize: 11 }}>ID</th>
                <th style={{ fontSize: 11 }}>OD</th>
                <th style={{ fontSize: 11 }}>Wall</th>
                <th style={{ fontSize: 11 }}>Length</th>
                <th style={{ fontSize: 11 }}>Filling volume</th>
                <th style={{ fontSize: 11 }}>Holdup volume</th>
              </tr>
              {pdfRowData.map(rowData => {
                return (
                  <tr className="table-row-custom">
                    <td style={{ fontSize: 11 }}>{rowData.amount}</td>
                    <td style={{ fontSize: 11 }}>{rowData.category}</td>
                    <td style={{ fontSize: 11 }}>{rowData.company}</td>
                    <td style={{ fontSize: 11 }}>{rowData.label}</td>
                    <td style={{ fontSize: 11 }}>{rowData.material}</td>
                    <td style={{ fontSize: 11 }}>{rowData.ID}</td>
                    <td style={{ fontSize: 11 }}>{rowData.OD}</td>
                    <td style={{ fontSize: 11 }}>{rowData.wall}</td>
                    <td style={{ fontSize: 11 }}>{rowData["length"]}</td>
                    <td style={{ fontSize: 11 }}>{rowData.fillingVol}</td>
                    <td style={{ fontSize: 11 }}>{rowData.holdupVol}</td>
                  </tr>
                );
              })}
            </tbody>
          </table> */}
          {tableData.tableRowData !== null ?
            <table border="1" cellspacing="0" cellpadding="0" width="100%">
              <tbody>
                <tr>
                  {tableData.tableRowData.map((head, index) => {
                    return (
                      <th>{head.heading}</th>
                    )
                  })
                  }
                </tr>
                <tr>
                  {tableData.tableRowData.map((listData, index) => {
                    return (
                      <td>
                        <table>
                          {listData.arrayData.map(item => {
                            return (
                              <tr>
                                <td>{item.model}</td><td>{item.doors}</td>
                              </tr>
                            )
                          })
                          }
                        </table>
                      </td>
                    )
                  })
                  }
                </tr>
              </tbody>
            </table> : null}
        </div>
      </Page>
    </Document>
  );
};

export default PdfGeneratorComp;
