import { ModelAction } from "./actions";
import { ADD_ENTRY, DEL_ENTRY, UPDATE_MODEL } from "./constants";
import { DataStore } from "./models/DataStore";

export function modelReducer(dataStore: DataStore, action: ModelAction): DataStore {
    switch (action.type) {
        case UPDATE_MODEL:
            return action.dataStore;
        case ADD_ENTRY:
            return dataStore.addEntry(1000, 1);
        case DEL_ENTRY:
            return dataStore.delEntry(action.payload.index);
        default:
            return dataStore;
    }
}
