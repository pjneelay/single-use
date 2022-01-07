import actions from "./types";

const configSelectItems = (payload) => ({
    type: actions.USER_CONFIG_ITEMS,
    payload
});

export const ConfigSelection = (data, selectionToModify) => dispatch => {
    try {
        if(selectionToModify){

        }
        else{
            dispatch(configSelectItems(data));
        }
    }
    catch (e) { 
    }
};
