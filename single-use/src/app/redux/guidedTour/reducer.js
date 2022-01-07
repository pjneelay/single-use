/* eslint-disable import/no-anonymous-default-export */
import actionTypes from "./types";

const TOUR_STEPS = [
  {
    target: ".manifold-menu-blue",
    content: "Please click on blue point to start customizing the manifold from given options.",
    disableBeacon: true,
  },
  {
    target: ".manifold-menu-red",
    content:
      "Please click on red point to start changing the attributes of the manifold from given options.",
    disableBeacon: true,
  },
  {
    target: ".manifold-bottom",
    content: "Select respective element to see corresponding red points for changing the attributes.",
    disableBeacon: true
  },
  {
    target: ".red-dots",
    content: "Please select to view the options for configuration.",
    disableBeacon: true
  },
  {
    target: ".ant-dropdown-link",
    content: "Your changes are saved and can be viewed in the Bill of Materials(BOM).",
    disableBeacon: true,
  },
];

export const INITIAL_STATE = {
  key: new Date(), // This field makes the tour to re-render when we restart the tour
  run: false,
  continuous: true, // Show next button
  loading: false,
  stepIndex: 0, // Make the component controlled
  steps: TOUR_STEPS
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "START":
      return { ...state, run: true };
    case "RESET":
      return { ...state, stepIndex: 0 };
    case "STOP":
      return { ...state, run: false };
    case "NEXT_OR_PREV":
      return { ...state, ...action.payload };
    case "RESTART":
      return {
        ...state,
        stepIndex: 0,
        run: true,
        loading: false,
        key: new Date()
      };
    default:
      return state;
  }
};