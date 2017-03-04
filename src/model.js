import {Record, List} from "immutable";

const EntryRecord = Record({amount: 0, number: 0});
const DataRecord = Record({entry: List()});

export class EntryState extends EntryRecord {
    modifyAmount(diff) {
        return this.set('amount', this.modify(this.amount, diff));
    }

    modifyNumber(diff) {
        return this.set('number', this.modify(this.number, diff));
    }

    total() {
        return this.get('amount') * this.get('number');
    }

    modify(x, d) {
        return x + d > 0 ? x + d : 0
    }

}

class DataState extends DataRecord {
    addEntry(amount, number) {
        return this.set('entry', this.entry.push(new EntryState({amount: amount, number: number})));
    }

    delEntry(index) {
        return this.set('entry', this.entry.delete(index));
    }

    modifyAmount(index, diff) {
        return this.set('entry', this.entry.update(index, x => x.modifyAmount(diff)));
    }

    modifyNumber(index, diff) {
        return this.set('entry', this.entry.update(index, x => x.modifyNumber(diff)));
    }

    total() {
        return this.entry.map(x => x.total()).reduce((a, b) => a + b)
    }

    totalNumber() {
        return this.entry.map(x => x.number).reduce((a, b) => a + b)
    }

}


export default DataState;
