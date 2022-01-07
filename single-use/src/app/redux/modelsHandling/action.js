import actions from "./types";
import accessories from '../../data/accessories.json';
import bags from '../../data/bags.json';
import bottles from '../../data/bottles.json';
import connectors from '../../data/connectors.json';
import filters from '../../data/filters.json';
import fittings from '../../data/fittings.json';
import tubings from '../../data/tubings.json';
import specialItems from '../../data/specialItems.json';

const updateModels = (payload) => ({
    type: actions.USER_ELEMENT_UPDATED_ADD,
    payload
});

export const UpdateModels = (data) => dispatch => {
    const accessoriesJson = accessories;
    const bagsJson = bags;
    const bottlesJson = bottles;
    const connectorsJson = connectors;
    const filtersJson = filters;
    const fittingsJson = fittings;
    const tubingsJson = tubings;
    const specialItemsJson = specialItems;

    try {
        switch(data){
            case 'accessories':
                dispatch(updateModels(accessoriesJson));
                break;
            case 'bags':
                dispatch(updateModels(bagsJson));
                break;
            case 'filters':
                dispatch(updateModels(filtersJson));
                break;
            case 'fittings':
                dispatch(updateModels(fittingsJson));
                break;
            case 'bottles':
                dispatch(updateModels(bottlesJson));
                break;
            case 'tubings':
                dispatch(updateModels(tubingsJson));
                break;
            case 'connectors':
                dispatch(updateModels(connectorsJson));
                break;
            case 'specialItems':
                dispatch(updateModels(specialItemsJson));
                break;
            default:
                dispatch(updateModels(data));
                break;
        }
    } catch (e) { 
    }
};
