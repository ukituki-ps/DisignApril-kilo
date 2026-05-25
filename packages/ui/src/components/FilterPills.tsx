import { Box, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { useDensity } from '../DensityContext';

/** Элемент фильтра-пилы. */
export interface FilterPillItem {
  /** Уникальный идентификатор. */
  value: string;
  /** Отображаемый текст. */
  label: string;
  /** Счётчик количества (опционально). */
  count?: number;
}

export interface FilterPillsProps {
  /** Массив элементов-пил. */
  pills: FilterPillItem[];
  /** Текущее активное значение. */
  activeValue: string;
  /** Callback при выборе пилы. */
  onChange: (value: string) => void;
  /** Горизонтальный скролл при переполнении. По умолчанию true. */
  scrollable?: boolean;
}

/**
 * FilterPills — inline фильтр-пили (категории) для каталога льгот.
 *
 * Controlled pattern: `activeValue` + `onChange`.
 * Активная pill: teal[6] bg, white text.
 * Неактивная: border gray[3], bg white, color gray[6] (dark: dark[6] bg, dark[0] text).
 * Hover неактивной: bg teal[0], color teal[6].
 * Scrollable: контейнер с overflow-x и скрытым скроллбаром.
 * Density: compact уменьшает padding.
 * Light/dark поддержка через Mantine theme.
 */
export function FilterPills({
  pills,
  activeValue,
  onChange,
  scrollable = true,
}: FilterPillsProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const { density } = useDensity();
  const isCompact = density === 'compact';
  const isDark = colorScheme === 'dark';

  /* Cached colour strings for dark / light inactive pills */
  const inactiveBg = isDark
    ? (theme.colors.dark[6] as unknown as string)
    : (theme.colors.white as unknown as string);
  const inactiveColor = isDark
    ? (theme.colors.dark[0] as unknown as string)
    : (theme.colors.gray[6] as unknown as string);

  const isActive = (pill: FilterPillItem) => pill.value === activeValue;

  const pillPaddingY = isCompact ? 4 : 6;
  const pillPaddingX = isCompact ? 10 : 14;
  const pillFontSize = isCompact ? 11 : 12;
  const pillFontWeight = 600 as const;

  /* Inline scrollbar-hide style for WebKit (Firefox uses scrollbarWidth: none) */
  const scrollableStyle = scrollable ? (
    <style>{`.filter-pills-scrollable::-webkit-scrollbar{display:none}`}</style>
  ) : null;

  return (
    <>
      {scrollableStyle}
      <Box
        style={{
          display: 'flex',
          gap: 6,
          flexWrap: scrollable ? 'nowrap' : 'wrap',
          ...(scrollable
            ? {
                overflowX: 'auto',
                overflowY: 'hidden',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }
            : {}),
        }}
        /* WebKit scrollbar hiding needs a class since ::-webkit-scrollbar
           cannot be set via inline styles */
        className={scrollable ? 'filter-pills-scrollable' : undefined}
      >
        {pills.map((pill) => {
          const active = isActive(pill);

          return (
            <button
              key={pill.value}
              type="button"
              aria-label={`${pill.label}${pill.count !== undefined ? ` (${pill.count})` : ''}`}
              aria-pressed={active}
              onClick={() => onChange(pill.value)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: `${pillPaddingY}px ${pillPaddingX}px`,
                borderRadius: 20,
                fontSize: pillFontSize,
                fontWeight: pillFontWeight,
                border: active
                  ? `1.5px solid ${theme.colors.teal[6]}`
                  : `1.5px solid ${theme.colors.gray[3]}`,
                background: active
                  ? (theme.colors.teal[6] as unknown as string)
                  : inactiveBg,
                color: active
                  ? (theme.colors.white as unknown as string)
                  : inactiveColor,
                cursor: 'pointer',
                transition: 'background 0.15s, color 0.15s, border-color 0.15s',
                fontFamily: 'inherit',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = theme.colors.teal[0] as unknown as string;
                  e.currentTarget.style.color = theme.colors.teal[6] as unknown as string;
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = inactiveBg;
                  e.currentTarget.style.color = inactiveColor;
                }
              }}
            >
              {pill.label}
              {pill.count !== undefined ? (
                <span style={{ opacity: 0.7 }}>
                  {pill.count}
                </span>
              ) : null}
            </button>
          );
        })}
      </Box>
    </>
  );
}
