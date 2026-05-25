import { useState } from 'react';
import { Box, Stack, Text } from '@mantine/core';
import type { FilterPillItem } from './FilterPills';
import { FilterPills } from './FilterPills';

export function FilterPillsSection() {
  const [basicActive, setBasicActive] = useState('all');
  const [countActive, setCountActive] = useState('all');
  const [scrollActive, setScrollActive] = useState('all');

  const basicPills: FilterPillItem[] = [
    { value: 'all', label: 'Все' },
    { value: 'dms', label: 'ДМС' },
    { value: 'sport', label: 'Спорт' },
    { value: 'food', label: 'Питание' },
    { value: 'dev', label: 'Развитие' },
    { value: 'merch', label: 'Мерч' },
  ];

  const countPills: FilterPillItem[] = [
    { value: 'all', label: 'Все', count: 128 },
    { value: 'dms', label: 'ДМС', count: 42 },
    { value: 'sport', label: 'Спорт', count: 18 },
    { value: 'food', label: 'Питание', count: 35 },
    { value: 'dev', label: 'Развитие', count: 24 },
    { value: 'merch', label: 'Мерч', count: 9 },
  ];

  const scrollPills: FilterPillItem[] = [
    { value: 'all', label: 'Все' },
    { value: 'dms', label: 'ДМС' },
    { value: 'sport', label: 'Спорт' },
    { value: 'food', label: 'Питание' },
    { value: 'dev', label: 'Развитие' },
    { value: 'merch', label: 'Мерч' },
    { value: 'travel', label: 'Путешествия' },
    { value: 'kids', label: 'Детям' },
    { value: 'home', label: 'Дом и быт' },
    { value: 'beauty', label: 'Красота' },
    { value: 'auto', label: 'Авто' },
    { value: 'edu', label: 'Образование' },
  ];

  return (
    <Stack gap="xl">
      {/* Basic: pills as in benefit catalog prototype */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Базовый (как в прототипе каталога льгот)
        </Text>
        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            padding: 'var(--mantine-spacing-md)',
          }}
        >
          <FilterPills
            pills={basicPills}
            activeValue={basicActive}
            onChange={setBasicActive}
          />
        </Box>
      </Stack>

      {/* With count */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          С count
        </Text>
        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            padding: 'var(--mantine-spacing-md)',
          }}
        >
          <FilterPills
            pills={countPills}
            activeValue={countActive}
            onChange={setCountActive}
          />
        </Box>
      </Stack>

      {/* Scrollable: many pills */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Scrollable (много пил, горизонтальный скролл)
        </Text>
        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            padding: 'var(--mantine-spacing-md)',
          }}
        >
          <FilterPills
            pills={scrollPills}
            activeValue={scrollActive}
            onChange={setScrollActive}
            scrollable={true}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
