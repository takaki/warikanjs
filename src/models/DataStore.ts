import { List, Record } from "immutable";
import { IEntryState, modifyAmount, modifyNumber, total } from "./EntryState";

interface IDataStore {
  entry: List<IEntryState>;
}

const defaultDataStore: IDataStore = {
  entry: List<IEntryState>(),
};

export class DataStore extends Record(defaultDataStore) implements IDataStore {

  public addEntry(amount: number, num: number) {
    return this.set("entry", this.entry.push({amount, num}));
  }

  public delEntry(index: number) {
    return this.set("entry", this.entry.delete(index));
  }

  public modifyAmount(index: number, diff: number) {
    return this.set("entry", this.entry.update(index, (x) => modifyAmount(x, diff)));
  }

  public modifyNumber(index: number, diff: number) {
    return this.set("entry", this.entry.update(index, (x) => modifyNumber(x, diff)));
  }

  public total() {
    return this.entry.map((x: IEntryState) => total(x)).reduce((a: number, b: number) => a + b);
  }

  public totalNumber() {
    return this.entry.map((x: IEntryState) => x.num).reduce((a: number, b: number) => a + b);
  }

}
