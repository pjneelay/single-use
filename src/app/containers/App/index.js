import React, { useState, useEffect } from "react";
import  { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HomePage from "../HomePage/HomePage";
import AddPresetPage from "../AddPresetPage/AddPresetPage";
import NewDesignPage from "../NewDesignPage/NewDesignPage";
import PdfGeneratorComp from "../../components/PdfGenerator/pdfGenerator";
import { configureStore } from "../../../app/redux/store";

export const history = createMemoryHistory();

const App = (props) => {

    return (
        <Router history={history}>
            <Switch>
                <Route path = "/" exact={true} component={HomePage} />
                <Route exact path = "/add-preset/:id?/:twoDasset?" component={AddPresetPage} />
                {/*<Route path = "/new-design/:id?/:twoDasset?" component={AddPresetPage} />*/}
                <Route path = "/new-design/:productId?" component={NewDesignPage} />
                <Route path = "/pdf-page/:id?/:twoDasset?" component={PdfGeneratorComp} />
            </Switch>
        </Router>
    );
};

export default App;
