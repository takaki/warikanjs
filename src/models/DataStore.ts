import { List } from 'immutable';
import { Lens } from 'monocle-ts';
import * as E from './EntryState';

export interface IDataStore {
  entry: List<E.IEntryState>;
}

export const defaultDataStore: IDataStore = {
  entry: List<E.IEntryState>(),
};

const entry = Lens.fromProp<IDataStore>()('entry');

export const addEntry = (amount: number, num: number) => (self: IDataStore): IDataStore => {
  return entry.modify(a => a.push({ amount, num }))(self);
};

export const delEntry = (index: number) => (self: IDataStore): IDataStore => {
  return entry.modify(a => a.delete(index))(self);
};

export const modifyAmount = (index: number, diff: number) => (self: IDataStore): IDataStore =>
  entry.modify(a => a.update(index, E.modifyAmount(diff)))(self);

export const modifyNumber = (index: number, diff: number) => (self: IDataStore): IDataStore =>
  entry.modify(a => a.update(index, E.modifyNumber(diff)))(self);

export const total = (self: IDataStore): number =>
  entry.get(self).map((x: E.IEntryState) =>
                        E.entryTotal(x)).reduce((a: number, b: number) => a + b);

export const totalNumber = (self: IDataStore): number =>
  entry.get(self).map((x: E.IEntryState) => x.num).reduce((a: number, b: number) => a + b);
