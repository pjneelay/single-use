import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
  /*whitelist: ["Add here the names of the states", "another state"]*/
}

const persistedReducer = persistReducer(persistConfig, reducers);
export let store;
const middlewares = [thunk, logger];

export const configureStore = (initialState) => {
  store = createStore(
    persistedReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  );
  let persistor = persistStore(store);

  return { store, persistor }
}
