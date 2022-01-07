import threekitHelper from "../../util/threekit";

import actions from "./types";

import threekitConfig from '../../../config/threekitConfig';

const threekitSetModelSet = payload => ({
  type: actions.THREEKIT_SET_MODELS_SET,
  payload
})

const threekitSetTextureSet = payload => ({
  type: actions.THREEKIT_SET_TEXTURES_SET,
  payload
})

const threekitSetColorBlockingTextures = payload => ({
  type: actions.THREEKIT_SET_COLOR_BLOCKING_TEXTURES,
  payload
})

const threekitSetNailheadMaterialSet = payload => ({
  type: actions.THREEKIT_SET_NAILHEAD_MATERIALS_SET,
  payload
})

const threekitSelectModel = payload => ({
  type: actions.THREEKIT_SELECT_MODEL,
  payload
})

const threekitSetRoomBuilderComponentModel = payload => ({
  type: actions.THREEKIT_SET_ROOM_BUILDER_COMPONENT_MODEL,
  payload
})

const threekitSetSelectedModelSeatingTexture = payload => ({
  type: actions.THREEKIT_SET_SELECTED_MODEL_SEATING_TEXTURE,
  payload
})

const threekitSetSelectedModelNailheadsMaterial = payload => ({
  type: actions.THREEKIT_SET_SELECTED_MODEL_NAILHEADS_MATERIAL,
  payload
})

const threekitInitCameraValues = payload => ({
  type: actions.THREEKIT_INIT_CAMERA_VALUES,
  payload
})

const threekitSetSinglePlayerLoadingStatus = payload => ({
  type: actions.THREEKIT_SET_SINGLE_PLAYER_LOADING_STATUS,
  payload
})

const threekitSetRoomBuilderPlayerLoadingStatus = payload => ({
  type: actions.THREEKIT_SET_ROOM_BUILDER_PLAYER_LOADING_STATUS,
  payload
})

// Actions
export const ThreekitFetchModels = () => async dispatch => {
  try {
    let products = await threekitHelper.fetchProducts(
      "preview",
      threekitConfig.authToken,
      threekitConfig.orgId,
      "component",
      "ui"
    );

    let models = products.map((product, i) => {
      let features = {};

      try {
        features = JSON.parse(product.description);
      } catch (e) {}

      return {
        id: product.id,
        name: product.name,
        attributes: {
          images: [`https://preview.threekit.com/api/assets/thumbnail/${product.id}?orgId=0db40a8d-a8fd-4900-8258-963ab37d7eb9&failOnEmpty=true&cacheMaxAge=300&cacheScope=thumbnail&bearer_token=31755654-4081-45d7-88e1-ee46a673b350`],
          featuredText: features?.featuredText, 
          nailHeads: {
            available: product.keywords.filter(keyword => keyword == "nailheads").length > 0,
            values: []
          },
          colorBlocking: {
            available: product.keywords.filter(keyword => keyword == "color_blocking_1").length > 0,
            values: [],
          },
          animationImage: features.animationImage || null
        },
        features: features?.specifications,
        standardFeatures: features?.standardFeatures,
        armrestSelection: [],
      }
    })
    dispatch(threekitSetModelSet(models));
  } catch (e) {
    console.error(e);
  }
}

export const ThreekitFetchTextures = () => async dispatch => {
  try {
    let products = await threekitHelper.fetchProducts(
      "preview",
      "31755654-4081-45d7-88e1-ee46a673b350",
      "0db40a8d-a8fd-4900-8258-963ab37d7eb9",
      "texture"
    );

    let textures = products.map(product => {
      let features = {};

      try {
        features = JSON.parse(product.description);
      } catch (e) {}

      return {
        id: product.id,
        label: product.name,
        image: [`https://preview.threekit.com/api/assets/thumbnail/${product.id}?orgId=0db40a8d-a8fd-4900-8258-963ab37d7eb9&failOnEmpty=true&cacheMaxAge=300&cacheScope=thumbnail&bearer_token=31755654-4081-45d7-88e1-ee46a673b350`],
      }
    })
    dispatch(threekitSetTextureSet(textures));
  } catch (e) {}
}

export const ThreekitFetchNailheadMaterials = () => async dispatch => {
  try {
    fetch("https://preview.threekit.com/api/catalog/products?bearer_token=31755654-4081-45d7-88e1-ee46a673b350&orgId=0db40a8d-a8fd-4900-8258-963ab37d7eb9&tags=nailhead_material")
    .then(r => r.json())
    .then(response => {

      let products = response.products ? response.products : [];
      let materials = [];

      materials = products.map((product, i) => {
        let features = {};

        try {
          features = JSON.parse(product.description);
        } catch (e) {}

        return {
          id: product.id,
          label: product.name,
          image: [`https://preview.threekit.com/api/assets/thumbnail/${product.id}?orgId=0db40a8d-a8fd-4900-8258-963ab37d7eb9&failOnEmpty=true&cacheMaxAge=300&cacheScope=thumbnail&bearer_token=31755654-4081-45d7-88e1-ee46a673b350`],
        }
      })
      dispatch(threekitSetNailheadMaterialSet(materials));
    })
  } catch (e) {}
}

export const ThreekitFetchColorBlockingTextures = () => async dispatch => {
  try {
    fetch("https://preview.threekit.com/api/catalog/products?bearer_token=31755654-4081-45d7-88e1-ee46a673b350&orgId=0db40a8d-a8fd-4900-8258-963ab37d7eb9&tags=texture")
    .then(r => r.json())
    .then(response => {

      let products = response.products ? response.products : [];
      let textures = [];

      textures = products.map((product, i) => {
        let features = {};

        try {
          features = JSON.parse(product.description);
        } catch (e) {}

        return {
          id: product.id,
          label: product.name,
          image: [`https://preview.threekit.com/api/assets/thumbnail/${product.id}?orgId=0db40a8d-a8fd-4900-8258-963ab37d7eb9&failOnEmpty=true&cacheMaxAge=300&cacheScope=thumbnail&bearer_token=31755654-4081-45d7-88e1-ee46a673b350`],
        }
      })
      dispatch(threekitSetColorBlockingTextures(textures));
    })
  } catch (e) {}
}

export const ThreekitSelectModel = model => async dispatch => {
  try {
    dispatch(threekitSetSinglePlayerLoadingStatus(true));
    const configurator = await threekitHelper.getParentConfigurator();
    const value = await threekitHelper.getDisplayAttribute(model?.name, "Component 1", configurator);

    void await threekitHelper.setConfiguration(configurator, { "Component 1" : { assetId : value.assetId } });

    void await dispatch(threekitSelectModel(model));
    dispatch(threekitSetSinglePlayerLoadingStatus(false));
  } catch (e) {
    console.error(e);
  }
}

export const ThreekitSetRoomBuilderComponentModel = (row, seat, model) => async dispatch => {
  const maxSeatsPerRow = 8;
  const componentNumber = row > 1 ? (seat + ((row - 1) * maxSeatsPerRow)) : seat;

  if (row == 2) {
    seat += 8;
  }
  try {
    dispatch(threekitSetSinglePlayerLoadingStatus(true));
    let attributeName = "Component " + componentNumber;
    let player = await window.roomBuilder.api.enableApi("player");
    let parentConfigurator = await player.getConfigurator();

    let values = parentConfigurator.getDisplayAttributes().filter(e => e.name == attributeName)[0].values;

    let value = values.filter(e => e.name == model)[0];

    //  TODO: @olivermontalvanm Encontrar una mejor forma de hacer esto:
    /*
      Por alguna razón, Component X no puede ser un valor dinámico como [attributeName]
    */
    switch(componentNumber) {
      case 1:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 1" : { assetId : value.assetId } });
        break;
      case 2:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 2" : { assetId : value.assetId } });
        break;
      case 3:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 3" : { assetId : value.assetId } });
        break;
      case 4:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 4" : { assetId : value.assetId } });
        break;
      case 5:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 5" : { assetId : value.assetId } });
        break;
      case 6:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 6" : { assetId : value.assetId } });
        break;
      case 7:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 7" : { assetId : value.assetId } });
        break;
      case 8:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 8" : { assetId : value.assetId } });
        break;
      case 9:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 9" : { assetId : value.assetId } });
        break;
      case 10:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 10" : { assetId : value.assetId } });
        break;
      case 11:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 11" : { assetId : value.assetId } });
        break;
      case 12:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 12" : { assetId : value.assetId } });
        break;
      case 13:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 13" : { assetId : value.assetId } });
        break;
      case 14:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 14" : { assetId : value.assetId } });
        break;
      case 15:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 15" : { assetId : value.assetId } });
        break;
      case 16:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 16" : { assetId : value.assetId } });
        break;
      case 17:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 17" : { assetId : value.assetId } });
        break;
      case 18:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 18" : { assetId : value.assetId } });
        break;
      case 19:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 19" : { assetId : value.assetId } });
        break;
      case 20:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 20" : { assetId : value.assetId } });
        break;
      case 21:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 21" : { assetId : value.assetId } });
        break;
      case 22:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 22" : { assetId : value.assetId } });
        break;
      case 23:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 23" : { assetId : value.assetId } });
        break;
      case 24:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 24" : { assetId : value.assetId } });
        break;
      case 25:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 25" : { assetId : value.assetId } });
        break;
      case 26:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 26" : { assetId : value.assetId } });
        break;
      case 27:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 27" : { assetId : value.assetId } });
        break;
      case 28:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 28" : { assetId : value.assetId } });
        break;
      case 29:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 29" : { assetId : value.assetId } });
        break;
      case 30:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 30" : { assetId : value.assetId } });
        break;
      case 31:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 31" : { assetId : value.assetId } });
        break;
      case 32:
        void await window.roomBuilder.api.configurator.setConfiguration({ "Component 32" : { assetId : value.assetId } });
        break;
    }

    void await dispatch(threekitSetRoomBuilderComponentModel(model));
    dispatch(threekitSetSinglePlayerLoadingStatus(false));
  } catch (e) {
    console.error(e);
  }
}

export const ThreekitSwapModelsInRow = (row, model) => async dispatch => {
  try {
    dispatch(threekitSetSinglePlayerLoadingStatus(true));
    for (let i = 1; i <= 8; i++){
      let attributeName = "Component " + i;
      let player = await window.roomBuilder.api.enableApi("player");
      let parentConfigurator = await player.getConfigurator();

      let values = parentConfigurator.getDisplayAttributes().filter(e => e.name == attributeName)[0].values;

      let value = values.filter(e => e.name == model)[0];

      //  TODO: @olivermontalvanm Encontrar una mejor forma de hacer esto:
      /*
        Por alguna razón, Component X no puede ser un valor dinámico como [attributeName]
      */
      switch(row) {
        case 1:
          void await window.roomBuilder.api.configurator.setConfiguration(
            { 
              "Component 1" : { assetId : value.assetId },
              "Component 2" : { assetId : value.assetId },
              "Component 3" : { assetId : value.assetId },
              "Component 4" : { assetId : value.assetId },
              "Component 5" : { assetId : value.assetId },
              "Component 6" : { assetId : value.assetId },
              "Component 7" : { assetId : value.assetId },
              "Component 8" : { assetId : value.assetId },
            }
          );
          break;
        case 2:
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 9" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 10" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 11" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 12" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 13" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 14" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 15" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 16" : { assetId : value.assetId } });
          break;
        case 3:
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 17" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 18" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 19" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 20" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 21" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 22" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 23" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 24" : { assetId : value.assetId } });
          break;
        case 4:
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 25" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 26" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 27" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 28" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 29" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 30" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 31" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 32" : { assetId : value.assetId } });
          break;
      }

      void await dispatch(threekitSetRoomBuilderComponentModel(model));
    }
    dispatch(threekitSetSinglePlayerLoadingStatus(false));
  } catch(e) {
    console.error(e);
    dispatch(threekitSetSinglePlayerLoadingStatus(false));
  }
}

export const ThreekitPopulateRowWithModel = (row, seats, model) => async dispatch => {
  try {
    dispatch(threekitSetSinglePlayerLoadingStatus(true));
    for (let i = 1; i <= seats; i++){
      let attributeName = "Component " + i;
      let player = await window.roomBuilder.api.enableApi("player");
      let parentConfigurator = await player.getConfigurator();

      let values = parentConfigurator.getDisplayAttributes().filter(e => e.name == attributeName)[0].values;

      let value = values.filter(e => e.name == model)[0];

      //  TODO: @olivermontalvanm Encontrar una mejor forma de hacer esto:
      /*
        Por alguna razón, Component X no puede ser un valor dinámico como [attributeName]
      */
      switch(row) {
        case 1:
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 1" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 2" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 3" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 4" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 5" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 6" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 7" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 8" : { assetId : value.assetId } });
          break;
        case 2:
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 9" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 10" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 11" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 12" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 13" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 14" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 15" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 16" : { assetId : value.assetId } });
          break;
        case 3:
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 17" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 18" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 19" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 20" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 21" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 22" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 23" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 24" : { assetId : value.assetId } });
          break;
        case 4:
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 25" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 26" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 27" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 28" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 29" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 30" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 31" : { assetId : value.assetId } });
          void await window.roomBuilder.api.configurator.setConfiguration({ "Component 32" : { assetId : value.assetId } });
          break;
      }

      void await dispatch(threekitSetRoomBuilderComponentModel(model));
    }
    dispatch(threekitSetSinglePlayerLoadingStatus(false));
  } catch (e) {
    console.error(e);
    dispatch(threekitSetSinglePlayerLoadingStatus(false));
  }
};

export const ThreekitSetSelectedModelSeatingTexture = texture => async dispatch => {
  try {
    dispatch(threekitSetSinglePlayerLoadingStatus(true));
    let attributeName = "Component 1";
    let player = await window.roomBuilder.api.enableApi("player");
    let parentConfigurator = await player.getConfigurator();
    let itemId = await parentConfigurator.getAppliedConfiguration(attributeName);
    let configurator = await window.roomBuilder.api.scene.get({
      id: itemId,
      evalNode: true,
    }).configurator;
    let seatingValues = configurator.getDisplayAttributes().filter(e => e.name == "Seating Texture")[0].values;
    let seatingValue = seatingValues.filter(e => e.name == texture)[0];
    
    void await configurator.setConfiguration({ "Seating Texture" : { assetId : seatingValue.assetId } });
    dispatch(threekitSetSinglePlayerLoadingStatus(false));
  } catch (e) {}
}

export const ToggleSingleComponentMeasurements = () => async dispatch => {
  try {
    dispatch(threekitSetSinglePlayerLoadingStatus(true));
    let player = await window.roomBuilder.api.enableApi("player");
    let parentConfigurator = await player.getConfigurator();
    
    void await parentConfigurator.setConfiguration({ "Show Dimensions" : parentConfigurator.getAppliedConfiguration("Show Dimensions") == "False" ? "True" : "False" });
    dispatch(threekitSetSinglePlayerLoadingStatus(false));
  } catch (e) {}
}

export const ThreekitToggleSceneMode = value => async dispatch => {
  try {
    dispatch(threekitSetSinglePlayerLoadingStatus(true));
    let player = await window.roomBuilder.api.enableApi("player");
    let parentConfigurator = await player.getConfigurator();
    
    void await parentConfigurator.setConfiguration({ "Mode" : value });
    dispatch(threekitSetSinglePlayerLoadingStatus(false));
  } catch(e){}
};

export const ThreekitCloneComponent = (componentSource, componentTarget) => async dispatch => {
  let player = await window.roomBuilder.api.enableApi("player");
  let parentConfigurator = await player.getConfigurator();
  let component1Id = await parentConfigurator.getAppliedConfiguration("Component 1");
  let component2Id = await parentConfigurator.getAppliedConfiguration("Component 10");
  let component1Config = await window.roomBuilder.api.scene.get({
    id: component1Id,
    evalNode: true,
  }).configurator;
  let component2Config = await window.roomBuilder.api.scene.get({
    id: component2Id,
    evalNode: true,
  }).configurator;

  component2Config.setConfiguration({ 
    "Seating Texture" : { assetId : component1Config.appliedConfiguration["Seating Texture"] },
    "Piping Texture" : { assetId : component1Config.appliedConfiguration["Piping Texture"] },
    "Nailheads Material" : { assetId : component1Config.appliedConfiguration["Nailheads Material"] },
  });
}

export const ThreekitSetSelectedModelNailheadsMaterial = material => async dispatch => {
  try {
    dispatch(threekitSetSinglePlayerLoadingStatus(true));
    let attributeName = "Component 1";
    let player = await window.roomBuilder.api.enableApi("player");
    let parentConfigurator = await player.getConfigurator();
    let itemId = await parentConfigurator.getAppliedConfiguration(attributeName);
    let configurator = await window.roomBuilder.api.scene.get({
      id: itemId,
      evalNode: true,
    }).configurator;
    let nailheadValues = configurator.getDisplayAttributes().filter(e => e.name == "Nailheads Material")[0].values;
    let nailheadValue = nailheadValues.filter(e => e.name == material)[0];

    void await configurator.setConfiguration({ "Nailheads Material" : { assetId : nailheadValue.assetId } });

    void await dispatch(threekitSetSelectedModelNailheadsMaterial(material));
    dispatch(threekitSetSinglePlayerLoadingStatus(false));
  } catch (e) {}
}

export const ThreekitSetSelectedModelColorBlockingTexture = material => async dispatch => {
  try {
    dispatch(threekitSetSinglePlayerLoadingStatus(true));
    let attributeName = "Component 1";
    let player = await window.roomBuilder.api.enableApi("player");
    let parentConfigurator = await player.getConfigurator();
    let itemId = await parentConfigurator.getAppliedConfiguration(attributeName);
    let configurator = await window.roomBuilder.api.scene.get({
      id: itemId,
      evalNode: true,
    }).configurator;
    let seatingValues = configurator.getDisplayAttributes().filter(e => e.name == "Color Blocking 1 Texture")[0].values;
    let seatingValue = seatingValues.filter(e => e.name == material)[0];
    
    void await configurator.setConfiguration({ "Color Blocking 1 Texture" : { assetId : seatingValue.assetId } });
    dispatch(threekitSetSinglePlayerLoadingStatus(false));
  } catch (e) {}
}

export const ThreekitInitCameraValues = () => async dispatch => {
  try {
    void dispatch(threekitSetSinglePlayerLoadingStatus(true));
    let attributeName = "Active Camera";
    let player = await window.roomBuilder.api.enableApi("player");
    let parentConfigurator = await player.getConfigurator();
    let cameraValues = parentConfigurator.getDisplayAttributes().filter(e => e.name == attributeName)[0].values;

    void await dispatch(threekitInitCameraValues(cameraValues));
    void dispatch(threekitSetSinglePlayerLoadingStatus(false));
  } catch (e) {}
};

export const ThreekitSetActiveCamera = camera => async dispatch => {
  try {
    dispatch(threekitSetSinglePlayerLoadingStatus(true));
    const attributeName = "Active Camera";
    const player = await window.roomBuilder.api.enableApi("player");
    const parentConfigurator = await player.getConfigurator();
    const cameraValues = parentConfigurator.getDisplayAttributes().filter(e => e.name == attributeName)[0].values;
    const cameraValue = cameraValues.filter(e => e.label == camera)[0];

    void await parentConfigurator.setConfiguration({"Active Camera" : cameraValue.value });
    dispatch(threekitSetSinglePlayerLoadingStatus(false));
  } catch (e) {}
};

export const ThreekitSetSinglePlayerLoadingStatus = status => async dispatch => {
  try {
    dispatch(threekitSetSinglePlayerLoadingStatus(status));
  } catch (e) {}
};

export const ThreekitSetRoomBuilderPlayerLoadingStatus = status => async dispatch => {
  try {
    dispatch(threekitSetRoomBuilderPlayerLoadingStatus(status));
  } catch (e) {}
};
