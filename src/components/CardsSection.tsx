import React from 'react';
import {
  SimpleGrid,
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Avatar,
  Stack } from
'@mantine/core';
import { UsersIcon, TrendingUpIcon, CheckCircle2Icon } from 'lucide-react';
import { useDensity } from '../DensityContext';
export function CardsSection() {
  const { density } = useDensity();
  const isCompact = density === 'compact';
  const p = isCompact ? 'sm' : 'md';
  const gap = isCompact ? 'xs' : 'md';
  return (
    <SimpleGrid
      cols={{
        base: 1,
        sm: 2,
        lg: 3
      }}
      spacing="lg">
      
      {/* Simple Info Card */}
      <Card shadow="sm" padding={p} radius="md" withBorder>
        <Card.Section>
          <div
            style={{
              height: 120,
              backgroundColor: 'var(--mantine-color-gray-2)'
            }} />
          
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>Project Alpha</Text>
          <Badge color="teal" variant="light">
            Active
          </Badge>
        </Group>

        <Text size="sm" c="dimmed">
          Main corporate website redesign project. Includes new branding and
          design system implementation.
        </Text>

        <Button
          color="teal"
          fullWidth
          mt="md"
          radius="md"
          size={isCompact ? 'xs' : 'sm'}>
          
          View Details
        </Button>
      </Card>

      {/* Stat Card */}
      <Card shadow="sm" padding={p} radius="md" withBorder>
        <Group justify="space-between" align="flex-start">
          <Stack gap={0}>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
              Total Revenue
            </Text>
            <Text fw={700} size="xl" mt={gap}>
              $34,500
            </Text>
          </Stack>
          <div className="bg-teal-100 p-2 rounded-md dark:bg-teal-900">
            <TrendingUpIcon
              size={20}
              className="text-teal-600 dark:text-teal-400" />
            
          </div>
        </Group>

        <Group mt="md" gap="xs">
          <Text size="sm" c="teal" fw={500}>
            +14%
          </Text>
          <Text size="sm" c="dimmed">
            Since last month
          </Text>
        </Group>
      </Card>

      {/* Task Card */}
      <Card shadow="sm" padding={p} radius="md" withBorder>
        <Group justify="space-between" mb={gap}>
          <Badge color="blue" variant="dot">
            In Progress
          </Badge>
          <Text size="xs" c="dimmed">
            Due: Oct 24
          </Text>
        </Group>

        <Text fw={500} mb="xs">
          Implement Authentication
        </Text>
        <Text size="sm" c="dimmed" mb="md" lineClamp={2}>
          Set up OAuth2 with Google and Microsoft providers. Ensure JWT tokens
          are securely stored.
        </Text>

        <Card.Section
          inheritPadding
          py="xs"
          style={{
            borderTop: '1px solid var(--mantine-color-default-border)'
          }}>
          
          <Group justify="space-between">
            <Group gap="xs">
              <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                size="sm"
                radius="xl" />
              
              <Text size="sm" fw={500}>
                Jane Doe
              </Text>
            </Group>
            <Group gap="xs" c="dimmed">
              <CheckCircle2Icon size={16} />
              <Text size="xs">3/5</Text>
            </Group>
          </Group>
        </Card.Section>
      </Card>
    </SimpleGrid>);

}