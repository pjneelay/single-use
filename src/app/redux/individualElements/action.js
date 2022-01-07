import actions from "./types";

const updateIndividualElements = (payload) => ({
    type: actions.USER_SELCTION_INDIVIDUAL_ELEMENTS,
    payload
});

export const UpdateIndividualElements = (data) => dispatch => {
    try {
        dispatch(updateIndividualElements(data));
    }
    catch (e) { 
    };
};

