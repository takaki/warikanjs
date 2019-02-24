import { Button, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";
import React, { Component, Fragment } from "react";
import { EntryState } from "../model";
import { ModifyAmount } from "../models/ModifyAmount";
import { ModifyNumber } from "../models/ModifyNumber";
import { IWarikanProps } from "../types";

export class Warikan extends Component<IWarikanProps> {

    constructor(props: any) {
        super(props);
        this.addEntry = this.addEntry.bind(this);
        // this.delEntry = this.delEntry.bind(this);
    }

    public addEntry() {
        this.props.updateStore(this.props.dataStore.addEntry(1000, 1));
    }

    public delEntry(i: number) {
        this.props.updateStore(this.props.dataStore.delEntry(i));
    }

    public updateAmount(i: number, d: number) {
        this.props.updateStore(this.props.dataStore.modifyAmount(i, d));
    }

    public updateNumber(i: number, d: number) {
        this.props.updateStore(this.props.dataStore.modifyNumber(i, d));
    }

    public render() {
        return (
            <div className="App">
                <div className="total-line">
                    合計: {this.props.dataStore.total()} 円 ( {this.props.dataStore.totalNumber()} 人)
                </div>
                <Table>
                    <TableBody>
                        {this.props.dataStore.entry.toKeyedSeq().map((e: EntryState, i: number) => {
                                return (
                                    <Fragment key={i}>
                                        <TableRow>
                                            <TableCell className="or-amount-column">
                                                <ModifyAmount diff={-500} modifyAmount={this.updateAmount.bind(this, i)}/>
                                            </TableCell>
                                            <TableCell className="or-amount-column">
                                                <ModifyAmount diff={-100} modifyAmount={this.updateAmount.bind(this, i)}/>
                                            </TableCell>
                                            <TableCell className="or-amount-column">
                                                <div className="amount-line">
                                                    {e.get("amount")}円
                                                </div>
                                            </TableCell>
                                            <TableCell className="or-amount-column">
                                                <ModifyAmount diff={100} modifyAmount={this.updateAmount.bind(this, i)}/>
                                            </TableCell>
                                            <TableCell className="or-amount-column">
                                                <ModifyAmount diff={500} modifyAmount={this.updateAmount.bind(this, i)}/>
                                            </TableCell>
                                            <TableCell className="or-subtotal-column">
                                                {this.renderDelButton(i)}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="or-number-colomn">
                                                <ModifyNumber diff={-5} modifyNumber={this.updateNumber.bind(this, i)}/>
                                            </TableCell>
                                            <TableCell className="or-number-colomn">
                                                <ModifyNumber diff={-1} modifyNumber={this.updateNumber.bind(this, i)}/>
                                            </TableCell>
                                            <TableCell className="or-number-colomn">
                                                <div className="number-line">
                                                    {e.get("number")}人
                                                </div>
                                            </TableCell>
                                            <TableCell className="or-number-colomn">
                                                <ModifyNumber diff={1} modifyNumber={this.updateNumber.bind(this, i)}/>
                                            </TableCell>
                                            <TableCell className="or-number-colomn">
                                                <ModifyNumber diff={5} modifyNumber={this.updateNumber.bind(this, i)}/>
                                            </TableCell>
                                            <TableCell className="or-subtotal-column">
                                                <div className="subtotal-box">
                                                    <span className="subtotal-line">{e.total()} 円</span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </Fragment>);
                            },
                        ).toArray()}
                    </TableBody>
                </Table>
                <div>
                    <Button
                        variant="fab"
                        color="secondary"
                        onClick={this.addEntry}
                        mini={true}
                        className="or-plus-button"
                    >
                        <Add/>
                    </Button>
                </div>
            </div>
        );
    }

    private renderDelButton(i: number) {
        return (
            <Button
                color="primary"
                mini={true}
                className="or-trash-button"
                onClick={this.delEntry.bind(this, i)}
            >
                <Delete/>
            </Button>
        );
    }
}
