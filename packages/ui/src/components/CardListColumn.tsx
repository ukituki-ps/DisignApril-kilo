import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Group,
  Paper,
  ScrollArea,
  Select,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import type { LucideIcon } from 'lucide-react';
import {
  FileTextIcon,
  FilterIcon,
  LayoutGridIcon,
  ListIcon,
  PanelLeftCloseIcon,
  ListFilterIcon,
  PlusIcon,
  SearchIcon,
  XIcon,
} from 'lucide-react';
import { AprilIconCheck, AprilIconRotateCcw } from '../icons';
import { useDensity } from '../DensityContext';
import { AprilMobileShellBar, type AprilMobileShellBarPosition } from './AprilMobileShellBar';
import { aprilMobileShellBarGhostWhiteBorderActionStyles } from './aprilMobileShellBarLayout';
import { AprilModal } from './AprilModal';
import { AprilVaulBottomSheet } from './AprilVaulBottomSheet';
import { aprilMobileShellBarContentPaddingBottom } from './aprilMobileShellBarLayout';
import { DefaultListCard } from './cardListColumn/DefaultListCard';
import { GridItemCard } from './cardListColumn/GridItemCard';
import type { CardListColumnItem } from './cardListColumn/types';
import { cardListColumnViewLabelRu, getNextCardListColumnView, type CardListColumnView } from './cardListColumn/viewCycle';

export type { CardListColumnItem } from './cardListColumn/types';
export type { CardListColumnView } from './cardListColumn/viewCycle';

export type CardListColumnMode = 'inline' | 'overlay';
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

/** Управление мобильным режимом колонки (&lt;768px, порог `sm` Mantine). */
export type CardListColumnMobileLayout = 'off' | 'auto' | 'on';

export interface CardListColumnProps {
  title: string;
  items: CardListColumnItem[];
  mode: CardListColumnMode;
  totalItems?: number;
  loadedItemsCount?: number;
  cardHeight?: number;
  heightMode?: 'fixed' | 'fill';
  fixedHeight?: number | string;
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
  /**
   * Полное тело модалки фильтра. По договорённости April размещайте кнопки в шапке (см. {@link AprilModal}
   * и `DESIGN_SYSTEM.md`): при кастомном теле без `headerActions` встроенный `AprilModal` показывает только заголовок
   * и крестик — действия нужно вынести в шапку на стороне продукта или оставить вторичный поток в теле осознанно.
   */
  renderFilterModal?: (props: CardListColumnFilterModalRenderProps) => ReactNode;
  sortModalTitle?: string;
  sortFieldLabel?: string;
  sortDirectionLabel?: string;
  sortOptions?: CardListColumnSortOption[];
  sortDirectionOptions?: CardListColumnSortDirectionOption[];
  /** См. комментарий к `renderFilterModal` — тот же паттерн шапки для сортировки. */
  renderSortModal?: (props: CardListColumnSortModalRenderProps) => ReactNode;
  renderCard?: (item: CardListColumnItem) => React.ReactNode;
  onSearchChange?: (value: string) => void;
  onReachListEnd?: () => void;
  onFilterChange?: (value: CardListColumnFilter) => void;
  onSortChange?: (value: CardListColumnSort) => void;
  onAddItem?: () => void;
  /** Вид колонки: список, сетка или свёрнутая полоса. Управляемый режим вместе с `onViewChange`. */
  view?: CardListColumnView;
  /** Начальный вид при неуправляемом `view`. По умолчанию `list`. */
  defaultView?: CardListColumnView;
  onViewChange?: (view: CardListColumnView) => void;
  /** Выбранный элемент (управляемый режим вместе с `onSelectItem`). */
  selectedItemId?: string | null;
  defaultSelectedItemId?: string | null;
  onSelectItem?: (id: string | null) => void;
  /** Иконка в аватаре по умолчанию, если у элемента нет `imageUrl` и `avatarIcon`. */
  defaultListItemIcon?: LucideIcon;
  /** Текст в свёрнутом виде, если ничего не выбрано. */
  emptySelectionLabel?: string;
  /**
   * Mobile (&lt;768px): одна колонка карточек, тулбар в {@link AprilMobileShellBar}, листы вместо центрированных модалок.
   * По умолчанию `off` — поведение как на десктопе (без регрессий в узком iframe). `auto` — по `(max-width: 47.99em)`.
   */
  mobileLayout?: CardListColumnMobileLayout;
  /** Позиция капсулы: `absolute` — внутри ближайшего `position: relative` контейнера колонки; `fixed` — к низу viewport. */
  mobileShellBarPosition?: AprilMobileShellBarPosition;
  /** Ведущий слот нижней панели в режиме «экран колонки» (например «Назад»). При открытом листе обычно не передаётся. */
  mobileShellLeading?: ReactNode;
  /** Рамка вокруг колонки (`Paper`). По умолчанию `true`; на узком экране без отступов контейнера можно передать `false`. */
  withPaperBorder?: boolean;
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
const DEFAULT_FILTER_OPTIONS: CardListColumnFilterOption[] = [
  { label: 'Все', value: 'all' },
  { label: 'К выполнению', value: 'todo' },
  { label: 'В работе', value: 'in-progress' },
  { label: 'Готово', value: 'done' },
];
const DEFAULT_SORT_OPTIONS: CardListColumnSortOption[] = [
  { label: 'Дата создания', value: 'createdAt' },
  { label: 'Заголовок', value: 'title' },
];
const DEFAULT_SORT_DIRECTION_OPTIONS: CardListColumnSortDirectionOption[] = [
  { label: 'По убыванию', value: 'desc' },
  { label: 'По возрастанию', value: 'asc' },
];
const getStableFilterKey = (filter: CardListColumnFilter | undefined) => {
  const source = filter ?? {};
  const orderedEntries = Object.keys(source)
    .sort()
    .map((key) => [key, source[key]] as const);

  return JSON.stringify(orderedEntries);
};

function pseudoProgressFromId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (h + id.charCodeAt(i) * 13) % 100;
  }
  return 18 + (h % 72);
}

function CycleViewIcon({ view }: { view: CardListColumnView }) {
  switch (view) {
    case 'list':
      return <ListIcon size={14} aria-hidden />;
    case 'grid':
      return <LayoutGridIcon size={14} aria-hidden />;
    case 'collapsed':
      return <PanelLeftCloseIcon size={14} aria-hidden />;
    default:
      return null;
  }
}

export function CardListColumn({
  title,
  items,
  mode,
  totalItems = items.length,
  loadedItemsCount = items.length,
  cardHeight = 104,
  heightMode = 'fixed',
  fixedHeight = 520,
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
  filterLabel = 'Статус',
  filterOptions = DEFAULT_FILTER_OPTIONS,
  filterModalTitle = 'Фильтры',
  renderFilterModal,
  sortModalTitle = 'Сортировка',
  sortFieldLabel = 'Поле',
  sortDirectionLabel = 'Направление',
  sortOptions = DEFAULT_SORT_OPTIONS,
  sortDirectionOptions = DEFAULT_SORT_DIRECTION_OPTIONS,
  renderSortModal,
  renderCard,
  onSearchChange,
  onReachListEnd,
  onFilterChange,
  onSortChange,
  onAddItem,
  view: viewProp,
  defaultView = 'list',
  onViewChange,
  selectedItemId: selectedItemIdProp,
  defaultSelectedItemId = null,
  onSelectItem,
  defaultListItemIcon: DefaultListItemIcon = FileTextIcon,
  emptySelectionLabel = 'Ничего не выбрано',
  mobileLayout = 'off',
  mobileShellBarPosition = 'absolute',
  mobileShellLeading,
  withPaperBorder = true,
}: CardListColumnProps) {
  const { density } = useDensity();
  const isCompactDensity = density === 'compact';
  const matchesNarrowViewport = useMediaQuery('(max-width: 47.99em)');
  const isMobile =
    mobileLayout === 'on' || (mobileLayout === 'auto' && Boolean(matchesNarrowViewport));
  const [mobileSearchExpanded, setMobileSearchExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const loadMoreTriggeredRef = useRef(false);
  const lastSyncedFilterKeyRef = useRef('');
  const lastSyncedSortKeyRef = useRef('');
  const [localQuery, setLocalQuery] = useState('');
  const [uncontrolledView, setUncontrolledView] = useState<CardListColumnView>(defaultView);
  const isViewControlled = viewProp !== undefined;
  const currentView = isViewControlled ? viewProp : uncontrolledView;

  const [uncontrolledSelected, setUncontrolledSelected] = useState<string | null>(defaultSelectedItemId);
  const isSelectedControlled = selectedItemIdProp !== undefined;
  const effectiveSelectedId = (isSelectedControlled ? selectedItemIdProp : uncontrolledSelected) ?? null;

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

  const setView = (next: CardListColumnView) => {
    onViewChange?.(next);
    if (!isViewControlled) {
      setUncontrolledView(next);
    }
  };

  const selectItem = (id: string) => {
    const next = effectiveSelectedId === id ? null : id;
    onSelectItem?.(next);
    if (!isSelectedControlled) {
      setUncontrolledSelected(next);
    }
  };

  const nextView = getNextCardListColumnView(currentView);
  const nextViewLabel = cardListColumnViewLabelRu(nextView);
  const cycleAriaLabel = `Следующий вид: ${nextViewLabel}`;

  const selectedItem = useMemo(
    () => items.find((i) => i.id === effectiveSelectedId),
    [items, effectiveSelectedId]
  );
  const collapsedSelectedTitle = selectedItem?.title ?? emptySelectionLabel;

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
    </Stack>
  );

  const listHeight = heightMode === 'fill' ? '100%' : fixedHeight;
  const isCollapsed = currentView === 'collapsed' && !isMobile;
  const isGrid = currentView === 'grid' || isMobile;
  const showListChrome = currentView === 'list' && !isMobile;
  const showGridChrome = currentView === 'grid' || isMobile;
  /** Узкая полоса: подпись выбранного элемента идёт вертикально (`writing-mode`). */
  const collapsedRailWidth = 48;
  const paperWidth = isCollapsed ? collapsedRailWidth : isGrid ? '100%' : `${widthPercent}%`;
  const paperMinWidth = isCollapsed ? collapsedRailWidth : isGrid ? 0 : 200;

  const cycleControl = (
    <Tooltip label={`Следующий вид: ${nextViewLabel}`} withArrow openDelay={400}>
      <ActionIcon
        variant="subtle"
        color="gray"
        aria-label={cycleAriaLabel}
        onClick={() => setView(getNextCardListColumnView(currentView))}
      >
        <CycleViewIcon view={nextView} />
      </ActionIcon>
    </Tooltip>
  );

  const listAndGridFooter = (
    <Text size="xs" c="dimmed" mt="sm">
      Загружено {loadedItemsCount} из {totalItems}.
    </Text>
  );

  const listScrollContent = (
    <Stack gap="sm">
      {!loading && items.length === 0 ? (
        <Text size="sm" c="dimmed">
          Нет элементов для текущего запроса.
        </Text>
      ) : null}
      {items.map((item) => {
        const selected = effectiveSelectedId === item.id;
        return (
          <Box key={item.id} style={{ height: cardHeight }}>
            {renderCard ? (
              <Box
                role="button"
                tabIndex={0}
                onClick={() => selectItem(item.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectItem(item.id);
                  }
                }}
                style={{
                  height: cardHeight,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  borderRadius: 'var(--mantine-radius-md)',
                  outline: selected ? '2px solid var(--mantine-color-teal-filled)' : undefined,
                  outlineOffset: 0,
                }}
              >
                {renderCard(item)}
              </Box>
            ) : (
              <DefaultListCard
                item={item}
                cardHeight={cardHeight}
                selected={selected}
                isCompactDensity={isCompactDensity}
                FallbackIcon={DefaultListItemIcon}
                onSelect={() => selectItem(item.id)}
              />
            )}
          </Box>
        );
      })}
      {loading ? (
        <Text size="sm" c="dimmed">
          Обновление: 1…{loadedItemsCount} с сервера…
        </Text>
      ) : null}
      {!loading && loadedItemsCount < totalItems ? (
        <Text size="xs" c="dimmed">
          Прокрутите до конца, чтобы подгрузить 1…{Math.min(loadedItemsCount + 50, totalItems)}.
        </Text>
      ) : null}
    </Stack>
  );

  /** В режиме сетки карточка не шире этого значения (px) и центрируется в ячейке грида. */
  const gridCardMaxWidthPx = 440;

  const gridScrollContent = (
    <Box
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile
          ? 'minmax(0, 1fr)'
          : 'repeat(auto-fill, minmax(min(100%, 220px), 1fr))',
        gap: 'var(--mantine-spacing-sm)',
        alignContent: 'start',
        justifyItems: 'center',
      }}
    >
      {!loading && items.length === 0 ? (
        <Text size="sm" c="dimmed" style={{ gridColumn: '1 / -1' }}>
          Нет элементов для текущего запроса.
        </Text>
      ) : null}
      {items.map((item) => {
        const selected = effectiveSelectedId === item.id;
        const gridItemShellStyle = {
          minHeight: 148,
          width: `min(100%, ${gridCardMaxWidthPx}px)`,
          maxWidth: '100%',
        };
        return (
          <Box key={item.id} style={gridItemShellStyle}>
            {renderCard ? (
              <Box
                role="button"
                tabIndex={0}
                onClick={() => selectItem(item.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectItem(item.id);
                  }
                }}
                h="100%"
                style={{
                  cursor: 'pointer',
                  borderRadius: 'var(--mantine-radius-md)',
                  outline: selected ? '2px solid var(--mantine-color-teal-filled)' : undefined,
                }}
              >
                {renderCard(item)}
              </Box>
            ) : (
              <GridItemCard
                item={item}
                selected={selected}
                isCompactDensity={isCompactDensity}
                FallbackIcon={DefaultListItemIcon}
                onSelect={() => selectItem(item.id)}
                progressPercent={pseudoProgressFromId(item.id)}
              />
            )}
          </Box>
        );
      })}
      {loading ? (
        <Text size="sm" c="dimmed" style={{ gridColumn: '1 / -1' }}>
          Обновление: 1…{loadedItemsCount} с сервера…
        </Text>
      ) : null}
      {!loading && loadedItemsCount < totalItems ? (
        <Text size="xs" c="dimmed" style={{ gridColumn: '1 / -1' }}>
          Прокрутите до конца, чтобы подгрузить 1…{Math.min(loadedItemsCount + 50, totalItems)}.
        </Text>
      ) : null}
    </Box>
  );

  useEffect(() => {
    if (!isMobile) {
      return;
    }
    if (filterOpened || sortOpened || addOpened) {
      setMobileSearchExpanded(false);
    }
  }, [isMobile, filterOpened, sortOpened, addOpened]);

  const sheetOpen = filterOpened || sortOpened || addOpened;

  const shellIconGroupStyle = { width: '100%', justifyContent: 'flex-end' } as const;

  const shellCenterIdle = (
    <Group gap="xs" wrap="nowrap" align="center" style={shellIconGroupStyle}>
      {withFilter ? (
        <Tooltip label="Фильтры" withArrow openDelay={400}>
          <ActionIcon
            variant="default"
            styles={aprilMobileShellBarGhostWhiteBorderActionStyles}
            size="lg"
            radius="md"
            aria-label="Открыть фильтры"
            onClick={() => setFilterOpened(true)}>
            <FilterIcon size={20} aria-hidden />
          </ActionIcon>
        </Tooltip>
      ) : null}
      {withSort ? (
        <Tooltip label="Сортировка" withArrow openDelay={400}>
          <ActionIcon
            variant="default"
            styles={aprilMobileShellBarGhostWhiteBorderActionStyles}
            size="lg"
            radius="md"
            aria-label="Открыть сортировку"
            onClick={() => setSortOpened(true)}>
            <ListFilterIcon size={20} aria-hidden />
          </ActionIcon>
        </Tooltip>
      ) : null}
      {withAdd ? (
        <Tooltip label="Добавить" withArrow openDelay={400}>
          <ActionIcon
            variant="default"
            styles={aprilMobileShellBarGhostWhiteBorderActionStyles}
            size="lg"
            radius="md"
            aria-label="Добавить элемент"
            onClick={() => (onAddItem ? onAddItem() : setAddOpened(true))}>
            <PlusIcon size={20} aria-hidden />
          </ActionIcon>
        </Tooltip>
      ) : null}
    </Group>
  );

  const shellCenterFilter = renderFilterModal ? (
    <Group gap="xs" wrap="nowrap" justify="flex-end" style={shellIconGroupStyle}>
      <Tooltip label="Закрыть" withArrow openDelay={400}>
        <ActionIcon
          variant="default"
          styles={aprilMobileShellBarGhostWhiteBorderActionStyles}
          size="lg"
          radius="md"
          aria-label="Закрыть фильтр"
          onClick={() => setFilterOpened(false)}>
          <XIcon size={20} aria-hidden />
        </ActionIcon>
      </Tooltip>
    </Group>
  ) : (
    <Group gap="xs" wrap="nowrap" justify="flex-end" style={shellIconGroupStyle}>
      <Tooltip label="Сбросить" withArrow openDelay={400}>
        <ActionIcon
          variant="default"
          styles={aprilMobileShellBarGhostWhiteBorderActionStyles}
          size="lg"
          radius="md"
          onClick={resetFilter}
          aria-label="Сбросить фильтр"
          title="Сбросить">
          <AprilIconRotateCcw size={20} aria-hidden />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Применить" withArrow openDelay={400}>
        <ActionIcon
          variant="default"
          styles={aprilMobileShellBarGhostWhiteBorderActionStyles}
          size="lg"
          radius="md"
          onClick={applyFilter}
          aria-label="Применить фильтр"
          title="Применить">
          <AprilIconCheck size={20} aria-hidden />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Закрыть" withArrow openDelay={400}>
        <ActionIcon
          variant="default"
          styles={aprilMobileShellBarGhostWhiteBorderActionStyles}
          size="lg"
          radius="md"
          aria-label="Закрыть без сохранения"
          onClick={() => setFilterOpened(false)}>
          <XIcon size={20} aria-hidden />
        </ActionIcon>
      </Tooltip>
    </Group>
  );

  const shellCenterSort = renderSortModal ? (
    <Group gap="xs" wrap="nowrap" justify="flex-end" style={shellIconGroupStyle}>
      <Tooltip label="Закрыть" withArrow openDelay={400}>
        <ActionIcon
          variant="default"
          styles={aprilMobileShellBarGhostWhiteBorderActionStyles}
          size="lg"
          radius="md"
          aria-label="Закрыть сортировку"
          onClick={() => setSortOpened(false)}>
          <XIcon size={20} aria-hidden />
        </ActionIcon>
      </Tooltip>
    </Group>
  ) : (
    <Group gap="xs" wrap="nowrap" justify="flex-end" style={shellIconGroupStyle}>
      <Tooltip label="Сбросить" withArrow openDelay={400}>
        <ActionIcon
          variant="default"
          styles={aprilMobileShellBarGhostWhiteBorderActionStyles}
          size="lg"
          radius="md"
          onClick={resetSort}
          aria-label="Сбросить сортировку"
          title="Сбросить">
          <AprilIconRotateCcw size={20} aria-hidden />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Применить" withArrow openDelay={400}>
        <ActionIcon
          variant="default"
          styles={aprilMobileShellBarGhostWhiteBorderActionStyles}
          size="lg"
          radius="md"
          onClick={applySort}
          aria-label="Применить сортировку"
          title="Применить">
          <AprilIconCheck size={20} aria-hidden />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Закрыть" withArrow openDelay={400}>
        <ActionIcon
          variant="default"
          styles={aprilMobileShellBarGhostWhiteBorderActionStyles}
          size="lg"
          radius="md"
          aria-label="Закрыть без сохранения"
          onClick={() => setSortOpened(false)}>
          <XIcon size={20} aria-hidden />
        </ActionIcon>
      </Tooltip>
    </Group>
  );

  const shellCenterAdd = (
    <Group gap="xs" wrap="nowrap" justify="flex-end" style={shellIconGroupStyle}>
      <Tooltip label="Закрыть" withArrow openDelay={400}>
        <ActionIcon
          variant="default"
          styles={aprilMobileShellBarGhostWhiteBorderActionStyles}
          size="lg"
          radius="md"
          aria-label="Закрыть"
          onClick={() => setAddOpened(false)}>
          <XIcon size={20} aria-hidden />
        </ActionIcon>
      </Tooltip>
    </Group>
  );

  const shellCenterActive = filterOpened
    ? shellCenterFilter
    : sortOpened
      ? shellCenterSort
      : addOpened
        ? shellCenterAdd
        : shellCenterIdle;

  const paperStyle = {
    width: paperWidth,
    minWidth: paperMinWidth,
    maxWidth: isGrid ? '100%' : undefined,
    height: (isMobile ? '100%' : listHeight) as string | number,
    flex: isMobile ? ('1 1 auto' as const) : undefined,
    minHeight: isMobile ? 0 : undefined,
    position: 'relative' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    boxSizing: 'border-box' as const,
  };

  const paperBody = (
    <Paper
      withBorder={withPaperBorder}
      radius={withPaperBorder ? 'md' : 0}
      p={isCollapsed ? 'xs' : 'sm'}
      style={paperStyle}>
      {isCollapsed ? (
        <Stack align="center" gap={6} mt={4} style={{ flex: 1, minHeight: 0, width: '100%' }}>
          {cycleControl}
          <Badge variant="light" color="teal" size="xs">
            {totalItems}
          </Badge>
          <Tooltip label={collapsedSelectedTitle} disabled={collapsedSelectedTitle.length < 20} withArrow>
            <Text
              size="xs"
              fw={600}
              ta="center"
              title={collapsedSelectedTitle}
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                maxWidth: '100%',
                maxHeight: 'min(280px, 45vh)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                flex: '1 1 auto',
                marginTop: 4,
              }}
            >
              {collapsedSelectedTitle}
            </Text>
          </Tooltip>
          <Text
            size="xs"
            c="dimmed"
            ta="center"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', marginTop: 'auto', maxHeight: 120 }}
            title={title}
          >
            {title}
          </Text>
        </Stack>
      ) : null}

      {showListChrome ? (
        <>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--mantine-spacing-xs)',
            }}
          >
            <Text fw={600}>{title}</Text>
            <Box style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Badge variant="light" color="teal">
                {totalItems}
              </Badge>
              {!isMobile && mode === 'inline' ? cycleControl : null}
              {!isMobile && mode === 'overlay' ? (
                <>
                  {cycleControl}
                  <ActionIcon
                    variant="subtle"
                    color="gray"
                    aria-label="Закрыть список поверх страницы"
                    onClick={() => setOverlayOpened(false)}>
                    <XIcon size={14} />
                  </ActionIcon>
                </>
              ) : null}
            </Box>
          </Box>
          {!isMobile ? (
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'nowrap',
                gap: 'var(--mantine-spacing-xs)',
                marginBottom: 'var(--mantine-spacing-xs)',
              }}
            >
              <TextInput
                leftSection={<SearchIcon size={14} />}
                aria-label="Поиск по карточкам"
                placeholder="Поиск по карточкам"
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
                    aria-label="Открыть фильтры"
                    onClick={() => setFilterOpened(true)}>
                    <FilterIcon size={14} />
                  </ActionIcon>
                ) : null}
                {withSort ? (
                  <ActionIcon
                    variant="light"
                    color="gray"
                    aria-label="Открыть сортировку"
                    onClick={() => setSortOpened(true)}>
                    <ListFilterIcon size={14} />
                  </ActionIcon>
                ) : null}
                {withAdd ? (
                  <ActionIcon
                    variant="filled"
                    color="teal"
                    aria-label="Добавить элемент"
                    onClick={() => (onAddItem ? onAddItem() : setAddOpened(true))}>
                    <PlusIcon size={14} />
                  </ActionIcon>
                ) : null}
              </Box>
            </Box>
          ) : null}
          <Box style={{ flex: 1, minHeight: 0 }}>
            <ScrollArea
              h="100%"
              viewportRef={viewportRef}
              onScrollPositionChange={onScroll}
              styles={
                isMobile
                  ? { viewport: { paddingBottom: aprilMobileShellBarContentPaddingBottom() } }
                  : undefined
              }>
              {listScrollContent}
            </ScrollArea>
          </Box>
          {listAndGridFooter}
        </>
      ) : null}

      {showGridChrome ? (
        <>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--mantine-spacing-xs)',
            }}
          >
            <Text fw={600}>{title}</Text>
            <Box style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Badge variant="light" color="teal">
                {totalItems}
              </Badge>
              {!isMobile && mode === 'inline' ? cycleControl : null}
              {!isMobile && mode === 'overlay' ? (
                <>
                  {cycleControl}
                  <ActionIcon
                    variant="subtle"
                    color="gray"
                    aria-label="Закрыть список поверх страницы"
                    onClick={() => setOverlayOpened(false)}>
                    <XIcon size={14} />
                  </ActionIcon>
                </>
              ) : null}
            </Box>
          </Box>
          {!isMobile ? (
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'nowrap',
                gap: 'var(--mantine-spacing-xs)',
                marginBottom: 'var(--mantine-spacing-xs)',
              }}
            >
              <TextInput
                leftSection={<SearchIcon size={14} />}
                aria-label="Поиск по карточкам"
                placeholder="Поиск по карточкам"
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
                    aria-label="Открыть фильтры"
                    onClick={() => setFilterOpened(true)}>
                    <FilterIcon size={14} />
                  </ActionIcon>
                ) : null}
                {withSort ? (
                  <ActionIcon
                    variant="light"
                    color="gray"
                    aria-label="Открыть сортировку"
                    onClick={() => setSortOpened(true)}>
                    <ListFilterIcon size={14} />
                  </ActionIcon>
                ) : null}
                {withAdd ? (
                  <ActionIcon
                    variant="filled"
                    color="teal"
                    aria-label="Добавить элемент"
                    onClick={() => (onAddItem ? onAddItem() : setAddOpened(true))}>
                    <PlusIcon size={14} />
                  </ActionIcon>
                ) : null}
              </Box>
            </Box>
          ) : null}
          <Box style={{ flex: 1, minHeight: 0 }}>
            <ScrollArea
              h="100%"
              viewportRef={viewportRef}
              onScrollPositionChange={onScroll}
              styles={
                isMobile
                  ? { viewport: { paddingBottom: aprilMobileShellBarContentPaddingBottom() } }
                  : undefined
              }>
              {gridScrollContent}
            </ScrollArea>
          </Box>
          {listAndGridFooter}
        </>
      ) : null}

      {showListChrome ? (
        <Box
          role="separator"
          aria-label="Изменить ширину списка"
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

  const body = isMobile ? (
    <Box
      style={{
        position: 'relative',
        width: '100%',
        height: listHeight,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        boxSizing: 'border-box',
      }}>
      <Box style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>{paperBody}</Box>
      <AprilMobileShellBar
        position={mobileShellBarPosition}
        leading={sheetOpen ? undefined : mobileShellLeading}
        center={shellCenterActive}
        withSearch={!sheetOpen}
        searchPlaceholder="Поиск по карточкам"
        searchValue={query}
        onSearchValueChange={(value) => {
          setLocalQuery(value);
          onSearchChange?.(value);
        }}
        searchExpanded={mobileSearchExpanded}
        onSearchExpandedChange={setMobileSearchExpanded}
      />
    </Box>
  ) : (
    paperBody
  );

  return (
    <Box ref={containerRef} style={{ width: '100%', height: heightMode === 'fill' ? '100%' : undefined }}>
      {mode === 'inline' ? (
        body
      ) : (
        <>
          <Button
            variant="light"
            color="gray"
            size={isCompactDensity ? 'xs' : 'sm'}
            onClick={() => setOverlayOpened((current) => !current)}>
            {overlayOpened ? 'Скрыть список поверх' : 'Показать список поверх'}
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
      {!isMobile ? (
        <AprilModal
          opened={filterOpened}
          onClose={() => setFilterOpened(false)}
          headerTitle={filterModalTitle}
          headerActions={
            renderFilterModal ? undefined : (
              <>
                <ActionIcon
                  variant="light"
                  color="gray"
                  size={isCompactDensity ? 'md' : 'lg'}
                  onClick={resetFilter}
                  aria-label="Сбросить фильтр"
                  title="Сбросить"
                >
                  <AprilIconRotateCcw size={18} aria-hidden />
                </ActionIcon>
                <ActionIcon
                  variant="filled"
                  color="teal"
                  size={isCompactDensity ? 'md' : 'lg'}
                  onClick={applyFilter}
                  aria-label="Применить фильтр"
                  title="Применить"
                >
                  <AprilIconCheck size={18} aria-hidden />
                </ActionIcon>
              </>
            )
          }
        >
          {filterModalBody}
        </AprilModal>
      ) : (
        <AprilVaulBottomSheet
          opened={filterOpened}
          onClose={() => setFilterOpened(false)}
          headerTitle={filterModalTitle}
          withCloseButton={false}
        >
          {filterModalBody}
        </AprilVaulBottomSheet>
      )}
      {!isMobile ? (
        <AprilModal
          opened={sortOpened}
          onClose={() => setSortOpened(false)}
          headerTitle={sortModalTitle}
          headerActions={
            renderSortModal ? undefined : (
              <>
                <ActionIcon
                  variant="light"
                  color="gray"
                  size={isCompactDensity ? 'md' : 'lg'}
                  onClick={resetSort}
                  aria-label="Сбросить сортировку"
                  title="Сбросить"
                >
                  <AprilIconRotateCcw size={18} aria-hidden />
                </ActionIcon>
                <ActionIcon
                  variant="filled"
                  color="teal"
                  size={isCompactDensity ? 'md' : 'lg'}
                  onClick={applySort}
                  aria-label="Применить сортировку"
                  title="Применить"
                >
                  <AprilIconCheck size={18} aria-hidden />
                </ActionIcon>
              </>
            )
          }
        >
          {sortModalBody}
        </AprilModal>
      ) : (
        <AprilVaulBottomSheet
          opened={sortOpened}
          onClose={() => setSortOpened(false)}
          headerTitle={sortModalTitle}
          withCloseButton={false}
        >
          {sortModalBody}
        </AprilVaulBottomSheet>
      )}
      {!isMobile ? (
        <AprilModal opened={addOpened} onClose={() => setAddOpened(false)} headerTitle="Новый элемент">
          <Text size="sm" c="dimmed">
            Сценарий добавления можно реализовать полями, специфичными для продукта.
          </Text>
        </AprilModal>
      ) : (
        <AprilVaulBottomSheet
          opened={addOpened}
          onClose={() => setAddOpened(false)}
          headerTitle="Новый элемент"
          withCloseButton={false}
        >
          <Text size="sm" c="dimmed">
            Сценарий добавления можно реализовать полями, специфичными для продукта.
          </Text>
        </AprilVaulBottomSheet>
      )}
    </Box>
  );
}
