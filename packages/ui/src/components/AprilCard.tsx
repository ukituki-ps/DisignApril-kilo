import type { ReactNode } from 'react';
import { Box, Text, useMantineTheme } from '@mantine/core';
import { AprilIcon } from '../icons/AprilIcon';
import type { AprilLucideIcon } from '../icons/AprilIcon';

export interface AprilCardProps {
  /** Заголовок в header. */
  title: ReactNode;
  /** Ссылка/кнопка справа в header (например "Весь каталог →"). */
  action?: ReactNode;
  /** Иконка Lucide слева от title. */
  icon?: AprilLucideIcon;
  children: ReactNode;
  className?: string;
  'data-testid'?: string;
}

/**
 * AprilCard — карточка с header (title + action link) и scrollable body.
 *
 * Сверено с прототипом LKFL: border-radius 14px, box-shadow, header padding 16px 20px.
 */
export function AprilCard({
  title,
  action,
  icon,
  children,
  className,
  'data-testid': dataTestId,
}: AprilCardProps) {
  const theme = useMantineTheme();

  const cardBg = theme.white as unknown as string;
  const borderColor = theme.colors.gray[1] as unknown as string;
  const titleColor = theme.colors.dark[8] as unknown as string;
  const iconColor = theme.colors.gray[5] as unknown as string;
  const actionColor = theme.colors.teal[6] as unknown as string;

  return (
    <Box
      className={className}
      data-testid={dataTestId}
      style={{
        background: cardBg,
        borderRadius: 14,
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flex: 1,
            minWidth: 0,
          }}
        >
          {icon ? (
            <Box style={{ flexShrink: 0, color: iconColor }} aria-hidden>
              <AprilIcon icon={icon} size={15} />
            </Box>
          ) : null}
          <Text
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: titleColor,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </Text>
        </Box>

        {action ? (
          <Box
            style={{
              flexShrink: 0,
              marginLeft: 12,
              fontSize: 12,
              fontWeight: 600,
              color: actionColor,
              cursor: 'pointer',
            }}
          >
            {action}
          </Box>
        ) : null}
      </Box>

      {/* Body — scrollable */}
      <Box style={{ overflow: 'auto' }}>{children}</Box>
    </Box>
  );
}
