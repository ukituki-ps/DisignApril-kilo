import { useState, useCallback, useMemo, type ReactNode } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  Group,
  Paper,
  Radio,
  ScrollArea,
  Select,
  Slider,
  Stack,
  Text,
  TextInput,
  Badge,
} from '@mantine/core';
import { Search, Filter, X } from 'lucide-react';
import { AprilVaulBottomSheet } from './AprilVaulBottomSheet';
import { useMediaQuery } from '@mantine/hooks';

// ─── Types ───────────────────────────────────────────────────────────────────

/** One selectable option inside a checkbox or radio facet. */
export interface FacetOption {
  value: string;
  label: string;
  count?: number;
}

/** Supported facet input types. */
export type FacetType = 'checkbox' | 'radio' | 'range' | 'select';

/** Single filter definition. */
export interface Facet {
  /** Unique identifier. */
  id: string;
  /** Visible filter name. */
  label: string;
  /** Input control type. */
  type: FacetType;
  /** Options for checkbox / radio / select. */
  options?: FacetOption[];
  /** Minimum for range. */
  min?: number;
  /** Maximum for range. */
  max?: number;
  /** Unit label for range (e.g. "₽"). */
  unit?: string;
}

/** Selected values per facet ID. */
export type FacetedSearchSelected = Record<string, string[]>;

/** Display mode. */
export type FacetedSearchMode = 'inline' | 'drawer' | 'auto';

export interface FacetedSearchProps {
  /** Filter definitions. */
  facets: Facet[];
  /** Currently selected values (controlled). */
  selected: FacetedSearchSelected;
  /** Called whenever selection changes. */
  onChange: (selected: FacetedSearchSelected) => void;
  /** Optional callback for "clear all". */
  onClearAll?: () => void;
  /** Optional integrated search text. */
  searchValue?: string;
  /** Called when search text changes. */
  onSearchChange?: (value: string) => void;
  /** Display mode. "auto" = inline on desktop, drawer / bottom-sheet on mobile. */
  mode?: FacetedSearchMode;
  /** Custom trigger button label (drawer / auto mode). */
  triggerLabel?: ReactNode;
  /** Filter panel title. */
  title?: string;
  /** "Clear all" button label. */
  clearAllLabel?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function activeFilterCount(selected: FacetedSearchSelected): number {
  return Object.values(selected).reduce((sum, vals) => sum + vals.length, 0);
}

// ─── Facet renderers ─────────────────────────────────────────────────────────

function CheckboxFacet({
  facet,
  selected,
  onChange,
}: {
  facet: Facet;
  selected: FacetedSearchSelected;
  onChange: (updated: FacetedSearchSelected) => void;
}) {
  const current = selected[facet.id] ?? [];
  const ids = facet.options?.map((o) => o.value) ?? [];

  const handleChange = (values: string[]) => {
    onChange({ ...selected, [facet.id]: values });
  };

  return (
    <Checkbox.Group
      label={facet.label}
      id={`facet-checkbox-${facet.id}`}
      value={current}
      onChange={handleChange}
      aria-labelledby={`facet-checkbox-${facet.id}`}
    >
      <Stack gap="xs">
        {ids.map((val) => {
          const opt = facet.options?.find((o) => o.value === val);
          if (!opt) return null;
          return (
            <Checkbox
              key={val}
              value={val}
              label={
                <Group gap="sm" wrap="nowrap">
                  <Text size="sm">{opt.label}</Text>
                  {opt.count != null && (
                    <Text size="xs" c="dimmed">
                      {opt.count}
                    </Text>
                  )}
                </Group>
              }
            />
          );
        })}
      </Stack>
    </Checkbox.Group>
  );
}

function RadioFacet({
  facet,
  selected,
  onChange,
}: {
  facet: Facet;
  selected: FacetedSearchSelected;
  onChange: (updated: FacetedSearchSelected) => void;
}) {
  const current = (selected[facet.id] ?? [])[0] ?? '';

  const handleChange = (value: string | null) => {
    onChange({
      ...selected,
      [facet.id]: value ? [value] : [],
    });
  };

  return (
    <Radio.Group
      label={facet.label}
      id={`facet-radio-${facet.id}`}
      value={current}
      onChange={handleChange}
      aria-labelledby={`facet-radio-${facet.id}`}
    >
      <Stack gap="xs">
        {(facet.options ?? []).map((opt) => (
          <Radio
            key={opt.value}
            value={opt.value}
            label={
              <Group gap="sm" wrap="nowrap">
                <Text size="sm">{opt.label}</Text>
                {opt.count != null && (
                  <Text size="xs" c="dimmed">
                    {opt.count}
                  </Text>
                )}
              </Group>
            }
          />
        ))}
      </Stack>
    </Radio.Group>
  );
}

function RangeFacet({
  facet,
  selected,
  onChange,
}: {
  facet: Facet;
  selected: FacetedSearchSelected;
  onChange: (updated: FacetedSearchSelected) => void;
}) {
  const minVal = facet.min ?? 0;
  const maxVal = facet.max ?? 100;
  const unit = facet.unit ?? '';
  const vals = selected[facet.id] ?? [];
  const low = vals[0] ? Number(vals[0]) : minVal;
  const high = vals[1] ? Number(vals[1]) : maxVal;

  const handleLow = (value: number) => {
    onChange({ ...selected, [facet.id]: [String(value), String(high)] });
  };

  const handleHigh = (value: number) => {
    onChange({ ...selected, [facet.id]: [String(low), String(value)] });
  };

  return (
    <Stack gap="xs" id={`facet-range-${facet.id}`}>
      <Text size="sm" fw={500}>
        {facet.label}
      </Text>
      <Group justify="space-between" gap="xs">
        <TextInput
          value={String(low)}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (!Number.isNaN(v) && v <= high) handleLow(Math.min(v, high));
          }}
          rightSection={unit ? <Text size="xs" c="dimmed">{unit}</Text> : undefined}
          aria-label={`Минимум ${facet.label}`}
          size="sm"
          type="number"
        />
        <Text size="xs" c="dimmed" ta="center">
          —
        </Text>
        <TextInput
          value={String(high)}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (!Number.isNaN(v) && v >= low) handleHigh(Math.max(v, low));
          }}
          rightSection={unit ? <Text size="xs" c="dimmed">{unit}</Text> : undefined}
          aria-label={`Максимум ${facet.label}`}
          size="sm"
          type="number"
        />
      </Group>
      <Slider
        min={minVal}
        max={maxVal}
        value={low}
        onChange={handleLow}
        labelAlwaysOn={false}
        aria-label={`Минимум ${facet.label}`}
      />
      <Slider
        min={minVal}
        max={maxVal}
        value={high}
        onChange={handleHigh}
        labelAlwaysOn={false}
        aria-label={`Максимум ${facet.label}`}
      />
    </Stack>
  );
}

function SelectFacet({
  facet,
  selected,
  onChange,
}: {
  facet: Facet;
  selected: FacetedSearchSelected;
  onChange: (updated: FacetedSearchSelected) => void;
}) {
  const current = (selected[facet.id] ?? [])[0] ?? '';

  const handleChange = (value: string | null) => {
    onChange({
      ...selected,
      [facet.id]: value ? [value] : [],
    });
  };

  const data = (facet.options ?? []).map((opt) => ({
    value: opt.value,
    label: opt.count != null ? `${opt.label} (${opt.count})` : opt.label,
  }));

  return (
    <Select
      id={`facet-select-${facet.id}`}
      label={facet.label}
      data={data}
      value={current || null}
      onChange={handleChange}
      clearable
      aria-labelledby={`facet-select-${facet.id}`}
      size="sm"
    />
  );
}

// ─── Facet renderer dispatcher ──────────────────────────────────────────────

function FacetControl({
  facet,
  selected,
  onChange,
}: {
  facet: Facet;
  selected: FacetedSearchSelected;
  onChange: (updated: FacetedSearchSelected) => void;
}) {
  switch (facet.type) {
    case 'checkbox':
      return <CheckboxFacet facet={facet} selected={selected} onChange={onChange} />;
    case 'radio':
      return <RadioFacet facet={facet} selected={selected} onChange={onChange} />;
    case 'range':
      return <RangeFacet facet={facet} selected={selected} onChange={onChange} />;
    case 'select':
      return <SelectFacet facet={facet} selected={selected} onChange={onChange} />;
    default:
      return null;
  }
}

// ─── Pill badge for active selections ──────────────────────────────────────

function ActiveFiltersPills({
  facets,
  selected,
  onChange,
}: {
  facets: Facet[];
  selected: FacetedSearchSelected;
  onChange: (updated: FacetedSearchSelected) => void;
}) {
  const pills: ReactNode[] = [];

  for (const facet of facets) {
    const vals = selected[facet.id] ?? [];
    for (const val of vals) {
      const opt = facet.options?.find((o) => o.value === val);
      const label = opt ? opt.label : val;
      pills.push(
        <Badge
          key={`${facet.id}-${val}`}
          variant="light"
          color="teal"
          rightSection={
            <Box
              style={{ cursor: 'pointer', marginLeft: 4, fontSize: 14, lineHeight: 1 }}
              onClick={() => {
                const next = vals.filter((v) => v !== val);
                onChange({ ...selected, [facet.id]: next });
              }}
              aria-label={`Убрать фильтр ${label}`}
            >
              ×
            </Box>
          }
        >
          {label}
        </Badge>,
      );
    }
  }

  if (pills.length === 0) return null;

  return <Group gap="xs" wrap="wrap">{pills}</Group>;
}

// ─── Filter panel body (shared between inline / drawer / sheet) ──────────────

function FilterPanelBody({
  facets,
  selected,
  onChange,
  onClearAll,
  title,
  clearAllLabel,
}: {
  facets: Facet[];
  selected: FacetedSearchSelected;
  onChange: (updated: FacetedSearchSelected) => void;
  onClearAll?: () => void;
  title?: string;
  clearAllLabel?: string;
}) {
  const activeCount = activeFilterCount(selected);

  const handleClear = () => {
    // Build an empty selection for every facet
    const cleared: FacetedSearchSelected = {};
    for (const facet of facets) {
      cleared[facet.id] = [];
    }
    if (onClearAll) {
      onClearAll();
    }
    onChange(cleared);
  };

  return (
    <Stack gap="md" style={{ height: '100%' }}>
      {/* Header */}
      <Group justify="space-between" wrap="nowrap" align="flex-start">
        <Text size="md" fw={600}>
          {title ?? 'Фильтры'}
        </Text>
        {activeCount > 0 && (
          <Button
            variant="subtle"
            size="xs"
            color="gray"
            onClick={handleClear}
            aria-label={clearAllLabel ?? 'Сбросить все фильтры'}
            leftSection={<X size={14} aria-hidden />}
          >
            {clearAllLabel ?? `Сбросить всё (${activeCount})`}
          </Button>
        )}
      </Group>

      <Divider />

      {/* Facets */}
      <ScrollArea type="auto" style={{ flex: 1, minHeight: 0 }}>
        <Stack gap="lg" pb="md">
          {facets.map((facet) => (
            <Box key={facet.id}>
              <FacetControl facet={facet} selected={selected} onChange={onChange} />
            </Box>
          ))}
        </Stack>
      </ScrollArea>
    </Stack>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

/**
 * Catalog faceted search: filter panel with checkbox, radio, range and select facets.
 *
 * Desktop: inline sidebar or Mantine `Drawer` (controlled by `mode`).
 * Mobile (<768px): `AprilVaulBottomSheet` (auto mode).
 *
 * Controlled via `selected` + `onChange`.
 */
export function FacetedSearch({
  facets,
  selected,
  onChange,
  onClearAll,
  searchValue,
  onSearchChange,
  mode = 'auto',
  triggerLabel,
  title,
  clearAllLabel,
}: FacetedSearchProps) {
  const isMobile = !useMediaQuery('(min-width: 768px)');

  // Auto mode: inline on desktop, drawer on mobile
  const effectiveMode: 'inline' | 'drawer' =
    mode === 'auto' ? (isMobile ? 'drawer' : 'inline') : (mode === 'inline' ? 'inline' : 'drawer');

  // Drawer state (only for drawer/auto mode)
  const [drawerOpened, setDrawerOpened] = useState(false);
  // Mobile bottom-sheet state
  const [sheetOpened, setSheetOpened] = useState(false);

  const activeCount = activeFilterCount(selected);

  // Callback for handling facet changes
  const handleFacetChange = useCallback(
    (updated: FacetedSearchSelected) => {
      onChange(updated);
    },
    [onChange],
  );

  // Clear all handler
  const handleClearAll = useCallback(() => {
    if (onClearAll) {
      onClearAll();
    }
  }, [onClearAll]);

  // Search handler
  const handleSearchChange = useCallback(
    (value: string) => {
      if (onSearchChange) {
        onSearchChange(value);
      }
    },
    [onSearchChange],
  );

  // Search input element (optional integrated search)
  const searchInput = useMemo(
    () =>
      searchValue !== undefined ? (
        <TextInput
          placeholder="Поиск..."
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          leftSection={
            <Search size={16} aria-hidden />
          }
          size="md"
          aria-label="Поиск по каталогу"
        />
      ) : null,
    [searchValue, handleSearchChange],
  );

  // Active filters pills (trigger + pills shown in compact/trigger mode)
  const triggerWithPills = effectiveMode === 'inline' ? null : (
    <Stack gap="xs">
      <Group gap="sm" wrap="nowrap" align="center">
        <Button
          variant="light"
          size="sm"
          leftSection={<Filter size={16} aria-hidden />}
          onClick={() => {
            if (effectiveMode === 'drawer') {
              setDrawerOpened(true);
            } else if (isMobile && mode === 'auto') {
              setSheetOpened(true);
            }
          }}
          rightSection={
            activeCount > 0 ? (
              <Badge color="teal" size="sm" px={4}>
                {activeCount}
              </Badge>
            ) : undefined
          }
          aria-label="Открыть фильтры"
        >
          {triggerLabel ?? 'Фильтры'}
        </Button>
        {searchInput}
      </Group>
      <ActiveFiltersPills facets={facets} selected={selected} onChange={handleFacetChange} />
    </Stack>
  );

  // Panel content (for drawer / sheet)
  const panelContent = (
    <FilterPanelBody
      facets={facets}
      selected={selected}
      onChange={handleFacetChange}
      onClearAll={handleClearAll}
      title={title}
      clearAllLabel={clearAllLabel}
    />
  );

  // ─── Inline mode ────────────────────────────────────────────────────────
  if (effectiveMode === 'inline') {
    return (
      <Paper
        role="search"
        withBorder
        p="md"
        style={{ borderRadius: 'var(--mantine-radius-md)' }}
      >
        <Stack gap="md">
          {searchInput && <Box>{searchInput}</Box>}
          {panelContent}
        </Stack>
      </Paper>
    );
  }

  // ─── Drawer / trigger mode ─────────────────────────────────────────────
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Trigger bar */}
      {triggerWithPills}

      {/* Drawer — when effectiveMode is 'drawer' (explicit drawer or auto on desktop) */}
      {effectiveMode === 'drawer' && (
        <Drawer
          opened={drawerOpened}
          onClose={() => setDrawerOpened(false)}
          title={title ?? 'Фильтры'}
          position="right"
          size="md"
          aria-labelledby="faceted-search-drawer"
          id="faceted-search-drawer"
        >
          <Box style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {panelContent}
          </Box>
        </Drawer>
      )}

      {/* Bottom sheet for mobile (auto mode only) */}
      {isMobile && mode === 'auto' && (
        <AprilVaulBottomSheet
          opened={sheetOpened}
          onClose={() => setSheetOpened(false)}
          headerTitle={title ?? 'Фильтры'}
          withCloseButton
        >
          <Box style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mantine-spacing-md)' }}>
            {panelContent}
          </Box>
        </AprilVaulBottomSheet>
      )}
    </Box>
  );
}
