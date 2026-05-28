import { Box, useMantineTheme } from '@mantine/core';
import { useDensity } from '../DensityContext';

export interface AprilFilterPillItem {
  value: string;
  label: string;
}

export interface AprilFilterPillsProps {
  items: AprilFilterPillItem[];
  active: string;
  onChange: (value: string) => void;
  className?: string;
  'data-testid'?: string;
}

/**
 * AprilFilterPills — горизонтальный ряд pill-кнопок-фильтров.
 *
 * White-label: цвета через Mantine primaryColor (теal по умолчанию).
 * Active: primary bg, white text. Inactive: border + muted text.
 * Hover inactive: border + text → primary.
 */
export function AprilFilterPills({
  items,
  active,
  onChange,
  className,
  'data-testid': dataTestId,
}: AprilFilterPillsProps) {
  const theme = useMantineTheme();
  const { density } = useDensity();
  const isCompact = density === 'compact';

  const pillPadding = isCompact ? '4px 12px' : '6px 14px';
  const pillFontSize = isCompact ? 11 : 12;

  const primaryColor = theme.colors.teal[6] as unknown as string;
  const borderColor = theme.colors.gray[2] as unknown as string;
  const mutedColor = theme.colors.gray[5] as unknown as string;
  const white = theme.white as unknown as string;

  return (
    <Box
      className={className}
      data-testid={dataTestId}
      style={{
        display: 'flex',
        gap: 6,
        flexWrap: 'wrap',
      }}
    >
      {items.map((item) => {
        const isActive = item.value === active;

        return (
          <button
            key={item.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(item.value)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: pillPadding,
              borderRadius: 20,
              fontSize: pillFontSize,
              fontWeight: 600,
              border: `1.5px solid ${isActive ? primaryColor : borderColor}`,
              background: isActive ? primaryColor : 'transparent',
              color: isActive ? white : mutedColor,
              cursor: 'pointer',
              transition: 'background 0.15s, color 0.15s, border-color 0.15s',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
              lineHeight: 1,
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = primaryColor;
                e.currentTarget.style.color = primaryColor;
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = borderColor;
                e.currentTarget.style.color = mutedColor;
              }
            }}
          >
            {item.label}
          </button>
        );
      })}
    </Box>
  );
}
