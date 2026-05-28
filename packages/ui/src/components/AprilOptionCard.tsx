import type { ReactNode } from 'react';
import { Box, Text, useMantineTheme } from '@mantine/core';

export interface AprilOptionCardProps {
  /** Название опции. */
  name: string;
  /** Описание. */
  description?: string;
  /** Цена (правая часть). */
  price?: ReactNode;
  /** Выбрана ли опция. */
  selected?: boolean;
  onChange?: (selected: boolean) => void;
  className?: string;
  'data-testid'?: string;
}

/**
 * AprilOptionCard — выбираемая карточка опции (для wizard step).
 *
 * Сверено с прототипом LKFL: border 2px, border-radius 10px, padding 14px 16px.
 * Selected: border + bg primary-light. Hover: border primary, bg primary-light.
 */
export function AprilOptionCard({
  name,
  description,
  price,
  selected = false,
  onChange,
  className,
  'data-testid': dataTestId,
}: AprilOptionCardProps) {
  const theme = useMantineTheme();

  const borderColor = theme.colors.gray[2] as unknown as string;
  const primaryColor = theme.colors.teal[6] as unknown as string;
  const primaryLight = theme.colors.teal[0] as unknown as string;
  const mutedColor = theme.colors.gray[5] as unknown as string;
  const nameColor = theme.colors.dark[8] as unknown as string;

  const handleToggle = () => {
    onChange?.(!selected);
  };

  return (
    <Box
      className={className}
      data-testid={dataTestId}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleToggle();
        }
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        border: `2px solid ${selected ? primaryColor : borderColor}`,
        borderRadius: 10,
        padding: '14px 16px',
        background: selected ? primaryLight : 'transparent',
        cursor: 'pointer',
        transition: 'border-color 0.15s, background 0.15s',
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = primaryColor;
          e.currentTarget.style.background = primaryLight;
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = borderColor;
          e.currentTarget.style.background = 'transparent';
        }
      }}
    >
      {/* Left: name + description */}
      <Box style={{ flex: 1, minWidth: 0 }}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: nameColor,
          }}
        >
          {name}
        </Text>
        {description ? (
          <Text
            style={{
              fontSize: 12,
              color: mutedColor,
              marginTop: 2,
            }}
          >
            {description}
          </Text>
        ) : null}
      </Box>

      {/* Right: price */}
      {price !== undefined ? (
        <Box style={{ flexShrink: 0 }}>
          <Text
            component="span"
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: primaryColor,
            }}
          >
            {price}
          </Text>
        </Box>
      ) : null}
    </Box>
  );
}
