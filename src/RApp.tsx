import { Button, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import ContentAdd from '@material-ui/icons/Add';
import ContentRemove from '@material-ui/icons/Remove';
import * as React from "react";
import DataState from "./dataState";
import { EntryState } from "./model";
import { ModifyAmount } from "./ModifyAmount";
import { ModifyNumber } from "./ModifyNumber";

interface IAppProps {
    data: DataState;
    updateModel: (d: DataState) => void;
}


export class RApp extends React.Component<IAppProps> {
    constructor(props: IAppProps) {
        super(props);
        this.addEntry = this.addEntry.bind(this);
        // this.delEntry = this.delEntry.bind(this);
    }

    public addEntry() {
        this.props.updateModel(this.props.data.addEntry(1000, 1))
    }

    public delEntry(i: number){
        this.props.updateModel(this.props.data.delEntry(i))
    }

    public render() {
        return (
            <div className="App">
                <div className="total-line">
                    合計: {this.props.data.total()} 円 ( {this.props.data.totalNumber()} 人)
                </div>
                <Table>
                    <TableBody>
                        {this.props.data.entry.toKeyedSeq().map((e: EntryState, i: number) => {
                                const updateAmount = (d: number) =>
                                    this.props.updateModel(this.props.data.modifyAmount(i, d));
                                const updateNumber = (d: number) =>
                                    this.props.updateModel(this.props.data.modifyNumber(i, d));
                                return (
                                    <TableRow key={i}>
                                        <TableCell className="or-amount-column">
                                            <div>
                                                <ModifyAmount diff={-500} modifyAmount={updateAmount}/>
                                                <ModifyAmount diff={500} modifyAmount={updateAmount}/>
                                            </div>
                                            <div className="amount-line">
                                                {e.get('amount')}円
                                            </div>
                                            <div>
                                                <ModifyAmount diff={-100} modifyAmount={updateAmount}/>
                                                <ModifyAmount diff={100} modifyAmount={updateAmount}/>
                                            </div>
                                        </TableCell>

                                        <TableCell className="or-number-colomn">
                                            <div>
                                                <ModifyNumber diff={-5} modifyNumber={updateNumber}/>
                                                <ModifyNumber diff={5} modifyNumber={updateNumber}/>
                                            </div>
                                            <div className="number-line">
                                                {e.get('number')}人
                                            </div>
                                            <div>
                                                <ModifyNumber diff={-1} modifyNumber={updateNumber}/>
                                                <ModifyNumber diff={1} modifyNumber={updateNumber}/>
                                            </div>
                                        </TableCell>
                                        <TableCell className="or-subtotal-column">
                                            {this.renderDelButton(i)}
                                            <div className="subtotal-box">
                                                <span className="subtotal-line">{e.total()} 円</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>);
                            }
                        ).toArray()}
                    </TableBody>
                </Table>
                <div>
                    <Button
                        variant="fab"
                        color="secondary"
                        onClick={this.addEntry}
                        mini={true}
                        className="or-plus-button"
                    >
                        <ContentAdd/>
                    </Button>
                </div>
            </div>
        );
    }

    private renderDelButton(i: number) {
        return (<Button variant="fab"
                        color="primary"
                        mini={true}
                        className="or-trash-button"
                        onClick={this.delEntry.bind(this, i)}
            >
                <ContentRemove/>
            </Button>
        )
    }


}