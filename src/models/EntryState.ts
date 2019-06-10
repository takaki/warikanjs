import { curry } from 'fp-ts/lib/function';
import { Lens } from 'monocle-ts';

export interface IEntryState {
  amount: number;
  num: number;
}

const defaultEntryState: IEntryState = {
  amount: 0,
  num: 0,
};

const amount = Lens.fromProp<IEntryState>()('amount');
const num = Lens.fromProp<IEntryState>()('num');

function modify(d: number, x: number): number {
  return Math.max(x + d, 0);
}

export const modifyAmount = (diff: number) => (self: IEntryState): IEntryState => {
  return amount.modify(curry(modify)(diff))(self);
};

export const modifyNumber = (diff: number) => (self: IEntryState): IEntryState => {
  return num.modify(curry(modify)(diff))(self);
};

export const entryTotal = (self: IEntryState): number => {
  return self.amount * self.num;
};
