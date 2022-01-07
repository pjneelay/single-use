export const individualElementsBuilder = (assetId, modelToCreateOrModify, data, value, currentMetric) => {
    let updateOrCreate = "create";
    let indexerFound;
    let addCurrentMetric = modelToCreateOrModify == "bag" || modelToCreateOrModify == "bottle" ? 
        currentMetric && currentMetric !== "Mm" && currentMetric !== "In"? " " + currentMetric : " Lt" : 
            modelToCreateOrModify == "tubing" ? 
            currentMetric  && currentMetric !== "Oz" && currentMetric !== "Lt" ? " " +  currentMetric : " In" : "";

    for(let a = 0; a < data[modelToCreateOrModify + 's'].length; a++){
        if(data[modelToCreateOrModify + 's'][a].id == assetId){
            updateOrCreate = "update";
            indexerFound = a;
        }
    }
    if(updateOrCreate == 'create'){
        if(data[modelToCreateOrModify + 's'].length > 0 ){
            data[modelToCreateOrModify + 's'].push(
                {
                    "name": `${modelToCreateOrModify} ${data[modelToCreateOrModify + 's'].length + 1}`,
                    "id": assetId,
                    "capacity": modelToCreateOrModify == "bag" || modelToCreateOrModify == "bottle" ? (value + addCurrentMetric) : "",
                    "type": modelToCreateOrModify == "filter" ? value : "",
                    "length": modelToCreateOrModify == "tubing" ? (value + addCurrentMetric) : 0
                }
            )
            }else{
                data[modelToCreateOrModify + 's'][0] =
                {
                    "name": `${modelToCreateOrModify} ${data[modelToCreateOrModify + 's'].length + 1}`,
                    "id": assetId,
                    "capacity": modelToCreateOrModify == "bag" || modelToCreateOrModify == "bottle" ? value + addCurrentMetric : "",
                    "type": modelToCreateOrModify == "filter" ? value : "",
                    "length": modelToCreateOrModify == "tubing" ? value + addCurrentMetric : ""
                }
            } 
        
    }else{
        data[modelToCreateOrModify + 's'][indexerFound] =
            {
                "name": data[modelToCreateOrModify + 's'][indexerFound].name,
                "id": data[modelToCreateOrModify + 's'][indexerFound].id,
                "capacity": modelToCreateOrModify == "bag" || modelToCreateOrModify == "bottle" ? value + addCurrentMetric : "",
                "type": modelToCreateOrModify == "filter" ? value : "",
                "length": modelToCreateOrModify == "tubing" ? value + addCurrentMetric : ""
            }
    }
    return data;
 };