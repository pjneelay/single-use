import { combineReducers } from "redux";
import Threekit from './Threekit/reducer';
import Config from './Config/reducer';
import ModelsHandling from './modelsHandling/reducer';
import UserSelections from './userSelections/reducer';
import TourReducer from './guidedTour/reducer';
import NewDesignTourReducer from './newDesignTour/reducer';
import IndividualElements from './individualElements/reducer';

const reducers = combineReducers({
    Threekit,
    Config,
    ModelsHandling,
    UserSelections,
    TourReducer,
    NewDesignTourReducer,
    IndividualElements
});

export default reducers;
