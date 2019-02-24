import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import DataStore from "./DataStore";
import { RApp } from "./RApp";

const UPDATE_MODEL = "UPDATE_MODEL";
type UPDATE_MODEL = typeof UPDATE_MODEL;

interface IUpdateModel {
    type: UPDATE_MODEL;
    dataStore: DataStore;
}

type ModelAction = IUpdateModel;

function updateModel(dataStore: DataStore): IUpdateModel {
    return {
        type: UPDATE_MODEL,
        dataStore,
    };
}

function modelReducer(dataStore: DataStore, action: ModelAction): DataStore {
    switch (action.type) {
        case UPDATE_MODEL:
            return action.dataStore;
        default:
            return dataStore;
    }
}

function mapStateToProps(state: DataStore) {
    return {dataStore: state};
}

function mapDispatchToProps(dispatch: Dispatch<ModelAction>) {
    return {
        updateStore: (dataStore: DataStore) => dispatch(updateModel(dataStore)),
    };
}

// @ts-ignore
const DApp = connect(mapStateToProps, mapDispatchToProps)(RApp);

// @ts-ignore
const store = createStore<DataStore>(modelReducer, new DataStore().addEntry(1000, 1));

export default class App extends Component {
    public render() {
        return (
            <MuiThemeProvider theme={createMuiTheme()}>
                <Provider store={store}>
                    <DApp/>
                </Provider>
            </MuiThemeProvider>
        );
    }
}
