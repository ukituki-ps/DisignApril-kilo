import React, { useState, Component } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent } from
'@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable } from
'@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Box,
  Card,
  Text,
  Badge,
  Group,
  Avatar,
  Button,
  Stack,
  ScrollArea,
  ActionIcon } from
'@mantine/core';
import { PlusIcon, MoreHorizontalIcon, CalendarIcon } from 'lucide-react';
import { useDensity } from '../DensityContext';
// --- Types & Mock Data ---
type Priority = 'High' | 'Medium' | 'Low';
type ColumnId = 'todo' | 'in-progress' | 'review' | 'done';
interface Task {
  id: string;
  columnId: ColumnId;
  title: string;
  priority: Priority;
  assignee: string;
  dueDate: string;
}
const INITIAL_TASKS: Task[] = [
{
  id: 't1',
  columnId: 'todo',
  title: 'Design new landing page',
  priority: 'High',
  assignee:
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
  dueDate: 'Oct 24'
},
{
  id: 't2',
  columnId: 'todo',
  title: 'Update dependencies',
  priority: 'Low',
  assignee:
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
  dueDate: 'Oct 28'
},
{
  id: 't3',
  columnId: 'todo',
  title: 'Write API documentation',
  priority: 'Medium',
  assignee:
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
  dueDate: 'Nov 02'
},
{
  id: 't4',
  columnId: 'in-progress',
  title: 'Implement OAuth2 login',
  priority: 'High',
  assignee:
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png',
  dueDate: 'Oct 22'
},
{
  id: 't5',
  columnId: 'in-progress',
  title: 'Fix navigation bug on mobile',
  priority: 'Medium',
  assignee:
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
  dueDate: 'Oct 23'
},
{
  id: 't6',
  columnId: 'review',
  title: 'Database schema migration',
  priority: 'High',
  assignee:
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png',
  dueDate: 'Oct 20'
},
{
  id: 't7',
  columnId: 'review',
  title: 'User profile settings UI',
  priority: 'Medium',
  assignee:
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
  dueDate: 'Oct 21'
},
{
  id: 't8',
  columnId: 'done',
  title: 'Setup project repository',
  priority: 'High',
  assignee:
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png',
  dueDate: 'Oct 15'
},
{
  id: 't9',
  columnId: 'done',
  title: 'Configure CI/CD pipeline',
  priority: 'High',
  assignee:
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png',
  dueDate: 'Oct 16'
},
{
  id: 't10',
  columnId: 'done',
  title: 'Create initial wireframes',
  priority: 'Medium',
  assignee:
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
  dueDate: 'Oct 18'
}];

const COLUMNS: {
  id: ColumnId;
  title: string;
  color: string;
}[] = [
{
  id: 'todo',
  title: 'To Do',
  color: 'gray'
},
{
  id: 'in-progress',
  title: 'In Progress',
  color: 'blue'
},
{
  id: 'review',
  title: 'Review',
  color: 'orange'
},
{
  id: 'done',
  title: 'Done',
  color: 'teal'
}];

// --- Components ---
function TaskCard({
  task,
  isDragging,
  isOverlay




}: {task: Task;isDragging?: boolean;isOverlay?: boolean;}) {
  const { density } = useDensity();
  const isCompact = density === 'compact';
  const priorityColors: Record<Priority, string> = {
    High: 'red',
    Medium: 'orange',
    Low: 'gray'
  };
  return (
    <Card
      shadow={isOverlay ? 'xl' : 'sm'}
      p={isCompact ? 'xs' : 'sm'}
      radius="md"
      withBorder
      style={{
        opacity: isDragging ? 0.4 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
        backgroundColor: 'var(--mantine-color-body)',
        transform: isOverlay ? 'rotate(2deg) scale(1.02)' : 'none',
        transition: isOverlay ? 'none' : 'box-shadow 0.2s ease'
      }}>
      
      <Group justify="space-between" mb="xs" align="flex-start">
        <Badge
          color={priorityColors[task.priority]}
          variant="light"
          size={isCompact ? 'xs' : 'sm'}>
          
          {task.priority}
        </Badge>
        <ActionIcon variant="subtle" color="gray" size="sm">
          <MoreHorizontalIcon size={14} />
        </ActionIcon>
      </Group>

      <Text fw={500} size={isCompact ? 'sm' : 'md'} mb="md" lineClamp={2}>
        {task.title}
      </Text>

      <Group justify="space-between" align="center">
        <Group gap={4} c="dimmed">
          <CalendarIcon size={14} />
          <Text size="xs">{task.dueDate}</Text>
        </Group>
        <Avatar
          src={task.assignee}
          size={isCompact ? 'sm' : 'md'}
          radius="xl" />
        
      </Group>
    </Card>);

}
function SortableTask({ task }: {task: Task;}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task
    }
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} isDragging={isDragging} />
    </div>);

}
function Column({
  column,
  tasks







}: {column: {id: ColumnId;title: string;color: string;};tasks: Task[];}) {
  const { density } = useDensity();
  const isCompact = density === 'compact';
  return (
    <Box
      style={{
        width: isCompact ? 260 : 300,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--mantine-color-gray-0)',
        borderRadius: 'var(--mantine-radius-md)',
        borderTop: `4px solid var(--mantine-color-${column.color}-6)`,
        height: 600
      }}>
      
      <Group justify="space-between" p="md" pb="xs">
        <Group gap="xs">
          <Text fw={600}>{column.title}</Text>
          <Badge color={column.color} variant="filled" size="sm" circle>
            {tasks.length}
          </Badge>
        </Group>
        <ActionIcon variant="subtle" color="gray" size="sm">
          <PlusIcon size={16} />
        </ActionIcon>
      </Group>

      <ScrollArea
        style={{
          flex: 1
        }}
        p="md"
        pt={0}>
        
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}>
          
          <Stack
            gap="sm"
            style={{
              minHeight: 100
            }}>
            
            {tasks.map((task) =>
            <SortableTask key={task.id} task={task} />
            )}
          </Stack>
        </SortableContext>
      </ScrollArea>

      <Box p="md" pt={0}>
        <Button
          variant="subtle"
          color="gray"
          fullWidth
          leftSection={<PlusIcon size={16} />}
          justify="flex-start"
          size={isCompact ? 'xs' : 'sm'}>
          
          Add task
        </Button>
      </Box>
    </Box>);

}
// --- Main Component ---
export function KanbanSection() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) setActiveTask(task);
  };
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id as string;
    const overId = over.id as string;
    if (activeId === overId) return;
    const isActiveTask = active.data.current?.type === 'Task';
    const isOverTask = over.data.current?.type === 'Task';
    if (!isActiveTask) return;
    setTasks((prev) => {
      const activeIndex = prev.findIndex((t) => t.id === activeId);
      if (activeIndex === -1) return prev;
      // Dropping over another task — move to that task's column
      if (isOverTask) {
        const overIndex = prev.findIndex((t) => t.id === overId);
        if (overIndex === -1) return prev;
        const activeTask = prev[activeIndex];
        const overTask = prev[overIndex];
        // Only update if column actually changes
        if (activeTask.columnId === overTask.columnId) return prev;
        const newTasks = prev.map((t, i) =>
        i === activeIndex ?
        {
          ...t,
          columnId: overTask.columnId
        } :
        t
        );
        return arrayMove(newTasks, activeIndex, overIndex);
      }
      // Dropping over a column droppable
      const isOverColumn = COLUMNS.some((c) => c.id === overId);
      if (isOverColumn) {
        const targetColumnId = overId as ColumnId;
        if (prev[activeIndex].columnId === targetColumnId) return prev;
        return prev.map((t, i) =>
        i === activeIndex ?
        {
          ...t,
          columnId: targetColumnId
        } :
        t
        );
      }
      return prev;
    });
  };
  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;
    const isActiveTask = active.data.current?.type === 'Task';
    const isOverTask = over.data.current?.type === 'Task';
    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);
        return arrayMove(tasks, activeIndex, overIndex);
      });
    }
  };
  return (
    <Box>
      <ScrollArea>
        <Group align="flex-start" wrap="nowrap" gap="md" pb="md">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}>
            
            {COLUMNS.map((col) =>
            <Column
              key={col.id}
              column={col}
              tasks={tasks.filter((t) => t.columnId === col.id)} />

            )}

            <DragOverlay>
              {activeTask ? <TaskCard task={activeTask} isOverlay /> : null}
            </DragOverlay>
          </DndContext>
        </Group>
      </ScrollArea>
    </Box>);

}