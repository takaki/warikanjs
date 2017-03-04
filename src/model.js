import Immutable, {Record, List} from "immutable";

const EntryRecord = Record({amount: 0, number: 0});
const DataRecord = Record({entry: List()});

class DataState extends DataRecord {
    addEntry(amount, number) {
        return this.set('entry', this.entry.push(new EntryState({amount: amount, number: number})));
    }
    delEntry(index) {
        return this.set('entry', this.entry.delete(index));
    }
    modifyAmount(index, diff) {
        return this.set('entry', this.entry.update(index, x=>x.modifyAmount(diff)));
    }
    modifyNumber(index, diff) {
        return this.set('entry', this.entry.update(index, x=>x.modifyNumber(diff)));
    }

}

export class EntryState extends EntryRecord {
    modifyAmount(diff) {
        return this.set('amount', this.modify(this.amount, diff));
    }

    modifyNumber(diff) {
        return this.set('number', this.modify(this.number, diff));
    }

    modify(x, d) {
        return x + d > 0 ? x + d : 0
    }

}


export default DataState;
