import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import Carousel from "../Carousel/Carousel";
import PlayerPannel from "../../components/PlayerPannel/PlayerPannel";
import logo from "../../../assets/logo.png";
import { Link } from 'react-router-dom';
import NewDesingPage from "../NewDesignPage/NewDesignPage";

import "./HomePage.css";

const HomePage = () => {
  
  function bringPresetFromPlayer() {
    sessionStorage.setItem("currentIdPresetOnFocusThreeD",document.querySelector('.slick-current').children[0].children[0].attributes.assetidthreed.value);
    sessionStorage.setItem("currentIdPresetOnFocusTwoD",document.querySelector('.slick-current').children[0].children[0].attributes.assetidtwod.value);
  }
  // function callNewDesign () {
  //   <NewDesingPage></NewDesingPage>
  // }
  return (
    <div className="homepage">
      <div className="logo">
        <img src={logo}  />
      </div>
      <PlayerPannel className="player-button" iconClassName="icon-size" />
      <div className="preset-container">
        <Carousel />
        <div className="preset-buttons">
          {/*<Link to={'/add-preset'}>
            <Button icon={null} label={"add a preset"} className="btn btn-white" onClickHandler={bringPresetFromPlayer} />
          </Link>*/}
          <Link to="/new-design">
            <Button icon={null} label={"new design"} className="btn btn-transparent" onClickHandler={() => {}}/>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage;