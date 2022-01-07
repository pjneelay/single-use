import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from "./app/redux/store";
import ReactDOM from "react-dom";
import App from "./app/containers/App/index.js";
import "./index.css";



// const store = configureStore();

const e = React.createElement;

const domContainer = document.getElementById("react-root");
ReactDOM.render(
  e(() => (
    <Provider store={configureStore().store}>
      <PersistGate loading={null} persistor={configureStore().persistor}>
          <Suspense fallback={<div className="loading" />}>
            <App />
          </Suspense>
      </PersistGate>
    </Provider>
  )),
  domContainer
);
