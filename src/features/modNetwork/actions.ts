import { NumberApi } from "../../api/numberApi";

const SELECT_MOD = 'modNetwork/selectModValue';
const SET_RESIDUES = 'modNetwork/setResidues';

const selectModValueAction = (value: number) => ({
    type: SELECT_MOD,
    payload: value,
});

const setResiduesAction = (residuesMap: Map<number,number>) => ({
    type: SET_RESIDUES,
    payload: residuesMap,
});

const generateResiduesAction = (value: number) => async (dispatch, getState, numberApi: NumberApi) => {
    const residues = numberApi.getResidues(value);
    dispatch(setResiduesAction(residues));
};

export {
    SELECT_MOD, selectModValueAction,
    SET_RESIDUES, setResiduesAction, generateResiduesAction,
};