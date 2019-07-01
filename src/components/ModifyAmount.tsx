import { Button } from "@material-ui/core";
import * as React from "react";

interface IModifierAmountProps {
  index: number;
  diff: number;
  modifyAmount: (i: number, d: number) => void;
}

export const ModifyAmount: React.FC<IModifierAmountProps> = props => {
  const update = React.useCallback(() => {
    props.modifyAmount(props.index, props.diff);
  }, [props]);
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
