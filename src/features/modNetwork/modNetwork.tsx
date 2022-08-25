import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Node, Edge } from 'vis';
import Network from '../../components/network';
import { ModState } from './reducer';
import { selectModValueAction, generateResiduesAction } from './actions';
import { getRandomColor } from '../../common/util';

type StateProps = {
    modValue?: number,
    nodes: Array<Node>,
    edges: Array<Edge>,
};

type DispatchProps = {
    generateNetwork: (val: number, n?: number) => void,
    generateResidues: (n: number) => void,
};

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: { modState: ModState }): StateProps => {
    const {
        modValue,
        residuesMapSet,
    } = state.modState;

    // short-circuit
    if (!modValue) {
        return {
            nodes: [],
            edges: [],
        };
    }

    // generate members
    const members = Array.from({length: modValue}, (_, i) => i + 1);

    // generate nodes from members
    const nodes = members.map(member => ({
        id: member,
        label: `${member}`,
        fixed: true,
    }));

    let edges: Array<Edge> = [];
    let nextEdgeId = 1;

    if (residuesMapSet)
    {
        residuesMapSet.forEach((residuesMap, n) => {
            const residueEdges: Array<Edge> = [];
            const color = getRandomColor();
            residuesMap.forEach((to, from) => {
                const edge: Edge = {
                    id: nextEdgeId,
                    from,
                    to,
                    color, 
                };
                residueEdges.push(edge);
                nextEdgeId = nextEdgeId + 1;
            });

            edges = edges.concat(residueEdges);
        })
    }

    return { modValue, nodes, edges };
};

const mapDispatchToProps = dispatch => {
    return {
        generateNetwork: (val: number | undefined) => val ? dispatch(selectModValueAction(val)) : undefined,
        generateResidues: (val: number | undefined, n: number) => val ? dispatch(generateResiduesAction(val, n)) : undefined,
    };
};

const mergeProps = (stateProps, dispatchProps, ownProps): Props => {
    return {
        generateNetwork: dispatchProps.generateNetwork,
        generateResidues: (n: number) => dispatchProps.generateResidues(stateProps.modValue, n),
        ...ownProps,
        ...stateProps,
    };
};

const ModNetwork = (props: Props) => {
    const {
        modValue,
        nodes,
        edges,

        generateNetwork,
        generateResidues,
    } = props;

    const [inputModValue, setInputModValue] = useState<number | undefined>(modValue);
    const [inputResidueValue, setInputResidueValue] = useState<number>(2);

    return (
        <div>
            <Network
                nodes={nodes}
                edges={edges}
            />
            <label>Mod Value:</label>
            <input
                type="number"
                id="value"
                name="value"
                value={inputModValue ?? 0}
                onChange={event => setInputModValue(parseInt(event.currentTarget.value))}
            />
            <button disabled={!inputModValue} onClick={() => inputModValue ? generateNetwork(inputModValue) : null}>Generate</button>
            <br />
            <label>Nth Residue:</label>
            <input
                type="number"
                id="value"
                name="value"
                value={inputResidueValue}
                onChange={event => setInputResidueValue(parseInt(event.currentTarget.value))}
                min={1}
            />
            <button disabled={!modValue || (modValue != inputModValue)} onClick={() => generateResidues(inputResidueValue)}>Generate Residues</button>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ModNetwork);