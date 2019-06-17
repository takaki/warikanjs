import { array, deleteAt, snoc } from "fp-ts/lib/Array";
import { monoidSum } from "fp-ts/lib/Monoid";
import { Lens } from "monocle-ts";
import { indexArray } from "monocle-ts/lib/Index/Array";
import * as E from "./EntryState";

export interface IDataStore {
  entries: E.IEntryState[];
}

export const defaultDataStore: IDataStore = {
  entries: []
};

const entries = Lens.fromProp<IDataStore>()("entries");

const indexEntry = indexArray<E.IEntryState>();

export const addEntry = (amount: number, num: number) =>
  entries.modify(a => snoc(a, { amount, num }));

export const delEntry = (index: number) =>
  entries.modify(a => deleteAt(index, a).getOrElse(a));

export const modifyAmount = (index: number, diff: number) =>
  entries.modify(indexEntry.index(index).modify(E.modifyAmount(diff)));

export const modifyNumber = (index: number, diff: number) =>
  entries.modify(indexEntry.index(index).modify(E.modifyNumber(diff)));

export const total = (self: IDataStore): number =>
  array.foldMap(monoidSum)(entries.get(self), E.entryTotal);

export const totalNumber = (self: IDataStore): number =>
  array.foldMap(monoidSum)(entries.get(self), x => x.num);
