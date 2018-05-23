import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import * as React from 'react';
import { connect, Dispatch, Provider } from 'react-redux';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore } from 'redux';
import Component = React.Component;
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import './App.css';
import DataState from "./dataState";
import { EntryState } from './model';

injectTapEventPlugin();

interface IModifierAmountProps {
    diff: number;
    modifyAmount: (d: number) => void;
}

interface IModifierNumberProps {
    diff: number;
    modifyNumber: (d: number) => void;
}

const ModifyAmount: React.StatelessComponent<IModifierAmountProps> = (props) => {
    return (
        <RaisedButton className="or-modify-amount" onClick={() => props.modifyAmount(props.diff)}>
            {props.diff > 0 ? '+' : ''}{props.diff}
        </RaisedButton>);
};

const ModifyNumber: React.StatelessComponent<IModifierNumberProps> = (props) => {
    return (
        <RaisedButton className="or-modify-number" onClick={() => props.modifyNumber(props.diff)}>
            {props.diff > 0 ? '+' : ''}{props.diff}
        </RaisedButton>);
};

interface IAppProps {
    data: DataState;
    updateModel: (d: DataState) => void;
}

const RApp: React.StatelessComponent<IAppProps> = (props) => {
    return (
        <MuiThemeProvider>
            <div className="App">
                <div className="total-line">
                    合計: {props.data.total()} 円 ( {props.data.totalNumber()} 人)
                </div>
                <Table selectable={false}>
                    <TableBody displayRowCheckbox={false} stripedRows={true}>
                        {props.data.entry.toKeyedSeq().map((e: EntryState, i: number) => {
                                const updateAmount = (d: number) =>
                                    props.updateModel(props.data.modifyAmount(i, d));
                                const updateNumber = (d: number) =>
                                    props.updateModel(props.data.modifyNumber(i, d));
                                return (
                                    <TableRow key={i}>
                                        <TableRowColumn className="or-amount-column">
                                            <div>
                                                <ModifyAmount diff={-500} modifyAmount={updateAmount}/>
                                                <ModifyAmount diff={500} modifyAmount={updateAmount}/>
                                            </div>
                                            <div className="amount-line">
                                                {e.get('amount')}円
                                            </div>
                                            <div>
                                                <ModifyAmount diff={-100} modifyAmount={updateAmount}/>
                                                <ModifyAmount diff={100} modifyAmount={updateAmount}/>
                                            </div>
                                        </TableRowColumn>

                                        <TableRowColumn className="or-number-colomn">
                                            <div>
                                                <ModifyNumber diff={-5} modifyNumber={updateNumber}/>
                                                <ModifyNumber diff={5} modifyNumber={updateNumber}/>
                                            </div>
                                            <div className="number-line">
                                                {e.get('number')}人
                                            </div>
                                            <div>
                                                <ModifyNumber diff={-1} modifyNumber={updateNumber}/>
                                                <ModifyNumber diff={1} modifyNumber={updateNumber}/>
                                            </div>
                                        </TableRowColumn>
                                        <TableRowColumn className="or-subtotal-column">
                                            <FloatingActionButton
                                                mini={true}
                                                secondary={true}
                                                className="or-trash-button"
                                                onClick={() => props.updateModel(props.data.delEntry(i))}
                                            >
                                                <ContentRemove/>
                                            </FloatingActionButton>
                                            <div className="subtotal-box">
                                                <span className="subtotal-line">{e.total()} 円</span>
                                            </div>
                                        </TableRowColumn>
                                    </TableRow>);
                            }
                        ).toArray()}
                    </TableBody>
                </Table>
                <div>
                    <FloatingActionButton
                        onClick={() => props.updateModel(props.data.addEntry(1000, 1))}
                        mini={true}
                        className="or-plus-button"
                    >
                        <ContentAdd/>
                    </FloatingActionButton>
                </div>
            </div>
        </MuiThemeProvider>
    );
};

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

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        updateModel(m: DataState) {
            dispatch(updateModel(m));
        }
    };

}

class App extends Component<{}, {}> {
    public render() {
        const DApp = connect(mapStateToProps, mapDispatchToProps)(RApp);
        return (
            <Provider store={store}>
                <DApp/>
            </Provider>);
    }
}

export default App;