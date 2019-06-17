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

export const modifyAmount = (diff: number) => amount.modify(modify(diff));

export const modifyNumber = (diff: number) => num.modify(modify(diff));

export const entryTotal = (self: IEntryState): number =>
  amount.get(self) * num.get(self);
