import actionTypes from "./types";

const INIT_STATE = {
  configItemsFromUser: {}
};

export default (state = INIT_STATE, action) => {
  let _data = state.data;
  const { payload, type } = action;
  switch (type) {
    case actionTypes.USER_CONFIG_ITEMS:
      return {
        ...state,
        configItemsFromUser: payload,
      };
    default:
      return { ...state }; 
  }
}