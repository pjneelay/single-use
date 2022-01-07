import actionTypes from "./types";
import threekitConfig from '../../../config/threekitConfig';

const INIT_STATE = {
  threekitScriptURL: threekitConfig.threekitScriptURL,
  threekitURL: threekitConfig.threekitURL,
  threekitAuthToken: threekitConfig.authToken,
  threekitInitialAsset: threekitConfig.assetId,
  threekitOrgId: threekitConfig.orgId
};

export default (state = INIT_STATE, action) => {
  let _data = state.data;
  const { payload, type } = action;
  switch (type) {
    default:
      return { ...state };
  }
};
