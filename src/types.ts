import { DataStore } from "./models/DataStore";

export interface IWarikanProps {
    dataStore: DataStore;
    addEntry: () => void;
    delEntry: (i: number) => void;
    updateAmount: (i: number, d: number) => void;
    updateNumber: (i: number, d: number) => void;
}
