import { Paper, TableCell, TableRow } from "@material-ui/core";
import { mapWithIndex } from "fp-ts/lib/Array";
import * as React from "react";
import { connect } from "react-redux";
import * as E from "../models/EntryState";
import { IRootState } from "../models/RootState";
import { DelButtonComponent } from "./DelButton";
import { ModifyAmount } from "./ModifyAmount";
import { ModifyNumberComponent } from "./ModifyNumber";

interface IStateProps {
  entries: E.IEntryState[];
}

type Props = IStateProps;

const TableContent: React.FC<Props> = props => {
  const { entries } = props;
  return (
    <React.Fragment>
      {mapWithIndex((i: number, e: E.IEntryState) => (
        <React.Fragment key={i}>
          <TableRow>
            <TableCell className="or-amount-column">
              <ModifyAmount index={i} diff={-500} />
            </TableCell>
            <TableCell className="or-amount-column">
              <ModifyAmount index={i} diff={-100} />
            </TableCell>
            <TableCell className="or-amount-column" rowSpan={2}>
              <Paper>
                <div className="amount-line">{e.amount}円</div>
                <div className="number-line">{e.num}人</div>
              </Paper>
            </TableCell>
            <TableCell className="or-amount-column">
              <ModifyAmount index={i} diff={100} />
            </TableCell>
            <TableCell className="or-amount-column">
              <ModifyAmount index={i} diff={500} />
            </TableCell>
            <TableCell className="or-subtotal-column">
              <DelButtonComponent index={i} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="or-number-column">
              <ModifyNumberComponent index={i} diff={-5} />
            </TableCell>
            <TableCell className="or-number-column">
              <ModifyNumberComponent index={i} diff={-1} />
            </TableCell>
            <TableCell className="or-number-column">
              <ModifyNumberComponent index={i} diff={1} />
            </TableCell>
            <TableCell className="or-number-column">
              <ModifyNumberComponent index={i} diff={5} />
            </TableCell>
            <TableCell className="or-subtotal-column">
              <div className="subtotal-box">
                <span className="subtotal-line">{E.entryTotal(e)} 円</span>
              </div>
            </TableCell>
          </TableRow>
        </React.Fragment>
      ))(entries)}
    </React.Fragment>
  );
};

export const TableContentComponent = connect(
  (state: IRootState): IStateProps => ({
    entries: state.entries
  })
)(TableContent);
