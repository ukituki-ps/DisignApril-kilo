import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge } from
'@xyflow/react';
import { useComputedColorScheme } from '@mantine/core';
import { nodeTypes } from './nodeTypes';
const initialNodes = [
{
  id: '1',
  type: 'crmNode',
  position: {
    x: 50,
    y: 150
  },
  data: {
    label: 'Lead',
    count: 124,
    amount: '$450k',
    status: 'active'
  }
},
{
  id: '2',
  type: 'crmNode',
  position: {
    x: 350,
    y: 150
  },
  data: {
    label: 'Qualified',
    count: 42,
    amount: '$210k',
    status: 'active'
  }
},
{
  id: '3',
  type: 'crmNode',
  position: {
    x: 650,
    y: 150
  },
  data: {
    label: 'Proposal',
    count: 18,
    amount: '$145k',
    status: 'active'
  }
},
{
  id: '4',
  type: 'crmNode',
  position: {
    x: 950,
    y: 150
  },
  data: {
    label: 'Negotiation',
    count: 8,
    amount: '$85k',
    status: 'active'
  }
},
{
  id: '5',
  type: 'crmNode',
  position: {
    x: 1250,
    y: 50
  },
  data: {
    label: 'Closed Won',
    count: 5,
    amount: '$62k',
    status: 'won'
  }
},
{
  id: '6',
  type: 'crmNode',
  position: {
    x: 1250,
    y: 250
  },
  data: {
    label: 'Closed Lost',
    count: 3,
    amount: '$23k',
    status: 'lost'
  }
}];

const initialEdges: Edge[] = [
{
  id: 'e1-2',
  source: '1',
  target: '2',
  type: 'smoothstep',
  animated: true,
  style: {
    stroke: 'var(--mantine-color-gray-4)',
    strokeWidth: 2
  }
},
{
  id: 'e2-3',
  source: '2',
  target: '3',
  type: 'smoothstep',
  animated: true,
  style: {
    stroke: 'var(--mantine-color-gray-4)',
    strokeWidth: 2
  }
},
{
  id: 'e3-4',
  source: '3',
  target: '4',
  type: 'smoothstep',
  animated: true,
  style: {
    stroke: 'var(--mantine-color-gray-4)',
    strokeWidth: 2
  }
},
{
  id: 'e4-5',
  source: '4',
  target: '5',
  type: 'smoothstep',
  animated: true,
  style: {
    stroke: 'var(--mantine-color-teal-6)',
    strokeWidth: 2
  }
},
{
  id: 'e4-6',
  source: '4',
  target: '6',
  type: 'smoothstep',
  animated: true,
  style: {
    stroke: 'var(--mantine-color-red-6)',
    strokeWidth: 2
  }
}];

export function CrmPipeline() {
  const colorScheme = useComputedColorScheme('light');
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Connection | Edge) =>
    setEdges((eds) =>
    addEdge(
      {
        ...params,
        type: 'smoothstep',
        animated: true
      },
      eds
    )
    ),
    [setEdges]
  );
  return (
    <div
      style={{
        width: '100%',
        height: 500
      }}>
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        colorMode={colorScheme}
        fitView
        fitViewOptions={{
          padding: 0.2
        }}
        minZoom={0.5}>
        
        <Controls />
        <MiniMap
          zoomable
          pannable
          nodeColor={(n) => {
            if (n.data.status === 'won') return 'var(--mantine-color-teal-6)';
            if (n.data.status === 'lost') return 'var(--mantine-color-red-6)';
            return 'var(--mantine-color-gray-4)';
          }} />
        
        <Background color="var(--mantine-color-gray-3)" gap={16} />
      </ReactFlow>
    </div>);

}