/* eslint-disable import/no-anonymous-default-export */
import actionTypes from "./types";

const INIT_STATE = {
  threekitModels: [],
  threekitTextures: [],
  threekitNailheadMaterials: [],
  threekitColorBlockingTextures: [],
  cameraValues: [],
  selectedModel: null,
  isSinglePlayerLoading: true,
  isRoomBuilderPlayerLoading: true,
};

export default (state = INIT_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
    case actionTypes.THREEKIT_SET_MODELS_SET:
      return {
        ...state,
        threekitModels: payload,
      };

    case actionTypes.THREEKIT_SET_TEXTURES_SET:
      return {
        ...state,
        threekitTextures: payload,
      };

    case actionTypes.THREEKIT_SET_COLOR_BLOCKING_TEXTURES:
      return {
        ...state,
        threekitColorBlockingTextures: payload,
      };

    case actionTypes.THREEKIT_SET_NAILHEAD_MATERIALS_SET:
      return {
        ...state,
        threekitNailheadMaterials: payload,
      };

    case actionTypes.THREEKIT_SELECT_MODEL:
      return {
        ...state,
        selectedModel: payload,
      };

    case actionTypes.THREEKIT_INIT_CAMERA_VALUES:
      return {
        ...state,
        cameraValues: payload,
      };

    case actionTypes.THREEKIT_SET_SINGLE_PLAYER_LOADING_STATUS:
      return {
        ...state,
        isSinglePlayerLoading: payload,
      };

    case actionTypes.THREEKIT_SET_ROOM_BUILDER_PLAYER_LOADING_STATUS:
      return {
        ...state,
        isRoomBuilderPlayerLoading: payload,
      };

    default:
      return { ...state };
  }
};
