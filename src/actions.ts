import { ADD_ENTRY, DEL_ENTRY, UPDATE_AMOUNT, UPDATE_MODEL, UPDATE_NUMBER } from "./constants";
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

interface IUpdateAmount {
    type: UPDATE_AMOUNT;
    payload: {
        index: number;
        diff: number;
    };
}

interface IUpdateNumber {
    type: UPDATE_NUMBER;
    payload: {
        index: number;
        diff: number;
    };
}

export type ModelAction = IUpdateModel | IAddEntry | IDelEntry | IUpdateAmount | IUpdateNumber;

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

export function updateAmount(i: number, d: number): IUpdateAmount {
    return {
        type: UPDATE_AMOUNT,
        payload: {
            index: i,
            diff: d,
        },
    };
}

export function updateNumber(i: number, d: number): IUpdateNumber {
    return {
        type: UPDATE_NUMBER,
        payload: {
            index: i,
            diff: d,
        },
    };
}