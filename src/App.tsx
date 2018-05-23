import {createMuiTheme,MuiThemeProvider} from "@material-ui/core/styles";
import * as React from 'react';
import { connect, Dispatch, Provider } from 'react-redux';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore } from 'redux';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import './App.css';
import DataState from "./dataState";
import { RApp } from "./RApp";

injectTapEventPlugin();


const actionCreator = actionCreatorFactory();

const initialState = new DataState().addEntry(1000, 1);

const updateModel = actionCreator<DataState>('UPDATE_MODEL');

const reducer = reducerWithInitialState(initialState)
    .caseWithAction(updateModel, (state, action) => {
        return action.payload;
    }).build();

const store = createStore(reducer);

function mapStateToProps(state: DataState) {
    return {data: state};
}

function mapDispatchToProps(dispatch: Dispatch<void>) {
    return {
        updateModel(m: DataState) {
            dispatch(updateModel(m));
        }
    };

}

// const theme = ;

class App extends React.Component<{}, {}> {
    public render() {
        const DApp = connect(mapStateToProps, mapDispatchToProps)(RApp);
        return (
            <MuiThemeProvider theme={createMuiTheme()}>
                <Provider store={store}>
                    <DApp/>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;