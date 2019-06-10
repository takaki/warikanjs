import { Button } from '@material-ui/core';
import { Add, ChevronLeft, ChevronRight, Remove } from '@material-ui/icons';
import * as React from 'react';

interface IModifierNumberProps {
  index: number;
  diff: number;
  modifyNumber: (i: number, d: number) => void;
}

export function ModifyNumber(props: IModifierNumberProps) {
  const update = () => {
    props.modifyNumber(props.index, props.diff);
  };
  const icon = (props.diff > 0 ? '+' : '') + props.diff;
  return (
    <Button variant="outlined" disableRipple={true} className="or-modify-number" onClick={update}>
      {icon}
    </Button>
  );
}
