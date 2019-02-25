import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addEntry, delEntry, ModelAction, updateAmount, updateNumber } from "../actions";
import { Warikan } from "../components/Warikan";
import { DataStore } from "../models/DataStore";

export function mapStateToProps(dataStore: DataStore) {
    return {dataStore};
}

export function mapDispatchToProps(dispatch: Dispatch<ModelAction>) {
    return {
        addEntry: () => dispatch(addEntry()),
        delEntry: (i: number) => dispatch(delEntry(i)),
        updateAmount: (i: number, d: number) => dispatch(updateAmount(i, d)),
        updateNumber: (i: number, d: number) => dispatch(updateNumber(i, d)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Warikan);
