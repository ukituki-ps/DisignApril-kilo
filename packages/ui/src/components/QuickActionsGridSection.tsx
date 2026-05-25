import { ArrowUpCircle, Baby, Brain, ShoppingBag, UserPlus } from 'lucide-react';
import { Box, Stack, Text } from '@mantine/core';
import { QuickActionsGrid } from './QuickActionsGrid';

export function QuickActionsGridSection() {
  const basicItems = [
    { id: 'qa1', label: 'Добавить родственника к ДМС', icon: <UserPlus size={16} aria-hidden /> },
    { id: 'qa2', label: 'Апгрейд ДМС', icon: <ArrowUpCircle size={16} aria-hidden /> },
    { id: 'qa3', label: 'Купить мерч СДЭК', icon: <ShoppingBag size={16} aria-hidden /> },
    { id: 'qa4', label: 'Записаться к психологу', icon: <Brain size={16} aria-hidden /> },
  ];

  const complexItems = [
    {
      id: 'qc1',
      label: 'Добавить родственника',
      icon: <UserPlus size={16} aria-hidden />,
      badge: '2 ожидают',
    },
    {
      id: 'qc2',
      label: 'Апгрейд ДМС',
      icon: <ArrowUpCircle size={16} aria-hidden />,
      color: 'blue',
    },
    {
      id: 'qc3',
      label: 'Купить мерч',
      icon: <ShoppingBag size={16} aria-hidden />,
      disabled: true,
    },
    {
      id: 'qc4',
      label: 'Психолог онлайн',
      icon: <Brain size={16} aria-hidden />,
      color: 'orange',
      badge: '4 сессии',
    },
    {
      id: 'qc5',
      label: 'Мат. капитал',
      icon: <Baby size={16} aria-hidden />,
      color: 'violet',
    },
    {
      id: 'qc6',
      label: 'Недоступное действие',
      icon: <Brain size={16} aria-hidden />,
      disabled: true,
    },
  ];

  return (
    <Stack gap="xl">
      {/* Basic: 4 действия с иконками (как в прототипе) */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Базовый (4 действия, как в прототипе Dashboard)
        </Text>
        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            overflow: 'hidden',
          }}
        >
          <QuickActionsGrid items={basicItems} />
        </Box>
      </Stack>

      {/* Complex: с badge, mixed disabled, цвета */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Сложный (badge, disabled, цвета)
        </Text>
        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            overflow: 'hidden',
          }}
        >
          <QuickActionsGrid items={complexItems} columns={3} />
        </Box>
      </Stack>

      {/* Mobile preview: 2 колонки */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Mobile preview (2 колонки)
        </Text>
        <Box
          style={{
            maxWidth: 375,
            margin: '0 auto',
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            padding: 'var(--mantine-spacing-md)',
          }}
        >
          <QuickActionsGrid items={basicItems} columns={2} />
        </Box>
      </Stack>
    </Stack>
  );
}
