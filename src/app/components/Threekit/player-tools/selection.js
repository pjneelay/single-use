import { getItems } from "../modules/items";
import { selectItem } from "../modules/selection";

let pendingSelection = false;


export const idoSelect = {
  key: "idoSelect",
  label: "Select",
  active: true,
  enabled: true,
  handlers: {
    click: async (ev) => {
      const apiNamespace = 'twoDPlayer';
      window[apiNamespace].selectionSet.clear();
      pendingSelection = true;
      //await clearSelection();

      if (!ev.hitNodes || !ev.hitNodes.length) {
        pendingSelection = false;
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
      /*if (isShadowPlane(name)) {
        pendingSelection = false;
        return;
      }*/
      const items = getItems();
      let nodes = window[apiNamespace].store.get("sceneGraph").nodes;
      let keys = Object.keys(window[apiNamespace].store.get("sceneGraph").nodes);
      let modelId = "";
      let found = false;
      hit.hierarchy.forEach((e) => {
        if (e.type === "Model") {
          keys.forEach((key) => {
            if (nodes[key].type == "Model" && e.nodeId === key && !found) {
              modelId = key;
              switch (nodes[key].name){
              }
            }
          });
        }
      });

      await selectItem(modelId, "kindClick");
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

      //await selectItem(hitItem.nodeId);
      //await selectItem("d0e6ff8d-0351-4a05-8f11-a16e03150454");
      pendingSelection = false;
    },
  },
};
