import React from 'react';
import { Stack, Group, Button, Text, ActionIcon } from '@mantine/core';
import { SettingsIcon, PlusIcon, TrashIcon, SearchIcon } from 'lucide-react';
import { useDensity } from '../DensityContext';
export function ButtonsSection() {
  const { density } = useDensity();
  const isCompact = density === 'compact';
  // Map density to Mantine sizes
  const defaultSize = isCompact ? 'xs' : 'sm';
  return (
    <Stack gap="xl">
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Variants
        </Text>
        <Group>
          <Button variant="filled" size={defaultSize}>
            Filled
          </Button>
          <Button variant="light" size={defaultSize}>
            Light
          </Button>
          <Button variant="outline" size={defaultSize}>
            Outline
          </Button>
          <Button variant="subtle" size={defaultSize}>
            Subtle
          </Button>
          <Button variant="default" size={defaultSize}>
            Default
          </Button>
        </Group>
      </Stack>

      <Stack gap="sm">
        <Text fw={500} size="sm">
          States
        </Text>
        <Group>
          <Button size={defaultSize}>Default</Button>
          <Button size={defaultSize} disabled>
            Disabled
          </Button>
          <Button size={defaultSize} loading>
            Loading
          </Button>
          <Button size={defaultSize} color="red">
            Danger
          </Button>
        </Group>
      </Stack>

      <Stack gap="sm">
        <Text fw={500} size="sm">
          With Icons
        </Text>
        <Group>
          <Button size={defaultSize} leftSection={<PlusIcon size={16} />}>
            Add Task
          </Button>
          <Button
            size={defaultSize}
            variant="default"
            rightSection={<SettingsIcon size={16} />}>
            
            Settings
          </Button>
          <Button
            size={defaultSize}
            variant="light"
            color="red"
            leftSection={<TrashIcon size={16} />}>
            
            Delete
          </Button>
        </Group>
      </Stack>

      <Stack gap="sm">
        <Text fw={500} size="sm">
          Icon Buttons
        </Text>
        <Group>
          <ActionIcon
            size={isCompact ? 'md' : 'lg'}
            variant="filled"
            aria-label="Settings">
            
            <SettingsIcon size={18} />
          </ActionIcon>
          <ActionIcon
            size={isCompact ? 'md' : 'lg'}
            variant="light"
            aria-label="Search">
            
            <SearchIcon size={18} />
          </ActionIcon>
          <ActionIcon
            size={isCompact ? 'md' : 'lg'}
            variant="default"
            aria-label="Add">
            
            <PlusIcon size={18} />
          </ActionIcon>
          <ActionIcon
            size={isCompact ? 'md' : 'lg'}
            variant="subtle"
            color="red"
            aria-label="Delete">
            
            <TrashIcon size={18} />
          </ActionIcon>
        </Group>
      </Stack>

      <Stack gap="sm">
        <Text fw={500} size="sm">
          Sizes
        </Text>
        <Group align="center">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Group>
      </Stack>
    </Stack>);

}