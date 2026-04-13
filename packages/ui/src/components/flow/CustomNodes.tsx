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
  Edge,
  MarkerType } from
'@xyflow/react';
import { useComputedColorScheme } from '@mantine/core';
import { nodeTypes } from './nodeTypes';
const initialNodes = [
{
  id: '1',
  type: 'baseNode',
  position: {
    x: 50,
    y: 150
  },
  data: {
    label: 'Input Node',
    description: 'Handles on right only',
    nodeType: 'input',
    color: 'blue'
  }
},
{
  id: '2',
  type: 'baseNode',
  position: {
    x: 350,
    y: 50
  },
  data: {
    label: 'Default Node',
    description: 'Handles on both sides',
    nodeType: 'default',
    color: 'teal'
  }
},
{
  id: '3',
  type: 'baseNode',
  position: {
    x: 350,
    y: 250
  },
  data: {
    label: 'Decision Node',
    description: 'Multiple outputs',
    nodeType: 'decision',
    color: 'orange'
  }
},
{
  id: '4',
  type: 'baseNode',
  position: {
    x: 650,
    y: 150
  },
  data: {
    label: 'Output Node',
    description: 'Handles on left only',
    nodeType: 'output',
    color: 'grape'
  }
}];

const initialEdges: Edge[] = [
{
  id: 'e1-2',
  source: '1',
  target: '2',
  markerEnd: {
    type: MarkerType.ArrowClosed
  },
  style: {
    stroke: 'var(--mantine-color-gray-4)',
    strokeWidth: 2
  }
},
{
  id: 'e1-3',
  source: '1',
  target: '3',
  markerEnd: {
    type: MarkerType.ArrowClosed
  },
  style: {
    stroke: 'var(--mantine-color-gray-4)',
    strokeWidth: 2
  }
},
{
  id: 'e2-4',
  source: '2',
  target: '4',
  markerEnd: {
    type: MarkerType.ArrowClosed
  },
  style: {
    stroke: 'var(--mantine-color-gray-4)',
    strokeWidth: 2
  }
},
{
  id: 'e3-4',
  source: '3',
  target: '4',
  sourceHandle: 'top',
  label: 'Yes',
  markerEnd: {
    type: MarkerType.ArrowClosed
  },
  style: {
    stroke: 'var(--mantine-color-gray-4)',
    strokeWidth: 2
  }
}];

export function CustomNodes() {
  const colorScheme = useComputedColorScheme('light');
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Connection | Edge) =>
    setEdges((eds) =>
    addEdge(
      {
        ...params,
        markerEnd: {
          type: MarkerType.ArrowClosed
        },
        style: {
          stroke: 'var(--mantine-color-gray-4)',
          strokeWidth: 2
        }
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
        <MiniMap zoomable pannable />
        <Background color="var(--mantine-color-gray-3)" gap={16} />
      </ReactFlow>
    </div>);

}