import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Modal,
  Paper,
  ScrollArea,
  Select,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import {
  ArrowLeftToLineIcon,
  ArrowRightToLineIcon,
  FilterIcon,
  ListFilterIcon,
  PlusIcon,
  SearchIcon,
  XIcon,
} from 'lucide-react';
import { useDensity } from '../DensityContext';

export type CardListColumnMode = 'inline' | 'overlay';
export interface CardListColumnItem {
  id: string;
  title: string;
  description?: string;
  searchText?: string;
  status?: string;
  createdAt?: string;
}
export type CardListColumnFilter = Record<string, string | undefined>;
export interface CardListColumnSort {
  field: 'title' | 'createdAt';
  direction: 'asc' | 'desc';
}
export interface CardListColumnFilterOption {
  label: string;
  value: string;
}
export interface CardListColumnFilterModalRenderProps {
  draftFilter: CardListColumnFilter;
  setDraftFilter: (next: CardListColumnFilter) => void;
  applyFilter: () => void;
  resetFilter: () => void;
  closeModal: () => void;
}
export interface CardListColumnSortOption {
  label: string;
  value: CardListColumnSort['field'];
}
export interface CardListColumnSortDirectionOption {
  label: string;
  value: CardListColumnSort['direction'];
}
export interface CardListColumnSortModalRenderProps {
  draftSort: CardListColumnSort;
  setDraftSort: (next: CardListColumnSort) => void;
  applySort: () => void;
  resetSort: () => void;
  closeModal: () => void;
}
export interface CardListColumnProps {
  title: string;
  items: CardListColumnItem[];
  mode: CardListColumnMode;
  totalItems?: number;
  loadedItemsCount?: number;
  cardHeight?: number;
  defaultWidthPercent?: number;
  minWidthPercent?: number;
  maxWidthPercent?: number;
  withFilter?: boolean;
  withSort?: boolean;
  withAdd?: boolean;
  searchValue?: string;
  loading?: boolean;
  filterValue?: CardListColumnFilter;
  sortValue?: CardListColumnSort;
  filterField?: string;
  filterLabel?: string;
  filterOptions?: CardListColumnFilterOption[];
  filterModalTitle?: string;
  renderFilterModal?: (props: CardListColumnFilterModalRenderProps) => ReactNode;
  sortModalTitle?: string;
  sortFieldLabel?: string;
  sortDirectionLabel?: string;
  sortOptions?: CardListColumnSortOption[];
  sortDirectionOptions?: CardListColumnSortDirectionOption[];
  renderSortModal?: (props: CardListColumnSortModalRenderProps) => ReactNode;
  renderCard?: (item: CardListColumnItem) => React.ReactNode;
  onSearchChange?: (value: string) => void;
  onReachListEnd?: () => void;
  onFilterChange?: (value: CardListColumnFilter) => void;
  onSortChange?: (value: CardListColumnSort) => void;
  onAddItem?: () => void;
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
const DEFAULT_FILTER_OPTIONS: CardListColumnFilterOption[] = [
  { label: 'All', value: 'all' },
  { label: 'Todo', value: 'todo' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Done', value: 'done' },
];
const DEFAULT_SORT_OPTIONS: CardListColumnSortOption[] = [
  { label: 'Created at', value: 'createdAt' },
  { label: 'Title', value: 'title' },
];
const DEFAULT_SORT_DIRECTION_OPTIONS: CardListColumnSortDirectionOption[] = [
  { label: 'Descending', value: 'desc' },
  { label: 'Ascending', value: 'asc' },
];
const getStableFilterKey = (filter: CardListColumnFilter | undefined) => {
  const source = filter ?? {};
  const orderedEntries = Object.keys(source)
    .sort()
    .map((key) => [key, source[key]] as const);

  return JSON.stringify(orderedEntries);
};

function DefaultCard({ item, cardHeight }: { item: CardListColumnItem; cardHeight: number }) {
  return (
    <Card withBorder radius="md" p="sm" style={{ height: cardHeight, overflow: 'hidden' }}>
      <Text fw={600} lineClamp={1}>
        {item.title}
      </Text>
      {item.description ? (
        <Text size="sm" c="dimmed" mt="xs" lineClamp={3}>
          {item.description}
        </Text>
      ) : null}
    </Card>
  );
}

export function CardListColumn({
  title,
  items,
  mode,
  totalItems = items.length,
  loadedItemsCount = items.length,
  cardHeight = 104,
  defaultWidthPercent = 30,
  minWidthPercent = 15,
  maxWidthPercent = 50,
  withFilter = true,
  withSort = true,
  withAdd = true,
  searchValue,
  loading = false,
  filterValue,
  sortValue,
  filterField = 'status',
  filterLabel = 'Status',
  filterOptions = DEFAULT_FILTER_OPTIONS,
  filterModalTitle = 'Filters',
  renderFilterModal,
  sortModalTitle = 'Sort',
  sortFieldLabel = 'Field',
  sortDirectionLabel = 'Direction',
  sortOptions = DEFAULT_SORT_OPTIONS,
  sortDirectionOptions = DEFAULT_SORT_DIRECTION_OPTIONS,
  renderSortModal,
  renderCard,
  onSearchChange,
  onReachListEnd,
  onFilterChange,
  onSortChange,
  onAddItem,
}: CardListColumnProps) {
  const { density } = useDensity();
  const isCompactDensity = density === 'compact';
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const loadMoreTriggeredRef = useRef(false);
  const lastSyncedFilterKeyRef = useRef('');
  const lastSyncedSortKeyRef = useRef('');
  const [localQuery, setLocalQuery] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [overlayOpened, setOverlayOpened] = useState(mode === 'overlay');
  const [filterOpened, setFilterOpened] = useState(false);
  const [sortOpened, setSortOpened] = useState(false);
  const [addOpened, setAddOpened] = useState(false);
  const [draftFilter, setDraftFilter] = useState<CardListColumnFilter>({});
  const [draftSortField, setDraftSortField] = useState<CardListColumnSort['field']>('createdAt');
  const [draftSortDirection, setDraftSortDirection] = useState<CardListColumnSort['direction']>('desc');
  const [widthPercent, setWidthPercent] = useState(
    clamp(defaultWidthPercent, minWidthPercent, maxWidthPercent)
  );
  const query = searchValue ?? localQuery;
  const filterValueKey = useMemo(() => getStableFilterKey(filterValue), [filterValue]);
  const sortValueKey = useMemo(
    () => JSON.stringify(sortValue ?? { field: 'createdAt', direction: 'desc' }),
    [sortValue]
  );

  useEffect(() => {
    if (filterOpened) {
      return;
    }
    if (lastSyncedFilterKeyRef.current === filterValueKey) {
      return;
    }
    setDraftFilter(filterValue ?? {});
    lastSyncedFilterKeyRef.current = filterValueKey;
  }, [filterOpened, filterValue, filterValueKey]);
  useEffect(() => {
    if (sortOpened) {
      return;
    }
    if (lastSyncedSortKeyRef.current === sortValueKey) {
      return;
    }
    setDraftSortField(sortValue?.field ?? 'createdAt');
    setDraftSortDirection(sortValue?.direction ?? 'desc');
    lastSyncedSortKeyRef.current = sortValueKey;
  }, [sortOpened, sortValue, sortValueKey]);
  useEffect(() => {
    if (!loading) {
      loadMoreTriggeredRef.current = false;
    }
  }, [loading, loadedItemsCount, totalItems]);

  const applyFilter = () => {
    onFilterChange?.(draftFilter);
    setFilterOpened(false);
  };
  const resetFilter = () => {
    setDraftFilter({});
    onFilterChange?.({});
    setFilterOpened(false);
  };
  const applySort = () => {
    onSortChange?.({ field: draftSortField, direction: draftSortDirection });
    setSortOpened(false);
  };
  const resetSort = () => {
    const nextSort: CardListColumnSort = { field: 'createdAt', direction: 'desc' };
    setDraftSortField(nextSort.field);
    setDraftSortDirection(nextSort.direction);
    onSortChange?.(nextSort);
    setSortOpened(false);
  };

  const startResize = () => {
    const onMove = (event: PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setWidthPercent(
        clamp(((event.clientX - rect.left) / rect.width) * 100, minWidthPercent, maxWidthPercent)
      );
    };
    const onEnd = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onEnd);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onEnd);
  };

  const onScroll = (position: { x: number; y: number }) => {
    if (loading || loadMoreTriggeredRef.current) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    const bottomOffset = viewport.scrollHeight - viewport.clientHeight - position.y;
    if (loadedItemsCount < totalItems && bottomOffset <= 24) {
      loadMoreTriggeredRef.current = true;
      onReachListEnd?.();
    }
  };

  const filterModalBody = renderFilterModal ? (
    renderFilterModal({
      draftFilter,
      setDraftFilter,
      applyFilter,
      resetFilter,
      closeModal: () => setFilterOpened(false),
    })
  ) : (
    <Stack>
      <Select
        label={filterLabel}
        value={draftFilter[filterField] ?? 'all'}
        onChange={(value) =>
          setDraftFilter((prev) => ({
            ...prev,
            [filterField]: value === 'all' ? undefined : value ?? undefined,
          }))
        }
        data={filterOptions}
      />
      <Box style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--mantine-spacing-md)' }}>
        <Button size="xs" variant="light" onClick={resetFilter}>
          Reset
        </Button>
        <Button size="xs" onClick={applyFilter}>
          Apply
        </Button>
      </Box>
    </Stack>
  );
  const sortModalBody = renderSortModal ? (
    renderSortModal({
      draftSort: { field: draftSortField, direction: draftSortDirection },
      setDraftSort: (next) => {
        setDraftSortField(next.field);
        setDraftSortDirection(next.direction);
      },
      applySort,
      resetSort,
      closeModal: () => setSortOpened(false),
    })
  ) : (
    <Stack>
      <Select
        label={sortFieldLabel}
        value={draftSortField}
        onChange={(value) => setDraftSortField((value as CardListColumnSort['field']) ?? 'createdAt')}
        data={sortOptions}
      />
      <Select
        label={sortDirectionLabel}
        value={draftSortDirection}
        onChange={(value) => setDraftSortDirection((value as CardListColumnSort['direction']) ?? 'desc')}
        data={sortDirectionOptions}
      />
      <Box style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--mantine-spacing-md)' }}>
        <Button size="xs" variant="light" onClick={resetSort}>
          Reset
        </Button>
        <Button size="xs" onClick={applySort}>
          Apply
        </Button>
      </Box>
    </Stack>
  );

  const body = (
    <Paper
      withBorder
      radius="md"
      p="sm"
      style={{
        width: collapsed ? 72 : `${widthPercent}%`,
        minWidth: collapsed ? 72 : 200,
        height: 520,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}>
      {collapsed ? (
        <Stack align="center" gap="sm" mt="xs">
          <ActionIcon
            variant="subtle"
            color="gray"
            aria-label="Expand list"
            onClick={() => setCollapsed(false)}>
            <ArrowRightToLineIcon size={14} />
          </ActionIcon>
          <Badge variant="light" color="teal">
            {totalItems}
          </Badge>
          <Text size="xs" fw={600} ta="center" style={{ writingMode: 'vertical-rl' }}>
            {title}
          </Text>
        </Stack>
      ) : (
        <>
          <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--mantine-spacing-xs)' }}>
            <Text fw={600}>{title}</Text>
            <Box style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Badge variant="light" color="teal">
                {totalItems}
              </Badge>
              {mode === 'inline' ? (
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  aria-label="Collapse list"
                  onClick={() => setCollapsed(true)}>
                  <ArrowLeftToLineIcon size={14} />
                </ActionIcon>
              ) : null}
              {mode === 'overlay' ? (
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  aria-label="Close overlay list"
                  onClick={() => setOverlayOpened(false)}>
                  <XIcon size={14} />
                </ActionIcon>
              ) : null}
            </Box>
          </Box>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'nowrap',
              marginBottom: 'var(--mantine-spacing-xs)',
            }}>
            <TextInput
              leftSection={<SearchIcon size={14} />}
              aria-label="Search cards"
              placeholder="Search cards"
              size={isCompactDensity ? 'xs' : 'sm'}
              value={query}
              onChange={(e) => {
                const value = e.currentTarget.value;
                setLocalQuery(value);
                onSearchChange?.(value);
              }}
              style={{ flex: 1 }}
            />
            <Box style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'nowrap' }}>
              {withFilter ? (
                <ActionIcon
                  variant="light"
                  color="gray"
                  aria-label="Open filter options"
                  onClick={() => setFilterOpened(true)}>
                  <FilterIcon size={14} />
                </ActionIcon>
              ) : null}
              {withSort ? (
                <ActionIcon
                  variant="light"
                  color="gray"
                  aria-label="Open sorting options"
                  onClick={() => setSortOpened(true)}>
                  <ListFilterIcon size={14} />
                </ActionIcon>
              ) : null}
              {withAdd ? (
                <ActionIcon
                  variant="filled"
                  color="teal"
                  aria-label="Add new item"
                  onClick={() => (onAddItem ? onAddItem() : setAddOpened(true))}>
                  <PlusIcon size={14} />
                </ActionIcon>
              ) : null}
            </Box>
          </Box>
          <Box style={{ flex: 1, minHeight: 0 }}>
            <ScrollArea h="100%" viewportRef={viewportRef} onScrollPositionChange={onScroll}>
              <Stack gap="sm">
                {!loading && items.length === 0 ? (
                  <Text size="sm" c="dimmed">
                    No items for current server query.
                  </Text>
                ) : null}
                {items.map((item) => (
                  <Box key={item.id} style={{ height: cardHeight }}>
                    {renderCard ? (
                      <Box style={{ height: cardHeight, overflow: 'hidden' }}>{renderCard(item)}</Box>
                    ) : (
                      <DefaultCard item={item} cardHeight={cardHeight} />
                    )}
                  </Box>
                ))}
                {loading ? (
                  <Text size="sm" c="dimmed">
                    Reloading 1..{loadedItemsCount} from server...
                  </Text>
                ) : null}
                {!loading && loadedItemsCount < totalItems ? (
                  <Text size="xs" c="dimmed">
                    Scroll to end to load 1..{Math.min(loadedItemsCount + 50, totalItems)}.
                  </Text>
                ) : null}
              </Stack>
            </ScrollArea>
          </Box>
          <Text size="xs" c="dimmed" mt="sm">
            Loaded {loadedItemsCount} of {totalItems}.
          </Text>
        </>
      )}
      {!collapsed ? (
        <Box
          role="separator"
          aria-label="Resize list width"
          onPointerDown={startResize}
          style={{
            position: 'absolute',
            top: 0,
            right: -4,
            width: 8,
            height: '100%',
            cursor: 'col-resize',
          }}
        />
      ) : null}
    </Paper>
  );

  return (
    <Box ref={containerRef} style={{ width: '100%' }}>
      {mode === 'inline' ? (
        body
      ) : (
        <>
          <Button
            variant="light"
            color="gray"
            size={isCompactDensity ? 'xs' : 'sm'}
            onClick={() => setOverlayOpened((current) => !current)}>
            {overlayOpened ? 'Hide overlay list' : 'Show overlay list'}
          </Button>
          {overlayOpened ? (
            <Box style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 400 }}>
              <Box
                style={{
                  padding: 'var(--mantine-spacing-lg)',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  height: '100%',
                }}>
                {body}
              </Box>
            </Box>
          ) : null}
        </>
      )}
      <Modal opened={filterOpened} onClose={() => setFilterOpened(false)} title={filterModalTitle}>
        {filterModalBody}
      </Modal>
      <Modal opened={sortOpened} onClose={() => setSortOpened(false)} title={sortModalTitle}>
        {sortModalBody}
      </Modal>
      <Modal opened={addOpened} onClose={() => setAddOpened(false)} title="Add new item">
        <Text size="sm" c="dimmed">
          Add flow can be implemented with product-specific form fields.
        </Text>
      </Modal>
    </Box>
  );
}
