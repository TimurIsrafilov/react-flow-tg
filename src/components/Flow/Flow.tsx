import { useEffect, useRef } from 'react';
import { ReactFlow, useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from '@dagrejs/dagre';

import styles from './Flow.module.css';
import User from '../User/User';
import { useStore } from '../../utils/store';

function Flow(): React.JSX.Element {
  const nodeTypes = {
    user_card: User,
  };

  const { storeNodes, storeEdges } = useStore();

  // Храним зафиксированные позиции узлов
  const nodePositionsRef = useRef<{ [key: string]: { x: number; y: number } }>(
    {}
  );

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 60;
  const nodeHeight = 60;
  //@ts-ignore
  const getLayoutedElements = (nodes, edges) => {
    dagreGraph.setGraph({});
    //@ts-ignore
    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });
    //@ts-ignore
    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);
    //@ts-ignore
    const newNodes = nodes.map((node) => {
      // Если у узла уже есть фиксированная позиция, не пересчитываем её
      if (nodePositionsRef.current[node.id]) {
        return { ...node, position: nodePositionsRef.current[node.id] };
      }

      const nodeWithPosition = dagreGraph.node(node.id);
      const newNode = {
        ...node,
        position: {
          x: nodeWithPosition.x - nodeWidth,
          y: node.data.grade * 220,
        },
      };

      // Сохраняем позицию для будущего использования
      nodePositionsRef.current[node.id] = newNode.position;

      return newNode;
    });

    return { nodes: newNodes, edges };
  };

  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      storeNodes,
      storeEdges
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [storeNodes, storeEdges]);

  return (
    <div className={styles.flow}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView />
    </div>
  );
}

export default Flow;
