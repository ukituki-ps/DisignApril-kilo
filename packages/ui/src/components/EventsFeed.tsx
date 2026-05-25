import type { ReactNode } from 'react';
import { Box, Text, useMantineTheme } from '@mantine/core';
import { useDensity } from '../DensityContext';

/** Вариант иконки события (определяет цвет контейнера). */
export type EventIconVariant = 'success' | 'warning' | 'info';

/** Строка ленты событий. */
export interface EventItem {
  id: string;
  variant: EventIconVariant;
  icon: ReactNode;
  text: ReactNode;
  time: string;
}

export interface EventsFeedProps {
  events: EventItem[];
  onEventClick?: (event: EventItem) => void;
  empty?: ReactNode;
  maxItems?: number;
}

/* Цветовая палитра иконок по варианту. */
const EVENT_VARIANT: Record<EventIconVariant, { colorName: 'teal' | 'yellow' | 'blue' }> = {
  success: { colorName: 'teal' },
  warning: { colorName: 'yellow' },
  info: { colorName: 'blue' },
};

const ICON_SIZE = 30;
const ICON_RADIUS = 8;
const ICON_INNER = 14;

/**
 * EventsFeed — лента событий/уведомлений на Dashboard.
 *
 * Сверено с прототипом: `.event-row`, `.ev-icon.ev-green/yellow/blue`, `.ev-text`, `.ev-time`.
 */
export function EventsFeed({
  events,
  onEventClick,
  empty,
  maxItems,
}: EventsFeedProps) {
  const theme = useMantineTheme();
  const { density } = useDensity();
  const isCompact = density === 'compact';

  const visible = maxItems ? events.slice(0, maxItems) : events;

  if (visible.length === 0) {
    return (
      <Box style={{ padding: isCompact ? 24 : 32, textAlign: 'center' }}>
        {empty ?? (
          <Text size="sm" c="dimmed">
            Нет событий
          </Text>
        )}
      </Box>
    );
  }

  return (
    <Box>
      {visible.map((ev, index) => {
        const colorName = EVENT_VARIANT[ev.variant].colorName;
        const iconBg = theme.colors[colorName][0] as unknown as string;
        const iconColor = theme.colors[colorName][7] as unknown as string;
        const isLast = index === visible.length - 1;

        return (
          <Box
            key={ev.id}
            tabIndex={onEventClick ? 0 : undefined}
            onClick={() => onEventClick?.(ev)}
            onKeyDown={(e) => {
              if (onEventClick && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onEventClick(ev);
              }
            }}
            style={{
              display: 'flex',
              gap: 11,
              alignItems: 'flex-start',
              padding: `${isCompact ? 9 : 11}px 20px`,
              borderBottom: isLast
                ? 'none'
                : `1px solid ${theme.colors.gray[2] as unknown as string}`,
              cursor: onEventClick ? 'pointer' : 'default',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => {
              if (onEventClick) {
                e.currentTarget.style.background = theme.colors.gray[0] as unknown as string;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            {/* Icon container */}
            <Box
              aria-hidden
              style={{
                width: ICON_SIZE,
                height: ICON_SIZE,
                borderRadius: ICON_RADIUS,
                background: iconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: iconColor,
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              <Box
                style={{
                  width: ICON_INNER,
                  height: ICON_INNER,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {ev.icon}
              </Box>
            </Box>

            {/* Text + time */}
            <Box style={{ flex: 1, minWidth: 0 }}>
              <Text
                style={{
                  fontSize: 12,
                  color: theme.colors.dark[6] as unknown as string,
                  lineHeight: 1.5,
                }}
              >
                {ev.text}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: theme.colors.gray[5] as unknown as string,
                  marginTop: 3,
                }}
              >
                {ev.time}
              </Text>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
