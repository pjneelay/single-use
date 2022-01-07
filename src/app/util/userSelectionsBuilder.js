export const userSelectionsBuilder = (attributes, windowSpace) => {
   if(attributes){
        const newPreset = {};
        const attrName = 'attr';
        let modelCategoryTypes = ["connector", "tubing", "bag", "filter", "fitting", "bottle", "accessories", "specialItem"];
        let category = '';
        let i = 0;
        let presetToFilter =  Object.keys(window[windowSpace].configurator.getMetadata()).length > 0 ? window.twoDPlayer.configurator.getMetadata().presetToFilter : 'null';
        modelCategoryTypes.push(presetToFilter);
        newPreset.presetType =  Object.keys(window[windowSpace].configurator.getMetadata()).length > 0 ? window.twoDPlayer.configurator.getMetadata().modelName : "null";
        newPreset.categoriesAndSelections = {};
        if(modelCategoryTypes){
            for(i; i<modelCategoryTypes.length; i++){
                category = modelCategoryTypes[i];
                newPreset.categoriesAndSelections[category] = [{}];
                let index = 0;
                attributes.forEach(element => {
                    if(element.name.includes(category) || element.name.includes(category.charAt(0).toUpperCase() + category.slice(1))){
                        newPreset.categoriesAndSelections[category][index] = { label: element.name, value: element.defaultValue};
                        index++;
                    }
                });
            }
        }
        else{
            console.log('data is not beeing updated because of undefined metadata in platform https://admin-fts.threekit.com/o/singleusesupport/items/d44c3e8d-f766-4806-bc06-5686c4b2500b');
        }
        return newPreset;
    }
};