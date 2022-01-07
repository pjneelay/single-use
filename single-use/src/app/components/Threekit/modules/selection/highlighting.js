//import { isShadowPlane } from "../../helpers";
import { SwitcherFilled } from "@ant-design/icons";
import session from "redux-persist/lib/storage/session";
import ManifoldConfig from "../../../ManifoldConfig/ManifoldConfig";

export const SELECTION_COLORS = {
  VALID: "#0000ff",
  INVALID: "#ff0000",
};

export async function setNodeHighlighting(
  nodeId,
  highlight,
  kind,
  highlightChildren = false
  ) {
  const node = window.twoDPlayer.store.get("sceneGraph").nodes[nodeId];
  const { type, children } = node;
  const data = JSON.parse(sessionStorage.getItem('newPreset'));
  let nodeName = node.name;
  let dataForModal;
  //if (filter(node)) {
    if (type === "PolyMesh") {
      if (highlight) window.twoDPlayer.selectionSet.add(nodeId);
      else window.twoDPlayer.selectionSet.remove(nodeId);
    } else if (type === "Model") {
      let instanceId;

      const assetQuery = {
        id: nodeId,
        plug: "Null",
        property: "asset",
      };
      const asset = window.twoDPlayer.scene.get(assetQuery);
      if (typeof asset === "string") instanceId = asset;
      else {
        instanceId = await window.twoDPlayer.player.getAssetInstance({
          id: nodeId,
          plug: "Null",
          property: "asset",
        });
      }
      await setNodeHighlighting(instanceId, highlight, true);
    } else if (type === "Item") {
      const instanceId = await window.twoDPlayer.player.getAssetInstance({
        id: nodeId,
        plug: "Proxy",
        property: "asset",
      });
      await setNodeHighlighting(instanceId, highlight, true);
    }
  //}

  if (highlightChildren)
    return Promise.all(
      children.map(async (id) => setNodeHighlighting(id, highlight, true))
    );
  switch(nodeName){
    case "Preset_One_Dot_One":
      dataForModal = data.categoryTypes[8].attributes.attr0
      sessionStorage.setItem('dot', "Preset_One_Dot_One")
      sessionStorage.setItem('color', "blue")

      break;

    case "Preset_Two_Dot_One":
      dataForModal = data.categoryTypes[8].attributes.attr0
      sessionStorage.setItem('dot', "Preset_Two_Dot_One")
      sessionStorage.setItem('color', "blue")

      break;

    case "Preset_Two_Dot_Two":
      dataForModal = data.categoryTypes[8].attributes.attr1
      sessionStorage.setItem('dot', "Preset_Two_Dot_Two")
      sessionStorage.setItem('color', "blue")

      break;

    case "Preset_Two_Dot_Three":
      dataForModal = data.categoryTypes[8].attributes.attr2
      sessionStorage.setItem('dot', "Preset_Two_Dot_Three")
      sessionStorage.setItem('color', "blue")

      break;

    case "Preset_Two_Dot_Four":
      dataForModal = data.categoryTypes[8].attributes.attr3
      sessionStorage.setItem('dot', "Preset_Two_Dot_Four")
      sessionStorage.setItem('color', "blue")

      break;

    case "Preset_Three_Dot_One":
      dataForModal = data.categoryTypes[8].attributes.attr0
      sessionStorage.setItem('dot', "Preset_Three_Dot_One")
      sessionStorage.setItem('color', "blue")

      break;

    case "Preset_Four_Dot_One":
      dataForModal = data.categoryTypes[8].attributes.attr0
      sessionStorage.setItem('dot', "Preset_Four_Dot_One")
      sessionStorage.setItem('color', "blue")

      break;

  };
  if(kind === "kindClick"){
    if(nodeName === 'presetOneFirstGroupAccesoriesDots' || nodeName === 'presetOneGroupTwoAccesories' || nodeName === 'presetOneThirdGroupAccesories' 
    || nodeName === 'presetTwoClampsDots' || nodeName === 'presetThreeClampsDots' || nodeName === 'presetFourAccessories' || nodeName === 'presetThreeSensor' 
    || nodeName === 'SensorDot'){
      sessionStorage.setItem('dot', "accessories")
      sessionStorage.setItem('color', "red")

    }
    else if(nodeName === 'presetOneThirdGroupBottle' || nodeName === 'BagDot'){
      sessionStorage.setItem('dot', "bag")
      sessionStorage.setItem('color', "red")

    } 
    else if(nodeName === 'BottleDot'){
      sessionStorage.setItem('dot', "bottle")
      sessionStorage.setItem('color', "red")

    }
    else if(nodeName === 'presetOneFirstGroupConnectorsDots' || nodeName === 'presetOneGroupTwoConnectors' 
    || nodeName === 'presetOneThirdGroupConnectors' || nodeName === 'presetTwoConnectorDots' || nodeName === 'presetThreeConnectorDots' 
    || nodeName === 'presetFourConnector' || nodeName === 'connectorDot' || nodeName === 'ConnectorDot'
    || nodeName === 'PresetTwoConnectorDots1' || nodeName === 'PresetTwoConnectorDots2' || nodeName === 'PresetTwoConnectorDots3'
    || nodeName === 'PresetTwoConnectorDots4'){
      sessionStorage.setItem('dot', "connector")
      sessionStorage.setItem('color', "red")

    }
    else if(nodeName === 'presetOneFirstGroupFittingsDots' || nodeName === 'presetOneGroupTwoFittings' 
    || nodeName === 'presetOneThirdGroupFittings' || nodeName === 'presetTwoYFittingsDots' || nodeName === 'presetThreeXFittingDots' 
    || nodeName === 'presetFourFitting' || nodeName === 'FittingDot'){
      sessionStorage.setItem('dot', "fitting")
      sessionStorage.setItem('color', "red")

    }
    else if(nodeName === 'FilterDots'){
      sessionStorage.setItem('dot', "filter")
      sessionStorage.setItem('color', "red")

    }
    // else if(nodeName === 'presetThreeSensor' || nodeName === 'SensorDot'){
    //   sessionStorage.setItem('dot', "specialItem")
    //   sessionStorage.setItem('color', "red")

    // }
    else if(nodeName === 'presetOneFirstGroupTubingsDots' || nodeName === 'presetOneGroupTwoTubings' || nodeName === 'presetOneThirdGroupTubings' 
    || nodeName === 'presetTwoTubingsDots' || nodeName === 'presetThreeTubingDots' || nodeName === 'presetFourTubing' || nodeName === 'TubingDot'){
      sessionStorage.setItem('dot', "tubing")
      sessionStorage.setItem('color', "red")
    }
    document.querySelector(".manifold-hidden-button").click();
  }
  else{
    let elem = document.querySelector(".su-tooltip")
    if(elem !== undefined && nodeName === "presetOneFirstGroupAccesoriesDots" || nodeName === 'presetOneFirstGroupConnectorsDots' 
    || nodeName === 'presetOneFirstGroupFittingsDots' || nodeName === 'presetOneFirstGroupTubingsDots'){
      elem.style.display= 'none'
      elem.style.display = 'flex';
      elem.firstChild.innerHTML = "Group 1 - Pump Tubing";
      elem.style.top = '300%'
      elem.style.left = '100%'

    }
    else if(elem !== undefined && nodeName === "presetOneGroupTwoAccesories" || nodeName === 'presetOneGroupTwoConnectors' || nodeName === 'presetOneGroupTwoFittings'
    || nodeName === 'presetOneGroupTwoTubings'){
      elem.style.display= 'none'
      elem.style.display = 'flex';
      elem.firstChild.innerHTML = "Group 2 - Sample Tubing"
      elem.style.top = '50%'
      elem.style.left = '230%'
    }
    else if(elem !== undefined && nodeName === "presetOneThirdGroupAccesories" || nodeName === 'presetOneThirdGroupBottle' || nodeName === 'presetOneThirdGroupConnectors'
    || nodeName === 'presetOneThirdGroupFittings' || nodeName === 'presetOneThirdGroupTubings'){
      elem.style.display= 'none'
      elem.style.display = 'flex';
      elem.firstChild.innerHTML = "Group 3 - Spine Design"
      elem.style.top = '60%'
      elem.style.left = '320%'
    }
    //preset 2
    else if(elem !== undefined && nodeName === 'PresetTwoConnectorDotsGroup1' || nodeName === "PresetTwoConnectorDots1" || nodeName === "Preset_Two_Dot_One"){
      elem.style.display= 'none'
      elem.style.display = 'flex';
      elem.firstChild.innerHTML = "Group 1 – Connector 1"
      elem.style.top = '50%'
      elem.style.left = '320%'
    }
    else if(elem !== undefined && nodeName === "presetTwoClampsDotsGroup1"){
      elem.style.display= 'none'
      elem.style.display = 'flex';
      elem.firstChild.innerHTML = "Group 1 – Accessories"
      elem.style.top = '50%'
      elem.style.left = '320%'
    }
    else if(elem !== undefined && nodeName === 'presetTwoTubingsDotsGroup1'){
      elem.style.display= 'none'
      elem.style.display = 'flex';
      elem.firstChild.innerHTML = "Group 1 – Tubings"
      elem.style.top = '50%'
      elem.style.left = '320%'
    }
    else if(elem !== undefined && nodeName === 'PresetTwoConnectorDotsGroup2' || nodeName === "PresetTwoConnectorDots2" || nodeName === "Preset_Two_Dot_Two"){
      elem.style.display= 'none'
      elem.style.display = 'flex';
      elem.firstChild.innerHTML = "Group 2 – Connector 2"
      elem.style.top = '130%'
      elem.style.left = '320%'
    }
    else if(elem !== undefined && nodeName === "presetTwoClampsDotsGroup2"){
      elem.style.display= 'none'
      elem.style.display = 'flex';
      elem.firstChild.innerHTML = "Group 2 – Accessories"
      elem.style.top = '130%'
      elem.style.left = '320%'
    }
    else if(elem !== undefined && nodeName === 'presetTwoTubingsDotsGroup2'){
      elem.style.display= 'none'
      elem.style.display = 'flex';
      elem.firstChild.innerHTML = "Group 2 – Tubings"
      elem.style.top = '130%'
      elem.style.left = '320%'
    }
    else if(elem !== undefined && nodeName === 'PresetTwoConnectorDotsGroup3' || nodeName === "PresetTwoConnectorDots3" || nodeName === "Preset_Two_Dot_Three"){
      elem.style.display= 'none'
      elem.style.display = 'flex';
      elem.firstChild.innerHTML = "Group 3 – Connector 3"
      elem.style.top = '210%'
      elem.style.left = '320%'
    }
    else if(elem !== undefined && nodeName === "presetTwoClampsDotsGroup3"){
      elem.style.display= 'none'
      elem.style.display = 'flex';
      elem.firstChild.innerHTML = "Group 3 – Accessories"
      elem.style.top = '210%'
      elem.style.left = '320%'
    }
    else if(elem !== undefined && nodeName === 'presetTwoTubingsDotsGroup3'){
      elem.style.display= 'none'
      elem.style.display = 'flex';
      elem.firstChild.innerHTML = "Group 3 – Tubings"
      elem.style.top = '210%'
      elem.style.left = '320%'
    }
    else if(elem !== undefined && nodeName === 'PresetTwoConnectorDotsGroup4' || nodeName === "PresetTwoConnectorDots4" || nodeName === "Preset_Two_Dot_Four"){
      elem.style.display= 'none'
      elem.style.display = 'flex';
      elem.firstChild.innerHTML = "Group 4 – Connector 4"
      elem.style.top = '290%'
      elem.style.left = '320%'
    }
    else if(elem !== undefined && nodeName === "presetTwoClampsDotsGroup4"){
      elem.style.display= 'none'
      elem.style.display = 'flex';
      elem.firstChild.innerHTML = "Group 4 – Accessories"
      elem.style.top = '290%'
      elem.style.left = '320%'
    }
    else if(elem !== undefined && nodeName === 'presetTwoTubingsDotsGroup4'){
      elem.style.display= 'none'
      elem.style.display = 'flex';
      elem.firstChild.innerHTML = "Group 4 – Tubings"
      elem.style.top = '290%'
      elem.style.left = '320%'
    }
  }
}
