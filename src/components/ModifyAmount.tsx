import { Button } from "@material-ui/core";
import * as React from "react";
import { useDispatch } from "react-redux";
import { UPDATE_AMOUNT } from "../constants";
import { IUpdateAmount } from "../store";

const doUpdateAmount = (i: number, d: number): IUpdateAmount => ({
  type: UPDATE_AMOUNT,
  payload: {
    index: i,
    diff: d
  }
});

interface IProps {
  index: number;
  diff: number;
}

export const ModifyAmount: React.FC<IProps> = props => {
  const { index, diff } = props;
  const dispatch = useDispatch();
  const update = React.useCallback(
    () => dispatch(doUpdateAmount(index, diff)),
    [dispatch, index, diff]
  );
  const icon = (diff > 0 ? "+" : "") + diff;
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
