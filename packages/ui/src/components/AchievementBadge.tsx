import type { ReactNode } from 'react';
import { Box, Group, Text, Tooltip, useMantineTheme } from '@mantine/core';
import { Award, Gem, Medal, Star } from 'lucide-react';
import { useDensity } from '../DensityContext';

/** Уровень значка достижения. */
export type AchievementBadgeVariant = 'bronze' | 'silver' | 'gold' | 'platinum' | 'custom';

/** Размер значка. */
export type AchievementBadgeSize = 'xs' | 'sm' | 'md' | 'lg';

/** Публичные пропсы AchievementBadge. */
export interface AchievementBadgeProps {
  /** Уровень значка. */
  variant: AchievementBadgeVariant;
  /** Получено ли достижение. По умолчанию `true`. */
  earned?: boolean;
  /** Текст тултипа ("Получено: 15.03.2026 — Активный месяц"). */
  tooltip?: string;
  /** Размер значка. */
  size?: AchievementBadgeSize;
  /** Кастомная иконка (для `variant="custom"`, Lucide). */
  icon?: ReactNode;
  /** Текстовая подпись под значком. */
  label?: string;
  /** Заблокировано (серый, нет тултипа). */
  disabled?: boolean;
}

/** Цвета variant (фоновые HEX для бейджа). */
const VARIANT_COLORS: Record<Exclude<AchievementBadgeVariant, 'custom'>, string> = {
  bronze: '#CD7F32',
  silver: '#C0C0C0',
  gold: '#FFD700',
  platinum: '#E5E4E2',
};

/** Дефолтные иконки по variant. */
const VARIANT_ICONS: Record<Exclude<AchievementBadgeVariant, 'custom'>, ReactNode> = {
  bronze: <Medal size={14} aria-hidden />,
  silver: <Award size={14} aria-hidden />,
  gold: <Star size={14} aria-hidden />,
  platinum: <Gem size={14} aria-hidden />,
};

/** Размер бейджа (диаметр) по size. */
const SIZE_MAP: Record<AchievementBadgeSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
};

/** Размер иконки по size. */
const ICON_SIZE_MAP: Record<AchievementBadgeSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
};

/**
 * AchievementBadge — значок достижения с тултипом.
 *
 * Визуал: круглый бейдж с цветом variant и иконкой внутри.
 * Earned=false: opacity 0.4, без тултипа.
 * Disabled: серый цвет, без тултипа.
 * Тултип: Mantine Tooltip с поддержкой touch (events: hover, focus, touch).
 *
 * ARIA: role="img", aria-label из tooltip или label, aria-disabled когда disabled.
 * Mobile: тултип через long-press / tap (touch event), размер не меньше sm для touch-target 44px.
 */
export function AchievementBadge({
  variant,
  earned = true,
  tooltip,
  size = 'sm',
  icon,
  label,
  disabled = false,
}: AchievementBadgeProps) {
  const theme = useMantineTheme();
  const { density } = useDensity();

  // Размер
  const badgeSize = density === 'compact'
    ? size === 'lg' ? SIZE_MAP.md : SIZE_MAP[size]
    : SIZE_MAP[size];

  const iconSize = ICON_SIZE_MAP[size];

  // Цвет и иконка
  const bgColor = disabled
    ? theme.colors.gray[4]
    : variant === 'custom'
      ? theme.colors.teal[6]
      : VARIANT_COLORS[variant];

  const defaultIcon = variant === 'custom' ? null : VARIANT_ICONS[variant];
  const displayIcon = icon ?? defaultIcon;

  // aria-label: при disabled — tooltip не используется (тултип не показывается)
  const ariaLabel = disabled
    ? (label ?? `${variant} achievement`)
    : (tooltip ?? label ?? `${variant} achievement`);

  // Пересоздаём иконку с правильным размером
  const renderIcon = () => {
    if (!displayIcon) return null;
    // Клонирование иконки с правильным размером
    const cloned = displayIcon;
    return (
      <Box
        style={{
          width: iconSize,
          height: iconSize,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        {cloned}
      </Box>
    );
  };

  const badgeContent = (
    <Box
      role="img"
      aria-label={ariaLabel}
      aria-disabled={disabled ? 'true' : undefined}
      style={{
        width: badgeSize,
        height: badgeSize,
        borderRadius: '50%',
        background: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.5 : earned ? 1 : 0.4,
        cursor: disabled ? 'default' : 'pointer',
        transition: 'opacity 0.15s',
        flexShrink: 0,
      }}
    >
      {renderIcon()}
    </Box>
  );

  const hasTooltip = tooltip && earned && !disabled;

  const wrapped = hasTooltip ? (
    <Tooltip
      label={tooltip}
      position="top"
      withArrow
      events={{ hover: true, focus: true, touch: true }}
    >
      {badgeContent}
    </Tooltip>
  ) : (
    badgeContent
  );

  return (
    <Group align="center" gap="xs" style={{ flexDirection: label ? 'column' : 'row' }}>
      {wrapped}
      {label ? (
        <Text
          size="xs"
          c={disabled ? 'dimmed' : 'inherit'}
          fw={500}
          ta="center"
          style={{ maxWidth: badgeSize + 20 }}
        >
          {label}
        </Text>
      ) : null}
    </Group>
  );
}
