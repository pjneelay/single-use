import { getItems } from "../modules/items";
import { newDesignSelectionIndex } from "../modules/selection/newDesignIndex";

let pendingSelection = false;
let elementClicked;
function enableDisable(whatToDisable){
  const accordionMenu = document.querySelectorAll(".menu-options");
  for(let i = 0; i<accordionMenu.length; i++){
    if(whatToDisable == "tubing"){
      if(elementClicked == 'tubing'){
        if(accordionMenu[i].innerText !== "Tubing"){
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
      else{
        if(accordionMenu[i].innerText == "Tubing"){
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
    else{
      accordionMenu[i].style.fontWeight = 600;
      accordionMenu[i].style.color = "#acacac";
      document.getElementsByClassName('menu-options')[i].parentElement.parentElement.parentElement.children[1].classList.remove("show");
      document.querySelectorAll('.menu-options.menu-header-disabled')[i].parentElement.style.pointerEvents = 'none'; 
      accordionMenu[i].classList.remove("collapsed")
    }
  }
}
function createModalForSelectedElements(elementClicked) {
  
  if(elementClicked == "t_fitting" || elementClicked == "y_fitting" || elementClicked == "x_fitting" || elementClicked == "tubing" || elementClicked == "bag" || elementClicked == "filter" || elementClicked == "bottle"){
    let ArrayOfNextPositionToAdd = []
    let typePositionOrCapacity = "";
    let metric
    for(let a = 0; a<document.querySelectorAll(".su-body-rd-button").length; a++){
      document.querySelectorAll(".su-body-rd-button")[a].style.display = "none"
    }
    document.querySelector(".su-input").innerText = "";
    switch(elementClicked){
      case "t_fitting":
        typePositionOrCapacity = "position";
        ArrayOfNextPositionToAdd = [{"value":"Position 1"}, {"value":"Position 2"}];
        document.querySelector(".su-metric-box").style.display = "none";
        document.querySelector(".su-pop-up-selections-body-error").style.display = "none";
        document.querySelector(".close-button").style.display = "none";
        document.querySelector(".anticon.anticon-close-circle").style.display = "flex";
        document.querySelector(".su-dropdown").style.display = "none";
        document.querySelector(".su-parent-dropdown").style.display = "none";
        document.querySelector(".su-area-dropdown").style.display = "none";
        document.querySelector(".su-guidance-message").innerHTML = "Please select a position to add next element for this T Fitting";
        if(sessionStorage.getItem("assetSelected") !== sessionStorage.getItem("theLastId")){
          document.querySelectorAll(".anticon.anticon-check")[0].style.display = "none";
          document.querySelectorAll(".anticon.anticon-check")[1].style.display = "none"
          document.querySelectorAll(".anticon.anticon-check")[2].style.display = "none"
        }
        break;

      case "y_fitting":
        typePositionOrCapacity = "position";
        ArrayOfNextPositionToAdd = [{"value":"Position 1"}, {"value":"Position 2"}];
        document.querySelector(".su-metric-box").style.display = "none";
        document.querySelector(".su-pop-up-selections-body-error").style.display = "none";
        document.querySelector(".close-button").style.display = "none";
        document.querySelector(".anticon.anticon-close-circle").style.display = "flex";
        document.querySelector(".su-guidance-message").innerHTML = "Please select a position to add next element for this Y Fitting";
        document.querySelector(".su-dropdown").style.display = "none";
        document.querySelector(".su-parent-dropdown").style.display = "none";
        document.querySelector(".su-area-dropdown").style.display = "none";

        if(sessionStorage.getItem("assetSelected") !== sessionStorage.getItem("theLastId")){
          document.querySelectorAll(".anticon.anticon-check")[0].style.display = "none";
          document.querySelectorAll(".anticon.anticon-check")[1].style.display = "none"
          document.querySelectorAll(".anticon.anticon-check")[2].style.display = "none"
        }

        break;

      case "x_fitting":
        typePositionOrCapacity = "position";
        ArrayOfNextPositionToAdd = [{"value":"Position 1"}, {"value":"Position 2"}, {"value":"Position 3"}];
        document.querySelector(".su-metric-box").style.display = "none";
        document.querySelector(".su-pop-up-selections-body-error").style.display = "none";
        document.querySelector(".close-button").style.display = "none";
        document.querySelector(".anticon.anticon-close-circle").style.display = "flex";
        document.querySelector(".su-guidance-message").innerHTML = "Please select a position to add next element for this X Fitting";
        document.querySelector(".su-dropdown").style.display = "none";
        document.querySelector(".su-parent-dropdown").style.display = "none";
        document.querySelector(".su-area-dropdown").style.display = "none";

        if(sessionStorage.getItem("assetSelected") !== sessionStorage.getItem("theLastId")){
          document.querySelectorAll(".anticon.anticon-check")[0].style.display = "none";
          document.querySelectorAll(".anticon.anticon-check")[1].style.display = "none"
          document.querySelectorAll(".anticon.anticon-check")[2].style.display = "none"
        }
        break;

      case "tubing":
        typePositionOrCapacity = "capacity";
        document.querySelector(".su-parent-dropdown").style.display = "none";
        document.querySelector(".su-metric-box").style.display = "flex";
        document.querySelector(".su-pop-up-selections-body-error").innerHTML = "";
        document.querySelector(".su-input").value = "";
        metric = sessionStorage.getItem('currentMetric') && sessionStorage.getItem('currentMetric') !== "undefined" && sessionStorage.getItem('currentMetric') !== "Lt" && sessionStorage.getItem('currentMetric') !== "Oz" ? sessionStorage.getItem('currentMetric') :  "In";
        document.querySelector(".su-remain-current-metric-box").innerHTML = metric;
        sessionStorage.setItem('currentMetric', metric);
        document.querySelector(".close-button").style.display = "flex";
        document.querySelector(".anticon.anticon-close-circle").style.display = "none";
        document.querySelector(".su-dropdown").style.display = "none";
        document.querySelector(".su-parent-dropdown").style.display = "none";
        document.querySelector(".su-area-dropdown").style.display = "none";

        document.querySelector(".su-guidance-message").innerHTML = "Please input length for selected tubing";

        break;

      case "bag":
        typePositionOrCapacity = "capacity";
        document.querySelector(".su-parent-dropdown").style.display = "none";
        document.querySelector(".su-metric-box").style.display = "flex";
        document.querySelector(".su-pop-up-selections-body-error").innerHTML = "";
        metric = sessionStorage.getItem('currentMetric') && sessionStorage.getItem('currentMetric') !== "undefined" && sessionStorage.getItem('currentMetric') !== "In" && sessionStorage.getItem('currentMetric') !== "Mm" ? sessionStorage.getItem('currentMetric') :  "Lt"; 
        document.querySelector(".su-remain-current-metric-box").innerHTML = metric
        document.querySelector(".su-input").value = "";
        sessionStorage.setItem('currentMetric', metric);
        document.querySelector(".close-button").style.display = "flex";
        document.querySelector(".su-dropdown").style.display = "none";
        document.querySelector(".su-parent-dropdown").style.display = "none";
        document.querySelector(".anticon.anticon-close-circle").style.display = "none";
        document.querySelector(".su-area-dropdown").style.display = "none";

        document.querySelector(".su-body-rd-button rd-1").style.display = "none"
        break;

      case "bottle":
        typePositionOrCapacity = "capacity";
        document.querySelector(".su-parent-dropdown").style.display = "none";
        document.querySelector(".su-metric-box").style.display = "flex";
        document.querySelector(".su-pop-up-selections-body-error").innerHTML = "";
        metric = sessionStorage.getItem('currentMetric') && sessionStorage.getItem('currentMetric') !== "undefined" && sessionStorage.getItem('currentMetric') !== "In" && sessionStorage.getItem('currentMetric') !== "Mm" ? sessionStorage.getItem('currentMetric') :  "Lt"; 
        document.querySelector(".su-remain-current-metric-box").innerHTML = metric;
        document.querySelector(".su-input").value = "";
        sessionStorage.setItem('currentMetric', metric);
        document.querySelector(".close-button").style.display = "flex";
        document.querySelector(".su-dropdown").style.display = "none";
        document.querySelector(".su-parent-dropdown").style.display = "none";
        document.querySelector(".anticon.anticon-close-circle").style.display = "none";
        document.querySelector(".su-area-dropdown").style.display = "none";


        break;

      case "filter":
        typePositionOrCapacity = "capacity";
        document.querySelector(".su-input").style.display = "none";
        document.querySelector(".su-parent-dropdown").style.display = "flex";
        document.querySelector(".su-metric-box").style.display = "none";
        document.querySelector(".su-pop-up-selections-body-error").style.display = "none";
        document.querySelector(".close-button").style.display = "flex";
        document.querySelector(".su-dropdown").style.display = "flex";
        document.querySelector(".su-parent-dropdown").style.display = "flex";
        document.querySelector(".anticon.anticon-close-circle").style.display = "flex"
        document.querySelector(".su-area-dropdown").style.display = "flex";


        break;
      default:
        document.querySelector(".su-metric-box").style.display = "none";

    };
    document.querySelector(".su-pop-up-selections").style.display = "flex";
    for(let a = 0; a < document.querySelectorAll(".su-option").length; a++){
      if(typePositionOrCapacity === "position"){
        if(ArrayOfNextPositionToAdd[a]){
          document.querySelectorAll(".su-body-rd-button")[a].style.display='flex';
          document.querySelectorAll(".su-option")[a].innerText = ArrayOfNextPositionToAdd[a].value;
          document.querySelector(".su-input").style.display='none';

        }
        else{
          document.querySelectorAll(".su-body-rd-button")[a].style.display='none';

        }
      }
      else if(elementClicked == "filter"){
        document.querySelector(".su-guidance-message").innerText =`Select the type for this ${elementClicked}`;
      }
      else{
        document.querySelectorAll(".su-body-rd-button")[a].style.display='none';
        document.querySelector(".su-input").style.display='flex';
        document.querySelector(".su-guidance-message").innerText = `Please input  ${elementClicked == "tubing" ? " length" : elementClicked == "bag" ? "volume" :elementClicked == "bottle" ? "volume" :"" } for selected ${elementClicked}`;
      }
    }
  }
  else{
    document.querySelector(".su-pop-up-selections").style.display = "none"; 
  }

}
export const newDesignSelection = {
  key: "newDesignSelection",
  label: "newDesignSelect",
  active: true,
  enabled: true,
  handlers: {
    click: async (ev) => {
      const apiNamespace = 'newDesign';
      window[apiNamespace].selectionSet.clear();
      pendingSelection = true;
      //await clearSelection();
      if(ev.hitNodes.length){
        for(let a = 0; a < ev.hitNodes[0].hierarchy.length; a++){
          if(ev.hitNodes[0].hierarchy[a].type === "Model"){
            sessionStorage.setItem("selectedId", ev.hitNodes[0].hierarchy[a].nodeId);
          }
        }
      }
      if (!ev.hitNodes || !ev.hitNodes.length || ev.hitNodes[0].hierarchy[1].name == "Floor") {
        pendingSelection = false;
        const tooltipTop = window.innerWidth >= 285 && window.innerWidth <= 500 ? "-252px" : window.innerWidth >= 501 && window.innerWidth <= 850 ? "40px" : "20%"; 
        document.querySelector(".su-canvas-tooltip-header").innerText = "Invalid selection";
        document.querySelector(".su-canvas-tooltip-body").innerText = "Please select a valid element.";
        document.querySelector(".su-canvas-tooltip-body").style.textAlign = "center";
        
        document.querySelector(".su-canvas-tooltip").style.display = "flex";
        document.querySelector(".su-canvas-tooltip").style.top = tooltipTop;
        document.querySelector(".su-canvas-tooltip").style.background = "black";
        document.querySelector(".su-canvas-tooltip-header").style.backgroundColor = "black";
        document.querySelector(".su-canvas-tooltip-arrow").style.backgroundColor = "black";
        document.querySelector(".su-canvas-tooltip-arrow").style.backgroundColor = "black";

        document.querySelector(".su-canvas-tooltip-header").style.color = "white";
        document.querySelector(".su-canvas-tooltip-header").style.border = "0.5px solid #f18e1e";
        document.querySelector(".su-canvas-tooltip-body").style.border = "0.5px solid #f18e1e"
        document.querySelector(".su-canvas-tooltip-body").style.backgroundColor = "black";
        document.querySelector(".su-canvas-tooltip-body").style.color = "white"
        setTimeout(function(){ 
          document.querySelector(".su-canvas-tooltip").style.display = "none";
        }, 4000);
        enableDisable('all')
        return;
      }
      const hit = ev.hitNodes[0]; // for now always just check first hit - do we care about clicking objects behind the first hit?
      if (!hit.hierarchy.length) {
        pendingSelection = false;
        return;
      }

      // check name of leaf node to see if it's a shadow plane mesh
      //window[apiNamespace].clickedComponent = hit.hierarchy.filter(h => h.name.startsWith("Component")).pop();
      const { name } = hit.hierarchy[hit.hierarchy.length - 1];
      const items = getItems();
      let nodes = window[apiNamespace].store.get("sceneGraph").nodes;
      let keys = Object.keys(window[apiNamespace].store.get("sceneGraph").nodes);
      let modelId = "";
      let found = false;
      
      hit.hierarchy.forEach((e) => {
        if (e.type === "Model") {
          keys.forEach((key, i ) => {
            if (nodes[key].type == "Model" && e.nodeId === key && !found) {
              modelId = key;
              sessionStorage.setItem("assetSelected", modelId)
              elementClicked = nodes[key].name[0];
              sessionStorage.setItem('elementClicked', elementClicked)
              if(nodes[key].name == "default_connector"){
                document.querySelector(".su-canvas-tooltip").style.display = "none"
              }
              
            }
          });
        }
      });
      enableDisable("tubing")
      if(sessionStorage.getItem('elementClicked') == "default_connector_ending" || sessionStorage.getItem('elementClicked') == "connector_ending" && sessionStorage.getItem('elementClicked') == "bottle" || sessionStorage.getItem('elementClicked') == "bag"){
        enableDisable("all")

      }
      createModalForSelectedElements(elementClicked);
      sessionStorage.setItem("theLastId", modelId)
      await newDesignSelectionIndex(modelId);
      // find Model hit that matches one of our showroom items search from
      // bottom up, because an accessory may be parented to a side, and a click
      // on an accessory should select it, not the side
      const hitItem = hit.hierarchy
        .slice()
        .reverse()
        .find(({ nodeId }) => items.has(nodeId));

      // the mouse clicked something, but it is not a selectable showroom item
      // (could be floor plane, etc)
      if (!hitItem) {
        pendingSelection = false;
        return;
      }

      //await newDesignSelection(hitItem.nodeId);
      //await newDesignSelection("d0e6ff8d-0351-4a05-8f11-a16e03150454");
      pendingSelection = false;
    },
  },
};