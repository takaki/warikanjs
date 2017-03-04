import React, {Component} from "react";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {createStore} from "redux";
import {connect} from "react-redux";
import {createAction, handleActions} from "redux-actions";
import {Table, TableBody, TableRow, TableRowColumn} from "material-ui/Table";
import RaisedButton from "material-ui/RaisedButton";
import injectTapEventPlugin from "react-tap-event-plugin";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import ActionDelete from "material-ui/svg-icons/action/delete";
import IconButton from "material-ui/IconButton";
import DataState from "./model";

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
                    <h1>調整付割勘計算</h1>
                    <div style={{fontSize: "calc(100% + 2.0vw)"}}>
                        合計: {this.props.data.total()} 円 ( {this.props.data.totalNumber()} 人)
                    </div>
                    <Table selectable={false}>
                        <TableBody displayRowCheckbox={false} stripedRows={true}>
                            {this.props.data.entry.toKeyedSeq().map((e, i) =>
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
                                            {e.total()} 円
                                        </div>
                                    </TableRowColumn>
                                </TableRow>
                            ).toArray()}
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

const initialState = new DataState().addEntry(1000, 1);

const reducer = handleActions({
        [addEntry]: (state, action) => state.addEntry(0, 1),
        [delEntry]: (state, action) => state.delEntry(action.payload),
        [modifyAmount]: (state, action) => state.modifyAmount(action.payload.i, action.payload.d),
        [modifyNumber]: (state, action) => state.modifyNumber(action.payload.i, action.payload.d),
    },
    initialState
);

const store = createStore(reducer);

function mapStateToProps(state, props) {
    return {data: state}
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