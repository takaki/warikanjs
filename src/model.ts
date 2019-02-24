import { Record } from "immutable";

interface IEntryState {
    amount: number;
    number: number;
}

const defaultEntryState: IEntryState = {
    amount: 0,
    number: 0,
};

export class EntryState extends Record(defaultEntryState) implements IEntryState {
    public static modify(x: number, d: number) {
        return Math.max(x + d, 0);
    }

    public modifyAmount(diff: number) {
        return new EntryState(this.set("amount", EntryState.modify(this.amount, diff)));
    }

    public modifyNumber(diff: number) {
        return new EntryState(this.set("number", EntryState.modify(this.number, diff)));
    }

    public total() {
        return this.amount * this.number;
    }

}
