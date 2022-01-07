import actionTypes from "./types";

const INIT_STATE = {
  selectionsFromUser: {}
};

export default (state = INIT_STATE, action) => {
  let _data = state.data;
  const { payload, type } = action;
  switch (type) {
    case actionTypes.USER_SELCTION_TO_UPDATED:
      return {
        ...state,
        selectionsFromUser: payload,
      };
    default:
      return { ...state }; 
  }
}