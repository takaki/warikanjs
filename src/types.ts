import { DataStore } from "./models/DataStore";

export interface IWarikanProps {
    dataStore: DataStore;
    updateStore: (d: DataStore) => void;
    addEntry: () => void;
}
