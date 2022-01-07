//import { isShadowPlane } from "../../helpers";
import { SwitcherFilled } from "@ant-design/icons";
import session from "redux-persist/lib/storage/session";
import ManifoldConfig from "../../../ManifoldConfig/ManifoldConfig";

export const SELECTION_COLORS = {
  VALID: "#0000ff",
  INVALID: "#ff0000",
};

export async function setNodeHighlightingNewDesign(
  nodeId,
  highlight,
  highlightChildren = false
  ) {
  const node = window.newDesign.store.get("sceneGraph").nodes[nodeId];
  const { type, children } = node;
  const data = JSON.parse(sessionStorage.getItem('newPreset'));
  let nodeName = node.name;
  let dataForModal;
  //if (filter(node)) {
    if (type === "PolyMesh") {
      if (highlight) window.newDesign.selectionSet.add(nodeId)
      else window.newDesign.selectionSet.remove(nodeId);
    } else if (type === "Model") {
      let instanceId;

      const assetQuery = {
        id: nodeId,
        plug: "Null",
        property: "asset",
      };
      const asset = window.newDesign.scene.get(assetQuery);
      if (typeof asset === "string") instanceId = asset;
      else {
        instanceId = await window.newDesign.player.getAssetInstance({
          id: nodeId,
          plug: "Null",
          property: "asset",
        });
      }
      await setNodeHighlightingNewDesign(instanceId, highlight, true);
    } else if (type === "Item") {
      const instanceId = await window.newDesign.player.getAssetInstance({
        id: nodeId,
        plug: "Proxy",
        property: "asset",
      });
      await setNodeHighlightingNewDesign(instanceId, highlight, true);
    }
  //}

  if (highlightChildren){
    return Promise.all(
      children.map(async (id) => setNodeHighlightingNewDesign(id, highlight, true))
    );
  }
}
