import { Button } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { DEL_ENTRY } from "../constants";
import { IDelEntry } from "../store";

const doDelEntry = (i: number): IDelEntry => ({
  type: DEL_ENTRY,
  payload: {
    index: i
  }
});

interface IStateProps {
  index: number;
}

export const DelButton: React.FC<IStateProps> = props => {
  const { index } = props;
  const dispatch = useDispatch();
  const onClick = React.useCallback(() => dispatch(doDelEntry(index)), [
    dispatch,
    index
  ]);

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
