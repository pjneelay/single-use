import React, { useState, useEffect, useReducer } from "react";
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import TourReducer, { INITIAL_STATE } from "../../redux/guidedTour/reducer";
import { Link } from 'react-router-dom';
import {
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import Button from "../Button/Button";
//import DotCheckbox from "../DotCheckbox/DotCheckbox";
import { Menu, Dropdown, Input, Row, Col, Form, Spin } from 'antd';
import connector from "../../../assets/items/connector.png";
import tubings from "../../../assets/items/tubings.png";
import bags from "../../../assets/items/bag.png";
import filter from "../../../assets/items/filter.png";
import fittings from "../../../assets/items/fittings.png";
import fitting from "../../../assets/items/fitting.png";
import bottles from "../../../assets/items/bottle.png";
import accessories from "../../../assets/items/accessories.png";
import specialItem from "../../../assets/items/special-item.png";
import ModalCommon from "../../util/Modal/modalCommon";
import ItemForm from "../ItemForm/ItemForm";
import PresetForm from "../PresetForm/PresetForm";
import {
  SettingOutlined,
  MoreOutlined,
  ArrowUpOutlined,
  ArrowRightOutlined,
  ArrowDownOutlined,
  ArrowLeftOutlined,
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import moreDots from "../../../assets/more.png";
import Threekit_Player from '../Threekit/Player';
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import "./ManifoldConfig.css";
import { UpdateModels } from "../../redux/modelsHandling/action";
import { EMAIL_SEND_PDF } from "../../api/baseUrl";
import { get, post } from "../../api/api";
import Tooltip from "../tooltip/tooltip"
import { UpdateSelections } from "../../redux/userSelections/action";

const ManifoldConfig = (props) => {
  const {pageCount} = props;
  const asset = sessionStorage.getItem("currentIdPresetOnFocusTwoD") ? sessionStorage.getItem("currentIdPresetOnFocusTwoD") : 'b1024215-eb9a-4c47-9b4b-7a50799f7ab9';
  const [isvisible, setModalIsvisible] = useState(false);
  const [isPDFvisible, setIsPDFvisible] = useState(false);
  const [isPresetVisible, setIsPresetVisible] = useState(false);
  const [pdfRowData, setPdfRowData] = useState(null);
  const [stepTwoVisible, setStepTwoVisible] = useState(false);
  const [modal, setModal] = useState({});
  const [selectedItem, setSelectedItem] = useState("");
  const [itemsAttribute, setItemsAttribute] = useState({});
  const [sendPdfInProcesss, setPdfStatus] = useState(false);
  const [currentElement, setCurrentElem] = useState();
  const [imageSnap, setImageSnap] = useState(null);
  const [defaultVal, setDefaultVal] = useState("");

  const [userSelectItem, setUserSelectItems] = useState({
    presetType: '',
    presetAllSet: null
  });

  const [count, setCount] = useState(0);
  const [tourShowHide, setTourShowHide] = useState(true);

  const [customizeValue, setCustomizeValue] = useState(0);
  const [configureValue, setConfigureValue] = useState(0);
  const zoomAndControllers = (xByControllers, yByZoom, zByControllers) => {
    const cameraPositions = window.twoDPlayer.camera.getPosition();
    const { x, y, z } = cameraPositions;
    const currentPositionsToMove = {
      x: x + xByControllers,
      y: y + yByZoom,
      z: z + zByControllers
    }
    window.twoDPlayer.camera.setPosition(currentPositionsToMove)
  }
  const [tourState, dispatch] = useReducer(TourReducer, INITIAL_STATE);
  const tooltipMessage = sessionStorage.getItem('messagesForTooltip')
  const tooltipLeft = sessionStorage.getItem('messagesForTooltip') === "Group 1 - Spine Design" ? 
    '20%' 
    : 
    sessionStorage.getItem('messagesForTooltip') === "Group 2 – Sample Tubing" ?
    '30%'
    :
    sessionStorage.getItem('messagesForTooltip') === "Group 3 – Spine Design" ?
    '50%'
    :
    '0%';

  const tooltipTop = sessionStorage.getItem('messagesForTooltip') === "Group 1 - Spine Design" ? 
    '50%' 
    : 
    sessionStorage.getItem('messagesForTooltip') === "Group 2 – Sample Tubing" ?
    '5%'
    :
    sessionStorage.getItem('messagesForTooltip') === "Group 3 – Spine Design" ?
    '25%'
    :
    '0%';

  useEffect(() => {
    setDefaultVal("office@mymanifold.com");
    if(pageCount === 1){
      setTourShowHide(true);
      dispatch({ type: "START" });
    } else if(pageCount > 1){
      //dispatch({ type: "STOP" });
      setTourShowHide(false);
    }
  }, []);

  const callback = data => {
    const { action, index, type, status, count } = data;
    
    if (
      action === ACTIONS.CLOSE ||
      (status === STATUS.SKIPPED && tourState.run) ||
      status === STATUS.FINISHED
    ) {
      dispatch({ type: "STOP" });
      window.localStorage.setItem('onboarded', true);
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      dispatch({
        type: "NEXT_OR_PREV",
        payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) }
      });
    }
  };

  const startTour = () => {
    dispatch({ type: "RESTART" });
  };

  const menu = () => {
    return (
      <Menu>
        <Menu.Item key="0" onClick={() => setIsPDFvisible(true)}>
          <span>Share</span>
        </Menu.Item>
      </Menu>
    )
  };
  const { ModelsHandling, UserSelections } = useSelector(state => state);
  
  const actions = useActions({
    UpdateModels,
    UpdateSelections
  });
  const resizeImage = (base64Str, maxWidth = 500, maxHeight = 'auto') =>{
    return new Promise((resolve) => {
      let img = new Image()
      img.src = base64Str
      img.onload = () => {
        let canvas = document.createElement('canvas')
        const MAX_WIDTH = maxWidth
        const MAX_HEIGHT = maxHeight
        let width = img.width
        let height = img.height
  
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width
            width = MAX_WIDTH
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height
            height = MAX_HEIGHT
          }
        }
        canvas.width = width
        canvas.height = height
        let ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL())
      }
    })
  }

  const getSnapshot = async(snapshotWidth, snapshotHeight) => {
    // const { player } = window.newDesign.player.api;    
    return window.twoDPlayer.player.api.snapshotAsync({
        size: { width: snapshotWidth, height: snapshotHeight }
    });
  };

  const onFinish = async (values) => {
    // console.log('userSelectItem:', UserSelections.selectionsFromUser.categoriesAndSelections);
    let convertList = [];
    if(UserSelections.selectionsFromUser.categoriesAndSelections !== null){
      for(let item of Object.entries(UserSelections.selectionsFromUser.categoriesAndSelections)){
        convertList.push(item)
      }
    }
    const newList = convertList.filter((item) => item[0] !== "presetTwo");
    // console.log("filterd list", newList);
    let productId = sessionStorage.getItem("currentIdPresetOnFocusThreeD");
    let imgSrc = `https://preview.threekit.com/api/assets/thumbnail/${productId}?orgId=0db40a8d-a8fd-4900-8258-963ab37d7eb9&failOnEmpty=true&cacheMaxAge=300&cacheScope=thumbnail&bearer_token=31755654-4081-45d7-88e1-ee46a673b350`;

    const snapShot = await getSnapshot().then(res =>{
      return res
    });

    const getResizeImg = await resizeImage(snapShot);
    const reqObj = {
      productId: sessionStorage.getItem("currentIdPresetOnFocusTwoD"),
      email: values.email,
      // pdfUrl: `http://localhost:3000/pdf-page/${values.email}/${productId}`,
      userSelectedItems: newList,//UserSelections.selectionsFromUser.categoriesAndSelections,
      imageSource: getResizeImg
    };
    // console.log("req object", reqObj);
    setPdfStatus(true);
    post(EMAIL_SEND_PDF, reqObj)
      .then(res => {
        console.log("Mail send response response => ", res);
        setIsPDFvisible(false);
        setStepTwoVisible(true);
        setPdfStatus(false);
      })
      .catch(err => {
        console.log("Error response => ", err);
        setPdfStatus(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const displayDotKind = (color, defaultModelConnectorsDots) => {
    let presetStoraged = sessionStorage.getItem('preset');
    if (presetStoraged === 'presetOne') {
      window.twoDPlayer.configurator.setConfiguration({ "Entire Acc Display": "Hide" });
      window.twoDPlayer.configurator.setConfiguration({ "Entire Bot Display": "Hide" });
      window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Hide" });
      window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Hide" });
      window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": defaultModelConnectorsDots })
    } else if (presetStoraged === 'presetTwo') {
      window.twoDPlayer.configurator.setConfiguration({ "preTwoCon": defaultModelConnectorsDots });
      window.twoDPlayer.configurator.setConfiguration({ "groupOneCon": defaultModelConnectorsDots });
      window.twoDPlayer.configurator.setConfiguration({ "groupTwoCon": defaultModelConnectorsDots });
      window.twoDPlayer.configurator.setConfiguration({ "groupThreeCon": defaultModelConnectorsDots });
      window.twoDPlayer.configurator.setConfiguration({ "groupFourCon": defaultModelConnectorsDots });

      window.twoDPlayer.configurator.setConfiguration({ "preTwoCla": "Hide" });
      window.twoDPlayer.configurator.setConfiguration({ "groupOneCla": "Hide" });
      window.twoDPlayer.configurator.setConfiguration({ "groupTwoCla": "Hide" });
      window.twoDPlayer.configurator.setConfiguration({ "groupThreeCla": "Hide" });
      window.twoDPlayer.configurator.setConfiguration({ "groupFourCla": "Hide" });
      window.twoDPlayer.configurator.setConfiguration({ "preTwoYFit": "Hide" });
      window.twoDPlayer.configurator.setConfiguration({ "preTwoTub": "Hide" });
      window.twoDPlayer.configurator.setConfiguration({ "groupOneTub": "Hide" });
      window.twoDPlayer.configurator.setConfiguration({ "groupTwoTub": "Hide" });
      window.twoDPlayer.configurator.setConfiguration({ "groupThreeTub": "Hide" });
      window.twoDPlayer.configurator.setConfiguration({ "groupFourTub": "Hide" });
    }
    else if (presetStoraged === 'presetThree') {
      window.twoDPlayer.configurator.setConfiguration({ "Entire Acc Display": "Hide" });
      window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display":  defaultModelConnectorsDots});
      window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Hide" });
      window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Hide" });
    }
    else if (presetStoraged === 'presetFour') {
      window.twoDPlayer.configurator.setConfiguration({ "Entire Acc Display": "Hide" });
      window.twoDPlayer.configurator.setConfiguration({ "Entire Bot Display": "Hide" });
      window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": defaultModelConnectorsDots });
      window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Hide" });
      window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Hide" });
    }
    else if (presetStoraged === 'presetFive') {
      window.twoDPlayer.configurator.setConfiguration({ "Entire Acc Display": "Hide" });
      window.twoDPlayer.configurator.setConfiguration({ "Entire Bot Display": "Hide" });
      window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": defaultModelConnectorsDots });
      window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Hide" });
      window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Hide" });
    }
    else if (presetStoraged === 'presetSix') {
      window.twoDPlayer.configurator.setConfiguration({ "Entire Ba Display": "Hide" });
      window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": defaultModelConnectorsDots });
      window.twoDPlayer.configurator.setConfiguration({ "Entire Fil Display": 'Hide' });
      window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Hide" });
      window.twoDPlayer.configurator.setConfiguration({ "Entire Spe Item Display": "Hide" });
      window.twoDPlayer.configurator.setConfiguration({ " ": "Hide" });
    }
    window.twoDPlayer.configurator.setConfiguration({ "Dots Display": color });
  }
  const preModalData = (data, modelType) => {
    setCurrentElem(modelType)

    let presetStoraged = sessionStorage.getItem('preset');
    if (presetStoraged === 'presetOne') {
      window.twoDPlayer.configurator.setConfiguration({ "Dots Display": "Red" });
      switch (modelType) {
        case 'accessories':
          window.twoDPlayer.configurator.setConfiguration({ "Entire Acc Display": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Bot Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Hide" });
          break;
        case 'bag':
          window.twoDPlayer.configurator.setConfiguration({ "Entire Acc Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Bot Display": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Hide" });
          break;
        case 'connector':
          window.twoDPlayer.configurator.setConfiguration({ "Entire Acc Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Bot Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Hide" });
          break;
        case 'fitting':
          window.twoDPlayer.configurator.setConfiguration({ "Entire Acc Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Bot Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Hide" });
          break;
        case 'tubings':
          window.twoDPlayer.configurator.setConfiguration({ "Entire Acc Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Bot Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Show" });
          break;
      }
    }
    else if (presetStoraged === 'presetTwo') {
      switch (modelType) {
        case 'accessories':
          window.twoDPlayer.configurator.setConfiguration({ "preTwoCla": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "groupOneCla": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "groupTwoCla": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "groupThreeCla": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "groupFourCla": "Show" });

          window.twoDPlayer.configurator.setConfiguration({ "preTwoCon": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupOneCon": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupTwoCon": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupThreeCon": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupFourCon": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "preTwoYFit": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "preTwoTub": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupOneTub": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupTwoTub": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupThreeTub": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupFourTub": "Hide" });

          break;
        case 'connector':
          window.twoDPlayer.configurator.setConfiguration({ "preTwoCon": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "groupOneCon": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "groupTwoCon": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "groupThreeCon": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "groupFourCon": "Show" });

          window.twoDPlayer.configurator.setConfiguration({ "preTwoCla": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupOneCla": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupTwoCla": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupThreeCla": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupFourCla": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "preTwoYFit": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "preTwoTub": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupOneTub": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupTwoTub": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupThreeTub": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupFourTub": "Hide" });
          break;
        case 'fitting':
          window.twoDPlayer.configurator.setConfiguration({ "preTwoYFit": "Show" });

          window.twoDPlayer.configurator.setConfiguration({ "preTwoCon": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupOneCon": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupTwoCon": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupThreeCon": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupFourCon": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "preTwoCla": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupOneCla": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupTwoCla": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupThreeCla": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupFourCla": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "preTwoTub": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupOneTub": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupTwoTub": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupThreeTub": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupFourTub": "Hide" });
          break;
        case 'tubings':
          window.twoDPlayer.configurator.setConfiguration({ "preTwoTub": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "groupOneTub": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "groupTwoTub": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "groupThreeTub": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "groupFourTub": "Show" });


          window.twoDPlayer.configurator.setConfiguration({ "preTwoYFit": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "preTwoCon": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupOneCon": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupTwoCon": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupThreeCon": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupFourCon": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "preTwoCla": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupOneCla": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupTwoCla": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupThreeCla": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "groupFourCla": "Hide" });
          break;
      }
    } else if (presetStoraged === 'presetThree') {
      switch (modelType) {
        case 'accessories':
          window.twoDPlayer.configurator.setConfiguration({ "Entire Acc Display": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Hide" });
          break;

        case 'connector':
          window.twoDPlayer.configurator.setConfiguration({ "Entire Acc Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Hide" });
          break;

        case 'fitting':
          window.twoDPlayer.configurator.setConfiguration({ "Entire Acc Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Hide" });
          break;

        case 'tubings':
          window.twoDPlayer.configurator.setConfiguration({ "Entire Acc Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Show" });
          break;
      }

    } else if (presetStoraged === 'presetFour') {
      switch (modelType) {
        case 'accessories':
          window.twoDPlayer.configurator.setConfiguration({ "Entire Acc Display": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Hide" });
          break;
        case 'connector':
          window.twoDPlayer.configurator.setConfiguration({ "Entire Acc Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Hide" });
          break;
        case 'fitting':
          window.twoDPlayer.configurator.setConfiguration({ "Entire Acc Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Hide" });
          break;
        case 'tubings':
          window.twoDPlayer.configurator.setConfiguration({ "Entire Acc Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Show" });
          break;

      }
    } else if (presetStoraged === 'presetFive') {
      switch (modelType) {
        case 'accessories':
          window.twoDPlayer.configurator.setConfiguration({ "Entire Acc Display": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Bot Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Hide" });
          break;
        case 'bottle':
          window.twoDPlayer.configurator.setConfiguration({ "Entire Acc Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Bot Display": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Hide" });
          break;
        case 'connector':
          window.twoDPlayer.configurator.setConfiguration({ "Entire Acc Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Bot Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Hide" });
          break;
        case 'fitting':
          window.twoDPlayer.configurator.setConfiguration({ "Entire Acc Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Bot Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Hide" });
          break;
        case 'tubings':
          window.twoDPlayer.configurator.setConfiguration({ "Entire Acc Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Bot Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Show" });
          break;

      }

    } else if (presetStoraged === 'presetSix') {
      switch (modelType) {
        case 'bag':
          window.twoDPlayer.configurator.setConfiguration({ "Entire Ba Display": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": 'Hide' });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fil Display": 'Hide' });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Spe Item Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Hide" });
          break;
        case 'connector':
          window.twoDPlayer.configurator.setConfiguration({ "Entire Ba Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": 'Show' });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fil Display": 'Hide' });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Spe Item Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Hide" });
          break;
        case 'filter':
          window.twoDPlayer.configurator.setConfiguration({ "Entire Ba Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": 'Hide' });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fil Display": 'Show' });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Spe Item Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Hide" });
          break;
        case 'fitting':
          window.twoDPlayer.configurator.setConfiguration({ "Entire Ba Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": 'Hide' });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fil Display": 'Hide' });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Spe Item Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Hide" });
          break;
        case 'specialItem':
          window.twoDPlayer.configurator.setConfiguration({ "Entire Ba Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": 'Hide' });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fil Display": 'Hide' });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Spe Item Display": "Show" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Hide" });
          break;
        case 'tubings':
          window.twoDPlayer.configurator.setConfiguration({ "Entire Ba Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Con Display": 'Hide' });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fil Display": 'Hide' });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Fit Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Spe Item Display": "Hide" });
          window.twoDPlayer.configurator.setConfiguration({ "Entire Tub Display": "Show" });
          break;
      }
    }
  }
  const showModal = (data, modelType) => {
    setModalIsvisible(true);
    setModal(data)
  }

  const showPresetModal = () => {
    setIsPresetVisible(true);
  }

  const handleCancel = () => {
    setModalIsvisible(false);
  }

  const showModelsModal = () => {
    return (
      <ItemForm />
    )
  }

  const onButtonClick = () => {
    const elemsLabelsArray = document.querySelectorAll(".ant-col.ant-col-24.ant-form-item-label");
    const customValuesArray = document.querySelectorAll(".ant-input");
    const valuesArray = document.querySelectorAll(".ant-select-selection-item");
    let labelsArray = [];
    let totalOfValues = [];
    for(let i = 0; i < elemsLabelsArray.length; i++){
      labelsArray[i] = elemsLabelsArray[i].innerText !== "---" ? elemsLabelsArray[i].innerText.split('Select ')[1] : ""
      totalOfValues[i] = customValuesArray.length > 0 && customValuesArray[i].defaultValue !== "" ? customValuesArray[i].defaultValue : valuesArray.length > i ? valuesArray && valuesArray[i].innerHTML === "custom In" ? "" : valuesArray[i].innerHTML : ''
    };
    actions.UpdateSelections("data", UserSelections.selectionsFromUser, labelsArray, totalOfValues, window.sessionStorage.getItem("dot"));
    actions.UpdateSelections("metric", UserSelections.selectionsFromUser, sessionStorage.getItem('currentMetric'));
    setIsPresetVisible(false);
  }

  const showPresetOneGrid = () => {
    return (
      <div className="manifold-bottom">
          <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'connector')}>
            <div className="item-img-box">
              <img className="item item-1" src={connector} alt="item" />
            </div>
            <span className="item-title">Connector</span>
          </div>
          <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'tubings')}>
            <div className="item-img-box">
              <img className="item item-2" src={tubings} alt="item" onClick={() => preModalData(ModelsHandling.dataFromPlayer)}/>
            </div>
            <span className="item-title">Tubings</span>
          </div>
          <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'bag')}>
            <div className="item-img-box">
              <img className="item item-3" src={bags} alt="item" />
            </div>
            <span className="item-title">Bags</span>
          </div>
          <div className="item-disabled">
            <div className="item-img-box">
              <img className="item item-4" src={filter} alt="item" />
            </div>
            <span className="item-title">Filter</span>
          </div>
          <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'fitting')}>
            <div className="item-img-box">
              <img className="item item-5" src={fitting} alt="item"/>
            </div>
            <span className="item-title">Fittings</span>
          </div>
          <div className="item-disabled">
            <div className="item-img-box">
              <img className="item item-6" src={bottles} alt="item"/>
            </div>
            <span className="item-title">Bottles</span>
          </div>
          <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'accessories')}>
            <div className="item-img-box">
              <img className="item item-7" src={accessories} alt="item" />
            </div>
            <span className="item-title">Accessories</span>
          </div>
          <div className="item-disabled">
            <div className="item-img-box">
              <img className="item item-8" src={specialItem} alt="item" />
            </div>
            <span className="item-title">Special Item</span>
          </div>
        </div>
    )
  };
  const showPresetTwoGrid = () => {
    return (
      <div className="manifold-bottom">
          <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'connector')}>
            <div className="item-img-box">
              <img className="item item-1" src={connector} alt="item" />
            </div>
            <span className="item-title">Connector</span>
          </div>
          <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'tubings')}>
            <div className="item-img-box">
              <img className="item item-2" src={tubings} alt="item" onClick={() => preModalData(ModelsHandling.dataFromPlayer)}/>
            </div>
            <span className="item-title">Tubings</span>
          </div>
          <div className="item-disabled">
            <div className="item-img-box">
              <img className="item item-3" src={bags} alt="item" />
            </div>
            <span className="item-title">Bags</span>
          </div>
          <div className="item-disabled">
            <div className="item-img-box">
              <img className="item item-4" src={filter} alt="item" />
            </div>
            <span className="item-title">Filter</span>
          </div>
          <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'fitting')}>
            <div className="item-img-box">
              <img className="item item-5" src={fitting} alt="item"/>
            </div>
            <span className="item-title">Fittings</span>
          </div>
          <div className="item-disabled">
            <div className="item-img-box">
              <img className="item item-6" src={bottles} alt="item"/>
            </div>
            <span className="item-title">Bottles</span>
          </div>
          <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'accessories')}>
            <div className="item-img-box">
              <img className="item item-7" src={accessories} alt="item" />
            </div>
            <span className="item-title">Accessories</span>
          </div>
          <div className="item-disabled">
            <div className="item-img-box">
              <img className="item item-8" src={specialItem} alt="item" />
            </div>
            <span className="item-title">Special Item</span>
          </div>
        </div>
    )
  };
  const showPresetThreeGrid = () => {
    return (
      <div className="manifold-bottom">
          <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'connector')}>
            <div className="item-img-box">
              <img className="item item-1" src={connector} alt="item" />
            </div>
            <span className="item-title">Connector</span>
          </div>
          <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'tubings')}>
            <div className="item-img-box">
              <img className="item item-2" src={tubings} alt="item" onClick={() => preModalData(ModelsHandling.dataFromPlayer)}/>
            </div>
            <span className="item-title">Tubings</span>
          </div>
          <div className="item-disabled">
            <div className="item-img-box">
              <img className="item item-3" src={bags} alt="item" />
            </div>
            <span className="item-title">Bags</span>
          </div>
          <div className="item-disabled">
            <div className="item-img-box">
              <img className="item item-4" src={filter} alt="item" />
            </div>
            <span className="item-title">Filter</span>
          </div>
          <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'fitting')}>
            <div className="item-img-box">
              <img className="item item-5" src={fitting} alt="item"/>
            </div>
            <span className="item-title">Fittings</span>
          </div>
          <div className="item-disabled">
            <div className="item-img-box">
              <img className="item item-6" src={bottles} alt="item"/>
            </div>
            <span className="item-title">Bottles</span>
          </div>
          <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'accessories')}>
            <div className="item-img-box">
              <img className="item item-7" src={accessories} alt="item" />
            </div>
            <span className="item-title">Accessories</span>
          </div>
          <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'specialItem')}>
            <div className="item-img-box">
              <img className="item item-8" src={specialItem} alt="item" />
            </div>
            <span className="item-title">Special Item</span>
          </div>
        </div>
    )
  };
  const showPresetFourGrid = () => {
    return (
      <div className="manifold-bottom">
          <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'connector')}>
            <div className="item-img-box">
              <img className="item item-1" src={connector} alt="item" />
            </div>
            <span className="item-title">Connector</span>
          </div>
          <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'tubings')}>
            <div className="item-img-box">
              <img className="item item-2" src={tubings} alt="item" onClick={() => preModalData(ModelsHandling.dataFromPlayer)}/>
            </div>
            <span className="item-title">Tubings</span>
          </div>
          <div className="item-disabled">
            <div className="item-img-box">
              <img className="item item-3" src={bags} alt="item" />
            </div>
            <span className="item-title">Bags</span>
          </div>
          <div className="item-disabled">
            <div className="item-img-box">
              <img className="item item-4" src={filter} alt="item" />
            </div>
            <span className="item-title">Filter</span>
          </div>
          <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'fitting')}>
            <div className="item-img-box">
              <img className="item item-5" src={fitting} alt="item"/>
            </div>
            <span className="item-title">Fittings</span>
          </div>
          <div className="item-disabled">
            <div className="item-img-box">
              <img className="item item-6" src={bottles} alt="item"/>
            </div>
            <span className="item-title">Bottles</span>
          </div>
          <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'accessories')}>
            <div className="item-img-box">
              <img className="item item-7" src={accessories} alt="item" />
            </div>
            <span className="item-title">Accessories</span>
          </div>
          <div className="item-disabled">
            <div className="item-img-box">
              <img className="item item-8" src={specialItem} alt="item" />
            </div>
            <span className="item-title">Special Item</span>
          </div>
        </div>
    )
  };
  const showPresetFiveGrid = () => {
    return (
      <div className="manifold-bottom">
      <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'connector')}>
        <div className="item-img-box">
          <img className="item item-1" src={connector} alt="item" />
        </div>
        <span className="item-title">Connector</span>
      </div>
      <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'tubings')}>
        <div className="item-img-box">
          <img className="item item-2" src={tubings} alt="item" onClick={() => preModalData(ModelsHandling.dataFromPlayer)}/>
        </div>
        <span className="item-title">Tubings</span>
      </div>
      <div className="item-disabled">
        <div className="item-img-box">
          <img className="item item-3" src={bags} alt="item" />
        </div>
        <span className="item-title">Bags</span>
      </div>
      <div className="item-disabled">
        <div className="item-img-box">
          <img className="item item-4" src={filter} alt="item" />
        </div>
        <span className="item-title">Filter</span>
      </div>
      <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'fitting')}>
        <div className="item-img-box">
          <img className="item item-5" src={fitting} alt="item"/>
        </div>
        <span className="item-title">Fittings</span>
      </div>
      <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'bottle')} >
        <div className="item-img-box">
          <img className="item item-6" src={bottles} alt="item"/>
        </div>
        <span className="item-title">Bottles</span>
      </div>
      <div className="item-disabled">
        <div className="item-img-box">
          <img className="item item-7" src={accessories} alt="item" />
        </div>
        <span className="item-title">Accessories</span>
      </div>
      <div className="item-disabled">
        <div className="item-img-box">
          <img className="item item-8" src={specialItem} alt="item" />
        </div>
        <span className="item-title">Special Item</span>
      </div>
    </div>
    )
  };
  const showPresetSixGrid = () => {
    return (
      <div className="manifold-bottom">
      <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'connector')}>
          <div className="item-img-box">
            <img className="item item-1" src={connector} alt="item" />
          </div>
          <span className="item-title">Connector</span>
        </div>
        <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'tubings')}>
          <div className="item-img-box">
            <img className="item item-2" src={tubings} alt="item" onClick={() => preModalData(ModelsHandling.dataFromPlayer)}/>
          </div>
          <span className="item-title">Tubings</span>
        </div>
        <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'bag')}>
          <div className="item-img-box">
            <img className="item item-3" src={bags} alt="item" />
          </div>
          <span className="item-title">Bags</span>
        </div>
        <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'filter')}>
          <div className="item-img-box">
            <img className="item item-4" src={filter} alt="item"/>
          </div>
          <span className="item-title">Filter</span>
        </div>
        <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'fitting')}>
          <div className="item-img-box">
            <img className="item item-5" src={fitting} alt="item" />
          </div>
          <span className="item-title">Fittings</span>
        </div>
        <div className="item-disabled">
          <div className="item-img-box">
            <img className="item item-6" src={bottles} alt="item"/>
          </div>
          <span className="item-title">Bottles</span>
        </div>
        <div className="item-disabled">
          <div className="item-img-box">
            <img className="item item-7" src={accessories} alt="item"/>
          </div>
          <span className="item-title">Accessories</span>
        </div>
        <div className="item-container" onClick={() => preModalData(ModelsHandling.dataFromPlayer, 'specialItem')}>
          <div className="item-img-box">
            <img className="item item-8" src={specialItem} alt="item" />
          </div>
          <span className="item-title">Special Item</span>
        </div>
        </div>
    )
  };

  return (
    <div className="manifold">
      <Joyride
        {...tourState}
        callback={callback}
        showSkipButton={true}
        run={(typeof window === 'undefined') ? false : window.localStorage.getItem('onboarded') === null}
        styles={{
          options: {
            arrowColor: '#fff',
            backgroundColor: '#fff',
            overlayColor: 'rgba(0, 0, 0, 0.4)',
            primaryColor: '#000',
            textColor: '#004a14',
            width: 900,
            zIndex: 1000,
          }
        }}
        locale={{
          last: "End tour",
          skip: "Close tour"
        }}
      />
      {isPresetVisible && (
        <ModalCommon
          modalTitle=""
          closable={false}
          isModalVisible={isPresetVisible}
          handleCancel={() => setIsPresetVisible(false)}
          classProp="preset-modal">
          <PresetForm />
          <Button className="btn-black" label="OK" type="primary" onClickHandler={onButtonClick} />
        </ModalCommon>
      )}
      {isvisible &&
        (<ModalCommon modalTitle="" isModalVisible={isvisible} handleCancel={handleCancel} classProp="preset-modal">
          {showModelsModal()}
        </ModalCommon>)
      }
      {isPDFvisible &&
        (<ModalCommon modalTitle="Share by email" isModalVisible={isPDFvisible} handleCancel={() => setIsPDFvisible(false)} classProp="modalPopup">
          <div className="pdfShareForm">
            <Row>
              <Col span={24}>
                <Form
                  name="basic"
                  labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                    email: defaultVal
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input valid email address',
                      },
                      {
                        pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: ' ',
                      },
                    ]}
                  >
                    <Input defaultValue={defaultVal} />
                  </Form.Item>
                  <Form.Item
                    wrapperCol={{
                      offset: 12,
                      span: 12,
                      align: 'center'
                    }}
                  >
                    <Button className="send-button" type="primary" disabled={sendPdfInProcesss} htmlType="submit" label="SEND" style={{ verticalAlign: 'middle' }} buttonComp="pdfShare" />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        </ModalCommon>)
      }
      {stepTwoVisible && (
        <ModalCommon modalTitle="" isModalVisible={stepTwoVisible} handleCancel={() => setStepTwoVisible(false)} classProp="modalPopup">
          <div className="step-two-content">
            <h2>
              The link to your customization session has been shared successfully
            </h2>
            <div className="step-two-content-buttons">
              <Link to="/">
                <Button icon={null} className="step-two-ghost" label="back to home" onClickHandler={() => { }} />
              </Link>
              <Button icon={null} className="step-two-black" label="continue editing" onClickHandler={() => setStepTwoVisible(false)} />
            </div>
          </div>
        </ModalCommon>
      )
      }
      <div className="manifold-top-wrapper">
        <div className='manifold-content'>
          <h2 className="manifold-title">Configure your manifold</h2>
          <button className="manifold-hidden-button" onClick={() => showPresetModal()}>
            hidden
          </button>
          <div className="manifold-image configure-manifold">
            <div className='controllers'>
              <button className='controllers-button up' onClick={() => zoomAndControllers(0, 0, 5)}><ArrowUpOutlined className="controller-button-icon" /></button>
              <button className='controllers-button right' onClick={() => zoomAndControllers(-5, 0, 0)}><ArrowRightOutlined className="controller-button-icon" /></button>
              <button className='controllers-button down' onClick={() => zoomAndControllers(0, 0, -5)}><ArrowDownOutlined className="controller-button-icon" /></button>
              <button className='controllers-button left' onClick={() => zoomAndControllers(5, 0, 0)}><ArrowLeftOutlined className="controller-button-icon" /></button>
              <button className='controllers-button zoom-in' onClick={() => zoomAndControllers(0, -10, 0)}><PlusOutlined className="controller-button-icon" /></button>
              <button className='controllers-button zoom-out' onClick={() => zoomAndControllers(0, 10, 0)}><MinusOutlined className="controller-button-icon" /></button>
            </div>
            {(ModelsHandling.dataFromPlayer.category!==undefined &&
             (ModelsHandling.dataFromPlayer.category=="Preset One" ||
             ModelsHandling.dataFromPlayer.category=="Preset Two" ||
             ModelsHandling.dataFromPlayer.category=="Preset Three" ||
             ModelsHandling.dataFromPlayer.category=="Preset Four" ||
             ModelsHandling.dataFromPlayer.category=="Preset Five" ||
             ModelsHandling.dataFromPlayer.category=="Preset Six")) && 
             <div className="manifold-checkboxes">
              <div className="manifold-menu manifold-menu-blue"><div id="blueDot" onClick={() => displayDotKind('Blue', 'Hide')}></div>  Modify Your Manifold <span className="tooltiptext">Choose from the available modifications</span></div><br></br>
              <div className="manifold-menu manifold-menu-red"><div id="redDot" onClick={() => displayDotKind('Red', 'Show')}></div>   Change attributes <span className="tooltiptext">Choose from available options or input your own choice</span></div>
              <Tooltip 
                message={tooltipMessage} 
                left={tooltipLeft}  
                top={tooltipTop} 
                backgroundColor = '#FFF' 
                width = '0%'
                height = '0%'
              />
            </div>}
            {<Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
              <a className="ant-dropdown-link manifold-btn-right" onClick={e => e.preventDefault()}>
                <img className="more-icon" src={moreDots} alt="more" />
              </a>
            </Dropdown>}
            <div id='threekit-embed' style={{ height: '100%', width: '100%', position: 'relative', bottom: '0%' }}>
              <Threekit_Player className="threekit-preview" idSelector='threekit-embed' model={asset} />
            </div>
            <Button icon={<MoreOutlined className="icon-manifold" />} label={null} className="manifold-btn-right" />
           
          </div>
        </div>
      </div>
      {ModelsHandling.dataFromPlayer.category!==undefined &&
      (ModelsHandling.dataFromPlayer.category=="Preset One" ||
      ModelsHandling.dataFromPlayer.category=="Preset Two" ||
      ModelsHandling.dataFromPlayer.category=="Preset Three" ||
      ModelsHandling.dataFromPlayer.category=="Preset Four" ||
      ModelsHandling.dataFromPlayer.category=="Preset Five" ||
      ModelsHandling.dataFromPlayer.category=="Preset Six") ?
      <div className="manifold-bottom-wrapper">
      {/* <Spin tip="Loding 3D Experience"/> */}
      {ModelsHandling.dataFromPlayer.category!=undefined && ModelsHandling.dataFromPlayer.category=="Preset One" ?showPresetOneGrid():''}
      {ModelsHandling.dataFromPlayer.category!=undefined && ModelsHandling.dataFromPlayer.category=="Preset Two" ?showPresetTwoGrid() :''}
      {ModelsHandling.dataFromPlayer.category!=undefined && ModelsHandling.dataFromPlayer.category=="Preset Three" ?showPresetThreeGrid():''}
      {ModelsHandling.dataFromPlayer.category!=undefined && ModelsHandling.dataFromPlayer.category=="Preset Four" ?showPresetFourGrid():''}
      {ModelsHandling.dataFromPlayer.category!=undefined && ModelsHandling.dataFromPlayer.category=="Preset Five" ?showPresetFiveGrid():''}
      {ModelsHandling.dataFromPlayer.category!=undefined && ModelsHandling.dataFromPlayer.category=="Preset Six" ?showPresetSixGrid():''}

        <div className="manifold-footer">
          <ExclamationCircleOutlined className="icon-manifold-footer" />
          <p>If you don't have the real sizes, you could use approximate sizes.
            Stay tuned.
            <Link to="/" className="link">
              back to home
            </Link>
          </p>
        </div>
      </div> :  <div className="manifold-bottom-wrapper"><Spin /></div>}
    </div>
  )
}

export default ManifoldConfig;