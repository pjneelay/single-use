import actionTypes from "./types";

const INIT_STATE = {
  selectedItemFromUser: {}
};

export default (state = INIT_STATE, action) => {
  let _data = state.data;
  const { payload, type } = action;
  switch (type) {
    case actionTypes.USER_SELECT_ITEM_ENABLE_DISABLED:
      return {
        ...state,
        selectedItemFromUser: payload,
      };
    default:
      return { ...state }; 
  }
}