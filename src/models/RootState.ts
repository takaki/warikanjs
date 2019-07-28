import { deleteAt, foldMap, snoc } from "fp-ts/lib/Array";
import { constant } from "fp-ts/lib/function";
import { monoidSum } from "fp-ts/lib/Monoid";
import { getOrElse } from "fp-ts/lib/Option";
import { Lens } from "monocle-ts";
import { indexArray } from "monocle-ts/lib/Index/Array";
import * as E from "./EntryState";

export interface IRootState {
  entries: E.IEntryState[];
}

const entries = Lens.fromProp<IRootState>()("entries");

export type RootState = IRootState;

export const defaultRootState: IRootState = {
  entries: []
};

const indexEntry = indexArray<E.IEntryState>();

export const addEntry = (amount: number, num: number) =>
  entries.modify(a => snoc(a, { amount, num }));

export const delEntry = (index: number) =>
  entries.modify(a => getOrElse(constant(a))(deleteAt(index)(a)));

export const modifyAmount = (index: number, diff: number) =>
  entries.modify(indexEntry.index(index).modify(E.modifyAmount(diff)));

export const modifyNumber = (index: number, diff: number) =>
  entries.modify(indexEntry.index(index).modify(E.modifyNumber(diff)));

export const total = (entryStates: E.IEntryState[]): number =>
  foldMap(monoidSum)(E.entryTotal)(entryStates);

export const totalNumber = (entryStates: E.IEntryState[]): number =>
  foldMap(monoidSum)((x: E.IEntryState) => x.num)(entryStates);
