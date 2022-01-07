import actions from "./types";

const updateItemDisable = (payload) => ({
    type: actions.USER_SELECT_ITEM_ENABLE_DISABLED,
    payload
});

export const updateItemDisable = (data, category, selectionToModify, value) => dispatch => {

    try {
        if(selectionToModify){
            for(let a=0; a<data.categoriesAndSelections[category].length; a++){
                if(data.categoriesAndSelections[category][a].label === selectionToModify){
                    data.categoriesAndSelections[category][a].value = value;
                }

            };
        };
        dispatch(updateItemDisable(data));
    }
    catch (e) { 
    };
};
