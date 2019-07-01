import {
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { mapWithIndex } from "fp-ts/lib/Array";
import * as React from "react";
import { IDataStore, total, totalNumber } from "../models/DataStore";
import * as E from "../models/EntryState";
import { IWarikanProps } from "../types";
import { DelButton } from "./DelButton";
import { ModifyAmount } from "./ModifyAmount";
import { ModifyNumber } from "./ModifyNumber";

export const Warikan = (props: IWarikanProps) => {
  return (
    <div className="App">
      <div className="total-line">
        合計: <span id="total">{total(props.dataStore)}</span>円 ({" "}
        <span id="total-number">{totalNumber(props.dataStore)}</span> 人)
      </div>
      <Table>
        <TableBody>
          <TableContent
            dataStore={props.dataStore}
            delEntry={props.delEntry}
            updateAmount={props.updateAmount}
            updateNumber={props.updateNumber}
          />
        </TableBody>
      </Table>
      <div>
        <Fab
          href=""
          color="secondary"
          onClick={props.addEntry}
          className="or-plus-button"
          size="small"
        >
          <Add />
        </Fab>
      </div>
    </div>
  );
};

const TableContent: React.FC<{
  dataStore: IDataStore;
  updateAmount: (i: number, d: number) => void;
  updateNumber: (i: number, d: number) => void;
  delEntry: (i: number) => void;
}> = props => (
  <React.Fragment>
    {mapWithIndex((i: number, e: E.IEntryState) => (
      <React.Fragment key={i}>
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
          <TableCell className="or-amount-column" rowSpan={2}>
            <Paper>
              <div className="amount-line">{e.amount}円</div>
              <div className="number-line">{e.num}人</div>
            </Paper>
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
            <DelButton index={i} onClick={props.delEntry} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="or-number-column">
            <ModifyNumber
              index={i}
              diff={-5}
              modifyNumber={props.updateNumber}
            />
          </TableCell>
          <TableCell className="or-number-column">
            <ModifyNumber
              index={i}
              diff={-1}
              modifyNumber={props.updateNumber}
            />
          </TableCell>
          <TableCell className="or-number-column">
            <ModifyNumber
              index={i}
              diff={1}
              modifyNumber={props.updateNumber}
            />
          </TableCell>
          <TableCell className="or-number-column">
            <ModifyNumber
              index={i}
              diff={5}
              modifyNumber={props.updateNumber}
            />
          </TableCell>
          <TableCell className="or-subtotal-column">
            <div className="subtotal-box">
              <span className="subtotal-line">{E.entryTotal(e)} 円</span>
            </div>
          </TableCell>
        </TableRow>
      </React.Fragment>
    ))(props.dataStore.entries)}
  </React.Fragment>
);
