import { pow, mod } from 'mathjs';

type NumberApi = {
    getResidues: (modValue: number, n: number) => Map<number,number>;
};

const numberApi: NumberApi = {
    getResidues: (modValue: number, n: number): Map<number,number> => {
        const residuesMap: Map<number, number> = new Map();
        for (let val = 1; val < modValue; val++) {
            const sqVal = <number>pow(val, n);
            const residue = mod(sqVal, modValue);
            residuesMap.set(val, residue);
        }

        return residuesMap;
    },
};

export { numberApi, NumberApi };