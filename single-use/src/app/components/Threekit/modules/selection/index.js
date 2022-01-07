import { setNodeHighlighting } from "./highlighting";

const state = {
  selection: new Set(),
  listener: null,
};

export const selectItem = (itemId, kind) => {
  setNodeHighlighting(itemId, true, kind);
  state.selection.add(itemId);
};
