import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ModelAction, updateModel } from "../actions";
import { Warikan } from "../components/Warikan";
import DataStore from "../DataStore";

function mapStateToProps(state: DataStore) {
    return {dataStore: state};
}

function mapDispatchToProps(dispatch: Dispatch<ModelAction>) {
    return {
        updateStore: (dataStore: DataStore) => dispatch(updateModel(dataStore)),
    };
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Warikan);
