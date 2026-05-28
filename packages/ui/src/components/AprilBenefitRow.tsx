import type { ReactNode } from 'react';
import { Box, Text, useMantineTheme } from '@mantine/core';
import { AprilIcon } from '../icons/AprilIcon';
import type { AprilLucideIcon } from '../icons/AprilIcon';

export interface AprilBenefitRowProps {
  /** Иконка Lucide. */
  icon: AprilLucideIcon;
  /** Название льготы. */
  name: string;
  /** Мета-информация (провайдер, дата). */
  meta?: string;
  /** Бейдж справа. */
  badge?: ReactNode;
  /** Click handler. */
  onClick?: () => void;
  className?: string;
  'data-testid'?: string;
}

/**
 * AprilBenefitRow — строка в списке льгот (иконка + название + мета + badge).
 *
 * Сверено с прототипом LKFL: padding 13px 20px, icon 38×38, inner 18px.
 */
export function AprilBenefitRow({
  icon: IconComponent,
  name,
  meta,
  badge,
  onClick,
  className,
  'data-testid': dataTestId,
}: AprilBenefitRowProps) {
  const theme = useMantineTheme();

  const borderColor = theme.colors.gray[2] as unknown as string;
  const hoverBg = theme.colors.teal[0] as unknown as string;
  const iconBg = theme.colors.gray[0] as unknown as string;
  const iconColor = theme.colors.teal[6] as unknown as string;
  const nameColor = theme.colors.dark[8] as unknown as string;
  const metaColor = theme.colors.gray[4] as unknown as string;

  return (
    <Box
      className={className}
      data-testid={dataTestId}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '13px 20px',
        borderBottom: `1px solid ${borderColor}`,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background 0.15s',
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.background = hoverBg;
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
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
          color: iconColor,
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

      {/* Text */}
      <Box style={{ flex: 1, minWidth: 0 }}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: nameColor,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {name}
        </Text>
        {meta ? (
          <Text
            style={{
              fontSize: 11,
              color: metaColor,
              marginTop: 2,
            }}
          >
            {meta}
          </Text>
        ) : null}
      </Box>

      {/* Badge */}
      {badge ? (
        <Box style={{ flexShrink: 0 }}>{badge}</Box>
      ) : null}
    </Box>
  );
}
