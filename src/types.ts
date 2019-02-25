import { DataStore } from "./models/DataStore";

export interface IWarikanProps {
    dataStore: DataStore;
    updateStore: (d: DataStore) => void;
    addEntry: () => void;
    delEntry: (i: number) => void;
    updateAmount: (i: number, d: number) => void;
    updateNumber: (i: number, d: number) => void;
}
