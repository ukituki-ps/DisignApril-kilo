import { Box, Text, useMantineTheme } from '@mantine/core';
import { AprilIcon } from '../icons/AprilIcon';
import type { AprilLucideIcon } from '../icons/AprilIcon';

export interface AprilPayOptionCardProps {
  /** Иконка Lucide. */
  icon: AprilLucideIcon;
  /** Название. */
  name: string;
  /** Описание. */
  description: string;
  /** Выбран. */
  selected?: boolean;
  onChange?: (selected: boolean) => void;
  className?: string;
  'data-testid'?: string;
}

/**
 * AprilPayOptionCard — карточка варианта оплаты (иконка + название + описание).
 *
 * Сверено с прототипом LKFL: border 2px, border-radius 10px, padding 16px, icon 38×38.
 */
export function AprilPayOptionCard({
  icon: IconComponent,
  name,
  description,
  selected = false,
  onChange,
  className,
  'data-testid': dataTestId,
}: AprilPayOptionCardProps) {
  const theme = useMantineTheme();

  const borderColor = theme.colors.gray[2] as unknown as string;
  const primaryColor = theme.colors.teal[6] as unknown as string;
  const primaryLight = theme.colors.teal[0] as unknown as string;
  const iconBg = theme.colors.gray[0] as unknown as string;
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
        border: `2px solid ${selected ? primaryColor : borderColor}`,
        borderRadius: 10,
        padding: 16,
        background: selected ? primaryLight : 'transparent',
        cursor: 'pointer',
        transition: 'border-color 0.15s, background 0.15s',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = primaryColor;
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = borderColor;
        }
      }}
    >
      {/* Icon */}
      <Box
        aria-hidden
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          background: iconBg,
          color: primaryColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Box style={{ width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AprilIcon icon={IconComponent} size={18} />
        </Box>
      </Box>

      {/* Name + description */}
      <Box style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: nameColor,
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: mutedColor,
            lineHeight: 1.4,
          }}
        >
          {description}
        </Text>
      </Box>
    </Box>
  );
}
