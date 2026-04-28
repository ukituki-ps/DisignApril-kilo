import { useEffect, useMemo, useState } from 'react';
import { Badge, Card, Group, SegmentedControl, Stack, Text } from '@mantine/core';
import {
  CardListColumn,
  CardListColumnFilter,
  CardListColumnItem,
  CardListColumnMode,
  CardListColumnSort,
} from './CardListColumn';

const LOAD_STEP = 50;
const MOCK_SERVER_ITEMS: CardListColumnItem[] = Array.from({ length: 120 }, (_, idx) => {
  const num = idx + 1;
  return {
    id: `card-${num}`,
    title: `Backlog task #${num}`,
    description: `Server item ${num}: sync workflows and update statuses.`,
    searchText: `task ${num} backlog workflow`,
    status: num % 3 === 0 ? 'done' : num % 2 === 0 ? 'in-progress' : 'todo',
    createdAt: new Date(2026, 3, (num % 28) + 1).toISOString(),
  };
});

export function CardListColumnSection() {
  const [mode, setMode] = useState<CardListColumnMode>('inline');
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

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Text size="sm" c="dimmed">
          Toggle display mode to verify inline and overlay behavior.
        </Text>
        <SegmentedControl
          value={mode}
          onChange={(value) => setMode(value as CardListColumnMode)}
          data={[
            { label: 'Inline', value: 'inline' },
            { label: 'Overlay', value: 'overlay' },
          ]}
          size="xs"
        />
      </Group>

      <Card withBorder radius="md" p="md" style={{ minHeight: 560 }}>
        <CardListColumn
          title="Backlog"
          items={items}
          totalItems={totalItems}
          loadedItemsCount={items.length}
          mode={mode}
          loading={loading}
          searchValue={query}
          onSearchChange={setQuery}
          filterValue={filter}
          filterField="type"
          filterLabel="Type"
          filterModalTitle="Filters"
          filterOptions={[
            { label: 'All types', value: 'all' },
            { label: 'Todo', value: 'todo' },
            { label: 'In Progress', value: 'in-progress' },
            { label: 'Done', value: 'done' },
          ]}
          sortValue={sort}
          sortModalTitle="Sorting"
          sortFieldLabel="Sort by"
          sortDirectionLabel="Direction"
          sortOptions={[
            { label: 'Created at', value: 'createdAt' },
            { label: 'Title', value: 'title' },
          ]}
          sortDirectionOptions={[
            { label: 'Descending', value: 'desc' },
            { label: 'Ascending', value: 'asc' },
          ]}
          onFilterChange={setFilter}
          onSortChange={setSort}
          onReachListEnd={() => {
            setLimit((current) => Math.min(current + LOAD_STEP, totalItems || current + LOAD_STEP));
          }}
          cardHeight={108}
          defaultWidthPercent={32}
          minWidthPercent={15}
          maxWidthPercent={50}
          renderCard={(item) => (
            <Card withBorder radius="md" p="sm" h="100%">
              <Group justify="space-between" mb="xs">
                <Text fw={600} lineClamp={1}>
                  {item.title}
                </Text>
                <Badge size="xs" variant="light" color="blue">
                  Task
                </Badge>
              </Group>
              <Text size="sm" c="dimmed" lineClamp={3}>
                {item.description}
              </Text>
            </Card>
          )}
        />
      </Card>
    </Stack>
  );
}
