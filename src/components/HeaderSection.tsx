import React, { useState } from 'react';
import {
  Box,
  Group,
  TextInput,
  ActionIcon,
  Avatar,
  Badge,
  Menu,
  Text,
  Indicator,
  Tooltip,
  Stack } from
'@mantine/core';
import {
  SearchIcon,
  BellIcon,
  SettingsIcon,
  LogOutIcon,
  UserIcon,
  HelpCircleIcon,
  MessageSquareIcon,
  ChevronDownIcon } from
'lucide-react';
import { useDensity } from '../DensityContext';
const LOGO_ICON = "/g12875-8.svg";

const TEAL_FILTER =
'brightness(0) saturate(100%) invert(65%) sepia(51%) saturate(552%) hue-rotate(118deg) brightness(92%) contrast(87%)';
export function HeaderSection() {
  const { density } = useDensity();
  const isCompact = density === 'compact';
  const h = isCompact ? 48 : 56;
  return (
    <Stack gap="xl">
      {/* Full header preview */}
      <Box>
        <Text fw={500} size="sm" mb="md">
          Product Header
        </Text>
        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            overflow: 'hidden'
          }}>
          
          <Box
            px={isCompact ? 'sm' : 'md'}
            style={{
              height: h,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--mantine-color-default-border)',
              backgroundColor: 'var(--mantine-color-body)'
            }}>
            
            {/* Left: Logo + App name */}
            <Group gap={isCompact ? 'xs' : 'sm'}>
              <img
                src={LOGO_ICON}
                alt="April"
                style={{
                  height: isCompact ? 22 : 26,
                  width: isCompact ? 22 : 26,
                  objectFit: 'contain',
                  filter: TEAL_FILTER
                }} />
              
              <Text fw={700} size={isCompact ? 'sm' : 'md'}>
                April
              </Text>
            </Group>

            {/* Center: Search */}
            <Box
              style={{
                flex: 1,
                maxWidth: 480,
                margin: '0 16px'
              }}>
              
              <TextInput
                placeholder="Search tasks, contacts, documents..."
                leftSection={<SearchIcon size={16} />}
                size={isCompact ? 'xs' : 'sm'}
                radius="md"
                variant="filled" />
              
            </Box>

            {/* Right: Actions + User */}
            <Group gap={isCompact ? 6 : 10}>
              <Tooltip label="Messages">
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  size={isCompact ? 'sm' : 'md'}>
                  
                  <MessageSquareIcon size={isCompact ? 16 : 18} />
                </ActionIcon>
              </Tooltip>

              <Tooltip label="Notifications">
                <Indicator color="red" size={8} offset={4} processing>
                  <ActionIcon
                    variant="subtle"
                    color="gray"
                    size={isCompact ? 'sm' : 'md'}>
                    
                    <BellIcon size={isCompact ? 16 : 18} />
                  </ActionIcon>
                </Indicator>
              </Tooltip>

              <Tooltip label="Help">
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  size={isCompact ? 'sm' : 'md'}>
                  
                  <HelpCircleIcon size={isCompact ? 16 : 18} />
                </ActionIcon>
              </Tooltip>

              <Menu shadow="md" width={200} position="bottom-end">
                <Menu.Target>
                  <Group
                    gap={6}
                    style={{
                      cursor: 'pointer'
                    }}
                    ml={4}>
                    
                    <Avatar
                      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                      size={isCompact ? 'sm' : 'md'}
                      radius="xl" />
                    
                    <Box
                      style={{
                        lineHeight: 1
                      }}
                      visibleFrom="sm">
                      
                      <Text size="xs" fw={500}>
                        Jane Doe
                      </Text>
                      <Text size="xs" c="dimmed">
                        Product Manager
                      </Text>
                    </Box>
                    <ChevronDownIcon
                      size={14}
                      style={{
                        color: 'var(--mantine-color-dimmed)'
                      }} />
                    
                  </Group>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item leftSection={<UserIcon size={14} />}>
                    Profile
                  </Menu.Item>
                  <Menu.Item leftSection={<SettingsIcon size={14} />}>
                    Settings
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item leftSection={<LogOutIcon size={14} />} color="red">
                    Log out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Box>

          {/* Simulated page content */}
          <Box
            p="md"
            style={{
              backgroundColor: 'var(--mantine-color-gray-0)',
              minHeight: 60
            }}>
            
            <Text size="sm" c="dimmed">
              Page content area
            </Text>
          </Box>
        </Box>
      </Box>

      {/* Anatomy notes */}
      <Box>
        <Text fw={500} size="sm" mb="xs">
          Header Anatomy
        </Text>
        <Text size="sm" c="dimmed">
          <strong>Left:</strong> Logo + app name — always visible. &nbsp;
          <strong>Center:</strong> Global search — collapses to icon on mobile.
          &nbsp;
          <strong>Right:</strong> Messages, notifications (with indicator),
          help, user menu with avatar and role.
        </Text>
        <Text size="sm" c="dimmed" mt="xs">
          Height: {isCompact ? '48px (compact)' : '56px (comfortable)'}.
          Responds to density mode.
        </Text>
      </Box>
    </Stack>);

}