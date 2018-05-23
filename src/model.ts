import { Record } from 'immutable';

export class EntryState extends Record({amount: 0, number: 0}) {
    public static modify(x: number, d: number) {
        return Math.max(x + d, 0);
    }
    
    public amount: number;
    public number: number;

    public modifyAmount(diff: number) {
        return new EntryState(this.set('amount', EntryState.modify(this.amount, diff)));
    }

    public modifyNumber(diff: number) {
        return new EntryState(this.set('number', EntryState.modify(this.number, diff)));
    }

    public total() {
        return this.amount * this.number;
    }

}


