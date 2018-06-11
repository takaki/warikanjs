import { Button } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
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
            <Button variant="outlined" disableRipple={true} className="or-modify-amount" onClick={this.update}>
                {this.props.diff > 0 ? (this.props.diff === 100 ? <ChevronRight/> : <><ChevronRight/><ChevronRight/></>) :
                    (this.props.diff === -100 ? <ChevronLeft/> : <><ChevronLeft/><ChevronLeft/></>)}
            </Button>);
    }
}