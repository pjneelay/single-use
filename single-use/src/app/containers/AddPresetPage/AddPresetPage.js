import React, { useState, useEffect } from "react";
import Threekit from "../../components/Threekit/Threekit";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import { ThreekitFetchModels,  ThreekitSelectModel,  ThreekitSetSinglePlayerLoadingStatus } from "../../redux/Threekit/actions";
import PlayerPannel from "../../components/PlayerPannel/PlayerPannel";
import ManifoldConfig from "../../components/ManifoldConfig/ManifoldConfig.js";
import PdfGeneratorComp from "../../components/PdfGenerator/pdfGenerator";
import logoBlack from "../../../assets/logo-black.png";
import Button from "../../components/Button/Button";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import "./AddPresetPage.css";

const AddPresetPage = (props) => {
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [models, setModels] = useState([])
  const [data, setData] = useState({});
  const [pageCount, setPageCount] = useState(0);
  const [pageVisit, setPageVisit] = useState(false);

  const { isSinglePlayerLoading } = useSelector(state => state.Threekit);

  const actions = useActions({
    ThreekitSetSinglePlayerLoadingStatus,
    ThreekitSelectModel,
    ThreekitFetchModels,
  });

  const handleToggle = () => {
    setToggle(!toggle);
    setPageCount(pageCount + 1);
  }
 
  const assetIdThreeD = sessionStorage.getItem("currentIdPresetOnFocusThreeD");

  useEffect(() => {
    if(actions.ThreekitSetSinglePlayerLoadingStatus(false) /*&& isSinglePlayerLoading === false*/) {
      setIsLoading(false);
    }
    
    const pagevisitValue = localStorage.getItem("pageVisit");
    if(pagevisitValue === 'true'){
      setPageCount(pageCount + 2);
    }

    if(pagevisitValue == null && pageCount == 0){
      setPageCount(pageCount + 1);
        setPageVisit(true);
        localStorage.setItem("pageVisit", true);
    }
    
  }, []);

  return (
    <div className="container">
      {isLoading ? <h1>Loading...</h1> : <>
        <PlayerPannel className="player-button-black" iconClassName="icon-size-white" />
        <div id={!toggle ? "threekit-preview" : "threekit-preview-full-width"}>
          <Threekit assetIdThreeD={assetIdThreeD}/>
          <div className="logo">
            <img src={logoBlack} alt="logo" />
          </div>
          {toggle && <Button icon={<ArrowLeftOutlined className="icon-toggle" />} label={null} className="manifold-btn-rigth" onClickHandler={handleToggle} />}
        </div>
        {!toggle &&
          (
            <div className={!toggle ? "open manifold-container" : "close manifold-container"}>
              <ManifoldConfig pageCount={pageCount} />
              <Button icon={<ArrowRightOutlined className="icon-toggle" />} label={null} className="manifold-btn-left" onClickHandler={handleToggle} />
            </div>
            )
          }
      </>}
    </div>
  )
}

export default AddPresetPage;