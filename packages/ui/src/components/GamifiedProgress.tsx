import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Box, Group, Text, useMantineTheme } from '@mantine/core';
import { useDensity } from '../DensityContext';

/** Размер GamifiedProgress. */
export type GamifiedProgressSize = 'sm' | 'md' | 'lg';

/** Публичные пропсы GamifiedProgress. */
export interface GamifiedProgressProps {
  /** Текущее значение. */
  value: number;
  /** Целевое значение (max > 0). */
  max: number;
  /** Подпись ("Ещё 2 посещения до Золота"). */
  label?: string;
  /** Иконка награды (Lucide). */
  icon?: ReactNode;
  /** CSS transition анимация при монтировании. */
  animateOnMount?: boolean;
  /** Размер прогресс-бара и иконки. */
  size?: GamifiedProgressSize;
  /** Цвет прогресса (Mantine color). */
  color?: string;
  /** Показать "3/5" текст. */
  showValue?: boolean;
}

/** Высота прогресс-бара по размеру. */
const SIZE_HEIGHT: Record<GamifiedProgressSize, number> = {
  sm: 6,
  md: 8,
  lg: 10,
};

/** Размер иконки по размеру. */
const SIZE_ICON: Record<GamifiedProgressSize, number> = {
  sm: 20,
  md: 24,
  lg: 28,
};

/** Радиус скругления бара (прототип: 3px). */
const BAR_RADIUS = 3;

/** Длительность анимации (600ms, ease-out). */
const TRANSITION_DURATION = 600;

/**
 * GamifiedProgress — визуальный компонент прогресса с наградой.
 *
 * Desktop: горизонтальный — icon слева, label сверху, прогресс-бар, value справа.
 * Mobile (<768px): вертикальный — icon + label сверху, прогресс-бар на всю ширину.
 *
 * Анимация: CSS transition на width (600ms, ease-out).
 * Completed state (value >= max): 100%, icon с accent-подсветкой.
 * ARIA: role="progressbar", aria-valuenow, aria-valuemin=0, aria-valuemax.
 *
 * Сверено с прототипом ЛК физика: `.progress-bar`, `.progress-fill`.
 */
export function GamifiedProgress({
  value,
  max,
  label,
  icon,
  animateOnMount = true,
  size = 'md',
  color = 'teal',
  showValue = true,
}: GamifiedProgressProps) {
  const theme = useMantineTheme();
  const { density } = useDensity();
  const isCompact = density === 'compact';

  // Состояние анимации: после mount — animated=true, CSS transition показывает заполнение
  const [animated, setAnimated] = useState(false);

  const clampedValue = Math.max(0, Math.min(max, value));
  const percentage = max > 0 ? (clampedValue / max) * 100 : 0;
  const isCompleted = value >= max && max > 0;

  // Запуск анимации при монтировании
  useEffect(() => {
    if (!animateOnMount) {
      setAnimated(true);
      return;
    }

    // Запуск анимации в следующем кадре (старт с width: 0 → transition к percentage)
    const timer = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimated(true);
      });
    });

    return () => cancelAnimationFrame(timer);
  }, [animateOnMount]);

  const barHeight = isCompact
    ? size === 'lg' ? SIZE_HEIGHT.md : SIZE_HEIGHT[size]
    : SIZE_HEIGHT[size];

  const iconSize = SIZE_ICON[size];

  // Цвет фона трека
  const trackBg = `var(--mantine-color-gray-${isCompact ? '1' : '2'})`;

  // Цвет заполнения
  const fillColor = isCompleted
    ? `var(--mantine-color-${color}-7, ${theme.colors[color]?.[6] ?? theme.colors.teal[6]})`
    : `var(--mantine-color-${color}-6, ${theme.colors[color]?.[6] ?? theme.colors.teal[6]})`;

  // Цвет иконки при completed
  const iconColor = isCompleted
    ? `var(--mantine-color-${color}-7, ${theme.colors[color]?.[6] ?? theme.colors.teal[6]})`
    : `var(--mantine-color-${color}-6, ${theme.colors[color]?.[6] ?? theme.colors.teal[6]})`;

  // Контейнер иконки
  const iconContainer = icon ? (
    <Box
      style={{
        width: iconSize + 8,
        height: iconSize + 8,
        borderRadius: '50%',
        background: isCompleted
          ? `var(--mantine-color-${color}-0, ${theme.colors[color]?.[0] ?? theme.colors.gray[0]})`
          : theme.colors.gray[0],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: iconColor,
        flexShrink: 0,
        border: isCompleted
          ? `2px solid ${fillColor}`
          : '2px solid transparent',
        transition: `background 0.3s, border-color 0.3s, color 0.3s`,
      }}
    >
      <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </Box>
    </Box>
  ) : null;

  // Текст значения
  const valueText = showValue ? `${clampedValue}/${max}` : undefined;

  return (
    <Box>
      {/* Label (если есть) — над всем контентом */}
      {label ? (
        <Text
          size={size === 'sm' ? 'xs' : 'sm'}
          fw={500}
          c="dimmed"
          mb={4}
        >
          {label}
        </Text>
      ) : null}

      <Group
        wrap="nowrap"
        gap="sm"
        align={iconContainer ? 'center' : 'flex-start'}
      >
        {/* Иконка слева */}
        {iconContainer}

        {/* Центральная область: label (если нет сверху) + прогресс-бар + value */}
        <Box style={{ flex: 1, minWidth: 0 }}>
          {/* Progress bar с ARIA */}
          <Box
            role="progressbar"
            aria-valuenow={clampedValue}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-label={label ?? `Прогресс: ${clampedValue} из ${max}`}
            style={{
              width: '100%',
              height: barHeight,
              borderRadius: BAR_RADIUS,
              background: trackBg,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Box
              style={{
                height: '100%',
                width: animated ? `${percentage}%` : '0%',
                borderRadius: BAR_RADIUS,
                background: fillColor,
                transition: animateOnMount
                  ? `width ${TRANSITION_DURATION}ms ease-out`
                  : 'none',
              }}
            />
          </Box>

          {/* Value text под баром или рядом (desktop) */}
          {valueText ? (
            <Text
              size={size === 'sm' ? 'xs' : 'sm'}
              fw={600}
              mt={4}
              style={{
                color: isCompleted
                  ? theme.colors[color]?.[6] ?? theme.colors.teal[6]
                  : theme.colors.gray[6],
              }}
            >
              {valueText}
            </Text>
          ) : null}
        </Box>
      </Group>
    </Box>
  );
}
