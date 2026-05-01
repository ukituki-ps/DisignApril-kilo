/* eslint-disable react-refresh/only-export-components */
import { Handle, Position, NodeProps } from '@xyflow/react';
import {
  Card,
  Text,
  Badge,
  Group,
  Avatar,
  Box } from
'@mantine/core';
import { useDensity } from '../../DensityContext';
// CRM Pipeline Node
export function CrmNode({ data }: NodeProps) {
  const { density } = useDensity();
  const isCompact = density === 'compact';
  const isWon = data.status === 'won';
  const isLost = data.status === 'lost';
  let borderColor = 'var(--mantine-color-default-border)';
  if (isWon) borderColor = 'var(--mantine-color-teal-6)';
  if (isLost) borderColor = 'var(--mantine-color-red-6)';
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{
          opacity: 0
        }} />
      
      <Card
        shadow="sm"
        p={isCompact ? 'sm' : 'md'}
        radius="md"
        withBorder
        style={{
          width: 200,
          borderColor,
          borderWidth: isWon || isLost ? 2 : 1
        }}>
        
        <Group justify="space-between" mb="xs">
          <Text fw={600} size={isCompact ? 'sm' : 'md'}>
            {data.label as string}
          </Text>
          <Badge
            color={isWon ? 'teal' : isLost ? 'red' : 'gray'}
            variant="light">
            
            {data.count as number}
          </Badge>
        </Group>
        <Text
          size={isCompact ? 'xl' : 'xl'}
          fw={700}
          c={isWon ? 'teal' : isLost ? 'red' : undefined}>
          
          {data.amount as string}
        </Text>
      </Card>
      <Handle
        type="source"
        position={Position.Right}
        style={{
          opacity: 0
        }} />
      
    </>);

}
// Org Chart Node
export function OrgNode({ data }: NodeProps) {
  const { density } = useDensity();
  const isCompact = density === 'compact';
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{
          opacity: 0
        }} />
      
      <Card
        shadow="sm"
        p={isCompact ? 'xs' : 'sm'}
        radius="md"
        withBorder
        style={{
          width: 220
        }}>
        
        <Group wrap="nowrap" gap="sm">
          <Avatar
            src={data.avatar as string}
            size={isCompact ? 'md' : 'lg'}
            radius="xl"
            color="teal">
            
            {(data.name as string).charAt(0)}
          </Avatar>
          <Box
            style={{
              flex: 1
            }}>
            
            <Text fw={600} size={isCompact ? 'sm' : 'md'} lineClamp={1}>
              {data.name as string}
            </Text>
            <Text size="xs" c="dimmed" lineClamp={1}>
              {data.role as string}
            </Text>
            <Badge
              size="xs"
              mt={4}
              color={data.deptColor as string || 'gray'}
              variant="light">
              
              {data.department as string}
            </Badge>
          </Box>
        </Group>
      </Card>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          opacity: 0
        }} />
      
    </>);

}
// Task Dependency Node
export function TaskNode({ data }: NodeProps) {
  const { density } = useDensity();
  const isCompact = density === 'compact';
  const statusColors: Record<string, string> = {
    Готово: 'teal',
    'В работе': 'blue',
    Заблокировано: 'red',
    'К выполнению': 'gray',
  };
  const color = statusColors[data.status as string] || 'gray';
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: `var(--mantine-color-${color}-6)`
        }} />
      
      <Card
        shadow="sm"
        p={isCompact ? 'xs' : 'sm'}
        radius="md"
        withBorder
        style={{
          width: 200,
          borderTop: `4px solid var(--mantine-color-${color}-6)`
        }}>
        
        <Text
          fw={500}
          size={isCompact ? 'sm' : 'md'}
          mb="xs"
          lineClamp={2}
          style={{
            minHeight: isCompact ? 40 : 44
          }}>
          
          {data.label as string}
        </Text>
        <Group justify="space-between" align="center">
          <Badge color={color} variant="light" size={isCompact ? 'xs' : 'sm'}>
            {data.status as string}
          </Badge>
          <Avatar src={data.assignee as string} size="sm" radius="xl" />
        </Group>
      </Card>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: `var(--mantine-color-${color}-6)`
        }} />
      
    </>);

}
// Generic Base Node for Custom Nodes showcase
export function BaseNode({ data, isConnectable }: NodeProps) {
  const { density } = useDensity();
  const isCompact = density === 'compact';
  const type = data.nodeType as string;
  const color = data.color as string || 'teal';
  return (
    <>
      {type !== 'input' &&
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable} />

      }

      <Card
        shadow="sm"
        p={isCompact ? 'sm' : 'md'}
        radius="md"
        withBorder
        style={{
          width: 180,
          textAlign: 'center',
          borderColor: `var(--mantine-color-${color}-6)`
        }}>
        
        <Text fw={600} size={isCompact ? 'sm' : 'md'}>
          {data.label as string}
        </Text>
        <Text size="xs" c="dimmed" mt={4}>
          {data.description as string}
        </Text>
      </Card>

      {type !== 'output' &&
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable} />

      }

      {/* Additional handles for decision nodes */}
      {type === 'decision' &&
      <>
          <Handle
          type="source"
          position={Position.Top}
          id="top"
          isConnectable={isConnectable} />
        
          <Handle
          type="source"
          position={Position.Bottom}
          id="bottom"
          isConnectable={isConnectable} />
        
        </>
      }
    </>);

}
export const nodeTypes = {
  crmNode: CrmNode,
  orgNode: OrgNode,
  taskNode: TaskNode,
  baseNode: BaseNode
};