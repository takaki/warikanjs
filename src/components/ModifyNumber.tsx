import { Button } from "@material-ui/core";
import * as React from "react";

interface IModifierNumberProps {
  index: number;
  diff: number;
  modifyNumber: (i: number, d: number) => void;
}

export const ModifyNumber: React.FC<IModifierNumberProps> = props => {
  const update = React.useCallback(() => {
    props.modifyNumber(props.index, props.diff);
  }, [props]);
  const icon = (props.diff > 0 ? "+" : "") + props.diff;
  return (
    <Button
      variant="outlined"
      disableRipple={true}
      className="or-modify-number"
      onClick={update}
      href=""
    >
      {icon}
    </Button>
  );
};
