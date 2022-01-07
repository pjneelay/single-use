import React, { useState, useEffect } from "react";
import loadjs from "loadjs";
import { useActions } from "../../hooks/useActions";
import { useSelector } from "react-redux";
import { ThreekitSetSinglePlayerLoadingStatus, ThreekitSelectModel, ThreekitInitCameraValues, ThreekitFetchModels } from '../../redux/Threekit/actions';
import  { jsonBuilder }  from "../../util/jsonBuilder.js";
import { userSelectionsBuilder } from "../../util/userSelectionsBuilder";
import { UpdateModels } from "../../redux/modelsHandling/action";
import { UpdateSelections } from "../../redux/userSelections/action";
import { idoSelect }  from "../../components/Threekit/player-tools/selection.js";
import { newDesignSelection } from "./player-tools/newDesignSelection";
import { idoHover } from "./player-tools/hover";
import { Spin } from 'antd';


const Threekit_Player = (props) => {
  let {triggerRemethod} = props;
  const { idSelector, model } = props;
  const [playerConfiguration, setPlayerConfiguration] = useState(null);
  const [playerImgSnap, setPlayerImgSnap] = useState('');
  const state = useSelector((store) => {
    return {
      Meta: store.Meta,
      Config: store.Config,
    };
  });

  const actions = useActions({
    ThreekitSetSinglePlayerLoadingStatus,
    ThreekitSelectModel,
    ThreekitFetchModels,
    ThreekitInitCameraValues,
    UpdateModels,
    UpdateSelections
  });
  useEffect(() => {
    
    actions.ThreekitSetSinglePlayerLoadingStatus(true);
    actions.ThreekitInitCameraValues(true);
    loadjs(state.Config.threekitScriptURL);
    window
      .threekitPlayer({
        authToken: state.Config.threekitAuthToken,
        el: idSelector ? document.getElementById(idSelector) : document.getElementById("player-container"),
        assetId: model,
        orgId: state.Config.threekitOrgId,
        showConfigurator: false,
        showAR: false,
        showLoadingThumbnail: true,
        publishStage: 'draft'
      })
      .then(async (api) => {
        api.enableApi("configurator");
        api.enableApi("player");
        api.enableApi("store");
        await api.when("loaded");
      
        if(idSelector == 'threekit-embed'){
          window.twoDPlayer = api;
          window.twoDPlayer.configurator = await api.getConfigurator();
          window.twoDPlayer.tools.addTool(idoSelect);
          window.twoDPlayer.tools.addTool(idoHover);
          window.twoDPlayer.selectionSet.setStyle({ outlineColor: "#8c004b" });
          const jsonBuilded = jsonBuilder( window.twoDPlayer.configurator.getDisplayAttributes(), 'twoDPlayer');
          actions.UpdateModels(jsonBuilded)
          const userSelections = userSelectionsBuilder(window.twoDPlayer.configurator.getDisplayAttributes(), 'twoDPlayer');
          actions.UpdateSelections("data", userSelections, []);

        }else if(idSelector == 'threekit-from-scratch'){

          window.newDesign = api;
          window.newDesign.configurator = await api.getConfigurator();
          window.newDesign.tools.addTool(newDesignSelection);
          window.newDesign.selectionSet.setStyle({ outlineColor: "#008000" });
          const newDesignAttributes = jsonBuilder(window.newDesign.configurator.getDisplayAttributes(), "newDesign");
          actions.UpdateModels(newDesignAttributes);
          const newDesignSelections = userSelectionsBuilder(window.newDesign.configurator.getDisplayAttributes(), "newDesign");
          actions.UpdateSelections("data", newDesignSelections, []);
          if(window.newDesign.scene.PHASES.RENDERED == 'rendered') {
            triggerRemethod();
          }
        }
        else {
          window.threeDPlayer = api;
          window.threeDPlayer.configurator = await api.getConfigurator();
        }
      });
      //actions.ThreekitSetSinglePlayerLoadingStatus(false);
  }, []);

  return (
    <div>
        <div id="player">
        </div>
    </div>
  );
};

export default Threekit_Player;