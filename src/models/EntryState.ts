import { Lens } from "monocle-ts";

export interface IEntryState {
  amount: number;
  num: number;
}

const defaultEntryState: IEntryState = {
  amount: 0,
  num: 0
};

const amount = Lens.fromProp<IEntryState>()("amount");
const num = Lens.fromProp<IEntryState>()("num");

const modify = (diff: number) => (x: number): number => Math.max(x + diff, 0);

export const modifyAmount = (diff: number) => (
  self: IEntryState
): IEntryState => amount.modify(modify(diff))(self);

export const modifyNumber = (diff: number) => (
  self: IEntryState
): IEntryState => num.modify(modify(diff))(self);

export const entryTotal = (self: IEntryState): number =>
  amount.get(self) * num.get(self);
