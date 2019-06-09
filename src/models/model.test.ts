import { DataStore } from "./DataStore";
import { IEntryState, modifyAmount, modifyNumber } from "./EntryState";

const ds = new DataStore();

test("init DataStore", () => {
  expect(ds.entry.size).toBe(0);
});

test("addEntry", () => {
  const added = ds.addEntry(1000, 1);
  expect(added.entry.size).toBe(1);
  expect(added.entry.get(0)!.amount).toBe(1000);
  expect(added.entry.get(0)!.num).toBe(1);
});

test("delEntry", () => {
  const added = ds.addEntry(1000, 1).addEntry(2000, 2).addEntry(3000, 3).delEntry(1);
  expect(added.entry.size).toBe(2);
  expect(added.entry.get(1)!.amount).toBe(3000);
  expect(added.entry.get(1)!.num).toBe(3);
});

test("modify", () => {
  const added = ds.addEntry(1000, 1).addEntry(2000, 2).modifyAmount(0, 100).modifyNumber(1, 10);
  expect(added.entry.get(0)!.amount).toBe(1100);
  expect(added.entry.get(0)!.num).toBe(1);
  expect(added.entry.get(1)!.amount).toBe(2000);
  expect(added.entry.get(1)!.num).toBe(12);
});

test("total", () => {
  const added = ds.addEntry(1000, 1).addEntry(2000, 2).addEntry(3000, 3);
  expect(added.total()).toBe(14000);
});

const es: IEntryState = ({amount: 1000, num: 10});

test("new EntryState", () => {
  expect(es.amount).toBe(1000);
  expect(es.num).toBe(10);
});

test("diff", () => {
  expect(modifyAmount(es, 100).amount).toBe(1100);
  expect(modifyAmount(es, -100).amount).toBe(900);
  expect(modifyAmount(es, -1100).amount).toBe(0);

  expect(modifyNumber(es, 10).num).toBe(20);
  expect(modifyNumber(es, -1).num).toBe(9);
  expect(modifyNumber(es, -11).num).toBe(0);

});
