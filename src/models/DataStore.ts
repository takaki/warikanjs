import { array, deleteAt, modifyAt, snoc } from "fp-ts/lib/Array";
import { monoidSum } from "fp-ts/lib/Monoid";
import { Lens } from "monocle-ts";
import * as E from "./EntryState";

export interface IDataStore {
  entries: E.IEntryState[];
}

export const defaultDataStore: IDataStore = {
  entries: []
};

const entries = Lens.fromProp<IDataStore>()("entries");

export const addEntry = (amount: number, num: number) =>
  entries.modify(a => snoc(a, { amount, num }));

export const delEntry = (index: number) =>
  entries.modify(a => deleteAt(index, a).getOrElse(a));

export const modifyAmount = (index: number, diff: number) =>
  entries.modify(a => modifyAt(a, index, E.modifyAmount(diff)).getOrElse(a));

export const modifyNumber = (index: number, diff: number) =>
  entries.modify(a => modifyAt(a, index, E.modifyNumber(diff)).getOrElse(a));

export const total = (self: IDataStore): number =>
  array.foldMap(monoidSum)(entries.get(self), E.entryTotal);

export const totalNumber = (self: IDataStore): number =>
  array.foldMap(monoidSum)(entries.get(self), x => x.num);
