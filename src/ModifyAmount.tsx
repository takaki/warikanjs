import RaisedButton from '@material-ui/core/Button'
import * as React from "react";

interface IModifierAmountProps {
    diff: number;
    modifyAmount: (d: number) => void;
}

export class ModifyAmount extends React.Component<IModifierAmountProps> {
    constructor(props: IModifierAmountProps) {
        super(props);
        this.update = this.update.bind(this);
    }

    public update() {
        this.props.modifyAmount(this.props.diff);
    }

    public render() {
        return (
            <RaisedButton className="or-modify-amount" onClick={this.update}>
                {this.props.diff > 0 ? '+' : ''}{this.props.diff}
            </RaisedButton>);
    }
}