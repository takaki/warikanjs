import { ADD_ENTRY, UPDATE_MODEL } from "./constants";
import { DataStore } from "./models/DataStore";

interface IUpdateModel {
    type: UPDATE_MODEL;
    dataStore: DataStore;
}

interface IAddEntry {
    type: ADD_ENTRY;
}

export type ModelAction = IUpdateModel | IAddEntry;

export function updateModel(dataStore: DataStore): IUpdateModel {
    return {
        type: UPDATE_MODEL,
        dataStore,
    };
}

export function addEntry(): IAddEntry {
    return {
        type: ADD_ENTRY,
    };
}
