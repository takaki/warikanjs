import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addEntry, delEntry, ModelAction, updateModel } from "../actions";
import { Warikan } from "../components/Warikan";
import { DataStore } from "../models/DataStore";

export function mapStateToProps(dataStore: DataStore) {
    return {dataStore};
}

export function mapDispatchToProps(dispatch: Dispatch<ModelAction>) {
    return {
        updateStore: (dataStore: DataStore) => dispatch(updateModel(dataStore)),
        addEntry: () => dispatch(addEntry()),
        delEntry: (i: number) => dispatch(delEntry(i)),
    };
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Warikan);
