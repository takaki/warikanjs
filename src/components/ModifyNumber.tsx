import { Button } from "@material-ui/core";
import * as React from "react";
import { useDispatch } from "react-redux";
import { UPDATE_NUMBER } from "../constants";
import { IUpdateNumber } from "../store";

const doUpdateNumber = (i: number, d: number): IUpdateNumber => ({
  type: UPDATE_NUMBER,
  payload: {
    index: i,
    diff: d
  }
});

interface IStateProps {
  index: number;
  diff: number;
}

export const ModifyNumber: React.FC<IStateProps> = props => {
  const { index, diff } = props;
  const dispatch = useDispatch();
  const update = React.useCallback(
    () => dispatch(doUpdateNumber(index, diff)),
    [dispatch, index, diff]
  );
  const icon = (diff > 0 ? "+" : "") + diff;
  return (
    <Button
      variant="outlined"
      disableRipple={true}
      className="or-modify-number"
      onClick={update}
    >
      {icon}
    </Button>
  );
};
