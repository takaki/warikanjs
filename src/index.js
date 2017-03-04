import React from "react";
import ReactDOM from "react-dom";
import App, {store} from "./App";
import "./index.css";
import {Provider} from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
