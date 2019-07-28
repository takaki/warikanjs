import { Button } from "@material-ui/core";
import { flow } from "fp-ts/lib/function";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { UPDATE_AMOUNT } from "../constants";
import { IUpdateAmount, RootAction } from "../store";

const doUpdateAmount = (i: number, d: number): IUpdateAmount => ({
  type: UPDATE_AMOUNT,
  payload: {
    index: i,
    diff: d
  }
});

interface IModifierAmountProps {
  index: number;
  diff: number;
}
interface IDispatchProps {
  updateAmount: typeof doUpdateAmount;
}

type Props = IModifierAmountProps & IDispatchProps;

const ModifyAmount: React.FC<Props> = props => {
  const { updateAmount, index, diff } = props;
  const update = React.useCallback(() => {
    updateAmount(index, diff);
  }, [updateAmount, index, diff]);
  const icon = (props.diff > 0 ? "+" : "") + props.diff;
  return (
    <Button
      variant="outlined"
      disableRipple={true}
      className="or-modify-amount"
      onClick={update}
      href=""
    >
      {icon}
    </Button>
  );
};

export const ModifyAmountComponent = connect(
  null,
  (dispatch: Dispatch<RootAction>): IDispatchProps => ({
    updateAmount: flow(
      doUpdateAmount,
      dispatch
    )
  })
)(ModifyAmount);
