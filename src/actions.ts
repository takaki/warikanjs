import { UPDATE_MODEL } from "./constants";
import DataStore from "./DataStore";

interface IUpdateModel {
    type: UPDATE_MODEL;
    dataStore: DataStore;
}

export type ModelAction = IUpdateModel;

export function updateModel(dataStore: DataStore): IUpdateModel {
    return {
        type: UPDATE_MODEL,
        dataStore,
    };
}
