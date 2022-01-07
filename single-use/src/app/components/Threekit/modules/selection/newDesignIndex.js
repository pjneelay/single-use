import { setNodeHighlightingNewDesign } from "./highlightingNewDesign";

const state = {
  selection: new Set(),
  listener: null,
};

export const newDesignSelectionIndex = (itemId) => {
    setNodeHighlightingNewDesign(itemId, true);
  state.selection.add(itemId);
};
