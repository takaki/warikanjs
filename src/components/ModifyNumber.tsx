import { Button } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import React from "react";

interface IModifierNumberProps {
    index: number;
    diff: number;
    modifyNumber: (i: number, d: number) => void;
}

export function ModifyNumber(props: IModifierNumberProps) {
    const update = () => {
        props.modifyNumber(props.index, props.diff);
    };
    const icon = props.diff > 0 ?
        (props.diff === 1 ? <ChevronRight/> : <><ChevronRight/><ChevronRight/></>) :
        (props.diff === -1 ? <ChevronLeft/> : <><ChevronLeft/><ChevronLeft/></>);
    return (
        <Button variant="outlined" disableRipple={true} className="or-modify-number" onClick={update}>
            {icon}
        </Button>);
}
