import { Button } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";

interface IDelButtonProps {
  index: number;
  onClick: (i: number) => void;
}

export const DelButton: React.FC<IDelButtonProps> = props => {
  const onClick = React.useCallback(() => {
    props.onClick(props.index);
  }, [props]);

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
