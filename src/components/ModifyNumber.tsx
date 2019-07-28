import { Button } from "@material-ui/core";
import { flow } from "fp-ts/lib/function";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { UPDATE_NUMBER } from "../constants";
import { IUpdateNumber, RootAction } from "../store";

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
interface IDispatchProps {
  updateNumber: typeof doUpdateNumber;
}

type Props = IStateProps & IDispatchProps;

const ModifyNumber: React.FC<Props> = props => {
  const { updateNumber, index, diff } = props;
  const update = React.useCallback(() => {
    updateNumber(index, diff);
  }, [updateNumber, index, diff]);
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

export const ModifyNumberComponent = connect(
  null,
  (dispatch: Dispatch<RootAction>): IDispatchProps => ({
    updateNumber: flow(
      doUpdateNumber,
      dispatch
    )
  })
)(ModifyNumber);
