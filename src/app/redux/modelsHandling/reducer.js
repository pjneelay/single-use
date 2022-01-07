import actionTypes from "./types";

const INIT_STATE = {
  dataFromPlayer: {}
};

export default (state = INIT_STATE, action) => {
  let _data = state.data;
  const { payload, type } = action;
  switch (type) {
    case actionTypes.USER_ELEMENT_UPDATED_ADD:
      return {
        ...state,
        dataFromPlayer: payload,
      };
    default:
      return { ...state }; 
  }
}