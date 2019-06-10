import { IDataStore } from './models/DataStore';

export interface IWarikanProps {
  dataStore: IDataStore;
  addEntry: () => void;
  delEntry: (i: number) => void;
  updateAmount: (i: number, d: number) => void;
  updateNumber: (i: number, d: number) => void;
}
