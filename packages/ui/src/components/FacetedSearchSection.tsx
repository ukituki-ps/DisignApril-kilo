import { useState } from 'react';
import { Box, Group, SegmentedControl, Stack, Text } from '@mantine/core';
import { FacetedSearch } from './FacetedSearch';
import type { Facet, FacetedSearchSelected } from './FacetedSearch';

const demoFacets: Facet[] = [
  {
    id: 'category',
    label: 'Категория',
    type: 'checkbox',
    options: [
      { value: 'dms', label: 'ДМС', count: 12 },
      { value: 'fitness', label: 'Фитнес', count: 5 },
      { value: 'food', label: 'Питание', count: 3 },
      { value: 'edu', label: 'Обучение', count: 4 },
      { value: 'merch', label: 'Мерч', count: 7 },
    ],
  },
  {
    id: 'status',
    label: 'Статус',
    type: 'radio',
    options: [
      { value: 'active', label: 'Активен', count: 8 },
      { value: 'available', label: 'Доступен', count: 15 },
      { value: 'expired', label: 'Истёк', count: 2 },
    ],
  },
  {
    id: 'price',
    label: 'Цена',
    type: 'range',
    min: 0,
    max: 10000,
    unit: '₽',
  },
  {
    id: 'provider',
    label: 'Провайдер',
    type: 'select',
    options: [
      { value: 'alfa', label: 'АльфаСтрахование', count: 8 },
      { value: 'skillbox', label: 'Skillbox', count: 4 },
      { value: 'worldclass', label: 'World Class', count: 2 },
      { value: 'yandex', label: 'Яндекс Еда', count: 3 },
    ],
  },
];

export function FacetedSearchSection() {
  const [selected, setSelected] = useState<FacetedSearchSelected>({
    category: [],
    status: [],
    price: [],
    provider: [],
  });
  const [searchValue, setSearchValue] = useState('');
  const [mode, setMode] = useState<'inline' | 'drawer' | 'auto'>('inline');

  return (
    <Stack gap="lg">
      {/* Mode switcher */}
      <Stack gap="xs">
        <Text size="sm" fw={500}>
          Режим отображения
        </Text>
        <SegmentedControl
          value={mode}
          onChange={(v) => setMode(v as 'inline' | 'drawer' | 'auto')}
          data={[
            { label: 'Inline', value: 'inline' },
            { label: 'Drawer', value: 'drawer' },
            { label: 'Auto', value: 'auto' },
          ]}
        />
      </Stack>

      {/* Search */}
      {mode !== 'inline' && (
        <Text size="sm" c="dimmed">
          Режим {mode}: фильтры открываются по кнопке. На mobile — bottom sheet.
        </Text>
      )}

      {/* Component */}
      <FacetedSearch
        facets={demoFacets}
        selected={selected}
        onChange={setSelected}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        mode={mode}
        title="Фильтры каталога"
        clearAllLabel="Сбросить всё"
      />

      {/* Selected values debug */}
      <Box>
        <Text size="sm" fw={500} mb="xs">
          Выбрано:
        </Text>
        <Group gap="sm" wrap="wrap">
          {Object.entries(selected).map(([key, vals]) =>
            vals.length > 0
              ? vals.map((v) => (
                  <Text key={`${key}-${v}`} size="xs">
                    {key} = {v}
                  </Text>
                ))
              : null,
          )}
          {Object.values(selected).every((v) => v.length === 0) && (
            <Text size="xs" c="dimmed">
              Ничего не выбрано
            </Text>
          )}
        </Group>
      </Box>
    </Stack>
  );
}
