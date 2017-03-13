import {Record, List} from 'immutable';

export class EntryState extends Record({amount: 0, number: 0}) {
    amount: number;
    number: number;

    modifyAmount(diff: number) {
        return new EntryState(this.set('amount', this.modify(this.amount, diff)));
    }

    modifyNumber(diff: number) {
        return new EntryState(this.set('number', this.modify(this.number, diff)));
    }

    total() {
        return this.get('amount') * this.get('number');
    }

    modify(x: number, d: number) {
        return x + d > 0 ? x + d : 0;
    }

}

class DataState extends Record({entry: List<EntryState>()}) {
    entry: List<EntryState>;

    addEntry(amount: number, num: number) {
        return new DataState(this.set('entry', this.entry.push(new EntryState({amount: amount, number: num}))));
    }

    delEntry(index: number) {
        return new DataState(this.set('entry', this.entry.delete(index)));
    }

    modifyAmount(index: number, diff: number) {
        return new DataState(this.set('entry', this.entry.update(index, x => x.modifyAmount(diff))));
    }

    modifyNumber(index: number, diff: number) {
        return new DataState(this.set('entry', this.entry.update(index, x => x.modifyNumber(diff))));
    }

    total() {
        return this.entry.map((x: EntryState) => x.total()).reduce((a: number, b: number) => a + b);
    }

    totalNumber() {
        return this.entry.map((x: EntryState) => x.number).reduce((a: number, b: number) => a + b);
    }

}

export default DataState;
