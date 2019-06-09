import { Lens } from "monocle-ts";

export interface IEntryState {
  amount: number;
  num: number;
}

const defaultEntryState: IEntryState = {
  amount: 0,
  num: 0,
};

const amount = Lens.fromProp<IEntryState>()("amount");
const num = Lens.fromProp<IEntryState>()("num");

function modify(x: number, d: number) {
  return Math.max(x + d, 0);
}

export function modifyAmount(self: IEntryState, diff: number) {
  return amount.modify((a) => modify(a, diff))(self);
}

export function modifyNumber(self: IEntryState, diff: number) {
  return num.modify((a) => modify(a, diff))(self);
}

export function total(self: IEntryState) {
  return self.amount * self.num;
}
