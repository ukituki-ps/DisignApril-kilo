import type { ReactNode } from 'react';
import { Badge, Box, Text, useMantineTheme } from '@mantine/core';
import { useDensity } from '../DensityContext';

/** Элемент сетки быстрых действий. */
export interface QuickActionItem {
  /** Уникальный ID. */
  id: string;
  /** Текст действия. */
  label: string;
  /** Lucide-иконка (опционально). */
  icon?: ReactNode;
  /** Цвет иконки/фона (Mantine color name). */
  color?: string;
  /** Бейдж/счётчик (опционально). */
  badge?: string;
  /** Элемент неактивен. */
  disabled?: boolean;
}

export interface QuickActionsGridProps {
  /** Массив элементов. */
  items: QuickActionItem[];
  /** Количество колонок: "auto" — адаптивный через CSS grid auto-fill. */
  columns?: 'auto' | 2 | 3 | 4;
  /** Показывать иконки. */
  showIcons?: boolean;
  /** Callback при клике на элемент. */
  onAction?: (item: QuickActionItem) => void;
}

/** Размер иконки в контейнере (как в прототипе: 32×32). */
const ICON_BOX_SIZE = 32;
const ICON_BOX_RADIUS = 8;
/** Размер самой SVG-иконки (16px в прототипе). */
const ICON_SIZE = 16;

/**
 * QuickActionsGrid — адаптивная сетка быстрых действий для главной страницы.
 *
 * Сверено с прототипом ЛК физика: `.quick-grid` + `.quick-btn`.
 * Адаптив: 2 колонки (mobile <768px) / auto-fill (tablet+) до 4 колонок.
 * Density: padding и gap через useDensity().
 * a11y: каждый элемент — button с aria-label, иконка aria-hidden.
 */
export function QuickActionsGrid({
  items,
  columns = 'auto',
  showIcons = true,
  onAction,
}: QuickActionsGridProps) {
  const theme = useMantineTheme();
  const { density } = useDensity();
  const isCompact = density === 'compact';

  const cellPadding = isCompact ? 10 : 12;
  const gap = isCompact ? 6 : 8;

  // Grid columns
  const gridTemplateColumns =
    columns === 'auto'
      ? 'repeat(auto-fill, minmax(min(100%, 160px), 1fr))'
      : `repeat(${columns}, 1fr)`;

  return (
    <Box
      style={{
        display: 'grid',
        gridTemplateColumns,
        gap,
        padding: isCompact ? 10 : 14,
      }}
    >
      {items.map((item) => {
        const cellColor = item.color ?? 'teal';
        const bgVar = `var(--mantine-color-${cellColor}-0, ${theme.colors[cellColor]?.[0] ?? theme.colors.gray[0]})`;
        const colorVar = `var(--mantine-color-${cellColor}-6, ${theme.colors[cellColor]?.[6] ?? theme.colors.teal[6]})`;

        return (
          <button
            key={item.id}
            type="button"
            aria-label={item.disabled ? `${item.label} (недоступно)` : item.label}
            disabled={item.disabled}
            onClick={() => !item.disabled && onAction?.(item)}
            style={{
              background: theme.colors.gray[0],
              borderRadius: 10,
              padding: cellPadding,
              cursor: item.disabled ? 'not-allowed' : 'pointer',
              transition: 'background 0.15s, opacity 0.15s',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              border: 'none',
              fontFamily: 'inherit',
              textAlign: 'left',
              position: 'relative',
              opacity: item.disabled ? 0.5 : 1,
              alignItems: 'flex-start',
              width: '100%',
            }}
            onMouseEnter={(e) => {
              if (!item.disabled) {
                e.currentTarget.style.background = bgVar;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = theme.colors.gray[0];
            }}
          >
            {/* Badge в правом верхнем углу */}
            {item.badge ? (
              <Badge
                size="xs"
                variant="light"
                color={cellColor}
                style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                }}
              >
                {item.badge}
              </Badge>
            ) : null}

            {/* Иконка в круге */}
            {showIcons && item.icon ? (
              <Box
                aria-hidden
                style={{
                  width: ICON_BOX_SIZE,
                  height: ICON_BOX_SIZE,
                  borderRadius: ICON_BOX_RADIUS,
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colorVar,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  flexShrink: 0,
                }}
              >
                <Box
                  style={{
                    width: ICON_SIZE,
                    height: ICON_SIZE,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </Box>
              </Box>
            ) : null}

            {/* Подпись */}
            <Text
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: theme.colors.dark[6],
                lineHeight: 1.35,
              }}
            >
              {item.label}
            </Text>
          </button>
        );
      })}
    </Box>
  );
}
