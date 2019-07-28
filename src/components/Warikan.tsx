import { Fab, Table, TableBody } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { flow } from "fp-ts/lib/function";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ADD_ENTRY } from "../constants";
import * as E from "../models/EntryState";
import { IRootState, total, totalNumber } from "../models/RootState";
import { IAddEntry, RootAction } from "../store";
import { TableContentComponent } from "./TableContent";

export const doAddEntry = (): IAddEntry => ({
  type: ADD_ENTRY
});

interface IStateProps {
  entries: E.IEntryState[];
}

interface IDispatchProps {
  addEntry: typeof doAddEntry;
}

type Props = IStateProps & IDispatchProps;

const Warikan: React.FC<Props> = props => {
  const { entries, addEntry } = props;
  const amount = total(entries);
  const num = totalNumber(entries);
  return (
    <div className="App">
      <div className="total-line">
        合計: <span id="total">{amount}</span>円 ({" "}
        <span id="total-number">{num}</span> 人)
      </div>
      <Table>
        <TableBody>
          <TableContentComponent />
        </TableBody>
      </Table>
      <div>
        <Fab
          href=""
          color="secondary"
          onClick={addEntry}
          className="or-plus-button"
          size="small"
        >
          <Add />
        </Fab>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IRootState): IStateProps => ({
  entries: state.entries
});

const mapDispatchToProps = (
  dispatch: Dispatch<RootAction>
): IDispatchProps => ({
  addEntry: flow(
    doAddEntry,
    dispatch
  )
});

export const WarikanApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(Warikan);
