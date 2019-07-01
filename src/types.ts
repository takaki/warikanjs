import { IEntryState } from "./models/EntryState";

export interface IWarikanProps {
  entries: IEntryState[];
  addEntry: () => void;
  delEntry: (i: number) => void;
  updateAmount: (i: number, d: number) => void;
  updateNumber: (i: number, d: number) => void;
}
