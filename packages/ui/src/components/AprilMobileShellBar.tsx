import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { ActionIcon, Box, Group, Paper, TextInput } from '@mantine/core';
import { AprilIconClose, AprilIconSearch } from '../icons';
import {
  APRIL_MOBILE_SHELL_BAR_MARGIN_BOTTOM_PX,
  APRIL_MOBILE_SHELL_BAR_PAPER_BACKGROUND,
  APRIL_MOBILE_SHELL_BAR_PAPER_BORDER,
  APRIL_MOBILE_SHELL_BAR_PILL_MIN_HEIGHT_PX,
  APRIL_MOBILE_SHELL_BAR_Z_INDEX,
  aprilMobileShellBarGhostWhiteBorderActionStyles,
} from './aprilMobileShellBarLayout';

export type AprilMobileShellBarPosition = 'fixed' | 'absolute';

export type AprilMobileShellBarProps = {
  /** Left slot (e.g. back `ActionIcon`). */
  leading?: ReactNode;
  /**
   * Center: tabs and/or contextual actions; hidden while search is expanded (built-in search).
   * When a modal/sheet is open, pass **only** that layer’s actions here (see §8 «one active context» in DESIGN_SYSTEM.md).
   */
  center?: ReactNode;
  /** When true (default), renders the trailing search trigger and expand/collapse behavior. */
  withSearch?: boolean;
  searchPlaceholder?: string;
  /** Controlled search query. */
  searchValue?: string;
  /** Uncontrolled default query. */
  defaultSearchValue?: string;
  onSearchValueChange?: (value: string) => void;
  /** Controlled expanded state for the search field. */
  searchExpanded?: boolean;
  defaultSearchExpanded?: boolean;
  onSearchExpandedChange?: (expanded: boolean) => void;
  /**
   * `fixed` — viewport-relative (microfrontend root). `absolute` — parent must be `position: relative`
   * (e.g. device frame on the showcase).
   */
  position?: AprilMobileShellBarPosition;
  /** Horizontal inset from viewport (theme spacing string or px). */
  horizontalInset?: CSSProperties['paddingLeft'];
  className?: string;
  style?: CSSProperties;
  /** Merges into the inner `Paper` for fine-tuning without breaking layout. */
  paperProps?: { style?: CSSProperties; className?: string };
};

function useControllableBoolean(
  controlled: boolean | undefined,
  defaultValue: boolean,
  onChange?: (v: boolean) => void,
): [boolean, (v: boolean) => void] {
  const [internal, setInternal] = useState(defaultValue);
  const value = controlled !== undefined ? controlled : internal;
  const setValue = useCallback(
    (v: boolean) => {
      if (controlled === undefined) {
        setInternal(v);
      }
      onChange?.(v);
    },
    [controlled, onChange],
  );
  return [value, setValue];
}

function useControllableString(
  controlled: string | undefined,
  defaultValue: string,
  onChange?: (v: string) => void,
): [string, (v: string) => void] {
  const [internal, setInternal] = useState(defaultValue);
  const value = controlled !== undefined ? controlled : internal;
  const setValue = useCallback(
    (v: string) => {
      if (controlled === undefined) {
        setInternal(v);
      }
      onChange?.(v);
    },
    [controlled, onChange],
  );
  return [value, setValue];
}

const PAPER_SHADOW = 'var(--mantine-shadow-md)';

const defaultPaperStyle: CSSProperties = {
  pointerEvents: 'auto',
  minHeight: APRIL_MOBILE_SHELL_BAR_PILL_MIN_HEIGHT_PX,
  border: APRIL_MOBILE_SHELL_BAR_PAPER_BORDER,
  backgroundColor: APRIL_MOBILE_SHELL_BAR_PAPER_BACKGROUND,
  boxShadow: PAPER_SHADOW,
};

/**
 * April mobile shell: **single** floating bottom bar (§8 Mobile) with **leading | center | search** slots.
 * Панель — бирюза 9; встроенные кнопки поиска — бесцветные с белой границей ({@link aprilMobileShellBarGhostWhiteBorderActionStyles}).
 * Built-in search expands the center into a `TextInput`; **Escape** collapses and returns focus to the trigger.
 *
 * **Single active context (DS norm):** at any time, `leading` / `center` / search must reflect **one** UI layer only —
 * either the **current screen** (tabs, screen actions, search) **or**, while a modal / form sheet is the top layer,
 * **only that layer’s actions** — never app tabs and dialog actions together in the bar.
 *
 * For scrollable page content use {@link aprilMobileShellBarContentPaddingBottom} on your `main` (or equivalent).
 * Stacking: uses `APRIL_MOBILE_SHELL_BAR_Z_INDEX` so the bar stays above `AprilMobileBottomSheet` overlays.
 */
export function AprilMobileShellBar({
  leading,
  center,
  withSearch = true,
  searchPlaceholder = 'Поиск',
  searchValue: searchValueControlled,
  defaultSearchValue = '',
  onSearchValueChange,
  searchExpanded: searchExpandedControlled,
  defaultSearchExpanded = false,
  onSearchExpandedChange,
  position = 'fixed',
  horizontalInset = 'var(--mantine-spacing-md)',
  className,
  style,
  paperProps,
}: AprilMobileShellBarProps) {
  const searchFieldId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTriggerRef = useRef<HTMLButtonElement>(null);

  const [searchExpanded, setSearchExpanded] = useControllableBoolean(
    searchExpandedControlled,
    defaultSearchExpanded,
    onSearchExpandedChange,
  );
  const [query, setQuery] = useControllableString(
    searchValueControlled,
    defaultSearchValue,
    onSearchValueChange,
  );

  useEffect(() => {
    if (!searchExpanded || !withSearch) {
      return;
    }
    const t = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [searchExpanded, withSearch]);

  useEffect(() => {
    if (!searchExpanded || !withSearch) {
      return;
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setSearchExpanded(false);
        window.setTimeout(() => searchTriggerRef.current?.focus(), 0);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [searchExpanded, withSearch, setSearchExpanded]);

  const outerStyle = useMemo<CSSProperties>(
    () => ({
      position,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: APRIL_MOBILE_SHELL_BAR_Z_INDEX,
      pointerEvents: 'none',
      paddingLeft: horizontalInset,
      paddingRight: horizontalInset,
      paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + ${APRIL_MOBILE_SHELL_BAR_MARGIN_BOTTOM_PX}px)`,
      ...style,
    }),
    [horizontalInset, position, style],
  );

  const mergedPaperStyle = useMemo(
    () => ({ ...defaultPaperStyle, ...paperProps?.style }),
    [paperProps?.style],
  );

  const showExpandedSearch = withSearch && searchExpanded;

  return (
    <Box
      className={className}
      style={outerStyle}
      data-april-mobile-shell-bar
      aria-label={showExpandedSearch ? 'Панель поиска' : undefined}>
      <Paper
        radius="xl"
        p="xs"
        component="div"
        role={showExpandedSearch ? 'search' : undefined}
        aria-labelledby={showExpandedSearch ? searchFieldId : undefined}
        className={paperProps?.className}
        style={mergedPaperStyle}>
        <Group gap="xs" wrap="nowrap" align="center" justify="space-between" px={4}>
          {leading ? <Box style={{ flexShrink: 0 }}>{leading}</Box> : null}

          {showExpandedSearch ? (
            <TextInput
              id={searchFieldId}
              ref={inputRef}
              style={{ flex: 1, minWidth: 0 }}
              placeholder={searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
              size="sm"
              aria-label={searchPlaceholder}
            />
          ) : (
            <Box style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>{center}</Box>
          )}

          {withSearch ? (
            showExpandedSearch ? (
              <ActionIcon
                variant="default"
                size="lg"
                radius="xl"
                styles={aprilMobileShellBarGhostWhiteBorderActionStyles}
                aria-label="Закрыть поиск"
                onClick={() => {
                  setSearchExpanded(false);
                  window.setTimeout(() => searchTriggerRef.current?.focus(), 0);
                }}>
                <AprilIconClose size={20} aria-hidden />
              </ActionIcon>
            ) : (
              <ActionIcon
                ref={searchTriggerRef}
                variant="default"
                size="lg"
                radius="xl"
                styles={aprilMobileShellBarGhostWhiteBorderActionStyles}
                aria-label="Открыть поиск"
                aria-expanded={false}
                onClick={() => setSearchExpanded(true)}>
                <AprilIconSearch size={20} aria-hidden />
              </ActionIcon>
            )
          ) : null}
        </Group>
      </Paper>
    </Box>
  );
}
