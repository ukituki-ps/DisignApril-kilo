import type { ReactNode } from 'react';
import { Box, Group, Text, useMantineTheme } from '@mantine/core';
import { AprilIcon } from '../icons/AprilIcon';
import type { AprilLucideIcon } from '../icons/AprilIcon';
import { useDensity } from '../DensityContext';

export type AprilStatCardVariant = 'default' | 'highlight';

export interface AprilStatCardProps {
  /** Label (например "Баланс баллов"). */
  label: ReactNode;
  /** Основное значение (например "1 250"). */
  value: ReactNode;
  /** Дополнительный текст под значением. */
  hint?: ReactNode;
  /** Зелёная карточка (фон primary, белый текст). */
  variant?: AprilStatCardVariant;
  /** Иконка Lucide слева от label. */
  icon?: AprilLucideIcon;
  className?: string;
  'data-testid'?: string;
}

/**
 * AprilStatCard — карточка статистики с label, значением и hint.
 *
 * Сверено с прототипом LKFL: padding 14px 18px, border-radius 14px.
 * Default: card bg. Highlight: primary bg, white text.
 */
export function AprilStatCard({
  label,
  value,
  hint,
  variant = 'default',
  icon,
  className,
  'data-testid': dataTestId,
}: AprilStatCardProps) {
  const theme = useMantineTheme();
  const { density } = useDensity();
  const isCompact = density === 'compact';

  const isHighlight = variant === 'highlight';

  const padding = isCompact ? '10px 14px' : '14px 18px';
  const valueFontSize = isCompact ? 22 : 26;

  const background = isHighlight
    ? (theme.colors.teal[6] as unknown as string)
    : (theme.white as unknown as string);

  const labelColor = isHighlight
    ? 'rgba(255, 255, 255, 0.72)'
    : (theme.colors.gray[5] as unknown as string);

  const valueColor = isHighlight
    ? 'white'
    : (theme.colors.dark[8] as unknown as string);

  const hintColor = isHighlight
    ? 'rgba(255, 255, 255, 0.65)'
    : (theme.colors.gray[4] as unknown as string);

  const iconColor = isHighlight
    ? 'rgba(255, 255, 255, 0.72)'
    : (theme.colors.gray[5] as unknown as string);

  return (
    <Box
      className={className}
      data-testid={dataTestId}
      style={{
        background,
        borderRadius: 14,
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        padding,
      }}
    >
      {/* Label + иконка */}
      <Group gap={6} style={{ marginBottom: isCompact ? 4 : 6 }}>
        {icon ? (
          <Box
            aria-hidden
            style={{ flexShrink: 0, color: iconColor }}
          >
            <AprilIcon icon={icon} size={isCompact ? 12 : 13} />
          </Box>
        ) : null}
        <Text
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: labelColor,
            textTransform: 'uppercase',
            letterSpacing: '0.6px',
          }}
        >
          {label}
        </Text>
      </Group>

      {/* Значение */}
      <Text
        component="div"
        style={{
          fontSize: valueFontSize,
          fontWeight: 800,
          letterSpacing: '-0.5px',
          color: valueColor,
          lineHeight: 1.2,
          marginBottom: hint ? (isCompact ? 2 : 3) : 0,
        }}
      >
        {value}
      </Text>

      {/* Hint */}
      {hint ? (
        <Text
          component="div"
          style={{
            fontSize: 11,
            color: hintColor,
            lineHeight: 1.3,
          }}
        >
          {hint}
        </Text>
      ) : null}
    </Box>
  );
}
