import { useCallback } from 'react';
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
// CEO
{
  id: '1',
  type: 'orgNode',
  position: {
    x: 400,
    y: 50
  },
  data: {
    name: 'Sarah Jenkins',
    role: 'Chief Executive Officer',
    department: 'Executive',
    deptColor: 'grape',
    avatar:
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png'
  }
},
// Department Heads
{
  id: '2',
  type: 'orgNode',
  position: {
    x: 100,
    y: 200
  },
  data: {
    name: 'Michael Chen',
    role: 'VP of Engineering',
    department: 'Engineering',
    deptColor: 'blue',
    avatar:
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png'
  }
},
{
  id: '3',
  type: 'orgNode',
  position: {
    x: 400,
    y: 200
  },
  data: {
    name: 'Elena Rodriguez',
    role: 'VP of Product',
    department: 'Product',
    deptColor: 'teal',
    avatar:
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png'
  }
},
{
  id: '4',
  type: 'orgNode',
  position: {
    x: 700,
    y: 200
  },
  data: {
    name: 'David Kim',
    role: 'VP of Marketing',
    department: 'Marketing',
    deptColor: 'orange',
    avatar:
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png'
  }
},
// Engineering Team
{
  id: '2a',
  type: 'orgNode',
  position: {
    x: -50,
    y: 350
  },
  data: {
    name: 'Alex Johnson',
    role: 'Frontend Lead',
    department: 'Engineering',
    deptColor: 'blue',
    avatar:
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png'
  }
},
{
  id: '2b',
  type: 'orgNode',
  position: {
    x: 200,
    y: 350
  },
  data: {
    name: 'Sam Taylor',
    role: 'Backend Lead',
    department: 'Engineering',
    deptColor: 'blue',
    avatar:
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png'
  }
},
// Product Team
{
  id: '3a',
  type: 'orgNode',
  position: {
    x: 400,
    y: 350
  },
  data: {
    name: 'Jordan Lee',
    role: 'UX Designer',
    department: 'Product',
    deptColor: 'teal',
    avatar:
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png'
  }
},
// Marketing Team
{
  id: '4a',
  type: 'orgNode',
  position: {
    x: 600,
    y: 350
  },
  data: {
    name: 'Casey Smith',
    role: 'Content Strategist',
    department: 'Marketing',
    deptColor: 'orange',
    avatar:
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png'
  }
},
{
  id: '4b',
  type: 'orgNode',
  position: {
    x: 850,
    y: 350
  },
  data: {
    name: 'Riley Brown',
    role: 'Growth Hacker',
    department: 'Marketing',
    deptColor: 'orange',
    avatar:
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png'
  }
}];

const initialEdges: Edge[] = [
// CEO to VPs
{
  id: 'e1-2',
  source: '1',
  target: '2',
  type: 'smoothstep',
  style: {
    stroke: 'var(--mantine-color-gray-4)',
    strokeWidth: 2
  }
},
{
  id: 'e1-3',
  source: '1',
  target: '3',
  type: 'smoothstep',
  style: {
    stroke: 'var(--mantine-color-gray-4)',
    strokeWidth: 2
  }
},
{
  id: 'e1-4',
  source: '1',
  target: '4',
  type: 'smoothstep',
  style: {
    stroke: 'var(--mantine-color-gray-4)',
    strokeWidth: 2
  }
},
// VPs to Teams
{
  id: 'e2-2a',
  source: '2',
  target: '2a',
  type: 'smoothstep',
  style: {
    stroke: 'var(--mantine-color-gray-4)',
    strokeWidth: 2
  }
},
{
  id: 'e2-2b',
  source: '2',
  target: '2b',
  type: 'smoothstep',
  style: {
    stroke: 'var(--mantine-color-gray-4)',
    strokeWidth: 2
  }
},
{
  id: 'e3-3a',
  source: '3',
  target: '3a',
  type: 'smoothstep',
  style: {
    stroke: 'var(--mantine-color-gray-4)',
    strokeWidth: 2
  }
},
{
  id: 'e4-4a',
  source: '4',
  target: '4a',
  type: 'smoothstep',
  style: {
    stroke: 'var(--mantine-color-gray-4)',
    strokeWidth: 2
  }
},
{
  id: 'e4-4b',
  source: '4',
  target: '4b',
  type: 'smoothstep',
  style: {
    stroke: 'var(--mantine-color-gray-4)',
    strokeWidth: 2
  }
}];

export function OrgChart() {
  const colorScheme = useComputedColorScheme('light');
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Connection | Edge) =>
    setEdges((eds) =>
    addEdge(
      {
        ...params,
        type: 'smoothstep'
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