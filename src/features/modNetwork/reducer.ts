import { SELECT_MOD, SET_RESIDUES } from "./actions";

type ModState = {
    modValue?: number,
    residuesMapSet?: Map<number, Map<number,number>>,
};

const initialState: ModState = {};

const reducer = (state = initialState, action): ModState => {
    switch (action.type) {
        case SELECT_MOD:
            return {
                modValue: action.payload,
            };
        case SET_RESIDUES:
            const residuesMapSet = state.residuesMapSet ?? new Map<number, Map<number,number>>();
            residuesMapSet.set(action.payload.n, action.payload.residuesMap)
            return {
                ...state,
                residuesMapSet: residuesMapSet,
            };
        default:
            return state;
    }
};

export { reducer, ModState };