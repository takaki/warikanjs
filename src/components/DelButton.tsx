import { Button } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import * as React from 'react';

interface IDelButtonProps {
  index: number;
  onClick: (i: number) => void;
}

export class DelButton extends React.Component<IDelButtonProps> {

  constructor(props: IDelButtonProps) {
    super(props);
  }

  public render() {
    return (
      <Button
        color="primary"
        // mini={true}
        className="or-trash-button"
        onClick={this.onClick}
        href="">
        <Delete/>
      </Button>
    );
  }

  private onClick = () => {
    this.props.onClick(this.props.index);
  }
}
