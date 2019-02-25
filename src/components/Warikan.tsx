import { Fab, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { Component, Fragment } from "react";
import { EntryState } from "../models/EntryState";
import { IWarikanProps } from "../types";
import { DelButton } from "./DelButton";
import { ModifyAmount } from "./ModifyAmount";
import { ModifyNumber } from "./ModifyNumber";

export function Warikan(props: IWarikanProps) {
    const tableBody = props.dataStore.entry.map((e: EntryState, i: number) => {
            return (
                <Fragment key={i}>
                    <TableRow>
                        <TableCell className="or-amount-column">
                            <ModifyAmount
                                index={i}
                                diff={-500}
                                modifyAmount={props.updateAmount}
                            />
                        </TableCell>
                        <TableCell className="or-amount-column">
                            <ModifyAmount
                                index={i}
                                diff={-100}
                                modifyAmount={props.updateAmount}
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
                                modifyAmount={props.updateAmount}
                            />
                        </TableCell>
                        <TableCell className="or-amount-column">
                            <ModifyAmount
                                index={i}
                                diff={500}
                                modifyAmount={props.updateAmount}
                            />
                        </TableCell>
                        <TableCell className="or-subtotal-column">
                            <DelButton index={i} onClick={props.delEntry}/>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="or-number-colomn">
                            <ModifyNumber
                                index={i}
                                diff={-5}
                                modifyNumber={props.updateNumber}
                            />
                        </TableCell>
                        <TableCell className="or-number-colomn">
                            <ModifyNumber
                                index={i}
                                diff={-1}
                                modifyNumber={props.updateNumber}
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
                                modifyNumber={props.updateNumber}
                            />
                        </TableCell>
                        <TableCell className="or-number-colomn">
                            <ModifyNumber
                                index={i}
                                diff={5}
                                modifyNumber={props.updateNumber}
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
                合計: {props.dataStore.total()} 円 ( {props.dataStore.totalNumber()} 人)
            </div>
            <Table>
                <TableBody>
                    {tableBody}
                </TableBody>
            </Table>
            <div>
                <Fab
                    color="secondary"
                    onClick={props.addEntry}
                    className="or-plus-button"
                    size="small"
                >
                    <Add/>
                </Fab>
            </div>
        </div>
    );
}
