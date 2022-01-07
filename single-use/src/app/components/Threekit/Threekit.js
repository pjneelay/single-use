import React, { useState, useEffect } from "react";
import Threekit_Player from "./Player";
import "./Threekit.css";

const Threekit = (props) => {
  const { assetIdThreeD } = props;
 // const [playerModel, setPlayerModel] = useState(null);
 
 
  return (
    <>
      <div  id="player-container">
        <Threekit_Player model={assetIdThreeD ? assetIdThreeD : 'd44c3e8d-f766-4806-bc06-5686c4b2500b'} />
      </div>
    </>
  );
};

export default Threekit;
