import actions from "./types";

const updateSelections = (payload) => ({
    type: actions.USER_SELCTION_TO_UPDATED,
    payload
});

const isIsogram = (str) =>{
    return !/(.).*\1/.test(str);
}

export const UpdateSelections = (metricOrData, data, labels, values, currentElement) => dispatch => {
    try {
        if(metricOrData === 'data'){
            if(labels){
                for(let i = 0; i < labels.length; i++){
                    if(data.categoriesAndSelections[currentElement][i].label === labels[i]){
                        data.categoriesAndSelections[currentElement][i].value = values[i] === "" ? data.categoriesAndSelections[currentElement][i].value : values[i];
                    }
                }
            }
        }else {
            for(let i = 0; i < Object.keys(data.categoriesAndSelections).length; i++){
                let keyOfElement = Object.keys(data.categoriesAndSelections)[i];
                for(let a = 0; a < data.categoriesAndSelections[keyOfElement].length; a++){
                    if(data.categoriesAndSelections[keyOfElement][a].label.includes("length") || 
                    data.categoriesAndSelections[keyOfElement][a].label.includes("Length") || data.categoriesAndSelections[keyOfElement][a].label.includes("volume") || data.categoriesAndSelections[keyOfElement][a].label.includes("Volume")){
                        data.categoriesAndSelections[keyOfElement][a].value = data.categoriesAndSelections[keyOfElement][a].value;
                    }else if(data.categoriesAndSelections[keyOfElement][a].label.includes("size") || data.categoriesAndSelections[keyOfElement][a].label.includes("Size")){
                        if(!data.categoriesAndSelections[keyOfElement][a].value.includes("In") && !data.categoriesAndSelections[keyOfElement][a].value.includes("Mm")){
                            data.categoriesAndSelections[keyOfElement][a].value = data.categoriesAndSelections[keyOfElement][a].value + " " + labels;
                        }else{
                            data.categoriesAndSelections[keyOfElement][a].value = data.categoriesAndSelections[keyOfElement][a].value;
                        }
                    }else if(data.categoriesAndSelections[keyOfElement][a].label.includes("Thickness") || data.categoriesAndSelections[keyOfElement][a].label.includes("thickness") || data.categoriesAndSelections[keyOfElement][a].label.includes("Diameter") || 
                    data.categoriesAndSelections[keyOfElement][a].label.includes("diameter")){
                        if(!data.categoriesAndSelections[keyOfElement][a].value.includes("In") && !data.categoriesAndSelections[keyOfElement][a].value.includes("Mm")){
                            data.categoriesAndSelections[keyOfElement][a].value = data.categoriesAndSelections[keyOfElement][a].value + " " + labels;
                        }else{
                            data.categoriesAndSelections[keyOfElement][a].value = data.categoriesAndSelections[keyOfElement][a].value;
                        }
                    }
                }
            }
        }
        dispatch(updateSelections(data));
    }
    catch (e) { 
    };
};