import React, { useEffect, useRef, useState } from 'react';
import { Network as Graph } from 'vis-network';
import { Node, Edge } from 'vis';

type Props = {
    nodes: Array<Node>,
    edges: Array<Edge>,
    showNodeControls?: boolean,

    addNode?: () => void,
    removeNodes?: (nodeIds: Array<number>) => void,
    addEdge?: (left: number, right: number) => void,
    removeEdges?: (edgeIds: Array<number>) => void,
};

const Network = (props: Props) => {
    const {
        nodes,
        edges,
        showNodeControls,

        addNode,
        removeNodes,
        addEdge,
        removeEdges,
    } = props;

    const [selectedNodeIds, setSelectedNodeIds] = useState<Array<number>>([]);
    const [selectedEdgeIds, setSelectedEdgeIds] = useState<Array<number>>([]);

    const selectNodes = (nodeIds: Array<number>) => {
        setSelectedNodeIds(nodeIds);
    };

    const selectEdges = (edgeIds: Array<number>) => {
        setSelectedEdgeIds(edgeIds);
    };

    const removeNodesAndSelection = (nodeIds: Array<number>) => {
        const filteredEdges = edges.filter(edge => !nodeIds.some(id => edge.to != id && edge.from != id));
        setSelectedNodeIds(selectedNodeIds.filter(id => !nodeIds.some(removedId => id == removedId)));
        setSelectedEdgeIds(selectedEdgeIds.filter(id => filteredEdges.some(filteredEdge => id == filteredEdge.id)))

        if (removeNodes) {
            removeNodes(nodeIds);
        }
    };

    const removeEdgesAndSelection = (edgeIds: Array<number>) => {
        setSelectedEdgeIds(selectedEdgeIds.filter(id => !edgeIds.some(removedId => id == removedId)));

        if (removeEdges) {
            removeEdges(edgeIds);
        }
    };

    const doesEdgeExist = (left: number, right: number) => edges.some(edge => 
        (edge.to == left && edge.from == right) || 
        (edge.to == right && edge.from == left));

    const canAddEdge = selectedNodeIds.length != 2 || doesEdgeExist(selectedNodeIds[0], selectedNodeIds[1]);

    const visJsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const options = {
            manipulation: {
                enabled: false,
            },
            interaction: {
                multiselect: true,
                dragNodes: false,
            },
        };

        const network = visJsRef.current && new Graph(visJsRef.current, { nodes, edges }, options);
        network?.on('selectNode', eventProps => selectNodes(eventProps.nodes));
        network?.on('selectEdge', eventProps => selectEdges(eventProps.edges));
        network?.on('deselectNode', eventProps => selectNodes(eventProps.nodes));
        network?.on('deselectEdge', eventProps => selectEdges(eventProps.edges));
        network?.setSelection({
            nodes: selectedNodeIds.filter(id => nodes.some(node => id == node.id)),
            edges: selectedEdgeIds.filter(id => edges.some(edge => id == edge.id)),
        });
        var circumference = nodes.length * 50;
        var radius = circumference / (2 * Math.PI); 
        network?.on('initRedraw', function () {
            var ids = nodes.map(node => node.id);
            var d = 2 * Math.PI / ids.length;
            ids.forEach(function(id, i) {
                if (id == undefined) {
                    return;
                }

                var x = radius * Math.cos(d * i)
                var y = radius * Math.sin(d * i)
                network.moveNode(id, x, y)
            })
        })
    }, [visJsRef, nodes, edges]);

    return (
        <div className="Network-container">
            <div ref={visJsRef} />
            <div hidden={!showNodeControls}>
                <button onClick={_ => addNode ? addNode() : null}>Add Node</button>
                <button onClick={_ => removeNodesAndSelection(selectedNodeIds)} disabled={selectedNodeIds.length == 0}>Remove Node(s)</button>
                <button onClick={_ => addEdge ? addEdge(selectedNodeIds[0], selectedNodeIds[1]) : null} disabled={canAddEdge}>Add Edge</button>
                <button onClick={_ => removeEdgesAndSelection(selectedEdgeIds)} disabled={selectedEdgeIds.length == 0}>Remove Edge(s)</button>
            </div>
        </div>
    );
};

export default Network;