import { ADD_ENTRY, DEL_ENTRY, UPDATE_MODEL } from "./constants";
import { DataStore } from "./models/DataStore";

interface IUpdateModel {
    type: UPDATE_MODEL;
    dataStore: DataStore;
}

interface IAddEntry {
    type: ADD_ENTRY;
}

interface IDelEntry {
    type: DEL_ENTRY;
    payload: {
        index: number;
    };
}

export type ModelAction = IUpdateModel | IAddEntry | IDelEntry;

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

export function delEntry(i: number): IDelEntry {
    return {
        type: DEL_ENTRY,
        payload: {
            index: i,
        },
    };
}
