import DataState from './model';
import {EntryState} from './model'


const ds = new DataState();

test('init DataState', () => {
    expect(ds.entry.size).toBe(0);
});

test("addEntry", () => {
    const added = ds.addEntry(1000, 1);
    expect(added.entry.size).toBe(1);
    expect(added.entry.get(0).amount).toBe(1000);
    expect(added.entry.get(0).number).toBe(1);
});

test('delEntry', () => {
    const added = ds.addEntry(1000, 1).addEntry(2000, 2).addEntry(3000, 3).delEntry(1);
    expect(added.entry.size).toBe(2);
    expect(added.entry.get(1).amount).toBe(3000);
    expect(added.entry.get(1).number).toBe(3);
});

test('modify', () => {
    const added = ds.addEntry(1000, 1).addEntry(2000, 2).modifyAmount(0,100).modifyNumber(1,10);
    expect(added.entry.get(0).amount).toBe(1100);
    expect(added.entry.get(0).number).toBe(1);
    expect(added.entry.get(1).amount).toBe(2000);
    expect(added.entry.get(1).number).toBe(12);
});

const es = new EntryState({amount: 1000, number: 10});

test('new EntryState', () => {
    expect(es.amount).toBe(1000);
    expect(es.number).toBe(10);
});

test('diff', () => {
    expect(es.modifyAmount(100).amount).toBe(1100);
    expect(es.modifyAmount(-100).amount).toBe(900);
    expect(es.modifyAmount(-1100).amount).toBe(0);

    expect(es.modifyNumber(10).number).toBe(20);
    expect(es.modifyNumber(-1).number).toBe(9);
    expect(es.modifyNumber(-11).number).toBe(0);

});