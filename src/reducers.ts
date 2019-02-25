import { ModelAction } from "./actions";
import { ADD_ENTRY, DEL_ENTRY, UPDATE_AMOUNT, UPDATE_MODEL, UPDATE_NUMBER } from "./constants";
import { DataStore } from "./models/DataStore";

export function modelReducer(dataStore: DataStore, action: ModelAction): DataStore {
    switch (action.type) {
        case ADD_ENTRY:
            return dataStore.addEntry(1000, 1);
        case DEL_ENTRY:
            return dataStore.delEntry(action.payload.index);
        case UPDATE_AMOUNT:
            return dataStore.modifyAmount(action.payload.index, action.payload.diff);
        case UPDATE_NUMBER:
            return dataStore.modifyNumber(action.payload.index, action.payload.diff);
        default:
            return dataStore;
    }
}
