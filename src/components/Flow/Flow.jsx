import { ReactFlow, useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from '@dagrejs/dagre';

import styles from './Flow.module.css';

import User from '../User/User';

import { useStore } from '../../utils/store';
import { useEffect } from 'react';

const Flow = () => {
  const nodeTypes = {
    user_card: User,
  };

  const { storeNodes, storeEdges } = useStore();

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 60;
  const nodeHeight = 60;

  const getLayoutedElements = (nodes, edges) => {
    if (!nodes || !edges) {
      return { nodes: [], edges: [] };
    }

    dagreGraph.setGraph({});

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const newNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      const newNode = {
        ...node,
        position: {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: node.data.grade * 220,
        },
      };

      return newNode;
    });

    return { nodes: newNodes, edges };
  };

  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      storeNodes,
      storeEdges
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [storeNodes, storeEdges]);

  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  return (
    <div className={styles.flow}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        style={{ backgroundColor: '#F7F9FB' }}
      ></ReactFlow>
    </div>
  );
};

export default Flow;
