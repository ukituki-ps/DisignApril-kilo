import React from 'react';
import { Stack, Group, Badge, Text } from '@mantine/core';
export function BadgesSection() {
  return (
    <Stack gap="xl">
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Variants
        </Text>
        <Group>
          <Badge variant="filled">Filled</Badge>
          <Badge variant="light">Light</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="dot">Dot</Badge>
          <Badge variant="transparent">Transparent</Badge>
        </Group>
      </Stack>

      <Stack gap="sm">
        <Text fw={500} size="sm">
          Semantic Colors
        </Text>
        <Group>
          <Badge color="teal">Active</Badge>
          <Badge color="blue">In Progress</Badge>
          <Badge color="orange">Warning</Badge>
          <Badge color="red">Failed</Badge>
          <Badge color="gray">Archived</Badge>
        </Group>
      </Stack>

      <Stack gap="sm">
        <Text fw={500} size="sm">
          Sizes
        </Text>
        <Group align="center">
          <Badge size="xs">Extra Small</Badge>
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
          <Badge size="xl">Extra Large</Badge>
        </Group>
      </Stack>
    </Stack>);

}