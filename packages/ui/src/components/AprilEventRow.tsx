import type { ReactNode } from 'react';
import { Box, Text, useMantineTheme } from '@mantine/core';
import { AprilIcon } from '../icons/AprilIcon';
import type { AprilLucideIcon } from '../icons/AprilIcon';

export type AprilEventRowVariant = 'green' | 'yellow' | 'blue';

export interface AprilEventRowProps {
  /** Иконка Lucide. */
  icon: AprilLucideIcon;
  /** Цветовая схема иконки. */
  variant?: AprilEventRowVariant;
  /** Текст события. */
  text: ReactNode;
  /** Время. */
  time?: string;
  className?: string;
  'data-testid'?: string;
}

/* Цвета вариантов иконки — из прототипа LKFL. */
const VARIANT_COLORS: Record<AprilEventRowVariant, { bg: string; fg: string }> = {
  green: { bg: '#DCFCE7', fg: '#16A34A' },
  yellow: { bg: '#FEF9C3', fg: '#CA8A04' },
  blue: { bg: '#DBEAFE', fg: '#2563EB' },
};

/**
 * AprilEventRow — строка в ленте событий (иконка + текст + время).
 *
 * Сверено с прототипом LKFL: padding 11px 20px, icon 30×30, inner 14px.
 */
export function AprilEventRow({
  icon: IconComponent,
  variant = 'green',
  text,
  time,
  className,
  'data-testid': dataTestId,
}: AprilEventRowProps) {
  const theme = useMantineTheme();
  const colors = VARIANT_COLORS[variant];
  const borderColor = theme.colors.gray[2] as unknown as string;
  const textColor = theme.colors.dark[6] as unknown as string;
  const timeColor = theme.colors.gray[4] as unknown as string;

  return (
    <Box
      className={className}
      data-testid={dataTestId}
      style={{
        display: 'flex',
        gap: 11,
        alignItems: 'flex-start',
        padding: '11px 20px',
        borderBottom: `1px solid ${borderColor}`,
      }}
    >
      {/* Icon */}
      <Box
        aria-hidden
        style={{
          width: 30,
          height: 30,
          borderRadius: 8,
          background: colors.bg,
          color: colors.fg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: 1,
        }}
      >
        <Box style={{ width: 14, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AprilIcon icon={IconComponent} size={14} />
        </Box>
      </Box>

      {/* Text + time */}
      <Box style={{ flex: 1, minWidth: 0 }}>
        <Text
          component="div"
          style={{
            fontSize: 12,
            color: textColor,
            lineHeight: 1.5,
          }}
        >
          {text}
        </Text>
        {time ? (
          <Text
            style={{
              fontSize: 10,
              color: timeColor,
              marginTop: 3,
            }}
          >
            {time}
          </Text>
        ) : null}
      </Box>
    </Box>
  );
}
