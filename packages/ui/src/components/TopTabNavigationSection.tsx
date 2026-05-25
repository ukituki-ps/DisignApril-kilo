import { useState } from 'react';
import { Group, Stack, Text, Paper } from '@mantine/core';
import { Home, ShoppingBag, Coins, FileText, Headphones, Bell, Settings } from 'lucide-react';
import { TopTabNavigation, TopTabItem } from './TopTabNavigation';
import { BalancePill } from './BalancePill';
import { AprilIcon } from '../icons';

const NAV_ITEMS: TopTabItem[] = [
  { key: 'home', label: 'Главная', icon: <Home size={16} /> },
  { key: 'catalog', label: 'Каталог', icon: <ShoppingBag size={16} /> },
  { key: 'scores', label: 'Баллы', icon: <Coins size={16} /> },
  { key: 'docs', label: 'Документы', icon: <FileText size={16} /> },
  { key: 'support', label: 'Поддержка', icon: <Headphones size={16} /> },
];

function TopTabNavigationDemo() {
  const [activeKey, setActiveKey] = useState('home');

  return (
    <Stack gap="lg">
      <TopTabNavigation
        items={NAV_ITEMS}
        activeKey={activeKey}
        onChange={setActiveKey}
        logo={
          <Group gap={6} wrap="nowrap" style={{ alignItems: 'center' }}>
            <Text fw={700} size="sm" c="teal">April</Text>
          </Group>
        }
        rightSection={
          <Group gap={8} wrap="nowrap">
            <BalancePill value="1 250" unit="баллов" />
            <AprilIcon
              icon={Bell}
              size="sm"
              style={{ cursor: 'pointer', color: 'var(--mantine-color-dimmed)' }}
            />
            <AprilIcon
              icon={Settings}
              size="sm"
              style={{ cursor: 'pointer', color: 'var(--mantine-color-dimmed)' }}
            />
          </Group>
        }
      />

      <Paper withBorder radius="md" p="md" style={{ minHeight: 200 }}>
        <Text size="sm" c="dimmed">
          Текущий таб:{' '}
          <Text component="span" fw={600} c="teal.6">
            {activeKey}
          </Text>
        </Text>
      </Paper>

      <Stack gap="xs">
        <Text fw={500} size="sm">Без sticky</Text>
        <TopTabNavigation
          items={NAV_ITEMS}
          activeKey={activeKey}
          onChange={setActiveKey}
          sticky={false}
          logo={
            <Group gap={6} wrap="nowrap" style={{ alignItems: 'center' }}>
              <Text fw={700} size="sm" c="teal">April</Text>
            </Group>
          }
        />
      </Stack>
    </Stack>
  );
}

/** Showcase-секция для TopTabNavigation в UIKit-витрине. */
export function TopTabNavigationSection() {
  return <TopTabNavigationDemo />;
}
