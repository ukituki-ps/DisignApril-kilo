import { Box, Text, useMantineTheme } from '@mantine/core';
import { AprilIcon } from '../icons/AprilIcon';
import type { AprilLucideIcon } from '../icons/AprilIcon';

export type AprilTransactionRowType = 'plus' | 'minus';

export interface AprilTransactionRowProps {
  /** Иконка Lucide. */
  icon: AprilLucideIcon;
  /** Тип транзакции. */
  type: AprilTransactionRowType;
  /** Название транзакции. */
  name: string;
  /** Дата. */
  date?: string;
  /** Сумма. */
  amount: string;
  className?: string;
  'data-testid'?: string;
}

/**
 * AprilTransactionRow — строка транзакции с иконкой, описанием и суммой.
 *
 * Сверено с прототипом LKFL: padding 13px 18px, icon 36×36, inner 16px.
 * Plus: green bg/icon. Minus: gray bg/icon.
 */
export function AprilTransactionRow({
  icon: IconComponent,
  type,
  name,
  date,
  amount,
  className,
  'data-testid': dataTestId,
}: AprilTransactionRowProps) {
  const theme = useMantineTheme();

  const isPlus = type === 'plus';
  const borderColor = theme.colors.gray[2] as unknown as string;
  const mutedColor = theme.colors.gray[5] as unknown as string;
  const subtlColor = theme.colors.gray[4] as unknown as string;

  // Plus: green bg + green icon
  const iconBg = isPlus ? '#DCFCE7' : (theme.colors.gray[0] as unknown as string);
  const iconColor = isPlus ? '#16A34A' : subtlColor;
  const amountColor = isPlus ? '#16A34A' : mutedColor;

  return (
    <Box
      className={className}
      data-testid={dataTestId}
      style={{
        display: 'flex',
        gap: 14,
        padding: '13px 18px',
        borderBottom: `1px solid ${borderColor}`,
      }}
    >
      {/* Icon */}
      <Box
        aria-hidden
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: iconBg,
          color: iconColor,
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

      {/* Description */}
      <Box style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {name}
        </Text>
        {date ? (
          <Text
            style={{
              fontSize: 11,
              color: subtlColor,
            }}
          >
            {date}
          </Text>
        ) : null}
      </Box>

      {/* Amount */}
      <Box style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: amountColor,
            lineHeight: 1.35,
          }}
        >
          {isPlus ? '+' : '\u2212'}{amount}
        </Text>
      </Box>
    </Box>
  );
}
