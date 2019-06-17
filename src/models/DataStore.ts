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

export const addEntry = (amount: number, num: number) => (
  self: IDataStore
): IDataStore => entries.modify(a => snoc(a, { amount, num }))(self);

export const delEntry = (index: number) => (self: IDataStore): IDataStore =>
  entries.modify(a => deleteAt(index, a).getOrElse(a))(self);

export const modifyAmount = (index: number, diff: number) => (
  self: IDataStore
): IDataStore =>
  entries.modify(a => modifyAt(a, index, E.modifyAmount(diff)).getOrElse(a))(
    self
  );

export const modifyNumber = (index: number, diff: number) => (
  self: IDataStore
): IDataStore =>
  entries.modify(a => modifyAt(a, index, E.modifyNumber(diff)).getOrElse(a))(
    self
  );

export const total = (self: IDataStore): number =>
  array.foldMap(monoidSum)(entries.get(self), E.entryTotal);

export const totalNumber = (self: IDataStore): number =>
  array.foldMap(monoidSum)(entries.get(self), x => x.num);
