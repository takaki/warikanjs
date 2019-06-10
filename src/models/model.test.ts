import { pipe } from 'fp-ts/lib/function';
import {
  addEntry,
  defaultDataStore,
  delEntry,
  modifyAmount,
  modifyNumber,
  total,
} from './DataStore';
import * as E from './EntryState';

const ds = defaultDataStore;

test('init DataStore', () => {
  expect(ds.entry.size).toBe(0);
});

test('addEntry', () => {
  const added = addEntry(1000, 1)(ds);
  expect(added.entry.size).toBe(1);
  expect(added.entry.get(0)!.amount).toBe(1000);
  expect(added.entry.get(0)!.num).toBe(1);
});

test('delEntry', () => {
  const added = pipe(addEntry(1000, 1),
                     addEntry(2000, 2),
                     addEntry(3000, 3),
                     delEntry(1))(ds);
  expect(added.entry.size).toBe(2);
  expect(added.entry.get(1)!.amount).toBe(3000);
  expect(added.entry.get(1)!.num).toBe(3);
});

test('modify', () => {
  const added = pipe(addEntry(1000, 1),
                     addEntry(2000, 2),
                     modifyAmount(0, 100),
                     modifyNumber(1, 10))(ds);
  expect(added.entry.get(0)!.amount).toBe(1100);
  expect(added.entry.get(0)!.num).toBe(1);
  expect(added.entry.get(1)!.amount).toBe(2000);
  expect(added.entry.get(1)!.num).toBe(12);
});

test('total', () => {
  const added = pipe(addEntry(1000, 1),
                     addEntry(2000, 2),
                     addEntry(3000, 3))(ds);
  expect(total(added)).toBe(14000);
});

const es: E.IEntryState = ({ amount: 1000, num: 10 });

test('new EntryState', () => {
  expect(es.amount).toBe(1000);
  expect(es.num).toBe(10);
});

test('diff', () => {
  expect(E.modifyAmount(100)(es).amount).toBe(1100);
  expect(E.modifyAmount(-100)(es).amount).toBe(900);
  expect(E.modifyAmount(-1100)(es).amount).toBe(0);

  expect(E.modifyNumber(10)(es).num).toBe(20);
  expect(E.modifyNumber(-1)(es).num).toBe(9);
  expect(E.modifyNumber(-11)(es).num).toBe(0);

});
