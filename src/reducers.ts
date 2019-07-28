import { RootAction } from "./actions";
import {
  ADD_ENTRY,
  DEL_ENTRY,
  UPDATE_AMOUNT,
  UPDATE_NUMBER
} from "./constants";
import {
  addEntry,
  defaultRootState,
  delEntry,
  IRootState,
  modifyAmount,
  modifyNumber,
  RootState
} from "./models/RootState";

export function rootReducer(
  rootState: RootState = defaultRootState,
  action: RootAction
): IRootState {
  switch (action.type) {
    case ADD_ENTRY:
      return addEntry(1000, 1)(rootState);
    case DEL_ENTRY:
      return delEntry(action.payload.index)(rootState);
    case UPDATE_AMOUNT:
      return modifyAmount(action.payload.index, action.payload.diff)(rootState);
    case UPDATE_NUMBER:
      return modifyNumber(action.payload.index, action.payload.diff)(rootState);
    default:
      return rootState;
  }
}
