import * as React from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {connect, Provider, Dispatch} from 'react-redux';
import {createAction, handleActions, Action} from 'redux-actions';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import DataState, {EntryState} from './model';
import {createStore} from 'redux';
import Component = React.Component;

injectTapEventPlugin();

interface ModifierAmountProps {
    diff: number;
    modifyAmount: (d: number) => void;
}

interface ModifierNumberProps {
    diff: number;
    modifyNumber: (d: number) => void;
}

class ModifyAmount extends React.Component<ModifierAmountProps, undefined> {
    render() {
        return (
            <RaisedButton className="or-modify-amount" onClick={() => this.props.modifyAmount(this.props.diff)}>
                {this.props.diff > 0 ? '+' : ''}{this.props.diff}
            </RaisedButton>);
    }
}

class ModifyNumber extends Component<ModifierNumberProps, undefined> {
    render() {
        return (
            <RaisedButton className="or-modify-number" onClick={() => this.props.modifyNumber(this.props.diff)}>
                {this.props.diff > 0 ? '+' : ''}{this.props.diff}
            </RaisedButton>);
    }
}
interface AppProps {
    data: DataState;
    updateModel: (d: DataState) => void;
}
class RApp extends Component<AppProps, undefined> {
    render() {
        return (
            <MuiThemeProvider>
                <div className="App">
                    <div className="total-line">
                        合計: {this.props.data.total()} 円 ( {this.props.data.totalNumber()} 人)
                    </div>
                    <Table selectable={false}>
                        <TableBody displayRowCheckbox={false} stripedRows={true}>
                            {this.props.data.entry.toKeyedSeq().map((e: EntryState, i: number) => {
                                    const updateAmount = (d: number) =>
                                        this.props.updateModel(this.props.data.modifyAmount(i, d));
                                    const updateNumber = (d: number) =>
                                        this.props.updateModel(this.props.data.modifyNumber(i, d));
                                    return (
                                        <TableRow key={i}>
                                            <TableRowColumn className="or-amount-column">
                                                <div >
                                                    <ModifyAmount diff={-500} modifyAmount={updateAmount}/>
                                                    <ModifyAmount diff={500} modifyAmount={updateAmount}/>
                                                </div>
                                                <div className="amount-line">
                                                    {e.get('amount')}円
                                                </div>
                                                <div >
                                                    <ModifyAmount diff={-100} modifyAmount={updateAmount}/>
                                                    <ModifyAmount diff={100} modifyAmount={updateAmount}/>
                                                </div>
                                            </TableRowColumn>

                                            <TableRowColumn className="or-number-colomn">
                                                <div >
                                                    <ModifyNumber diff={-5} modifyNumber={updateNumber}/>
                                                    <ModifyNumber diff={5} modifyNumber={updateNumber}/>
                                                </div>
                                                <div className="number-line">
                                                    {e.get('number')}人
                                                </div>
                                                <div >
                                                    <ModifyNumber diff={-1} modifyNumber={updateNumber}/>
                                                    <ModifyNumber diff={1} modifyNumber={updateNumber}/>
                                                </div>
                                            </TableRowColumn>
                                            <TableRowColumn className="or-subtotal-column">
                                                <FloatingActionButton
                                                    mini={true}
                                                    secondary={true}
                                                    className="or-trash-button"
                                                    onClick={() => this.props.updateModel(this.props.data.delEntry(i))}
                                                >
                                                    <ContentRemove />
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
                    <div >
                        <FloatingActionButton
                            onClick={() => this.props.updateModel(this.props.data.addEntry(1000, 1))}
                            mini={true}
                            className="or-plus-button"
                        >
                            <ContentAdd />
                        </FloatingActionButton>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

const initialState = new DataState().addEntry(1000, 1);

const updateModel = createAction<DataState>('UPDATE_MODEL');

const reducer = handleActions<DataState>(
    {['UPDATE_MODEL']: (state: DataState, action: Action<DataState>) => action.payload},
    initialState);

const store = createStore(reducer);

function mapStateToProps(state: DataState) {
    return {data: state};
}

function mapDispatchToProps(dispatch: Dispatch<DataState>) {
    return {
        updateModel: function (m: DataState) {
            dispatch(updateModel(m));
        }
    };

}

class App extends Component<undefined, undefined> {
    render() {
        const DApp = connect(mapStateToProps, mapDispatchToProps)(RApp);
        return (
            <Provider store={store}>
                <DApp />
            </Provider>);
    }
}

export default App;