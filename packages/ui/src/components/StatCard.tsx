import type { ReactNode } from 'react';
import { Box, Group, Text, useMantineTheme } from '@mantine/core';
import { useDensity } from '../DensityContext';

/** Вариант отображения карточки. */
export type StatCardVariant = 'default' | 'accent';

export interface StatCardProps {
  /** Название метрики. */
  label: string;
  /** Числовое значение (строка для гибкости форматирования). */
  value: string;
  /** Иконка Lucide (опционально). */
  icon?: ReactNode;
  /** Подсказка / хинт под значением. */
  hint?: string;
  /** Вариант: 'default' (белый фон) или 'accent' (зелёный фон, белый текст). */
  variant?: StatCardVariant;
}

/**
 * StatCard — компактная карточка с числовой метрикой для Dashboard.
 *
 * Сверено с прототипом: `.stat-card` + `.stat-card.green` (accent variant).
 * Density: padding уменьшается в compact.
 * Light/dark: default использует Mantine theme colors; accent — teal[6] фон + белый текст.
 */
export function StatCard({
  label,
  value,
  icon,
  hint,
  variant = 'default',
}: StatCardProps) {
  const theme = useMantineTheme();
  const { density } = useDensity();
  const isCompact = density === 'compact';

  const isAccent = variant === 'accent';

  // --- Размеры ---
  const paddingHorizontal = isCompact ? 14 : 18;
  const paddingVertical = isCompact ? 10 : 14;
  const valueFontSize = isCompact ? 22 : 26;
  const labelFontSize = 11;
  const iconSize = isCompact ? 12 : 13;

  // --- Цвета variant default ---
  const defaultBg = theme.white;
  const defaultLabelColor = isAccent
    ? 'rgba(255, 255, 255, 0.72)'
    : theme.colors.gray[6];
  const defaultValueColor = isAccent ? 'white' : theme.colors.dark[9];
  const defaultHintColor = isAccent
    ? 'rgba(255, 255, 255, 0.65)'
    : theme.colors.gray[5];

  // --- Фон ---
  const background = isAccent ? theme.colors.teal[6] : defaultBg;

  return (
    <Box
      style={{
        background,
        borderRadius: 14,
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        padding: `${paddingVertical}px ${paddingHorizontal}px`,
      }}
    >
      {/* Label + иконка */}
      <Group gap={6} style={{ marginBottom: isCompact ? 4 : 6 }}>
        {icon ? (
          <Box
            aria-hidden
            style={{
              width: iconSize,
              height: iconSize,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: defaultLabelColor,
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        ) : null}
        <Text
          style={{
            fontSize: labelFontSize,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.6px',
            color: defaultLabelColor,
          }}
        >
          {label}
        </Text>
      </Group>

      {/* Значение */}
      <Text
        style={{
          fontSize: valueFontSize,
          fontWeight: 800,
          letterSpacing: '-0.5px',
          color: defaultValueColor,
          lineHeight: 1.2,
          marginBottom: hint ? (isCompact ? 2 : 3) : 0,
        }}
      >
        {value}
      </Text>

      {/* Hint */}
      {hint ? (
        <Text
          style={{
            fontSize: labelFontSize,
            color: defaultHintColor,
            lineHeight: 1.3,
          }}
        >
          {hint}
        </Text>
      ) : null}
    </Box>
  );
}
