import { Fab, Table, TableBody } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_ENTRY } from "../constants";
import { RootState, total, totalNumber } from "../models/RootState";
import { IAddEntry } from "../store";
import { TableContent } from "./TableContent";

export const doAddEntry = (): IAddEntry => ({
  type: ADD_ENTRY
});

export const WarikanApp: React.FC = () => {
  const entries = useSelector((state: RootState) => state.entries);
  const dispatch = useDispatch();
  const amount = total(entries);
  const num = totalNumber(entries);
  const addEntry = React.useCallback(() => dispatch(doAddEntry()), [dispatch]);
  return (
    <div className="App">
      <div className="total-line">
        合計: <span id="total">{amount}</span>円 ({" "}
        <span id="total-number">{num}</span> 人)
      </div>
      <Table>
        <TableBody>
          <TableContent />
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
