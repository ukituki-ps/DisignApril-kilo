import { Box, Text, useMantineTheme } from '@mantine/core';
import { AprilIcon } from '../icons/AprilIcon';
import type { AprilLucideIcon } from '../icons/AprilIcon';

export interface AprilQuickButtonProps {
  /** Иконка Lucide. */
  icon: AprilLucideIcon;
  /** Текст кнопки. */
  text: string;
  /** Click handler. */
  onClick?: () => void;
  className?: string;
  'data-testid'?: string;
}

/**
 * AprilQuickButton — кнопка быстрого действия (иконка + текст, в grid).
 *
 * Сверено с прототипом LKFL: bg --row, border-radius 10px, icon box 32×32, inner 16px.
 */
export function AprilQuickButton({
  icon: IconComponent,
  text,
  onClick,
  className,
  'data-testid': dataTestId,
}: AprilQuickButtonProps) {
  const theme = useMantineTheme();

  const bg = theme.colors.gray[0] as unknown as string;
  const hoverBg = theme.colors.teal[0] as unknown as string;
  const iconColor = theme.colors.teal[6] as unknown as string;
  const textColor = theme.colors.dark[6] as unknown as string;

  return (
    <button
      type="button"
      className={className}
      data-testid={dataTestId}
      aria-label={text}
      onClick={onClick}
      style={{
        background: bg,
        borderRadius: 10,
        padding: 12,
        cursor: 'pointer',
        transition: 'background 0.15s',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        border: 'none',
        fontFamily: 'inherit',
        textAlign: 'left',
        alignItems: 'flex-start',
        width: '100%',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = hoverBg;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = bg;
      }}
    >
      {/* Icon container */}
      <Box
        aria-hidden
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: 'white',
          color: iconColor,
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Box style={{ width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AprilIcon icon={IconComponent} size={16} />
        </Box>
      </Box>

      {/* Text */}
      <Text
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: textColor,
          lineHeight: 1.35,
        }}
      >
        {text}
      </Text>
    </button>
  );
}
