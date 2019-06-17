import { ModelAction } from "./actions";
import {
  ADD_ENTRY,
  DEL_ENTRY,
  UPDATE_AMOUNT,
  UPDATE_NUMBER
} from "./constants";
import {
  addEntry,
  defaultDataStore,
  delEntry,
  IDataStore,
  modifyAmount,
  modifyNumber
} from "./models/DataStore";

export function modelReducer(
  dataStore: IDataStore = defaultDataStore,
  action: ModelAction
): IDataStore {
  switch (action.type) {
    case ADD_ENTRY:
      return addEntry(1000, 1)(dataStore);
    case DEL_ENTRY:
      return delEntry(action.payload.index)(dataStore);
    case UPDATE_AMOUNT:
      return modifyAmount(action.payload.index, action.payload.diff)(dataStore);
    case UPDATE_NUMBER:
      return modifyNumber(action.payload.index, action.payload.diff)(dataStore);
    default:
      return dataStore;
  }
}
