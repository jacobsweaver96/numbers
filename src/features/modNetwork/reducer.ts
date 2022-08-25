import { SELECT_MOD, SET_RESIDUES } from "./actions";

type ModState = {
    modValue?: number,
    residuesMap?: Map<number,number>,
};

const initialState: ModState = {};

const reducer = (state = initialState, action): ModState => {
    switch (action.type) {
        case SELECT_MOD:
            return {
                modValue: action.payload,
            };
        case SET_RESIDUES:
            return {
                ...state,
                residuesMap: action.payload,
            };
        default:
            return state;
    }
};

export { reducer, ModState };