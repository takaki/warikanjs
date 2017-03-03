import React, {Component} from "react";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {createStore} from "redux";
import {connect} from "react-redux";
import {createAction, handleActions} from "redux-actions";
import {Table, TableBody, TableRow, TableRowColumn} from "material-ui/Table";
import RaisedButton from "material-ui/RaisedButton";
import Immutable from "immutable";
import injectTapEventPlugin from "react-tap-event-plugin";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import ContentClear from "material-ui/svg-icons/content/clear";
import ActionDelete from "material-ui/svg-icons/action/delete";
import IconButton from "material-ui/IconButton";


injectTapEventPlugin();

const columnStyle = {
    paddingLeft: 0,
    paddingRight: 0,
    textAlign: "right",
};
class ModifyAmount extends Component {
    render() {
        return <div>
            <RaisedButton style={{marginTop: "5px", marginBottom: "5px", marginLeft: "3px"}} fullWidth={true}
                          onClick={() => this.props.modifyAmount({i: this.props.index, d: this.props.diff})}>
                {this.props.diff}円
            </RaisedButton>
        </div>
    }
}
class ModifyNumber extends Component {
    render() {
        return <div>
            <RaisedButton style={{marginTop: "5px", marginBottom: "5px", marginLeft: "3px"}} fullWidth={true}
                          onClick={() => this.props.modifyNumber({i: this.props.index, d: this.props.diff})}>
                {this.props.diff}人
            </RaisedButton>
        </div>
    }
}

class RApp extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="App">
                    <div style={{fontSize: "calc(100% + 2.0vw)"}}>
                        合計: {this.props.entry.map(d => d.get("amount") * d.get("number")).reduce((a, b) => a + b)} 円
                        ( {this.props.entry.map(d => d.get("number")).reduce((a, b) => a + b)} 人)
                    </div>
                    <Table selectable={false}>
                        <TableBody displayRowCheckbox={false} stripedRows={true}>
                            {this.props.entry.map((e, i) =>
                                <TableRow key={i}>
                                    <TableRowColumn style={columnStyle}>
                                        <ModifyAmount index={i} diff={500} modifyAmount={this.props.modifyAmount}/>
                                        <ModifyAmount index={i} diff={100} modifyAmount={this.props.modifyAmount}/>
                                    </TableRowColumn >
                                    <TableRowColumn style={columnStyle}>
                                        <div style={{fontSize: "calc(87.5% + 0.5vw)", marginLeft: "2px"}}>
                                            {e.get("amount")}円
                                        </div>
                                    </TableRowColumn>
                                    <TableRowColumn style={columnStyle}>
                                        <ModifyAmount index={i} diff={-500} modifyAmount={this.props.modifyAmount}/>
                                        <ModifyAmount index={i} diff={-100} modifyAmount={this.props.modifyAmount}/>
                                    </TableRowColumn>

                                    <TableRowColumn style={columnStyle}>
                                        <ModifyNumber index={i} diff={5} modifyNumber={this.props.modifyNumber}/>
                                        <ModifyNumber index={i} diff={1} modifyNumber={this.props.modifyNumber}/>
                                    </TableRowColumn>
                                    <TableRowColumn style={columnStyle}>
                                        <div style={{fontSize: "calc(192.5% + 0.5vw)", marginLeft: "2px"}}>
                                            {e.get("number")}人
                                        </div>
                                    </TableRowColumn>
                                    <TableRowColumn style={columnStyle}>
                                        <ModifyNumber index={i} diff={-5} modifyNumber={this.props.modifyNumber}/>
                                        <ModifyNumber index={i} diff={-1} modifyNumber={this.props.modifyNumber}/>
                                    </TableRowColumn>
                                    <TableRowColumn style={columnStyle}>
                                        <div>
                                            <IconButton onClick={() => this.props.delEntry(i)}>
                                                <ActionDelete />
                                            </IconButton>
                                        </div>
                                        <div>
                                            {e.get("amount") * e.get("number")} 円
                                        </div>
                                    </TableRowColumn>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <div >
                        <FloatingActionButton onClick={this.props.addEntry} mini={true}
                                              style={{marginTop: "10px", marginBottom: "40px"}}>
                            <ContentAdd />
                        </FloatingActionButton>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

const addEntry = createAction('ADD_ENTRY');
const delEntry = createAction('DEL_ENTRY');
const modifyAmount = createAction('MODIFY_AMOUNT');
const modifyNumber = createAction("MODIFY_NUMBER");

const initialState = {
    entry: Immutable.fromJS([{
        amount: 1000,
        number: 1
    }])
};

const reducer = handleActions({
        [addEntry]: (state, action) => Object.assign({}, state, {
            entry: state.entry.push(Immutable.Map({amount: 0, number: 1}))
        }),
        [delEntry]: (state, action) => Object.assign({}, state, {
            entry: state.entry.delete(action.payload)
        }),
        [modifyAmount]: (state, action) => {
            const i = action.payload.i;
            const d = action.payload.d;
            return Object.assign({}, state, {
                entry: state.entry.update(i, v => v.update('amount', x => x + d > 0 ? x + d : 0))
            });
        },
        [modifyNumber]: (state, action) => {
            const i = action.payload.i;
            const d = action.payload.d;
            return Object.assign({}, state, {
                entry: state.entry.update(i, v => v.update('number', x => x + d > 0 ? x + d : 0))
            });
        }
    },
    initialState
);

const store = createStore(reducer);

function mapStateToProps(state, props) {
    return state
}

function mapDispatchToProps(dispatch, props) {
    return {
        addEntry: function () {
            dispatch(addEntry());
        },
        delEntry: function (i) {
            dispatch(delEntry(i))
        },
        modifyAmount: function (i, d) {
            dispatch(modifyAmount(i, d))
        },
        modifyNumber: function (i, d) {
            dispatch(modifyNumber(i, d))
        }
    }

}


const App = connect(mapStateToProps, mapDispatchToProps)(RApp);

export {App, store}