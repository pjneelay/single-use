import preset from '../data/presetOne.json';
import connector from '../../assets/items/connector.png';
import bag from '../../assets/items/bag.png';
import bottle from '../../assets/items/bottle.png';
import fitting from '../../assets/items/fittings.png';
import tubing from '../../assets/items/tubings.png';
import filter from '../../assets/items/filter.png';
import accessories from '../../assets/items/accessories.png';
import specialItem from '../../assets/items/special-item.png';



export const jsonBuilder = (attributes, windowSpace) => {
    const reviewCustomValues = (values) => {
        for (let i = 0; i < values.length; i++){
            if(values[i].value === 'custom') return 'custom';
        };
        return 'config';
    };
   if(attributes){
        const newDesignImages = [connector, tubing, bag, filter, fitting, bottle, accessories, specialItem]
        const presetImage = Object.keys(window[windowSpace].configurator.getMetadata()).length > 0 ? window[windowSpace].configurator.getMetadata().imageRoute : "null";
        const newPreset = preset;
        const selectionIndex = 0;
        const attrName = 'attr';
        let modelCategoryTypes = ["connector", "tubing", "bag", "filter", "fitting", "bottle", "accessories", "specialItem"];
        let presetToFilter = Object.keys(window[windowSpace].configurator.getMetadata()).length > 0 ? window[windowSpace].configurator.getMetadata().presetToFilter : "null";
        modelCategoryTypes.push(presetToFilter);
        let category = '';
        let i = 0; 
        let metricOne, metricTwo;
        if(modelCategoryTypes){
            for(i; i<modelCategoryTypes.length; i++){
                category = modelCategoryTypes[i];
                newPreset.category = Object.keys(window[windowSpace].configurator.getMetadata()).length > 0 ? window[windowSpace].configurator.getMetadata().modelName : "null";
                newPreset.categoryTypes[i] = {};
                newPreset.categoryTypes[i].typeName =  category;
                newPreset.categoryTypes[i].modelImage = presetImage;
                newPreset.categoryTypes[i].attributes = [];
                let index = 0;
                let type;
                attributes.forEach(element => {
                    if(element.name.includes(category) || element.name.includes(category.charAt(0).toUpperCase() + category.slice(1))){
                        // if(element.name.includes("size") || element.name.includes("Size") || element.name.includes("length") || 
                        //     element.name.includes("Length") || element.name.includes("volume") || element.name.includes("Volume") || 
                        //     element.name.includes("Thickness") || element.name.includes("thickness") || element.name.includes("Diameter") || 
                        //     element.name.includes("diameter")){
                        //         type = "manufacturing";
                        // }
                        // else{
                        //     type = 'configuring';
                        // };
                        if(category === 'bag' || category === 'bottle'){
                            metricOne = "Lt";
                            metricTwo = "Oz";
                        }
                        else if (category === 'accessories' || category.includes("Preset") || category.includes("preset")){
                            metricOne = "";
                            metricTwo = "";
                        }
                        else{
                            metricOne = "In";
                            metricTwo = "Mm";
                        }
                        let kind = reviewCustomValues(element.values);
                        
                        newPreset.categoryTypes[i].attributes[index] = {label: element.name, values:  element.values, UIType: element.name.includes("Metrics") || element.name.includes("metrics") ? "switch" : "dropdown", "kind": kind, "type": type, "metricOne": metricOne, "metricTwo": metricTwo};
                        
                        index++;
                    }
                    //newPreset.categoryTypes[i].attributes.thumbnail = newDesignImages[i]
                });
                
            }
        }
        else{
            console.log('data is not beeing updated because of undefined metadata in platform https://preview.threekit.com/o/singleusesupport/items/d44c3e8d-f766-4806-bc06-5686c4b2500b');
        }
        sessionStorage.setItem('preset', presetToFilter);
        sessionStorage.setItem('newPreset', JSON.stringify(newPreset));
        return newPreset;
    }
};