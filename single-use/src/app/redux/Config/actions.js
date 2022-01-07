import axios from "axios";

const envVariables = "";

import actions from "./types";

const sayHello = (payload) => ({
  type: actions.META_SAY_HELLO,
  payload,
});

const toggleModelSelector = (payload) => ({
  type: actions.META_TOGGLE_PANEL,
  payload,
});

const goToNextStep = () => ({
  type: actions.META_GO_TO_NEXT_STEP,
});

const goToPreviousStep = () => ({
  type: actions.META_GO_TO_PREVIOUS_STEP,
});

const showNeedMoreHelpModal = () => ({
  type: actions.META_SHOW_NEED_MORE_HELP_MODAL,
});

const hideNeedMoreHelpModal = () => ({
  type: actions.META_HIDE_NEED_MORE_HELP_MODAL,
});

const showRecommendedLayoutsModal = () => ({
  type: actions.META_SHOW_RECOMMENDED_LAYOUTS_MODAL,
});

const hideRecommendedLayoutsModal = () => ({
  type: actions.META_HIDE_RECOMMENDED_LAYOUTS_MODAL,
});

const showRoomBuilderPositionHelperModal = () => ({
  type: actions.META_SHOW_ROOM_BUILDER_POSITION_HELPER,
});

const hideRoomBuilderPositionHelperModal = () => ({
  type: actions.META_HIDE_ROOM_BUILDER_POSITION_HELPER,
});

const showWishlistModal = () => ({
  type: actions.META_SHOW_WISHLIST_MODAL,
})

const hideWishlistModal = () => ({
  type: actions.META_HIDE_WISHLIST_MODAL,
})

const toggleWishlistModal = () => ({
  type: actions.META_TOGGLE_WISHLIST_MODAL,
})

// Actions
export const SayHello = () => async (dispatch) => {
  try {
    dispatch(sayHello());
  } catch (e) {}
};

export const TogglePanel = (state) => async (dispatch) => {
  try {
    dispatch(toggleModelSelector(state));
  } catch (e) {}
};

export const GoToNextStep = () => async (dispatch) => {
  try {
    dispatch(goToNextStep());
  } catch (e) {}
};

export const GoToPreviousStep = () => async (dispatch) => {
  try {
    dispatch(goToPreviousStep());
  } catch (e) {}
};

export const ShowNeedMoreHelpModal = () => async (dispatch) => {
  try {
    dispatch(showNeedMoreHelpModal());
  } catch (e) {}
};

export const HideNeedMoreHelpModal = () => async (dispatch) => {
  try {
    dispatch(hideNeedMoreHelpModal());
  } catch (e) {}
};

export const ShowRecommendedLayoutsModal = () => async (dispatch) => {
  try {
    dispatch(showRecommendedLayoutsModal());
  } catch (e) {}
};

export const HideRecommendedLayoutsModal = () => async (dispatch) => {
  try {
    dispatch(hideRecommendedLayoutsModal());
  } catch (e) {}
};

export const ShowRoomBuilderPositionHelperModal = () => async (dispatch) => {
  try {
    dispatch(showRoomBuilderPositionHelperModal());
  } catch (e) {}
};

export const HideRoomBuilderPositionHelperModal = () => async (dispatch) => {
  try {
    dispatch(hideRoomBuilderPositionHelperModal());
  } catch (e) {}
};

export const ShowWishlistModal = () => async dispatch => {
  try {
    dispatch(showWishlistModal());
  } catch (e) {}
}

export const HideWishlistModal = () => async dispatch => {
  try {
    dispatch(hideWishlistModal());
  } catch (e) {}
}

export const ToggleWishlistModal = () => async dispatch => {
  try {
    dispatch(toggleWishlistModal());
  } catch (e) {}
}
