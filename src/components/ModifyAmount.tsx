import { Button } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import React from "react";

interface IModifierAmountProps {
    index: number;
    diff: number;
    modifyAmount: (i: number, d: number) => void;
}

export class ModifyAmount extends React.Component<IModifierAmountProps> {
    public update = () => {
        this.props.modifyAmount(this.props.index, this.props.diff);
    }

    public render() {
        const icon = this.props.diff > 0 ?
            (this.props.diff === 100 ? <ChevronRight/> : <><ChevronRight/><ChevronRight/></>) :
            (this.props.diff === -100 ? <ChevronLeft/> : <><ChevronLeft/><ChevronLeft/></>);
        return (
            <Button variant="outlined" disableRipple={true} className="or-modify-amount" onClick={this.update}>
                {icon}
            </Button>);
    }
}
