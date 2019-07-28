import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  addEntry,
  delEntry,
  RootAction,
  updateAmount,
  updateNumber
} from "../actions";
import { Warikan } from "../components/Warikan";
import { IRootState } from "../models/RootState";

function mapStateToProps(dataStore: IRootState) {
  return { ...dataStore };
}

function mapDispatchToProps(dispatch: Dispatch<RootAction>) {
  return {
    addEntry: () => dispatch(addEntry()),
    delEntry: (i: number) => dispatch(delEntry(i)),
    updateAmount: (i: number, d: number) => dispatch(updateAmount(i, d)),
    updateNumber: (i: number, d: number) => dispatch(updateNumber(i, d))
  };
}

export const WarikanApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(Warikan);
