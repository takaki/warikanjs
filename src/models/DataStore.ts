import { List, Record } from "immutable";
import { EntryState } from "./EntryState";

interface IDataStore {
    entry: List<EntryState>;
}

const defaultDataStore: IDataStore = {
    entry: List<EntryState>(),
};

export class DataStore extends Record(defaultDataStore) implements IDataStore {

    public addEntry(amount: number, num: number) {
        return this.set("entry", this.entry.push(new EntryState({amount, number: num})));
    }

    public delEntry(index: number) {
        return this.set("entry", this.entry.delete(index));
    }

    public modifyAmount(index: number, diff: number) {
        return this.set("entry", this.entry.update(index, (x) => x.modifyAmount(diff)));
    }

    public modifyNumber(index: number, diff: number) {
        return this.set("entry", this.entry.update(index, (x) => x.modifyNumber(diff)));
    }

    public total() {
        return this.entry.map((x: EntryState) => x.total()).reduce((a: number, b: number) => a + b);
    }

    public totalNumber() {
        return this.entry.map((x: EntryState) => x.number).reduce((a: number, b: number) => a + b);
    }

}

