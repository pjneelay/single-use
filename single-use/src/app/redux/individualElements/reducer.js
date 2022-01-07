import actionTypes from "./types";

const INIT_STATE = {
  "individualElements": {
    "bags":[],
    "bottles":[],
    "filters":[],
    "tubings": []
  }
};

export default (state = INIT_STATE, action) => {
  let _data = state.data;
  const { payload, type } = action;
  switch (type) {
    case actionTypes.USER_SELCTION_INDIVIDUAL_ELEMENTS:
      return {
        ...state,
        individualsElements: payload,
      };
    default:
      return { ...state }; 
  }
}