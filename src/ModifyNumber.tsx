import RaisedButton from '@material-ui/core/Button'
import * as React from "react";

interface IModifierNumberProps {
    diff: number;
    modifyNumber: (d: number) => void;
}

export class ModifyNumber extends React.Component<IModifierNumberProps> {
    constructor(props: IModifierNumberProps) {
        super(props);
        this.update = this.update.bind(this);
    }

    public update() {
        this.props.modifyNumber(this.props.diff);
    }

    public render() {
        return (
            <RaisedButton className="or-modify-number" onClick={this.update}>
                {this.props.diff > 0 ? '+' : ''}{this.props.diff}
            </RaisedButton>);
    }
}