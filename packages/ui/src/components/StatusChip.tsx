import { Badge } from '@mantine/core';
import { useDensity } from '../DensityContext';

/** Встроенные статусы StatusChip. */
export type StatusChipStatus =
  | 'available'
  | 'active'
  | 'expired'
  | 'waiting'
  | 'error'
  | 'sync'
  | 'custom';

/** Размер StatusChip. */
export type StatusChipSize = 'xs' | 'sm' | 'md';

/** Вариант отображения: бейдж с текстом или только точка. */
export type StatusChipVariant = 'chip' | 'dot';

/** Публичные пропсы StatusChip. */
export interface StatusChipProps {
  status: StatusChipStatus;
  label?: string;
  pulse?: boolean;
  size?: StatusChipSize;
  variant?: StatusChipVariant;
  /** Для status="custom" — произвольный Mantine-цвет. По умолчанию `gray`. */
  color?: string;
}

/** Маппинг статуса → цвет Mantine. */
const STATUS_COLOR: Record<Exclude<StatusChipStatus, 'custom'>, string> = {
  available: 'teal',
  active: 'teal',
  expired: 'gray',
  waiting: 'orange',
  error: 'red',
  sync: 'blue',
};

const DOT_SIZE = 8;
const PULSE_ANIMATION_NAME = 'statusChipPulse';
const PULSE_ANIMATION_VALUE = `${PULSE_ANIMATION_NAME} 2s ease-in-out infinite`;

/** CSS keyframes для пульсации — один раз в <head>. */
const PULSE_KEYFRAMES = `@keyframes ${PULSE_ANIMATION_NAME}{0%,100%{box-shadow:0 0 0 0 currentColor;opacity:1}50%{box-shadow:0 0 0 4px currentColor;opacity:.7}}`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _styleInjected = false;
function injectPulseStyle() {
  if (_styleInjected || typeof document === 'undefined') return;
  _styleInjected = true;
  const el = document.createElement('style');
  el.textContent = PULSE_KEYFRAMES;
  document.head.appendChild(el);
}

/**
 * StatusChip — компактный индикатор состояния с цветовой индикацией и пульсацией.
 *
 * Поддержка: light/dark, density, mobile (≤767px → xs через CSS или проп).
 */
export function StatusChip({
  status,
  label,
  pulse,
  size: sizeProp,
  variant = 'chip',
  color,
}: StatusChipProps) {
  const { density } = useDensity();

  const resolvedSize: StatusChipSize = sizeProp ?? 'sm';
  const chipColor = status === 'custom' ? (color ?? 'gray') : STATUS_COLOR[status];

  const pulseStyle: React.CSSProperties | undefined = pulse
    ? { animation: PULSE_ANIMATION_VALUE }
    : undefined;

  if (variant === 'dot') {
    return (
      <span
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: '50%',
          display: 'inline-block',
          backgroundColor: `var(--mantine-color-${chipColor}-6)`,
          border: 'none',
          padding: 0,
          lineHeight: 0,
          ...pulseStyle,
        }}
        role="status"
        aria-label={label ?? status}
      />
    );
  }

  const badgeSize =
    density === 'compact'
      ? resolvedSize === 'md'
        ? 'sm'
        : resolvedSize
      : resolvedSize;

  if (pulse) {
    injectPulseStyle();
  }

  return (
    <Badge
      size={badgeSize}
      color={chipColor}
      variant="light"
      role="status"
      style={pulseStyle}
    >
      {label ?? status}
    </Badge>
  );
}
