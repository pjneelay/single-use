/* eslint-disable import/no-anonymous-default-export */
import actionTypes from "./types";
const contentData = () =>{
	return(
		<div>
          <p style={{ textalign: "left" }}>1. Select the Aseptiquik connector on the screen. A connector must be chosen to kick off the configuration process.</p>
          <p style={{ textalign: "left" }}>2. With the connector highlighted, you may then choose and configure your tubing.</p>
          <p style={{ textalign: "left" }}>3. Each element must be selected to insert the next logical component.</p>
        
		</div>
	)
}

const TOUR_STEPS = [
  {
    target: ".new",
    content: contentData(),
    disableBeacon: true,
  },
  /*{
    target: ".main-menu",
    content: "Start selection from the menu to design your manifold",
    disableBeacon: true,
  }, 
  {
    target: ".request-button",
    content: "Share design with the sales team",
    disableBeacon: true,
  },
  {
    target: ".delete-button",
    content: "Delete's last selection",
    disableBeacon: true,
  },
  {
    target: ".delete-all",
    content: "Delete's whole manifold and redesign",
    disableBeacon: true,
  }*/
  
  
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