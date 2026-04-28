import { useState } from 'react';
import {
  Box,
  NavLink,
  Stack,
  Text,
  Badge,
  Divider,
  Group,
  ScrollArea,
  ActionIcon,
  Tooltip } from
'@mantine/core';
import {
  LayoutDashboardIcon,
  CheckSquareIcon,
  UsersIcon,
  UserCogIcon,
  FileTextIcon,
  BarChart3Icon,
  CalendarIcon,
  InboxIcon,
  SettingsIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FolderIcon,
  BuildingIcon,
  ClipboardListIcon,
  BriefcaseIcon } from
'lucide-react';
import { useDensity } from '../DensityContext';
export function SidebarSection() {
  const { density } = useDensity();
  const isCompact = density === 'compact';
  const [active, setActive] = useState('tasks');
  const [collapsed, setCollapsed] = useState(false);
  const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboardIcon
  },
  {
    id: 'tasks',
    label: 'Tasks',
    icon: CheckSquareIcon,
    badge: '12'
  },
  {
    id: 'inbox',
    label: 'Inbox',
    icon: InboxIcon,
    badge: '3'
  },
  {
    id: 'calendar',
    label: 'Calendar',
    icon: CalendarIcon
  },
  {
    id: 'divider1',
    type: 'divider' as const,
    label: 'CRM'
  },
  {
    id: 'contacts',
    label: 'Contacts',
    icon: UsersIcon
  },
  {
    id: 'deals',
    label: 'Deals',
    icon: BriefcaseIcon
  },
  {
    id: 'companies',
    label: 'Companies',
    icon: BuildingIcon
  },
  {
    id: 'divider2',
    type: 'divider' as const,
    label: 'HRM'
  },
  {
    id: 'employees',
    label: 'Employees',
    icon: UserCogIcon
  },
  {
    id: 'recruitment',
    label: 'Recruitment',
    icon: ClipboardListIcon
  },
  {
    id: 'divider3',
    type: 'divider' as const,
    label: 'Other'
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: FileTextIcon
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: FolderIcon
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: BarChart3Icon
  }];

  const sidebarWidth = collapsed ? 60 : isCompact ? 220 : 250;
  return (
    <Stack gap="xl">
      <Box>
        <Text fw={500} size="sm" mb="md">
          Product Sidebar
        </Text>
        <Group align="flex-start" gap="lg" wrap="nowrap">
          {/* Expanded sidebar */}
          <Box
            style={{
              width: sidebarWidth,
              minHeight: 520,
              border: '1px solid var(--mantine-color-default-border)',
              borderRadius: 'var(--mantine-radius-md)',
              backgroundColor: 'var(--mantine-color-body)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              transition: 'width 200ms ease'
            }}>
            
            {/* Collapse toggle */}
            <Group
              justify="flex-end"
              p="xs"
              style={{
                borderBottom: '1px solid var(--mantine-color-default-border)'
              }}>
              
              <Tooltip label={collapsed ? 'Expand' : 'Collapse'}>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  size="sm"
                  onClick={() => setCollapsed(!collapsed)}>
                  
                  {collapsed ?
                  <ChevronRightIcon size={16} /> :

                  <ChevronLeftIcon size={16} />
                  }
                </ActionIcon>
              </Tooltip>
            </Group>

            <ScrollArea
              style={{
                flex: 1
              }}
              p="xs">
              
              <Stack gap={2}>
                {navItems.map((item) => {
                  if (item.type === 'divider') {
                    if (collapsed) return <Divider key={item.id} my={4} />;
                    return (
                      <Text
                        key={item.id}
                        size="xs"
                        fw={600}
                        c="dimmed"
                        tt="uppercase"
                        mt="md"
                        mb={4}
                        px="sm">
                        
                        {item.label}
                      </Text>);

                  }
                  if (!('icon' in item) || !item.icon) {
                    return null;
                  }
                  const Icon = item.icon;
                  if (collapsed) {
                    return (
                      <Tooltip
                        key={item.id}
                        label={item.label}
                        position="right">
                        
                        <ActionIcon
                          variant={active === item.id ? 'light' : 'subtle'}
                          color={active === item.id ? 'teal' : 'gray'}
                          size={isCompact ? 'md' : 'lg'}
                          onClick={() => setActive(item.id)}
                          style={{
                            width: '100%'
                          }}>
                          
                          <Icon size={isCompact ? 16 : 18} />
                        </ActionIcon>
                      </Tooltip>);

                  }
                  return (
                    <NavLink
                      key={item.id}
                      label={item.label}
                      leftSection={<Icon size={isCompact ? 16 : 18} />}
                      rightSection={
                      item.badge ?
                      <Badge size="xs" variant="filled" color="teal" circle>
                            {item.badge}
                          </Badge> :
                      undefined
                      }
                      active={active === item.id}
                      onClick={() => setActive(item.id)}
                      color="teal"
                      variant="light"
                      style={{
                        borderRadius: 'var(--mantine-radius-sm)',
                        padding: isCompact ? '4px 8px' : '8px 12px',
                        fontSize: isCompact ? 13 : 14
                      }} />);


                })}
              </Stack>
            </ScrollArea>

            {/* Bottom: Settings */}
            <Box
              p="xs"
              style={{
                borderTop: '1px solid var(--mantine-color-default-border)'
              }}>
              
              {collapsed ?
              <Tooltip label="Settings" position="right">
                  <ActionIcon
                  variant="subtle"
                  color="gray"
                  size={isCompact ? 'md' : 'lg'}
                  style={{
                    width: '100%'
                  }}>
                  
                    <SettingsIcon size={isCompact ? 16 : 18} />
                  </ActionIcon>
                </Tooltip> :

              <NavLink
                label="Settings"
                leftSection={<SettingsIcon size={isCompact ? 16 : 18} />}
                style={{
                  borderRadius: 'var(--mantine-radius-sm)',
                  padding: isCompact ? '4px 8px' : '8px 12px',
                  fontSize: isCompact ? 13 : 14
                }} />

              }
            </Box>
          </Box>

          {/* Simulated content */}
          <Box
            style={{
              flex: 1,
              minHeight: 520,
              border: '1px solid var(--mantine-color-default-border)',
              borderRadius: 'var(--mantine-radius-md)',
              backgroundColor: 'var(--mantine-color-gray-0)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            
            <Stack align="center" gap="xs">
              <Text size="lg" fw={500}>
                {navItems.find((i) => i.id === active)?.label || 'Dashboard'}
              </Text>
              <Text size="sm" c="dimmed">
                Content area
              </Text>
            </Stack>
          </Box>
        </Group>
      </Box>

      {/* Anatomy */}
      <Box>
        <Text fw={500} size="sm" mb="xs">
          Sidebar Anatomy
        </Text>
        <Text size="sm" c="dimmed">
          <strong>Sections:</strong> Dashboard & productivity (Tasks, Inbox,
          Calendar), CRM (Contacts, Deals, Companies), HRM (Employees,
          Recruitment), Other (Documents, Projects, Reports).
        </Text>
        <Text size="sm" c="dimmed" mt="xs">
          <strong>Features:</strong> Collapsible to icon-only mode (60px).
          Active state uses teal accent. Badge counters for actionable items.
          Settings pinned to bottom. Responds to density mode.
        </Text>
        <Text size="sm" c="dimmed" mt="xs">
          Width: {isCompact ? '220px (compact)' : '250px (comfortable)'}{' '}
          expanded, 60px collapsed.
        </Text>
      </Box>
    </Stack>);

}