import {
  Table,
  Checkbox,
  Badge,
  ActionIcon,
  Group,
  Avatar,
  Text } from
'@mantine/core';
import { EditIcon, TrashIcon, MoreHorizontalIcon } from 'lucide-react';
import { useDensity } from '../DensityContext';
const elements = [
{
  id: 1,
  name: 'Alice Johnson',
  role: 'Product Manager',
  department: 'Product',
  status: 'Active',
  email: 'alice@example.com'
},
{
  id: 2,
  name: 'Bob Smith',
  role: 'Frontend Developer',
  department: 'Engineering',
  status: 'On Leave',
  email: 'bob@example.com'
},
{
  id: 3,
  name: 'Charlie Brown',
  role: 'UX Designer',
  department: 'Design',
  status: 'Active',
  email: 'charlie@example.com'
},
{
  id: 4,
  name: 'Diana Prince',
  role: 'Data Analyst',
  department: 'Data',
  status: 'Inactive',
  email: 'diana@example.com'
},
{
  id: 5,
  name: 'Evan Wright',
  role: 'Backend Developer',
  department: 'Engineering',
  status: 'Active',
  email: 'evan@example.com'
}];

export function TableSection() {
  const { density } = useDensity();
  const isCompact = density === 'compact';
  const rowHeight = isCompact ? 32 : 44;
  const fontSize = isCompact ? '13px' : '14px';
  const padding = isCompact ? '4px 8px' : '10px 16px';
  const rows = elements.map((element) =>
  <Table.Tr
    key={element.id}
    style={{
      height: rowHeight
    }}>
    
      <Table.Td
      style={{
        padding,
        fontSize
      }}>
      
        <Checkbox aria-label="Select row" size={isCompact ? 'xs' : 'sm'} />
      </Table.Td>
      <Table.Td
      style={{
        padding,
        fontSize
      }}>
      
        <Group gap="sm">
          <Avatar size={isCompact ? 'sm' : 'md'} radius="xl" color="teal">
            {element.name.charAt(0)}
          </Avatar>
          <div>
            <Text size={isCompact ? 'xs' : 'sm'} fw={500}>
              {element.name}
            </Text>
            {!isCompact &&
          <Text size="xs" c="dimmed">
                {element.email}
              </Text>
          }
          </div>
        </Group>
      </Table.Td>
      <Table.Td
      style={{
        padding,
        fontSize
      }}>
      
        {element.role}
      </Table.Td>
      <Table.Td
      style={{
        padding,
        fontSize
      }}>
      
        {element.department}
      </Table.Td>
      <Table.Td
      style={{
        padding,
        fontSize
      }}>
      
        <Badge
        color={
        element.status === 'Active' ?
        'teal' :
        element.status === 'On Leave' ?
        'orange' :
        'gray'
        }
        variant="light"
        size={isCompact ? 'sm' : 'md'}>
        
          {element.status}
        </Badge>
      </Table.Td>
      <Table.Td
      style={{
        padding,
        fontSize
      }}>
      
        <Group gap={isCompact ? 4 : 8} justify="flex-end">
          <ActionIcon
          variant="subtle"
          color="gray"
          size={isCompact ? 'sm' : 'md'}>
          
            <EditIcon size={isCompact ? 14 : 16} />
          </ActionIcon>
          <ActionIcon
          variant="subtle"
          color="red"
          size={isCompact ? 'sm' : 'md'}>
          
            <TrashIcon size={isCompact ? 14 : 16} />
          </ActionIcon>
          <ActionIcon
          variant="subtle"
          color="gray"
          size={isCompact ? 'sm' : 'md'}>
          
            <MoreHorizontalIcon size={isCompact ? 14 : 16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
  return (
    <Table.ScrollContainer minWidth={800}>
      <Table
        verticalSpacing={isCompact ? 'xs' : 'sm'}
        striped
        highlightOnHover
        withTableBorder>
        
        <Table.Thead>
          <Table.Tr>
            <Table.Th
              style={{
                width: 40,
                padding
              }}>
              
              <Checkbox
                aria-label="Select all rows"
                size={isCompact ? 'xs' : 'sm'} />
              
            </Table.Th>
            <Table.Th
              style={{
                padding
              }}>
              
              Employee
            </Table.Th>
            <Table.Th
              style={{
                padding
              }}>
              
              Role
            </Table.Th>
            <Table.Th
              style={{
                padding
              }}>
              
              Department
            </Table.Th>
            <Table.Th
              style={{
                padding
              }}>
              
              Status
            </Table.Th>
            <Table.Th
              style={{
                padding,
                textAlign: 'right'
              }}>
              
              Actions
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>);

}