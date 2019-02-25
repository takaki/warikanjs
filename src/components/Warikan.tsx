import { Fab, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { Component, Fragment } from "react";
import { EntryState } from "../models/EntryState";
import { IWarikanProps } from "../types";
import { DelButton } from "./DelButton";
import { ModifyAmount } from "./ModifyAmount";
import { ModifyNumber } from "./ModifyNumber";

export class Warikan extends Component<IWarikanProps> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        const tableBody = this.props.dataStore.entry.map((e: EntryState, i: number) => {
                return (
                    <Fragment key={i}>
                        <TableRow>
                            <TableCell className="or-amount-column">
                                <ModifyAmount
                                    index={i}
                                    diff={-500}
                                    modifyAmount={this.props.updateAmount}
                                />
                            </TableCell>
                            <TableCell className="or-amount-column">
                                <ModifyAmount
                                    index={i}
                                    diff={-100}
                                    modifyAmount={this.props.updateAmount}
                                />
                            </TableCell>
                            <TableCell className="or-amount-column">
                                <div className="amount-line">
                                    {e.get("amount")}円
                                </div>
                            </TableCell>
                            <TableCell className="or-amount-column">
                                <ModifyAmount
                                    index={i}
                                    diff={100}
                                    modifyAmount={this.props.updateAmount}
                                />
                            </TableCell>
                            <TableCell className="or-amount-column">
                                <ModifyAmount
                                    index={i}
                                    diff={500}
                                    modifyAmount={this.props.updateAmount}
                                />
                            </TableCell>
                            <TableCell className="or-subtotal-column">
                                <DelButton index={i} onClick={this.props.delEntry}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="or-number-colomn">
                                <ModifyNumber
                                    index={i}
                                    diff={-5}
                                    modifyNumber={this.props.updateNumber}
                                />
                            </TableCell>
                            <TableCell className="or-number-colomn">
                                <ModifyNumber
                                    index={i}
                                    diff={-1}
                                    modifyNumber={this.props.updateNumber}
                                />
                            </TableCell>
                            <TableCell className="or-number-colomn">
                                <div className="number-line">
                                    {e.get("number")}人
                                </div>
                            </TableCell>
                            <TableCell className="or-number-colomn">
                                <ModifyNumber
                                    index={i}
                                    diff={1}
                                    modifyNumber={this.props.updateNumber}
                                />
                            </TableCell>
                            <TableCell className="or-number-colomn">
                                <ModifyNumber
                                    index={i}
                                    diff={5}
                                    modifyNumber={this.props.updateNumber}
                                />
                            </TableCell>
                            <TableCell className="or-subtotal-column">
                                <div className="subtotal-box">
                                    <span className="subtotal-line">{e.total()} 円</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    </Fragment>);
            },
        );

        return (
            <div className="App">
                <div className="total-line">
                    合計: {this.props.dataStore.total()} 円 ( {this.props.dataStore.totalNumber()} 人)
                </div>
                <Table>
                    <TableBody>
                        {tableBody}
                    </TableBody>
                </Table>
                <div>
                    <Fab
                        color="secondary"
                        onClick={this.props.addEntry}
                        className="or-plus-button"
                        size="small"
                    >
                        <Add/>
                    </Fab>
                </div>
            </div>
        );
    }

}
