import { Button } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { flow } from "fp-ts/lib/function";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { DEL_ENTRY } from "../constants";
import { IDelEntry, RootAction } from "../store";

const doDelEntry = (i: number): IDelEntry => ({
  type: DEL_ENTRY,
  payload: {
    index: i
  }
});

interface IStateProps {
  index: number;
}
interface IDispatchProps {
  delEntry: typeof doDelEntry;
}

type Props = IStateProps & IDispatchProps;

const DelButton: React.FC<Props> = props => {
  const { delEntry, index } = props;
  const onClick = React.useCallback(() => {
    delEntry(index);
  }, [delEntry, index]);

  return (
    <Button
      color="primary"
      // mini={true}
      className="or-trash-button"
      onClick={onClick}
      href=""
    >
      <Delete />
    </Button>
  );
};
export const DelButtonComponent = connect(
  null,
  (dispatch: Dispatch<RootAction>): IDispatchProps => ({
    delEntry: flow(
      doDelEntry,
      dispatch
    )
  })
)(DelButton);
