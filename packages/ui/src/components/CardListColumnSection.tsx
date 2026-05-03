import { useEffect, useMemo, useState } from 'react';
import { Badge, Box, Button, Card, SegmentedControl, Stack, Text } from '@mantine/core';
import { ListTodoIcon } from 'lucide-react';
import {
  CardListColumn,
  CardListColumnFilter,
  CardListColumnItem,
  CardListColumnMode,
  CardListColumnSort,
  type CardListColumnView,
} from './CardListColumn';

const LOAD_STEP = 50;
const MOCK_SERVER_ITEMS: CardListColumnItem[] = Array.from({ length: 120 }, (_, idx) => {
  const num = idx + 1;
  const base: CardListColumnItem = {
    id: `card-${num}`,
    title: `Задача бэклога №${num}`,
    description: `Элемент ${num}: синхронизация процессов и обновление статусов.`,
    searchText: `задача ${num} бэклог процесс`,
    status: num % 3 === 0 ? 'done' : num % 2 === 0 ? 'in-progress' : 'todo',
    createdAt: new Date(2026, 3, (num % 28) + 1).toISOString(),
  };
  if (num % 4 === 1) {
    return {
      ...base,
      imageUrl: `https://picsum.photos/seed/april-card-${num}/64`,
    };
  }
  if (num % 4 === 2) {
    return { ...base, avatarIcon: ListTodoIcon };
  }
  return base;
});

export function CardListColumnSection() {
  const [mode, setMode] = useState<CardListColumnMode>('inline');
  const [cardUi, setCardUi] = useState<'default' | 'custom'>('default');
  const [columnView, setColumnView] = useState<CardListColumnView>('list');
  const [limit, setLimit] = useState(50);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<CardListColumnFilter>({});
  const [sort, setSort] = useState<CardListColumnSort>({
    field: 'createdAt',
    direction: 'desc',
  });
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<CardListColumnItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState<string | null>('card-1');
  /** Полноэкранная сетка на витрине — только по кнопке, не при переключении вида. */
  const [gridFullscreen, setGridFullscreen] = useState(false);

  useEffect(() => {
    if (columnView !== 'grid') {
      setGridFullscreen(false);
    }
  }, [columnView]);

  const gridFullscreenShell = columnView === 'grid' && gridFullscreen;

  const filteredAndSortedOnServer = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    let next = MOCK_SERVER_ITEMS;

    if (filter.type) {
      next = next.filter((item) => item.status === filter.type);
    }

    if (normalized) {
      next = next.filter((item) =>
        `${item.title} ${item.searchText ?? item.description ?? ''}`
          .toLowerCase()
          .includes(normalized)
      );
    }

    const sorted = [...next].sort((a, b) => {
      if (sort.field === 'title') {
        return a.title.localeCompare(b.title);
      }

      const aDate = new Date(a.createdAt ?? 0).getTime();
      const bDate = new Date(b.createdAt ?? 0).getTime();
      return aDate - bDate;
    });

    return sort.direction === 'asc' ? sorted : sorted.reverse();
  }, [filter.type, query, sort.direction, sort.field]);

  useEffect(() => {
    setLoading(true);
    const timeout = window.setTimeout(() => {
      const nextSlice = filteredAndSortedOnServer.slice(0, limit);
      setItems(nextSlice);
      setTotalItems(filteredAndSortedOnServer.length);
      setLoading(false);
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [filteredAndSortedOnServer, limit]);

  useEffect(() => {
    setLimit(50);
  }, [filter.type, query, sort.direction, sort.field]);

  const controlsBlock = (
    <Stack gap="xs">
      <Text size="sm" c="dimmed">
        Виды: список → сетка → свёрнутая полоса. В свёрнутом виде название выбранной карточки идёт{' '}
        <strong>вертикально</strong> (узкая колонка). В списке ширина — проценты (по умолчанию 32%, ресайз 15–50%). В
        режиме <strong>сетки</strong> колонка по умолчанию занимает <strong>100% ширины</strong> карточки-демо; отдельная
        кнопка включает полноэкранный режим на весь viewport.
      </Text>
      <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <SegmentedControl
          value={mode}
          onChange={(value) => setMode(value as CardListColumnMode)}
          data={[
            { label: 'Встроенный', value: 'inline' },
            { label: 'Поверх', value: 'overlay' },
          ]}
          size="xs"
        />
        <SegmentedControl
          value={cardUi}
          onChange={(value) => setCardUi(value as 'default' | 'custom')}
          data={[
            { label: 'Дефолтные карточки', value: 'default' },
            { label: 'Кастомные карточки', value: 'custom' },
          ]}
          size="xs"
        />
        {columnView === 'grid' ? (
          <Button
            size="xs"
            variant="light"
            color="gray"
            onClick={() => setGridFullscreen((open) => !open)}
          >
            {gridFullscreen ? 'Выйти из полноэкранной сетки' : 'Сетка на весь экран'}
          </Button>
        ) : null}
      </Box>
    </Stack>
  );

  const column = (
    <CardListColumn
      title="Бэклог"
      items={items}
      totalItems={totalItems}
      loadedItemsCount={items.length}
      mode={mode}
      loading={loading}
      searchValue={query}
      onSearchChange={setQuery}
      filterValue={filter}
      filterField="type"
      filterLabel="Тип"
      filterModalTitle="Фильтры"
      filterOptions={[
        { label: 'Все типы', value: 'all' },
        { label: 'К выполнению', value: 'todo' },
        { label: 'В работе', value: 'in-progress' },
        { label: 'Готово', value: 'done' },
      ]}
      sortValue={sort}
      sortModalTitle="Сортировка"
      sortFieldLabel="Сортировать по"
      sortDirectionLabel="Направление"
      sortOptions={[
        { label: 'Дата создания', value: 'createdAt' },
        { label: 'Заголовок', value: 'title' },
      ]}
      sortDirectionOptions={[
        { label: 'По убыванию', value: 'desc' },
        { label: 'По возрастанию', value: 'asc' },
      ]}
      onFilterChange={setFilter}
      onSortChange={setSort}
      selectedItemId={selectedItemId}
      onSelectItem={setSelectedItemId}
      view={columnView}
      onViewChange={setColumnView}
      onReachListEnd={() => {
        setLimit((current) => Math.min(current + LOAD_STEP, totalItems || current + LOAD_STEP));
      }}
      cardHeight={108}
      heightMode="fill"
      defaultWidthPercent={32}
      minWidthPercent={15}
      maxWidthPercent={50}
      renderCard={
        cardUi === 'custom'
          ? (item) => (
              <Card withBorder radius="md" p="sm" h="100%">
                <Box
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--mantine-spacing-xs)',
                  }}
                >
                  <Text fw={600} lineClamp={1}>
                    {item.title}
                  </Text>
                  <Badge size="xs" variant="light" color="blue">
                    Задача
                  </Badge>
                </Box>
                <Text size="sm" c="dimmed" lineClamp={3}>
                  {item.description}
                </Text>
              </Card>
            )
          : undefined
      }
    />
  );

  const cardShell = (
    <Card
      withBorder
      radius="md"
      p="md"
      style={
        gridFullscreenShell
          ? { flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }
          : { height: 560 }
      }
    >
      {column}
    </Card>
  );

  return gridFullscreenShell ? (
    <Box
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--mantine-spacing-md)',
        padding: 'var(--mantine-spacing-md)',
        backgroundColor: 'var(--mantine-color-body)',
      }}
    >
      {controlsBlock}
      {cardShell}
    </Box>
  ) : (
    <Stack gap="md">
      {controlsBlock}
      {cardShell}
    </Stack>
  );
}
