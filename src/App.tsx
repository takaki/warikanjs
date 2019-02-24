import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import WarikanApp from "./containers/WarikanApp";
import DataStore from "./DataStore";
import { modelReducer } from "./reducers";

// @ts-ignore
const store = createStore<DataStore>(modelReducer, new DataStore().addEntry(1000, 1));

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
});

export default class App extends Component {
    public render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <WarikanApp/>
                </Provider>
            </MuiThemeProvider>
        );
    }
}
