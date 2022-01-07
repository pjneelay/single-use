import React, { useState, useEffect, useReducer  } from "react";
import { Link } from 'react-router-dom';
import Player from "../../components/Threekit/Player";
import ModalCommon from "../../util/Modal/modalCommon";
import ItemForm from "../../components/ItemForm/ItemForm";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import { UpdateModels } from "../../redux/modelsHandling/action";
import "./NewDesignPage.css";
import Accordion from 'react-bootstrap/Accordion';
import { SettingOutlined, CheckOutlined, DownOutlined, UpOutlined , CloseCircleOutlined} from '@ant-design/icons';
import Button from "../../components/Button/Button";
import { Input, Row, Col, Form } from 'antd';
import {groupingObject} from "../NewDesignPage/NewDesignHelper"
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import NewDesignTourReducer, { INITIAL_STATE } from "../../redux/newDesignTour/reducer";
import { UpdateSelections } from "../../redux/userSelections/action";
import { EMAIL_SEND_NEWDESIGN ,EMAIL_SEND_QUOTE,EMAIL_SEND_QUOTE_REPLY} from "../../api/baseUrl";
import { post, postConfiguration } from "../../api/api";
import connector from "../../../assets/items/connector.png";
import connector2 from "../../../assets/items/connector2.PNG";
import kleenpack_connector from "../../../assets/items/Kleenpack_connector.png";
import tubings from "../../../assets/items/tubings.png";
import bags from "../../../assets/items/bag.png";
import filter from "../../../assets/items/filter.png";
import fittings from "../../../assets/items/fittings.png";
import X_fittings from "../../../assets/items/X_fitting.png";
import Y_fittings from "../../../assets/items/Y_fitting.png";
import straight_fittings from "../../../assets/items/straight_fitting.png";
import reducer_fittings from "../../../assets/items/reducer_fitting.png";
import elbow_fittings from "../../../assets/items/elbow_fitting.png";
import bottles from "../../../assets/items/bottle.png";
import accessories from "../../../assets/items/accessories.png";
import sensor from "../../../assets/items/sensor.png";
import asset from "../../data/elementsPosiblePositions.json";
import { individualElementsBuilder } from "../../util/individualElementsBuilder";
import { UpdateIndividualElements } from "../../redux/individualElements/action";
import authToken from "../../../config/threekitConfig";
import { parse } from "path";
import {useParams} from "react-router-dom";

const NewDesignPage = () => {
  let {productId} = useParams();
  const [model, setModel] = useState('');
  const [defaultModel, setDefaultModel] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [modal, setModal] = useState({});
  const [isvisible, setModalIsvisible] = useState(false);
  const [startingPosition, setStartingPosition] = useState(1);
  const [dataForModal, setDataForModal] = useState();
  const modelsData = useSelector(state => state.ModelsHandling);
  const userSelections = useSelector(state => state.UserSelections.selectionsFromUser);
  let individualElementsData = useSelector(state => state);
  individualElementsData = individualElementsData.IndividualElements
  const [currentAssetId, setCurrentAssetId] = useState('');
  const [currentModelToClone, setCurrentModelToClone] = useState('');
  const { TextArea } = Input;
  
  const actions = useActions({
    UpdateModels,
    UpdateSelections,
    UpdateIndividualElements
  });

  const [isPDFvisible, setIsPDFvisible] = useState(false);
  const [isRequestQuotevisible, setIsRequestQuotevisible] = useState(false);
  const [sendPdfInProcesss, setPdfStatus] = useState(false);
  const [isClearDesign, setIsClearDesign] = useState(false);
  const [groupObject, setGroupObject] = useState({});
  const [lastNodeobj, setLastNodeobj] = useState('');
  const [currentElement, setCurrentElem] = useState()
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [tourState, dispatch] = useReducer(NewDesignTourReducer, INITIAL_STATE);
  const [stepTwoVisible, setStepTwoVisible] = useState(false);
  const [defaultVal, setDefaultVal] = useState("");
  const [image, setImage] = useState('');
  const [sendQuoteInProcesss, setQuoteStatus] = useState(false);
  const [radioButtonStored, setRadioButtonStored] = useState('');
  const [gotSceneDeleted, setGotSceneDeleted] = useState(false);
  const [needTodeleteNode, setNeedToDeleteNode] = useState(false);
  const [dropdow, setDropdown] = useState(true)
  const [apsvalue, setApsvalue] = useState({});
  const [itemvalue, setItemvalue] = useState({});
  const [nullIdstore, setNullIdstore] = useState('');
  const [resumeBtndisable, setResumeBtnDisable] = useState(false);
  const [APS, setAPS] = useState({});
  const [ITEMS, setITEMS] = useState({});
  const [userSelState, setUserSelState] = useState({});
  const [indivisualSelState, setIndivisualSelState] = useState({});

  let indexForAttachmentPoints = 1;
  let isElementFullPopulated = false;
  useEffect(() => {
    defaultDesignLoad();
    setDefaultVal("office@mymanifold.com");
    setUserSelState(userSelections);
    setIndivisualSelState(userSelections);
    if (groupingObject !== null && groupingObject !== undefined) {
      setGroupObject(groupingObject);
    }
  }, []);
  const onQuoteShare = async(values) => {
    //For sending user details over email to office@mymanifold.com
    setQuoteStatus(true);
    // let convertList = [];
    // if(userSelections.categoriesAndSelections !== null){
    //   for(let item of Object.entries(userSelections.categoriesAndSelections)){
    //     convertList.push(item);
    //   }
    // }
    const allnodes = await saveConfiguration();
    let convertList = [];
    let valumList = [];
    let filterClist = [];
    let typesEle = [];
    let convertListModiy = [];
    let uniqElement = [];
    let filterConvertList = [];
    let remainCovertList = [];
    let valumeListCopy = [];
    let productIdStore = '';
    if(allnodes !== []){
      const state = JSON.stringify(allnodes);
      const apiconfig = window.newDesign;
      // console.log("state and nodes", state);
      try{
        const setproductId = await configUpdate(apiconfig, state).then(res =>{
            productIdStore = res.id;
        });
      }catch(e){
        console.log(e)
      }
    }

    if(userSelections.categoriesAndSelections !== null){
      for(let rem in userSelections.categoriesAndSelections){
        if(rem === 'tubing'){
          removeItemsStore(userSelections.categoriesAndSelections[rem], "tubings")
        }else if(rem === 'bag'){
          removeItemsStore(userSelections.categoriesAndSelections[rem], "bags")
        }else if(rem === 'filter'){
          removeItemsStore(userSelections.categoriesAndSelections[rem], "filters")
        }else if(rem === 'bottle'){
          removeItemsStore(userSelections.categoriesAndSelections[rem], "bottles")
          removeItemsStore(userSelections.categoriesAndSelections[rem], "Bottle Metrics")
        }
      }
      for(let item of Object.entries(userSelections.categoriesAndSelections)){
        convertList.push(item)
      }
    }

    if(individualElementsData.individualElements !== null && individualElementsData.individualElements !== undefined){
      for(let item of Object.entries(individualElementsData.individualElements)){
        valumList.push(item)
      }
    }

    let collectionConvert = ["tubing", "bag", "bottle", "filter"];
    let collectionIndividual = ["tubings", "bags", "bottles", "bottle", "filters"];

    filterConvertList = convertList.filter((item, index) =>{
      if(collectionConvert.includes(item[0])){
        return convertList.splice(index, 0);
      }
    });

    remainCovertList = convertList.filter((item, index) =>{
      if(!collectionConvert.includes(item[0])){
        return convertList.splice(index, 0);
      }
    });

    let removeUsless = ["specialItem", "[object object]", "[object Object]", "null"];

    let afterRemoveList = removeItems(remainCovertList, removeUsless);

    // console.log("remainCovertList after remove", afterRemoveList);

    filterClist.length = 0;
    valumeListCopy = [...valumList];
    afterRemoveList = [...afterRemoveList];
    filterClist = [...filterConvertList];

    filterClist.forEach((itm, index) =>{
      for(let bindvl of valumList){
        if(itm[0] == "tubing" && bindvl[0] == "tubings"){
          if(bindvl[1].length > 0){
            let typeData = {
              label: bindvl[0],
              typdata: bindvl[1]
            }
            itm[1].push(typeData)
          }
        }else if(itm[0] == "bag" && bindvl[0] == "bags"){
          if(bindvl[1].length > 0){
            let typeData = {
              label: bindvl[0],
              typdata: bindvl[1]
            }
            itm[1].push(typeData)
          }
        }else if(itm[0] == "bottle" && bindvl[0] == "bottles"){
          if(bindvl[1].length > 0){
            let typeData = {
              label: bindvl[0],
              typdata: bindvl[1].map(({name, id, capacity}) => {
                return {name, id, capacity};
              })
            }
            itm[1].push(typeData)
          }
        }else if(itm[0] == "filter" && bindvl[0] == "filters"){
          if(bindvl[1].length > 0){
            let typeData = {
              label: bindvl[0],
              typdata: bindvl[1].map(({name, id, type}) => {
                return {name, id, type};
             })
            }
            itm[1] = [];
            itm[1].push(typeData)
          }
        }
      }
    });
    filterClist = [...filterClist, ...afterRemoveList];
    // console.log("filterClist",filterClist);

    const fittingTube = [
      {xFitting: [{label: 'Tubing x-fitting', size: '1'},{label: 'Tubing x-fitting', size: '2'}]},
      {yFitting: [{label: 'Tubing y-fitting', size: '3'},{label: 'Tubing y-fitting', size: '4'}]},
      {tFitting: [{label: 'Tubing x-fitting', size: '5'},{label: 'Tubing x-fitting', size: '6'}]}
    ]
    // newList.push(fittingTube);

    window.newDesign.player.cameraController.zoom(-2)
    const snapShot = await getSnapshot().then(res =>{
      return res
    });

    if(snapShot !== null){
      const getResizeImg = await resizeImage(snapShot);
    const reqObj = {
      productId: productIdStore,
      email: values.email,
      name:values.name,
      message:values.message,
      userSelectedItems: filterClist,
      imageSource: getResizeImg
    };

    const emailObj={
      email:values.email
    }

    console.log("send object", reqObj);

    post(EMAIL_SEND_QUOTE, reqObj)
      .then(res => {
        setIsRequestQuotevisible(false);
        setStepTwoVisible(true);
        setQuoteStatus(false);
      })
      .catch(err => {
        console.log("Error response => ", err);
        setQuoteStatus(false);
      });

     // For sending auto reply to user's emailId
      post(EMAIL_SEND_QUOTE_REPLY, emailObj)
       .then(res => {
         console.log("Mail send response response => ", res);
         setModalIsvisible(false);
       })
      .catch(err => {
         console.log("Error response => ", err);
      });
  
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onFinishShareDesignFail = (errorInfo) => {
    console.log('Share design Failed:', errorInfo);
  };

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

  const configUpdate = (apiconfig, state) => {
    const body = new FormData();
    body.append("orgId", "05eb05bd-1152-4c06-a2e1-a8e956ba8565");
    body.append("productId",apiconfig.assetId);
    body.append("productVersion", "1.0");
    body.append("metadata", state);
    return fetch(`https://admin-fts.threekit.com/api/configurations?bearer_token=`+authToken.authToken, {
      method: "post",
      body,
    })
      .then((res) => res.json())
      .catch((e) => console.error(e));
  };

  const getConfigUpdate = (apiconfig, reqID) => {
    return fetch(`https://admin-fts.threekit.com/api/configurations/${reqID}?bearer_token=`+authToken.authToken, {
      method: "GET",
    })
      .then((res) => res.json())
      .catch((e) => console.error(e));
  };

  const resumeConfigParent = async() =>{
    if(productId !== undefined){
      try{
        await resumeConfiguration(productId);
      }catch(e){console.log(e)}
    }
  }
  
  const removeItemOnce = (arr)=> {
    arr[1].filter((rm, index) =>{
      if(rm.label == 'Tubing Length'){
        return arr[1].splice(index, 1);
      }else if(rm.label == 'Bag Volume'){
        return arr[1].splice(index, 1);
      }
    })
    return arr;
  }

  const removeItems = (arr, rmArr)=> {
    for(let i=0; i < arr.length; i++){
      if(rmArr.includes(arr[i][0])){
        arr.splice(i, 1);
        i--;
      }
    }
    return arr;
  }

  const removeItemsStore = (arr, rmArr)=> {
    for(let i=0; i < arr.length; i++){
      if(rmArr.includes(arr[i].label)){
        arr.splice(i, 1);
        i--;
      }
    }
    return arr;
  }

  const onFinish = async (values) => {
    setPdfStatus(true); 
    const allnodes = await saveConfiguration();
    let convertList = [];
    let valumList = [];
    let filterClist = [];
    let typesEle = [];
    let convertListModiy = [];
    let uniqElement = [];
    let filterConvertList = [];
    let remainCovertList = [];
    let valumeListCopy = [];
    let productIdStore = '';
    if(allnodes !== []){
      const state = JSON.stringify(allnodes);
      const apiconfig = window.newDesign;
      // console.log("state and nodes", state);
      try{
        const setproductId = await configUpdate(apiconfig, state).then(res =>{
            productIdStore = res.id;
        });
      }catch(e){
        console.log(e)
      }
    }

    if(userSelections.categoriesAndSelections !== null){
      for(let rem in userSelections.categoriesAndSelections){
        if(rem === 'tubing'){
          removeItemsStore(userSelections.categoriesAndSelections[rem], "tubings")
        }else if(rem === 'bag'){
          removeItemsStore(userSelections.categoriesAndSelections[rem], "bags")
        }else if(rem === 'filter'){
          removeItemsStore(userSelections.categoriesAndSelections[rem], "filters")
        }else if(rem === 'bottle'){
          removeItemsStore(userSelections.categoriesAndSelections[rem], "bottles")
          removeItemsStore(userSelections.categoriesAndSelections[rem], "Bottle Metrics")
        }
      }
      for(let item of Object.entries(userSelections.categoriesAndSelections)){
        convertList.push(item)
      }
    }

    if(individualElementsData.individualElements !== null && individualElementsData.individualElements !== undefined){
      for(let item of Object.entries(individualElementsData.individualElements)){
        valumList.push(item)
      }
    }

    let collectionConvert = ["tubing", "bag", "bottle", "filter"];
    let collectionIndividual = ["tubings", "bags", "bottles", "bottle", "filters"];

    filterConvertList = convertList.filter((item, index) =>{
      if(collectionConvert.includes(item[0])){
        return convertList.splice(index, 0);
      }
    });

    remainCovertList = convertList.filter((item, index) =>{
      if(!collectionConvert.includes(item[0])){
        return convertList.splice(index, 0);
      }
    });

    let removeUsless = ["specialItem", "[object object]", "[object Object]", "null"];
    let afterRemoveList = removeItems(remainCovertList, removeUsless);

    filterClist.length = 0;
    valumeListCopy = [...valumList];
    afterRemoveList = [...afterRemoveList];
    filterClist = [...filterConvertList];

    filterClist.forEach((itm, index) =>{
      for(let bindvl of valumList){
        if(itm[0] == "tubing" && bindvl[0] == "tubings"){
          if(bindvl[1].length > 0){
            let typeData = {
              label: bindvl[0],
              typdata: bindvl[1]
            }
            itm[1].push(typeData)
          }
        }else if(itm[0] == "bag" && bindvl[0] == "bags"){
          if(bindvl[1].length > 0){
            let typeData = {
              label: bindvl[0],
              typdata: bindvl[1]
            }
            itm[1].push(typeData)
          }
        }else if(itm[0] == "bottle" && bindvl[0] == "bottles"){
          if(bindvl[1].length > 0){
            let typeData = {
              label: bindvl[0],
              typdata: bindvl[1].map(({name, id, capacity}) => {
                return {name, id, capacity};
              })
            }
            itm[1].push(typeData)
          }
        }else if(itm[0] == "filter" && bindvl[0] == "filters"){
          if(bindvl[1].length > 0){
            let typeData = {
              label: bindvl[0],
              typdata: bindvl[1].map(({name, id, type}) => {
                return {name, id, type};
             })
            }
            itm[1] = [];
            itm[1].push(typeData)
          }
        }
      }
    });
    filterClist = [...filterClist, ...afterRemoveList];
    // console.log("filterClist",filterClist);

    const newList = convertList.filter((item) => item[0] !== "presetTwo");

    window.newDesign.player.cameraController.zoom(-2)
    const snapShot = await getSnapshot().then(res =>{
      return res
    });
    if(snapShot !== null){
      const getResizeImg = await resizeImage(snapShot);
      const reqObj = {
        productId: productIdStore,
        email: values.email,
        userSelectedItems: filterClist,//UserSelections.selectionsFromUser.categoriesAndSelections,
        imageSource: getResizeImg
      };
     post(EMAIL_SEND_NEWDESIGN, reqObj)
       .then(res => {
         console.log("Mail send response response => ", res);
         setIsPDFvisible(false);
         setStepTwoVisible(true);
         setPdfStatus(false);
         // window.newDesign.player.cameraController.zoom(20)
      })
      .catch(err => {
         console.log("Error response => ", err);
         setPdfStatus(false);
      });
    }
  };

  const getSnapshot = async(snapshotWidth, snapshotHeight) => {
    // const { player } = window.newDesign.player.api;    
    return window.newDesign.player.api.snapshotAsync({
        size: { width: snapshotWidth, height: snapshotHeight }
    });
  };

  const callback = data => {
    const { action, index, type, status, count } = data;
    
    if (
      action === ACTIONS.CLOSE ||
      (status === STATUS.SKIPPED && tourState.run) ||
      status === STATUS.FINISHED
    ) {
      dispatch({ type: "STOP" });
      window.localStorage.setItem('isLoaded', true);
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

  const defaultDesignLoad = () => {
    return (
      <div id='threekit-from-scratch'>
        <div className="newDesignPlayer">
          <Player
            idSelector={'threekit-from-scratch'}
            //https://admin-fts.threekit.com/o/singleusesupport/assets/24028331-e3dc-42ca-b7b7-a03928d69da0/edit
            model={"24028331-e3dc-42ca-b7b7-a03928d69da0"}
            triggerRemethod={resumeConfigParent}
          />
        </div>
      </div>
    )
  }

  const deleteManifoldDesign = async() => {
    if (window.newDesign.player.sceneGraph.nodes !== null && window.newDesign.player.sceneGraph.nodes !== undefined) {
      for (let itm of Object.entries(window.newDesign.player.sceneGraph.nodes)) {
        if (itm[1].type == 'Model') {
          if(itm[1].name !== 'Floor' && itm[1].name !== 'default_connector' && itm[1].name !== 'connector'){
            window.newDesign.scene.deleteNode(itm[1].id);
          }
          else if(itm[1].name == 'default_connector' || itm[1].name == 'connector'){
            document.querySelector(".su-canvas-tooltip").style.display = "none";
            window.newDesign.configurator.setConfiguration({"Conn Display": "None"});
            document.querySelector(".su-pop-up-selections").style.display = "none";

          }
        }
      }
    }
    setIsClearDesign(false);
    enableAllgroupObject();
    setGotSceneDeleted(true)
    const accordionMenu = document.querySelectorAll(".menu-options");

    for(let i = 0; i<accordionMenu.length; i++){
      if(accordionMenu[i].innerText == 'Connector'){
        accordionMenu[i].parentElement.classList.add("collapsed");
        accordionMenu[i].classList.add("menu-header");
        accordionMenu[i].style.fontWeight = 800;
        accordionMenu[i].style.color = "#000";
        document.querySelectorAll('.menu-options.menu-header-disabled')[i].parentElement.style.pointerEvents = 'auto';
      }else{
        accordionMenu[i].style.fontWeight = 600;
        accordionMenu[i].style.color = "#acacac";
        document.getElementsByClassName('menu-options')[i].parentElement.parentElement.parentElement.children[1].classList.remove("show");
        document.querySelectorAll('.menu-options.menu-header-disabled')[i].parentElement.style.pointerEvents = 'none'; 
        accordionMenu[i].classList.remove("collapsed")
      }
    }
  }
  const enableAllgroupObject = () =>{
    for (let itm of groupingObject) {
        itm.status = true
    }
  }

  const setRelationWithItem = (realtionArr) => {
    setGroupObject({});
    let trueValueData = [];
    let makeFalse = [];
    let mergeData = [];
    let relationArrTemp = realtionArr.relation;
    for (let itm of groupingObject) {
      if(relationArrTemp.filter(element => itm.relName.includes(element)).length > 0){
        itm.status = true
        trueValueData.push(itm)
      } else {
        itm.status = false
        makeFalse.push(itm)
      }
    }
    mergeData = [...trueValueData, ...makeFalse];
    setGroupObject(mergeData);
  }

  let lastElement;
  const deleteLastItemNode = () => {
    const lastNodeId = lastNodeobj; 
    let node = window.newDesign.scene.get({ id: lastNodeId }); 
    indexForAttachmentPoints=1;
    let parentnode;

    if(node != undefined){
      parentnode = window.newDesign.scene.get({ id: node.parent }); 
    }

    if(parentnode != undefined){
      while (parentnode.children.length > 0) {
        window.newDesign.scene.deleteNode(parentnode.children[0]);
      }
    }
  }
  const bringDefaultElem = elemToBring => {
    window.newDesign.configurator.setConfiguration({"Conn Display": elemToBring});
    document.querySelector(".su-canvas-tooltip").style.display = "flex";

    setGotSceneDeleted(false);
    setNeedToDeleteNode(true);
  }

  const saveConfiguration = async() =>{
    const ITEMS = itemvalue['ITEMS'];
    const APS = apsvalue;//Object.entries(apsvalue)[0][1];
    const nullId = nullIdstore;
    const nodes = [];
    // return
    const traverseChild = (nullId) => {
      if (APS[nullId] && APS[nullId].child) {
        const node = ITEMS[APS[nullId].child];
        const { type, children } = node;
        return {
          type,
          children: children
            .map((childNullId, index) => {
              const child = traverseChild(childNullId);
              if (child) child.index = index;
              return child;
            })
            .filter((e) => !!e),
        };
      }
    };
    Object.keys(ITEMS).forEach((id) => {
      // const id = Object.keys(itm)[0];
      const item = ITEMS[id];
      const { type, children, parent, translation } = item;//Object.entries(item)[0][1];
      if(!APS[parent]){
        nodes.push({
          type,
          children: children
            .map((childNullId, index) => {
              const child = traverseChild(childNullId);
              if (child) child.index = index;
              return child;
            })
            .filter((e) => !!e),
          translation,
        });
      }
    });
  
    console.log('nodes', JSON.stringify(nodes));
    return nodes;
  }

  const resumeConfiguration = async (productId) => {
  
    const parentSelection = window.newDesign.scene.get({name: 'AP-1'});

    window.newDesign.configurator.setConfiguration({"Conn Display": "default_connector_ending"});
    window.newDesign.selectionSet.add(parentSelection.children[0])
  
    const apiconfig = window.newDesign;
    const json = await getConfigUpdate(apiconfig, productId).then(res =>{
        return res['metadata'];
    });
    // console.log("json from api", json);
    let ASSETS = asset;
    const nodes = json;//JSON.parse(json);
    const traverseChild = async (child, idArr) => {
      const { type, index, children } = child;
      const parentId = idArr ? idArr[index] : parentSelection.children[1];
      const { attach_point_ids } = await addAsset(type, parentId);

    await Promise.all(
        children.map((child) => traverseChild(child, attach_point_ids))
      );
    };
    await traverseChild(nodes[0]);
    // await Promise.all(
    //   nodes.map(async (node) => {
    //     const { type, children, translation } = node;
    //     const { assetId, attach_point_ids } = await addAsset(type);
    //     window.newDesign.scene.set(
    //       { id: assetId, plug: 'Transform', property: 'translation' },
    //       translation
    //     );
    //     attach_point_ids.map((id, index) =>
    //     window.newDesign.scene.set(
    //         { id, plug: 'Transform', property: 'translation' },
    //         {
    //           x: translation.x + ASSETS[type].attach_points[index].translation.x,
    //           y: translation.y + ASSETS[type].attach_points[index].translation.y,
    //           z: translation.z + ASSETS[type].attach_points[index].translation.z,
    //         }
    //       )
    //     );
    //     await Promise.all(
    //       children.map((child) => traverseChild(child, attach_point_ids))
    //     );
    //   })
    // );
  };

  let currentAttachPointId;
  const createSelectedElement = async (modelToClone) => {
    let childOfAttach;
    if(!isElementFullPopulated){
      let ASSETS = asset;
      let name = [modelToClone]
        if (ASSETS[name]) {
          const { id, attach_points } = ASSETS[name];
      
          if (!currentAttachPointId) {
            const parentAP = window.newDesign.scene.get({name: 'AP-1'});
            currentAttachPointId = parentAP.children;
          }
          if(needTodeleteNode){
            window.newDesign.scene.deleteNode(window.newDesign.scene.get({id: currentAttachPointId[1]}).children[0]);
            setNeedToDeleteNode(false )
          }
          const modelPath = {
            name,
            type: 'Model',
            plugs: {
              Null: [{ type: 'Model', asset: { assetId: id } }],
              Properties: [
                {
                  type: 'ModelProperties',
                  visible: true,
                },
              ],
            },
            element: 1
          };
          let node = window.newDesign.scene.get({id: window.newDesign.selectionSet.ids[0]});
          let selectedElementName;
          while(typeof node.name !== 'string' || !node.name.startsWith('AP')) {
            node = window.newDesign.scene.get({id: node.parent});
            if(node.type == "Objects"){
              selectedElementName = node.name
            }
          }
          
          createTooltip(node.children[indexForAttachmentPoints])
          const assetId = await window.newDesign.scene.addNode(modelPath, node.children[indexForAttachmentPoints]);
          window.newDesign.selectionSet.clear()
          setCurrentAssetId(assetId);
          setCurrentModelToClone(modelToClone);
          setLastNodeobj(assetId);
          const attach_point_ids = await Promise.all(
            attach_points.map(async (obj, index) => {
              const { translation, rotation: r } = obj;
              const nullPath = {
                name: `AP-${index + 1}`,
                type: 'Null',
                plugs: {
                  Transform: [
                    {
                      translation: {
                        x: translation.x,
                        y: translation.y,
                        z: translation.z
                      },
                      rotation: {
                        x: r.x,
                        y: r.y,
                        z: r.z
                      },
                      name: 'Transform',
                      type: 'Transform'
                    },
                  ],
                },
              };
              childOfAttach = window.newDesign.scene.get({id: node.children[indexForAttachmentPoints]});
              const nullId = await window.newDesign.scene.addNode(nullPath, node.children[indexForAttachmentPoints]);
              setNullIdstore(nullId);
              return nullId;
            })
            
          );

          const apindex = indexForAttachmentPoints;
          
          if(modelToClone == "bag" || modelToClone == "bottle" || modelToClone == "filter" || modelToClone == "tubing"){
            const value = modelToClone == "tubing" && sessionStorage.getItem('currentMetric') == "Mm" ? 960 : 
              modelToClone == "tubing" && sessionStorage.getItem('currentMetric') == "In" ? 38 :
                modelToClone == "bag" && sessionStorage.getItem('currentMetric') == "Lt" ? 25 :
                  modelToClone == "bag" && sessionStorage.getItem('currentMetric') == "Oz" ? 85:
                    modelToClone == "botle" && sessionStorage.getItem('currentMetric') == "Lt" ? 5 :
                      167;

            const individualData = individualElementsBuilder(assetId, modelToClone, individualElementsData.individualElements, value, sessionStorage.getItem('currentMetric'));
            if(individualData){actions.UpdateIndividualElements(individualData)};
          } 


            if(modelToClone !== "accessories_clamp"){
              const index = Math.floor(Math.random() * attach_point_ids.length);
              currentAttachPointId = attach_point_ids;
              indexForAttachmentPoints = 1;
              // indexForAttachmentPoints = 1;

              const accordionMenu = document.querySelectorAll(".menu-options");
              for(let i = 0; i<accordionMenu.length; i++){
                  accordionMenu[i].style.fontWeight = 600;
                  accordionMenu[i].style.color = "#acacac";
                  document.getElementsByClassName('menu-options')[i].parentElement.parentElement.parentElement.children[1].classList.remove("show");
                  document.querySelectorAll('.menu-options.menu-header-disabled')[i].parentElement.style.pointerEvents = 'none'; 
                  accordionMenu[i].classList.remove("collapsed")
              };
              
              document.querySelector(".su-canvas-tooltip").style.display = "flex";
              document.querySelector(".su-canvas-tooltip-header").innerText = "Help Message!";
              document.querySelector(".su-canvas-tooltip-body").innerText = "Please click whatever element to enable menu at your right, and also add an element next to it";
              document.querySelector(".su-canvas-tooltip-body").style.textAlign = "center";
              document.querySelector(".su-canvas-tooltip").style.display = "flex";
              document.querySelector(".su-canvas-tooltip").style.background = "black";
              document.querySelector(".su-canvas-tooltip-header").style.backgroundColor = "black";
              document.querySelector(".su-canvas-tooltip-arrow").style.backgroundColor = "black";
              document.querySelector(".su-canvas-tooltip-header").style.color = "white";
              document.querySelector(".su-canvas-tooltip-header").style.border = "0.5px solid #f18e1e";
              document.querySelector(".su-canvas-tooltip-body").style.border = "0.5px solid #f18e1e"
              document.querySelector(".su-canvas-tooltip-body").style.backgroundColor = "black";
              document.querySelector(".su-canvas-tooltip-body").style.color = "white"
              document.querySelector(".su-canvas-tooltip-header").style.color = "white"
              setTimeout(function(){ 
                document.querySelector(".su-canvas-tooltip").style.display = "none";
              }, 6000);
    
              attach_point_ids.forEach((id) => {
                APS[id] = {
                  parent: assetId,
                };
              });
              ITEMS[assetId] = {
                type: name[0],
                children: attach_point_ids,
              };
              setItemvalue(prevState => ({
                ...prevState.itemvalue, 
                ITEMS  
              }));
              if (APS[node.children[apindex]]) {
                // This asset is added to an attach point of previous added item
                APS[node.children[apindex]].child = assetId;
                ITEMS[assetId].parent = node.children[apindex];
              } else {
                // APS[parentId] = {child: assetId};
                // All assumptions: configurator start from scratch; one could added multiple
                // start points and they could be different positions
                ITEMS[assetId].translation = window.newDesign.scene.get({
                  id: assetId,
                  plug: 'Transform',
                  property: 'translation',
                });
              }
              setApsvalue(APS);
              return { assetId, attach_point_ids };
            }
        }
        
      }
  } 
  
  const addAsset = async (
    name,
    parentId = currentAttachPointId || window.newDesign.instanceId
  ) => {
    let ASSETS = asset;
    if (ASSETS[name]) {
      const { id, attach_points } = ASSETS[name];
  
      const modelPath = {
        name,
        type: 'Model',
        plugs: {
          Null: [{ type: 'Model', asset: { assetId: id } }],
          Properties: [
            {
              type: 'ModelProperties',
              visible: true,
            },
          ],
        },
      };
  
      const assetId = await window.newDesign.scene.addNode(modelPath, parentId);
  
      const attach_point_ids = await Promise.all(
        attach_points.map(async (obj, index) => {
          const { translation, rotation } = obj;
  
          const nullPath = {
            name: `AP-${index + 1}`,
            type: 'Null',
            plugs: {
              Transform: [
                {
                  translation,
                  rotation,
                  name: 'Transform',
                  type: 'Transform',
                },
              ],
            },
          };
  
          const nullId = await window.newDesign.scene.addNode(nullPath, parentId);
  
          return nullId;
        })
      );
      const index = Math.floor(Math.random() * attach_point_ids.length);
    currentAttachPointId = attach_point_ids[index];

    attach_point_ids.forEach((id) => {
      APS[id] = {
        parent: assetId,
      };
    });

    ITEMS[assetId] = {
      type: name,
      children: attach_point_ids,
    };

    if (APS[parentId]) {
      // This asset is added to an attach point of previous added item
      APS[parentId].child = assetId;
      ITEMS[assetId].parent = parentId;
    } else {
      // All assumptions: configurator start from scratch; one could added multiple
      // start points and they could be different positions
      ITEMS[assetId].translation = window.newDesign.scene.get({
        id: assetId,
        plug: 'Transform',
        property: 'translation',
      });
    }
    return { assetId, attach_point_ids };
    }
  };
 
  const createTooltip = (attachmentPointsChildren ) => {
      if(window.newDesign.scene.get({id: attachmentPointsChildren}).children.length > 0){
        let tooltipRight = document.querySelector(".su-canvas-tooltip-error");
        document.querySelector(".su-canvas-tooltip-error").style.display = "flex";
        document.querySelector(".su-canvas-tooltip-error-header").innerText = "Warning Message!";
        document.querySelector(".su-canvas-tooltip-error-body").innerText = "Ooops, looks like this position is full";
        setTimeout(function(){ 
          document.querySelector(".su-canvas-tooltip-error").style.display = "none";
        }, 8000);
    }
  }


  const showModal = (elem, elemType) => {
    document.querySelector(".su-pop-up-selections").style.display = "none";
    let indexer = elem == "Connector" ? 0 : elem == "Tubing" ? 1 : elem == "Fitting" ? 4 : elem == "Bag" ? 2 : elem == "Filter" ? 3 : elem == "Bottle" ? 5 : elem == "Accessories" ? 6 : 0; 
    if(elemType == "x_fitting"){
        setImage(X_fittings);
    }
    else if(elemType == "t_fitting"){
      setImage(fittings);
    }
    else if(elemType == "y_fitting"){
      setImage(Y_fittings);
    }
    else if(elemType == "elbow_fitting"){
      setImage(elbow_fittings);
    }
    else if(elemType == "straight_fitting"){
      setImage(straight_fittings);
    }
    else if(elemType == "straight_reducer_fitting"){
      setImage(reducer_fittings);
    }
    else if(elemType == "bag"){
      setImage(bags);
    }
    else if(elemType == "bottle"){
      setImage(bottles);
    }
    else if(elemType == "filter"){
      setImage(filter);
    }
    else if(elemType == "tubing"){
      setImage(tubings);
    }
    else if(elemType == "default_connector_ending"){
      setImage(connector);
    }
    else if(elemType == "connector_ending"){
      setImage(connector2);
    }
    else if(elemType == "accessories_clamp"){
      setImage(accessories);
    }
    else if(elemType == "accessories_sensor"){
      setImage(sensor);
    }
    else if(elemType == "double_connetor"){
      setImage(kleenpack_connector);
    }
    setCurrentElem(elem.charAt(0).toLowerCase() + elem.slice(1))
    setDataForModal(modelsData && modelsData.dataFromPlayer.categoryTypes[indexer].attributes)
    setModalIsvisible(true);
  }

  const onSubmit = () => { 
    sessionStorage.setItem("onSubmitActiveELement", currentElement)
    const elemsLabelsArray = document.querySelectorAll(".ant-col.ant-col-24.ant-form-item-label");
    const customValuesArray = document.querySelectorAll(".ant-input");
    const valuesArray = document.querySelectorAll(".ant-select-selection-item");
    let labelsArray = [];
    let totalOfValues = [];
    for(let i = 0; i < elemsLabelsArray.length; i++){
      labelsArray[i] = elemsLabelsArray[i].innerText !== "---" ? elemsLabelsArray[i].innerText.split('Select ')[1] : "";
      totalOfValues[i] = customValuesArray.length > 0 && customValuesArray[i].defaultValue !== "" ? customValuesArray[i].defaultValue : valuesArray[i] == undefined? "" : valuesArray[i].innerHTML === "custom In" ? '' : valuesArray[i].innerHTML;
    };

    // const userSelections

    actions.UpdateSelections("data", userSelections, labelsArray, totalOfValues, currentElement);
    actions.UpdateSelections("metric", userSelections, sessionStorage.getItem('currentMetric'));
    setIndivisualSelState(userSelections);
    setModalIsvisible(false);
    //modelsData
  }
  const selectionFromUser = (e) => {
    if(e.type == "click"){
      try{
        let checkedElement = document.querySelectorAll(".anticon.anticon-check");
        const attributeSelected = parseInt(e.target.attributes[1].value);
        for(let a = 1; a<checkedElement.length + 1; a++){
          if(a == attributeSelected){
            checkedElement[a-1].style.display = 'flex';
          }else{
            checkedElement[a-1].style.display = 'none';
          }
        }
        indexForAttachmentPoints = attributeSelected;

      }
      catch (e){
        console.log(e)
      }
  
    }
    else {
      let error = false
      let quantityRange = e.currentTarget.value == "" ? 0 : parseFloat(e.currentTarget.value);
      if(sessionStorage.getItem('elementClicked') == "tubing" && sessionStorage.getItem('currentMetric') == "Mm"){
        if(quantityRange < 80 || quantityRange > 2000){
          document.querySelector(".su-pop-up-selections-body-error").style.display = "flex";
          document.querySelector(".su-pop-up-selections-body-error").innerHTML = "The tubing range goes from 80 " + sessionStorage.getItem('currentMetric') + " to" + " 2000 " + sessionStorage.getItem('currentMetric') + " please input a valid quantity";  
          error = true;
        }
      }else if(sessionStorage.getItem('elementClicked') == "tubing" && sessionStorage.getItem('currentMetric') == "" || sessionStorage.getItem('currentMetric') == "In"){
        if(quantityRange < 3.1496 || quantityRange > 78.74){
          document.querySelector(".su-pop-up-selections-body-error").style.display = "flex";
          document.querySelector(".su-pop-up-selections-body-error").innerHTML = "The tubing range goes from 3.1496 " + (sessionStorage.getItem('currentMetric') !== "" ? sessionStorage.getItem('currentMetric') : " In") + " to" + " 78.74 " + (sessionStorage.getItem('currentMetric') !== "" ? sessionStorage.getItem('currentMetric') : " In") + " please input a valid quantity";
          error = true;
  
        }
      }else if(sessionStorage.getItem('currentMetric') == "Lt" && sessionStorage.getItem('elementClicked') == "bag"){
        if(quantityRange < 0.1 || quantityRange > 50){
          document.querySelector(".su-pop-up-selections-body-error").style.display = "flex";
          document.querySelector(".su-pop-up-selections-body-error").innerHTML = "The bag volume ranges from 0.1 " + sessionStorage.getItem('currentMetric') + " to" + " 50" + sessionStorage.getItem('currentMetric') + ", please input a valid volume";
          error = true;  
        }

      }else if(sessionStorage.getItem('currentMetric') == "Oz" && sessionStorage.getItem('elementClicked') == "bag"){
        if(quantityRange < 3.3814 || quantityRange > 1690.70){
          document.querySelector(".su-pop-up-selections-body-error").style.display = "flex";
          document.querySelector(".su-pop-up-selections-body-error").innerHTML = "The bag volume ranges from 3.3814 " + sessionStorage.getItem('currentMetric') + " to" + " 1690.70 " + sessionStorage.getItem('currentMetric')  + ", please input a valid volume";
          error = true;
        }
      }else if(sessionStorage.getItem('currentMetric') == "Lt" && sessionStorage.getItem('elementClicked') == "bottle"){
        if(quantityRange < 0.1 || quantityRange > 10){
          document.querySelector(".su-pop-up-selections-body-error").style.display = "flex";
          document.querySelector(".su-pop-up-selections-body-error").innerHTML = "The bottle volume ranges from 0.1 " + sessionStorage.getItem('currentMetric') + " to" + " 10" + sessionStorage.getItem('currentMetric') + ", please input a valid volume";
          error = true;  
        }

      }else if(sessionStorage.getItem('currentMetric') == "Oz" && sessionStorage.getItem('elementClicked') == "bottle"){
        if(quantityRange < 3.3814 || quantityRange > 338.14){
          document.querySelector(".su-pop-up-selections-body-error").style.display = "flex";
          document.querySelector(".su-pop-up-selections-body-error").innerHTML = "The bottle volume ranges from 3.3814 " + sessionStorage.getItem('currentMetric') + " to" + " 338.14 " + sessionStorage.getItem('currentMetric')  + ", please input a valid volume";
          error = true;
        }
      }

      if(!error){
        document.querySelector(".su-pop-up-selections-body-error").style.display = "none";
      }else{
        //document.querySelector(".su-input").value = 0;
      }

    }
  }
  const appearDropdown = (e) => {
    let getDropdown = document.querySelector(".su-area-dropdown");
    if(dropdow){
      getDropdown.style.display = 'flex';
      document.querySelector(".anticon-up").style.display = "flex";
      document.querySelector(".anticon-down").style.display = "none";
      setDropdown(false)
    }
    else {
      getDropdown.style.display = 'none';
      document.querySelector(".anticon-up").style.display = "none";
      document.querySelector(".anticon-down").style.display = "flex";
      setDropdown(true)
    }
  }
  const changeDropdownSelection = (e) => {
    document.querySelector(".anticon-up").style.display = "none";
    document.querySelector(".anticon-down").style.display = "flex";
    document.querySelector(".su-dropdown").innerHTML = e.currentTarget.innerHTML;
    document.querySelector(".su-area-dropdown").style.display = 'none';
    setDropdown(true) 
  }
  const okButton = (e) =>{
    let value = sessionStorage.getItem("elementClicked") == "filter" ? document.querySelector('.su-dropdown').innerHTML : parseFloat(document.querySelector('.su-input').value);
    //if(sessionStorage.getItem("elementClicked") !== "filter") {value = isNaN(value) ? "none" : value;}
    let error = false;
    if(sessionStorage.getItem("elementClicked") == "bag" || sessionStorage.getItem("elementClicked") == "bottle" || sessionStorage.getItem("elementClicked") == "tubing"){
        if(sessionStorage.getItem("elementClicked") == "tubing" && sessionStorage.getItem('currentMetric') == "Mm"){if(value < 80 || value > 2000 ) {error = true;} else if(isNaN(value)){ value = 960 } }
        else if(sessionStorage.getItem("elementClicked") == "tubing" && sessionStorage.getItem('currentMetric') == "In"){if(value < 3.1496 || value > 78.74) {error = true;} else if(isNaN(value)){ value = 38 } }
        else if(sessionStorage.getItem("elementClicked") == "bag" && sessionStorage.getItem('currentMetric') == "Lt"){if(value < 0.1 || value > 50) {error = true;} else if(isNaN(value)){ value = 25 } }
        else if(sessionStorage.getItem("elementClicked") == "bag" && sessionStorage.getItem('currentMetric') == "Oz"){ if(value < 3.3814 || value > 1690.70) {error = true;} else if(isNaN(value)){ value = 844 } }
        else if(sessionStorage.getItem("elementClicked") == "botle" && sessionStorage.getItem('currentMetric') == "Lt") { if(value < 0.1 || value > 10) {error = true;} else if(isNaN(value)){ value = 5 } }
        else if(sessionStorage.getItem("elementClicked") == "botle" && sessionStorage.getItem('currentMetric') == "Oz")  { if(value < 3.814 || value > 338.14)  {error = true;} else if(isNaN(value)){ value = 168 } }
        else  error = false
    } 
  
    if(currentModelToClone == "bag" || currentModelToClone == "bottle" || currentModelToClone == "filter" || currentModelToClone == "tubing" && !error){
      const individualData = individualElementsBuilder(sessionStorage.getItem("selectedId"), sessionStorage.getItem("elementClicked"), individualElementsData.individualElements, value, sessionStorage.getItem('currentMetric'));
      if(individualData){actions.UpdateIndividualElements(individualData)};
    }
    document.querySelector(".su-pop-up-selections").style.display = 'none';
  }

  const closeModal = () => {
    document.querySelector(".su-pop-up-selections").style.display = 'none';
  }

  return (

    <div className='su-new-design'>
      <Joyride
        {...tourState}
        callback={callback}
        showSkipButton={true}
        run={(typeof window === 'undefined') ? false : window.localStorage.getItem('isLoaded') === null}
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
      {isvisible &&
        (<ModalCommon modalTitle="" isModalVisible={isvisible} handleCancel={() => setModalIsvisible(false)} classProp="preset-modal">
          <ItemForm data={dataForModal} elemClicked={currentElement} image={image}/> 
          <Button className="btn-black" label="OK" type="primary" onClickHandler={onSubmit} />
        </ModalCommon>)}

        {isPDFvisible &&
        (<ModalCommon modalTitle="Share by email" isModalVisible={isPDFvisible} handleCancel={() => setIsPDFvisible(false)} classProp="modalPopup">
          <div className="pdfShareForm newdesignPdfShare">
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
                  onFinishFailed={onFinishShareDesignFail}
                >
                  <Form.Item
                    label="Insert email"
                    name="email"
                    preserve={false}
                    rules={[
                      {
                        type: 'email',
                        required: true,
                        message: 'Please input valid email address',
                      },
                      {
                        pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: '',
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

      {isRequestQuotevisible &&
        (<ModalCommon modalTitle="Share with Sales Team" isModalVisible={isRequestQuotevisible} handleCancel={() => setIsRequestQuotevisible(false)} classProp="modalPopup">
        <div>
        <div className="pdfShareForm">
          {/* <Row>
              <Col span={12}><label>Email</label></Col>
            </Row> */}
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
                }}
              onFinish={onQuoteShare}
              onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter name',
                    },
                    {
                      pattern: /^[a-zA-Z ]/,
                      message: 'Please enter valid name',
                    },
                  ]}
                >
                  <Input onChange={e => setName(e.target.value)}/>
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input email address',
                    },
                    {
                      pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: 'Please input valid email address',
                    },
                  ]}
                >

                  <Input onChange={e => setEmail(e.target.value)} />
                </Form.Item>
                <Form.Item
                  label="Message"
                  name="message"
                  rules={[
                    {
                      required: false,
                      message: 'Please input message',
                    }
                  ]}
                >
                  <TextArea placeholder="Write a message..." rows={6} onChange={e => setMessage(e.target.value)}/>
                </Form.Item>
                
                  <Form.Item>
                    <Button type="primary" disabled={sendQuoteInProcesss} htmlType="submit" label="SUBMIT" className="send-button" buttonComp="pdfShare"/>
                  </Form.Item>
                
              </Form>
            </Col>
          </Row>
        </div>

      </div>
        </ModalCommon>)
      }

      {isClearDesign &&
        (<ModalCommon modalTitle="" isModalVisible={isClearDesign} handleCancel={() => setIsClearDesign(false)} classProp="modalPopup">
        <div className="clear-modal-container">
            
              <h3>Do you want to proceed to delete your manifold design ?</h3>
              <Button type="primary" label="Delete" className="send-button" onClickHandler={() => deleteManifoldDesign()}/>
              <Button style={{marginBottom:'2rem'}} type="primary"  label="Cancel" className="send-button" onClickHandler={() => setIsClearDesign(false)}/>
           
            
        </div>
        </ModalCommon>)
      }
      {defaultDesignLoad()}
      <div style={{width:'0px' ,height:'0px'}} className="new"></div>
      <div className='su-grid-menu'>
        <div className="su-canvas-tooltip">
          <div className="su-canvas-tooltip-content">
            <div className="su-canvas-tooltip-header">Welcome to the 3D MyManifold Configurator</div>
            <div className="su-canvas-tooltip-body">Please select the connector by clicking to enable the menu.</div>
          </div>
          <div className="su-canvas-tooltip-arrow"></div>
        </div>
        <div className="su-canvas-tooltip-error">
          <div className="su-canvas-tooltip-error-content">
            <div className="su-canvas-tooltip-error-header">Welcome to the 3D MyManifold Configurator</div>
            <div className="su-canvas-tooltip-error-body">Please select the connector by clicking to enable the menu.</div>
          </div>
          <div className="su-canvas-tooltip-error-arrow"></div>
        </div>
        <div className="su-pop-up-selections">
          <div className="su-pop-up-selections-content">
          <CloseCircleOutlined onClick={closeModal}/>
            <div className="su-pop-up-selections-header">
              <div className="su-guidance-message">Select where to add next element</div>
            </div>
            <div className="su-pop-up-selections-body">
              <div className="su-pop-up-selections-body-error"></div>
              <div className="su-body-rd-button rd-1"><div className="su-rd-buttons" radiobutton={1} onClick={(e) => selectionFromUser(e)}><CheckOutlined /></div><div className="su-option">opcion 1</div></div>
              <div className="su-body-rd-button rd-2"><div className="su-rd-buttons" radiobutton={2} onClick={(e) => selectionFromUser(e)}><CheckOutlined /></div><div className="su-option">opcion 1</div></div>
              <div className="su-body-rd-button rd-3"><div className="su-rd-buttons" radiobutton={3} onClick={(e) => selectionFromUser(e)}><CheckOutlined /></div><div className="su-option">opcion 1</div></div>
              <input placeholder="Please input here..." type="number" step="0.0001" className="su-input" onChange={(e) => selectionFromUser(e)}></input>
              <div className="su-parent-dropdown">
                <div className="su-dropdown" onClick={(e) => appearDropdown(e)}>
                  Fluorodyne® II DFL - Kleenpak™ TC 1-1½"
                </div>
                <div className="su-arrows" onClick={(e) => appearDropdown(e)}>
                  <DownOutlined /><UpOutlined />
                </div>
              </div>
              <div className="su-area-dropdown">
                <div className="su-dropdown-options" onClick={(e)=>{changeDropdownSelection(e)}}>Fluorodyne® II DFL - Kleenpak™ TC 1-1½"</div>
                <div className="su-dropdown-options" onClick={(e)=>{changeDropdownSelection(e)}}>Opticap® XL 4 KVGLG04TT3</div>
              </div>

            </div>
          </div>
          <div className="su-modal-footer">
            
            <div className="su-metric-box">
              <div className="su-remain-current-metric-title">Current Metric</div>
              <div className="su-remain-current-metric-box">{sessionStorage.getItem('currentMetric')}</div>
            </div>
            <button className="close-button" onClick={(e) => okButton(e)}>OK</button>
          </div>
        </div>
        <div className="su-scroll">
          <div className='su-col-2'>
            <div className='su-list'>
            <div className="main-menu">
            {groupObject.length > 0 && 
              groupObject.map((item, index) =>{
                return (<Accordion key={index}>
                <Accordion.Item eventKey={index}>
                  <Accordion.Header><p className="menu-options menu-header-disabled">{item.displayName}</p></Accordion.Header>
                  <Accordion.Body>
                  {item.subMenu !== undefined && item.subMenu.length > 0 ? 
                    item.subMenu.map((itm, i)=>{
                      return(
                      <div key={i} className='su-elem su-elem-1 su-elems-goup-1'><img src={itm.imgUrl} /><Button type="primary" htmlType="submit" label="Add" className={"add-button"} onClickHandler={() => { !gotSceneDeleted ? createSelectedElement(itm.menuName) : bringDefaultElem(itm.menuName)}} />
                        {itm.menuName == "accessories_clamp" || itm.menuName == "accessories_sensor" || itm.menuName == "double_connetor" || itm.menuName == "filter" ? null : <Button label={null} className="config-icon-box" icon={<SettingOutlined className="config-icon" />} onClickHandler={() => showModal(item.displayName, itm.menuName)}/>}</div>)
                    })
                      : <div className='su-elem su-elem-1 su-elems-goup-1'><img src={item.imageurl} /><Button type="primary" htmlType="submit" label="Add" className={"add-button"} onClickHandler={() => { !gotSceneDeleted ? createSelectedElement(item.menuName): bringDefaultElem(item.menuName) }} />
                      {item.menuName == "accessories_clamp" || item.menuName == "accessories_sensor" || item.menuName == "double_connetor"  || item.menuName == "filter" ? null : <Button label={null} className="config-icon-box" icon={<SettingOutlined className="config-icon" />} onClickHandler={() => showModal(item.displayName, item.menuName)}/>}</div> 
                      
                  }
                  
                  </Accordion.Body>
                </Accordion.Item>
                </Accordion>)
              })
            }
          </div>
          <div className="send-button-box">
              <Button type="primary" htmlType="submit" label="Share Design" className="send-button share-button" onClickHandler={() => setIsPDFvisible(true)} />
          </div>

          <div className="send-button-box">
              <Button type="primary" htmlType="submit" label="Request quote" className="send-button request-button" onClickHandler={() => setIsRequestQuotevisible(true)} />
          </div>

          <div className="send-button-box">
            <Button type="primary" htmlType="submit" label="Delete last Item" className="send-button  delete-button" onClickHandler={() => deleteLastItemNode()} />
          </div>
      
         <div className="send-button-box">
              <Button type="primary" htmlType="submit" label="Clear Design" className="send-button delete-all" onClickHandler={() => setIsClearDesign(true)}/>
          </div>
          
           {/* {resumeBtndisable ? 
          <div className="send-button-box">
            <Button type="primary" htmlType="submit" label="Resume Configuration" className="send-button  delete-button" onClickHandler={() => resumeConfigParent()} />
          </div> : '' }  */}
            </div>
          </div>
        </div>
        <div>
            <Link to="/" className="link link-pos">
              back to home
            </Link> 
        </div>
        
      </div>
    </div>

  )
}

export default NewDesignPage;