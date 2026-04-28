import { useEffect, useRef, useState } from 'react';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Group,
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
export interface CardListColumnFilter {
  status?: string;
}
export interface CardListColumnSort {
  field: 'title' | 'createdAt';
  direction: 'asc' | 'desc';
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
  renderCard?: (item: CardListColumnItem) => React.ReactNode;
  onSearchChange?: (value: string) => void;
  onReachListEnd?: () => void;
  onFilterChange?: (value: CardListColumnFilter) => void;
  onSortChange?: (value: CardListColumnSort) => void;
  onAddItem?: () => void;
}
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
function DefaultCard({ item, cardHeight }: { item: CardListColumnItem; cardHeight: number }) {
  return (
    <Card withBorder radius="md" p="sm" style={{ height: cardHeight, overflow: 'hidden' }}>
      <Text fw={600} lineClamp={1}>{item.title}</Text>
      {item.description ? <Text size="sm" c="dimmed" mt="xs" lineClamp={3}>{item.description}</Text> : null}
    </Card>
  );
}
export function CardListColumn({
  title, items, mode, totalItems = items.length, loadedItemsCount = items.length, cardHeight = 104,
  defaultWidthPercent = 30, minWidthPercent = 15, maxWidthPercent = 50, withFilter = true, withSort = true,
  withAdd = true, searchValue, loading = false, filterValue, sortValue, renderCard, onSearchChange,
  onReachListEnd, onFilterChange, onSortChange, onAddItem,
}: CardListColumnProps) {
  const { density } = useDensity();
  const isCompactDensity = density === 'compact';
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const loadMoreTriggeredRef = useRef(false);
  const [localQuery, setLocalQuery] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [overlayOpened, setOverlayOpened] = useState(mode === 'overlay');
  const [filterOpened, setFilterOpened] = useState(false);
  const [sortOpened, setSortOpened] = useState(false);
  const [addOpened, setAddOpened] = useState(false);
  const [draftStatusFilter, setDraftStatusFilter] = useState<string>('all');
  const [draftSortField, setDraftSortField] = useState<CardListColumnSort['field']>('createdAt');
  const [draftSortDirection, setDraftSortDirection] = useState<CardListColumnSort['direction']>('desc');
  const [widthPercent, setWidthPercent] = useState(clamp(defaultWidthPercent, minWidthPercent, maxWidthPercent));
  const query = searchValue ?? localQuery;

  useEffect(() => setDraftStatusFilter(filterValue?.status ?? 'all'), [filterValue?.status]);
  useEffect(() => {
    setDraftSortField(sortValue?.field ?? 'createdAt');
    setDraftSortDirection(sortValue?.direction ?? 'desc');
  }, [sortValue?.field, sortValue?.direction]);
  useEffect(() => {
    // Allow next load trigger after request settled.
    if (!loading) {
      loadMoreTriggeredRef.current = false;
    }
  }, [loading, loadedItemsCount, totalItems]);

  const startResize = () => {
    const onMove = (event: PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setWidthPercent(clamp(((event.clientX - rect.left) / rect.width) * 100, minWidthPercent, maxWidthPercent));
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

  const body = (
    <Paper withBorder radius="md" p="sm" style={{ width: collapsed ? 72 : `${widthPercent}%`, minWidth: collapsed ? 72 : 200, height: 520, position: 'relative', display: 'flex', flexDirection: 'column' }}>
      {collapsed ? (
        <Stack align="center" gap="sm" mt="xs">
          <ActionIcon variant="subtle" color="gray" aria-label="Expand list" onClick={() => setCollapsed(false)}><ArrowRightToLineIcon size={14} /></ActionIcon>
          <Badge variant="light" color="teal">{totalItems}</Badge>
          <Text size="xs" fw={600} ta="center" style={{ writingMode: 'vertical-rl' }}>{title}</Text>
        </Stack>
      ) : (
        <>
          <Group justify="space-between" mb="xs">
            <Text fw={600}>{title}</Text>
            <Group gap={6}>
              <Badge variant="light" color="teal">{totalItems}</Badge>
              {mode === 'inline' ? <ActionIcon variant="subtle" color="gray" aria-label="Collapse list" onClick={() => setCollapsed(true)}><ArrowLeftToLineIcon size={14} /></ActionIcon> : null}
              {mode === 'overlay' ? <ActionIcon variant="subtle" color="gray" aria-label="Close overlay list" onClick={() => setOverlayOpened(false)}><XIcon size={14} /></ActionIcon> : null}
            </Group>
          </Group>
          <Group justify="space-between" wrap="nowrap" mb="xs">
            <TextInput leftSection={<SearchIcon size={14} />} aria-label="Search cards" placeholder="Search cards" size={isCompactDensity ? 'xs' : 'sm'} value={query} onChange={(e) => { const v = e.currentTarget.value; setLocalQuery(v); onSearchChange?.(v); }} style={{ flex: 1 }} />
            <Group gap={6} wrap="nowrap">
              {withFilter ? <ActionIcon variant="light" color="gray" aria-label="Open filter options" onClick={() => setFilterOpened(true)}><FilterIcon size={14} /></ActionIcon> : null}
              {withSort ? <ActionIcon variant="light" color="gray" aria-label="Open sorting options" onClick={() => setSortOpened(true)}><ListFilterIcon size={14} /></ActionIcon> : null}
              {withAdd ? <ActionIcon variant="filled" color="teal" aria-label="Add new item" onClick={() => onAddItem ? onAddItem() : setAddOpened(true)}><PlusIcon size={14} /></ActionIcon> : null}
            </Group>
          </Group>
          <Box style={{ flex: 1, minHeight: 0 }}>
            <ScrollArea h="100%" viewportRef={viewportRef} onScrollPositionChange={onScroll}>
              <Stack gap="sm">
                {!loading && items.length === 0 ? <Text size="sm" c="dimmed">No items for current server query.</Text> : null}
                {items.map((item) => <Box key={item.id} style={{ height: cardHeight }}>{renderCard ? <Box style={{ height: cardHeight, overflow: 'hidden' }}>{renderCard(item)}</Box> : <DefaultCard item={item} cardHeight={cardHeight} />}</Box>)}
                {loading ? <Text size="sm" c="dimmed">Reloading 1..{loadedItemsCount} from server...</Text> : null}
                {!loading && loadedItemsCount < totalItems ? <Text size="xs" c="dimmed">Scroll to end to load 1..{Math.min(loadedItemsCount + 50, totalItems)}.</Text> : null}
              </Stack>
            </ScrollArea>
          </Box>
          <Text size="xs" c="dimmed" mt="sm">Loaded {loadedItemsCount} of {totalItems}.</Text>
        </>
      )}
      {!collapsed ? <Box role="separator" aria-label="Resize list width" onPointerDown={startResize} style={{ position: 'absolute', top: 0, right: -4, width: 8, height: '100%', cursor: 'col-resize' }} /> : null}
    </Paper>
  );

  return (
    <Box ref={containerRef} style={{ width: '100%' }}>
      {mode === 'inline' ? body : <>
        <Button variant="light" color="gray" size={isCompactDensity ? 'xs' : 'sm'} onClick={() => setOverlayOpened((c) => !c)}>{overlayOpened ? 'Hide overlay list' : 'Show overlay list'}</Button>
        {overlayOpened ? <Box style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 400 }}><Box style={{ padding: 'var(--mantine-spacing-lg)', display: 'flex', justifyContent: 'flex-end', height: '100%' }}>{body}</Box></Box> : null}
      </>}
      <Modal opened={filterOpened} onClose={() => setFilterOpened(false)} title="Filter">
        <Stack>
          <Select label="Status" value={draftStatusFilter} onChange={(value) => setDraftStatusFilter(value ?? 'all')} data={[{ label: 'All', value: 'all' }, { label: 'Todo', value: 'todo' }, { label: 'In Progress', value: 'in-progress' }, { label: 'Done', value: 'done' }]} />
          <Group justify="flex-end">
            <Button size="xs" variant="light" onClick={() => { setDraftStatusFilter('all'); onFilterChange?.({}); setFilterOpened(false); }}>Reset</Button>
            <Button size="xs" onClick={() => { onFilterChange?.(draftStatusFilter === 'all' ? {} : { status: draftStatusFilter }); setFilterOpened(false); }}>Apply</Button>
          </Group>
        </Stack>
      </Modal>
      <Modal opened={sortOpened} onClose={() => setSortOpened(false)} title="Sort">
        <Stack>
          <Select label="Field" value={draftSortField} onChange={(value) => setDraftSortField((value as CardListColumnSort['field']) ?? 'createdAt')} data={[{ label: 'Created at', value: 'createdAt' }, { label: 'Title', value: 'title' }]} />
          <Select label="Direction" value={draftSortDirection} onChange={(value) => setDraftSortDirection((value as CardListColumnSort['direction']) ?? 'desc')} data={[{ label: 'Descending', value: 'desc' }, { label: 'Ascending', value: 'asc' }]} />
          <Group justify="flex-end">
            <Button size="xs" variant="light" onClick={() => { const nextSort: CardListColumnSort = { field: 'createdAt', direction: 'desc' }; setDraftSortField(nextSort.field); setDraftSortDirection(nextSort.direction); onSortChange?.(nextSort); setSortOpened(false); }}>Reset</Button>
            <Button size="xs" onClick={() => { onSortChange?.({ field: draftSortField, direction: draftSortDirection }); setSortOpened(false); }}>Apply</Button>
          </Group>
        </Stack>
      </Modal>
      <Modal opened={addOpened} onClose={() => setAddOpened(false)} title="Add new item">
        <Text size="sm" c="dimmed">Add flow can be implemented with product-specific form fields.</Text>
      </Modal>
    </Box>
  );
}
