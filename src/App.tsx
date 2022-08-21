import React, { useState } from 'react';
import { Node } from 'vis'
import { Network } from './components';
import './App.css';

const App = () => {
  const [nodes, setNodes] = useState<Array<any>>([]);
  const [edges, setEdges] = useState<Array<any>>([]);
  const [nodeIndex, setNodeIndex] = useState<number>(0);
  const [edgeIndex, setEdgeIndex] = useState<number>(0);

  const addNode = () => {
    const nextNodeId = nodeIndex + 1;
    const node: Node = {
        id: nextNodeId,
        label: `Node ${nextNodeId}`,
    };

    setNodes([node, ...nodes]);
    setNodeIndex(nextNodeId);
  };

  const removeNodes = (nodeIds: Array<number>) => {
    const filteredEdges = edges.filter(edge => !nodeIds.some(id => edge.to != id && edge.from != id));
    setNodes(nodes.filter(node => !nodeIds.some(id => id == node.id)));
    setEdges(filteredEdges);
  };

  const addEdge = (from: number, to: number) => {
    const nextEdgeId = edgeIndex + 1;
    const edge = {
        id: nextEdgeId,
        from,
        to,
    };

    setEdges([edge, ...edges]);
    setEdgeIndex(nextEdgeId);
  };

  const removeEdges = (edgeIds: Array<number>) => {
    const filteredEdges = edges.filter(edge => !edgeIds.some(id => id == edge.id));
    setEdges(filteredEdges);
  };

  return (
    <div className="App">
      <div className="App-header">
        <h2>Welcome to React</h2>
      </div>
      <Network
        nodes={nodes}
        edges={edges}

        addNode={addNode}
        removeNodes={removeNodes}
        addEdge={addEdge}
        removeEdges={removeEdges}
      />
    </div>
  );
}

export default App;
