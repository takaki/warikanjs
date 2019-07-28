// tslint:disable-next-line:no-submodule-imports
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "./App.css";
import { WarikanApp } from "./components/Warikan";
import { addEntry, defaultRootState, IRootState } from "./models/RootState";
import { RootAction, rootReducer } from "./store";

const store = createStore<IRootState, RootAction, any, any>(
  rootReducer,
  addEntry(1000, 1)(defaultRootState)
);

const theme = createMuiTheme({});

export default class App extends React.Component {
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <WarikanApp />
        </Provider>
      </MuiThemeProvider>
    );
  }
}
