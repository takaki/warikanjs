import { Button } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import React from "react";

interface IModifierAmountProps {
    index: number;
    diff: number;
    modifyAmount: (i: number, d: number) => void;
}

export function ModifyAmount(props: IModifierAmountProps) {
    const update = () => {
        props.modifyAmount(props.index, props.diff);
    };

    const icon = props.diff > 0 ?
        (props.diff === 100 ? <ChevronRight/> : <><ChevronRight/><ChevronRight/></>) :
        (props.diff === -100 ? <ChevronLeft/> : <><ChevronLeft/><ChevronLeft/></>);
    return (
        <Button variant="outlined" disableRipple={true} className="or-modify-amount" onClick={update}>
            {icon}
        </Button>);
}
