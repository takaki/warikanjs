// tslint:disable-next-line:no-submodule-imports
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';
import WarikanApp from './containers/WarikanApp';
import { addEntry, defaultDataStore, IDataStore } from './models/DataStore';
import { modelReducer } from './reducers';

const store = createStore<IDataStore, any, any, any>(modelReducer,
                                                     addEntry(1000, 1)(defaultDataStore));

const theme = createMuiTheme({});

export default class App extends React.Component {
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
