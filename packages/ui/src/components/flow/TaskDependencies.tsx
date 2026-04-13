import React, { useCallback, Component } from 'react';
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
  type: 'taskNode',
  position: {
    x: 250,
    y: 50
  },
  data: {
    label: 'Define Requirements',
    status: 'Done',
    assignee:
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png'
  }
},
{
  id: '2',
  type: 'taskNode',
  position: {
    x: 100,
    y: 200
  },
  data: {
    label: 'Design Database Schema',
    status: 'Done',
    assignee:
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png'
  }
},
{
  id: '3',
  type: 'taskNode',
  position: {
    x: 400,
    y: 200
  },
  data: {
    label: 'Create UI Mockups',
    status: 'In Progress',
    assignee:
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png'
  }
},
{
  id: '4',
  type: 'taskNode',
  position: {
    x: 100,
    y: 350
  },
  data: {
    label: 'Implement API Endpoints',
    status: 'In Progress',
    assignee:
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png'
  }
},
{
  id: '5',
  type: 'taskNode',
  position: {
    x: 400,
    y: 350
  },
  data: {
    label: 'Develop Frontend Components',
    status: 'Blocked',
    assignee:
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png'
  }
},
{
  id: '6',
  type: 'taskNode',
  position: {
    x: 250,
    y: 500
  },
  data: {
    label: 'Integration Testing',
    status: 'To Do',
    assignee:
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png'
  }
}];

const initialEdges: Edge[] = [
{
  id: 'e1-2',
  source: '1',
  target: '2',
  label: 'depends on',
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
  label: 'depends on',
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
  label: 'depends on',
  markerEnd: {
    type: MarkerType.ArrowClosed
  },
  style: {
    stroke: 'var(--mantine-color-gray-4)',
    strokeWidth: 2
  }
},
{
  id: 'e3-5',
  source: '3',
  target: '5',
  label: 'blocks',
  animated: true,
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: 'var(--mantine-color-red-6)'
  },
  style: {
    stroke: 'var(--mantine-color-red-6)',
    strokeWidth: 2
  },
  labelStyle: {
    fill: 'var(--mantine-color-red-6)',
    fontWeight: 600
  }
},
{
  id: 'e4-6',
  source: '4',
  target: '6',
  label: 'depends on',
  markerEnd: {
    type: MarkerType.ArrowClosed
  },
  style: {
    stroke: 'var(--mantine-color-gray-4)',
    strokeWidth: 2
  }
},
{
  id: 'e5-6',
  source: '5',
  target: '6',
  label: 'depends on',
  markerEnd: {
    type: MarkerType.ArrowClosed
  },
  style: {
    stroke: 'var(--mantine-color-gray-4)',
    strokeWidth: 2
  }
}];

export function TaskDependencies() {
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
        colorMode={colorScheme}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
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