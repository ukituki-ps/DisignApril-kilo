import type { ReactNode } from 'react';
import { useMantineTheme } from '@mantine/core';
import { Coins as DefaultIcon } from 'lucide-react';

/** Компактный pill-индикатор баланса для header. */
export interface BalancePillProps {
  /** Числовое значение. */
  value: number | string;
  /** Подпись единицы (например «баллов»). */
  unit?: string;
  /** Иконка Lucide. По умолчанию: Coins. */
  icon?: ReactNode;
  /** Callback при клике. */
  onClick?: () => void;
}

/** Размер иконки pill. */
const ICON_SIZE = 13;

/**
 * BalancePill — компактный pill-индикатор баланса.
 *
 * Цвета берутся из Mantine theme (teal scale):
 *   background  → theme.colors.teal[0]
 *   border      → theme.colors.teal[2]
 *   text + icon → theme.colors.teal[7]
 *
 * a11y: aria-label с балансом; при onClick добавляется role="button" и tab-index.
 */
export function BalancePill({
  value,
  unit,
  icon,
  onClick,
}: BalancePillProps) {
  const theme = useMantineTheme();

  const bg = theme.colors.teal[0];
  const border = theme.colors.teal[2];
  const fg = theme.colors.teal[7];

  const label = unit !== undefined ? `${value} ${unit}` : `${value}`;

  return (
    <button
      type="button"
      aria-label={`Баланс: ${label}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      style={{
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 20,
        padding: '5px 13px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background 0.15s',
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: 'inherit',
        gap: 6,
        fontSize: 12,
        fontWeight: 700,
        color: fg,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = theme.colors.teal[1];
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = bg;
      }}
    >
      {icon !== undefined ? icon : <DefaultIcon size={ICON_SIZE} aria-hidden />}
      <span>{value}</span>
      {unit !== undefined && <span>{unit}</span>}
    </button>
  );
}
