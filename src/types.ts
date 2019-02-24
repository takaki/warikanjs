import DataStore from "./DataStore";

export interface IWarikanProps {
    dataStore: DataStore;
    updateStore: (d: DataStore) => void;
}
