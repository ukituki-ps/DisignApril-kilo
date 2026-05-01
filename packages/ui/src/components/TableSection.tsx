import { Table, Checkbox, Badge, ActionIcon, Group, Avatar, Text } from '@mantine/core';
import { EditIcon, TrashIcon, MoreHorizontalIcon } from 'lucide-react';
import { useDensity } from '../DensityContext';
const elements = [
  {
    id: 1,
    name: 'Алиса Иванова',
    role: 'Менеджер продукта',
    department: 'Продукт',
    status: 'Активен',
    email: 'alice@example.com',
  },
  {
    id: 2,
    name: 'Борис Смирнов',
    role: 'Разработчик интерфейсов',
    department: 'Инженерия',
    status: 'В отпуске',
    email: 'bob@example.com',
  },
  {
    id: 3,
    name: 'Вера Козлова',
    role: 'UX-дизайнер',
    department: 'Дизайн',
    status: 'Активен',
    email: 'charlie@example.com',
  },
  {
    id: 4,
    name: 'Диана Орлова',
    role: 'Аналитик данных',
    department: 'Данные',
    status: 'Неактивен',
    email: 'diana@example.com',
  },
  {
    id: 5,
    name: 'Евгений Волков',
    role: 'Разработчик бэкенда',
    department: 'Инженерия',
    status: 'Активен',
    email: 'evan@example.com',
  },
];

export function TableSection() {
  const { density } = useDensity();
  const isCompact = density === 'compact';
  const rowHeight = isCompact ? 32 : 44;
  const fontSize = isCompact ? '13px' : '14px';
  const padding = isCompact ? '4px 8px' : '10px 16px';
  const rows = elements.map((element) => (
    <Table.Tr key={element.id} style={{ height: rowHeight }}>
      <Table.Td style={{ padding, fontSize }}>
        <Checkbox aria-label="Выбрать строку" size={isCompact ? 'xs' : 'sm'} />
      </Table.Td>
      <Table.Td style={{ padding, fontSize }}>
        <Group gap="sm">
          <Avatar size={isCompact ? 'sm' : 'md'} radius="xl" color="teal">
            {element.name.charAt(0)}
          </Avatar>
          <div>
            <Text size={isCompact ? 'xs' : 'sm'} fw={500}>
              {element.name}
            </Text>
            {!isCompact ? (
              <Text size="xs" c="dimmed">
                {element.email}
              </Text>
            ) : null}
          </div>
        </Group>
      </Table.Td>
      <Table.Td style={{ padding, fontSize }}>
        {element.role}
      </Table.Td>
      <Table.Td style={{ padding, fontSize }}>
        {element.department}
      </Table.Td>
      <Table.Td style={{ padding, fontSize }}>
        <Badge
          color={
            element.status === 'Активен' ? 'teal' : element.status === 'В отпуске' ? 'orange' : 'gray'
          }
          variant="light"
          size={isCompact ? 'sm' : 'md'}
        >
          {element.status}
        </Badge>
      </Table.Td>
      <Table.Td style={{ padding, fontSize }}>
        <Group gap={isCompact ? 4 : 8} justify="flex-end">
          <ActionIcon variant="subtle" color="gray" size={isCompact ? 'sm' : 'md'} aria-label="Изменить">
            <EditIcon size={isCompact ? 14 : 16} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red" size={isCompact ? 'sm' : 'md'} aria-label="Удалить">
            <TrashIcon size={isCompact ? 14 : 16} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="gray" size={isCompact ? 'sm' : 'md'} aria-label="Ещё">
            <MoreHorizontalIcon size={isCompact ? 14 : 16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing={isCompact ? 'xs' : 'sm'} striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: 40, padding }}>
              <Checkbox aria-label="Выбрать все строки" size={isCompact ? 'xs' : 'sm'} />
            </Table.Th>
            <Table.Th style={{ padding }}>Сотрудник</Table.Th>
            <Table.Th style={{ padding }}>Роль</Table.Th>
            <Table.Th style={{ padding }}>Отдел</Table.Th>
            <Table.Th style={{ padding }}>Статус</Table.Th>
            <Table.Th style={{ padding, textAlign: 'right' }}>Действия</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
