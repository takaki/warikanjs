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

class ModifyAmount extends Component {
    render() {
        return <RaisedButton
            style={{marginTop: "5px", marginBottom: "5px", marginLeft: "3px", minWidth: "30px", width: "50%"}}
            onClick={() => this.props.modifyAmount(this.props.diff)}>
            {this.props.diff > 0 ? "+" : ""}{this.props.diff}
        </RaisedButton>
    }
}

class ModifyNumber extends Component {
    render() {
        return <RaisedButton
            style={{marginTop: "5px", marginBottom: "5px", marginLeft: "3px", minWidth: "30px", width: "50%"}}
            onClick={() => this.props.modifyNumber(this.props.diff)}>
            {this.props.diff > 0 ? "+" : ""}{this.props.diff}
        </RaisedButton>
    }
}

class RApp extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="App">

                    <div style={{fontSize: "calc(100% + 2.0vw)"}}>
                        合計: {this.props.data.total()} 円 ( {this.props.data.totalNumber()} 人)
                    </div>
                    <Table selectable={false}>
                        <TableBody displayRowCheckbox={false} stripedRows={true}>
                            {this.props.data.entry.toKeyedSeq().map((e, i) => {
                                    const updateAmount = (d) => this.props.updateModel(this.props.data.modifyAmount(i, d));
                                    const updateNumber = (d) => this.props.updateModel(this.props.data.modifyNumber(i, d));
                                    return <TableRow key={i}>
                                        <TableRowColumn style={{
                                            paddingLeft: 0,
                                            paddingRight: "5px",
                                            textAlign: "right",
                                        }}>
                                            <div >
                                                <ModifyAmount diff={-500} modifyAmount={updateAmount}/>
                                                <ModifyAmount diff={500} modifyAmount={updateAmount}/>
                                            </div>
                                            <div style={{
                                                fontSize: "calc(150% + 1.5vw)",
                                                marginBottom: "5px",
                                                marginLeft: "2px",
                                                height: "4vh",
                                                textAlign: "center"
                                            }}>
                                                {e.get("amount")}円
                                            </div>
                                            <div >
                                                <ModifyAmount diff={-100} modifyAmount={updateAmount}/>
                                                <ModifyAmount diff={100} modifyAmount={updateAmount}/>
                                            </div>
                                        </TableRowColumn>

                                        <TableRowColumn style={{
                                            paddingLeft: "5px",
                                            paddingRight: 0,
                                            textAlign: "right",
                                        }}>
                                            <div >
                                                <ModifyNumber diff={-5} modifyNumber={updateNumber}/>
                                                <ModifyNumber diff={5} modifyNumber={updateNumber}/>
                                            </div>
                                            <div style={{
                                                fontSize: "calc(150% + 1.5vw)",
                                                marginBottom: "5px",
                                                marginLeft: "2px",
                                                height: "4vh",
                                                textAlign: "center"
                                            }}>
                                                {e.get("number")}人
                                            </div>
                                            <div >
                                                <ModifyNumber diff={-1} modifyNumber={updateNumber}/>
                                                <ModifyNumber diff={1} modifyNumber={updateNumber}/>
                                            </div>
                                        </TableRowColumn>
                                        <TableRowColumn style={{
                                            paddingLeft: 0,
                                            paddingRight: 0,
                                            textAlign: "center",
                                            width: "60px",
                                        }}>
                                            <div>
                                                <IconButton
                                                    onClick={() => this.props.updateModel(this.props.data.delEntry(i))}>
                                                    <ActionDelete />
                                                </IconButton>
                                            </div>
                                            <div style={{marginRight: "0px"}}>
                                                {e.total()} 円
                                            </div>
                                        </TableRowColumn>
                                    </TableRow>;
                                }
                            ).toArray()}
                        </TableBody>
                    </Table>
                    <div >
                        <FloatingActionButton onClick={() => this.props.updateModel(this.props.data.addEntry(1000, 1))}
                                              mini={true}
                                              style={{marginTop: "10px", marginBottom: "40px"}}>
                            <ContentAdd />
                        </FloatingActionButton>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

const updateModel = createAction("UPDATE_MODEL");

const initialState = new DataState().addEntry(1000, 1);

const reducer = handleActions({
        [updateModel]: (state, action) => action.payload,
    },
    initialState
);

export const store = createStore(reducer);

function mapStateToProps(state, props) {
    return {data: state}
}

function mapDispatchToProps(dispatch, props) {
    return {
        updateModel: function (m) {
            dispatch(updateModel(m))
        }
    }

}

const App = connect(mapStateToProps, mapDispatchToProps)(RApp);

export default App;