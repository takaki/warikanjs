import { Button } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import React from "react";

interface IModifierNumberProps {
    index: number;
    diff: number;
    modifyNumber: (i: number, d: number) => void;
}

export class ModifyNumber extends React.Component<IModifierNumberProps> {
    public update = () => {
        this.props.modifyNumber(this.props.index, this.props.diff);
    }

    public render() {
        const icon = this.props.diff > 0 ?
            (this.props.diff === 1 ? <ChevronRight/> : <><ChevronRight/><ChevronRight/></>) :
            (this.props.diff === -1 ? <ChevronLeft/> : <><ChevronLeft/><ChevronLeft/></>);
        return (
            <Button variant="outlined" disableRipple={true} className="or-modify-number" onClick={this.update}>
                {icon}
            </Button>);
    }
}
