import { ModelAction } from "./actions";
import { UPDATE_MODEL } from "./constants";
import { DataStore } from "./models/DataStore";

export function modelReducer(dataStore: DataStore, action: ModelAction): DataStore {
    switch (action.type) {
        case UPDATE_MODEL:
            return action.dataStore;
        default:
            return dataStore;
    }
}
