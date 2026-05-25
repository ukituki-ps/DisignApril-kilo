import type { ReactNode } from 'react';
import { Box, Text, useMantineTheme } from '@mantine/core';
import { useDensity } from '../DensityContext';

/** Тип транзакции: начисление (credit) или списание (debit). */
export type TransactionType = 'credit' | 'debit';

/** Элемент списка транзакций. */
export interface TransactionItem {
  /** Уникальный ID. */
  id: string;
  /** Тип: начисление или списание. */
  type: TransactionType;
  /** Название транзакции. */
  name: string;
  /** Сумма (строка для форматирования). */
  amount: string;
  /** Дата (форматируется вне компонента). */
  date: string;
  /** Кастомная иконка (опционально). */
  icon?: ReactNode;
  /** Категория (опционально). */
  category?: string;
}

export type TransactionFilter = 'all' | 'credit' | 'debit';

export interface TransactionListProps {
  /** Массив транзакций. */
  transactions: TransactionItem[];
  /** Текущий фильтр. */
  filter?: TransactionFilter;
  /** Callback при смене фильтра. */
  onFilterChange?: (filter: TransactionFilter) => void;
  /** Показывать панель фильтров. */
  showFilters?: boolean;
  /** Callback при клике на строку. */
  onRowClick?: (item: TransactionItem) => void;
  /** Контент пустого состояния. */
  empty?: ReactNode;
}

/** Размер коробки иконки: 36×36px, как в прототипе. */
const ICON_BOX_SIZE = 36;
const ICON_BOX_RADIUS = 10;
/** Размер SVG-иконки внутри контейнера. */
const ICON_SIZE = 18;

const FILTER_LABELS: Record<TransactionFilter, string> = {
  all: 'Все',
  credit: 'Начисления',
  debit: 'Списания',
};

/**
 * TransactionList — список транзакций начислений/списаний баллов.
 *
 * Сверено с прототипом: `.tx-toolbar` (filter pills), `.tx-row` (icon + desc + amount).
 * Density: padding и gap через useDensity().
 * a11y: role="list" + role="listitem", aria-label для строк.
 */
export function TransactionList({
  transactions,
  filter = 'all',
  onFilterChange,
  showFilters = true,
  onRowClick,
  empty,
}: TransactionListProps) {
  const theme = useMantineTheme();
  const { density } = useDensity();
  const isCompact = density === 'compact';

  const rowPadding = isCompact ? 10 : 13;
  const toolbarPadding = isCompact
    ? { paddingTop: 10, paddingBottom: 10, paddingLeft: 14, paddingRight: 18 }
    : { paddingTop: 14, paddingBottom: 14, paddingLeft: 18, paddingRight: 18 };
  const rowGap = isCompact ? 8 : 12;

  const filteredTransactions =
    filter === 'all'
      ? transactions
      : transactions.filter((tx) => tx.type === filter);

  return (
    <Box
      role="list"
      aria-label="Список транзакций"
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Toolbar with filter pills */}
      {showFilters && (
        <Box
          style={{
            display: 'flex',
            gap: 8,
            padding: `${toolbarPadding.paddingTop}px ${toolbarPadding.paddingRight}px ${toolbarPadding.paddingBottom}px ${toolbarPadding.paddingLeft}px`,
            borderBottom: `1px solid ${theme.colors.gray[3]}`,
          }}
        >
          {(['all', 'credit', 'debit'] as TransactionFilter []).map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={isActive}
                onClick={() => onFilterChange?.(f)}
                style={{
                  borderRadius: 9999,
                  padding: isCompact ? '4px 12px' : '6px 16px',
                  fontSize: 13,
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'background 0.15s, color 0.15s',
                  background: isActive ? theme.colors.dark[7] : 'transparent',
                  color: isActive ? 'white' : theme.colors.gray[7],
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = theme.colors.gray[1];
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {FILTER_LABELS[f]}
              </button>
            );
          })}
        </Box>
      )}

      {/* Transaction rows */}
      {filteredTransactions.length === 0 ? (
        <Box
          style={{
            padding: isCompact ? 24 : 32,
            textAlign: 'center',
          }}
        >
          {empty ?? (
            <Text size="sm" c="dimmed">
              Нет транзакций
            </Text>
          )}
        </Box>
      ) : (
        filteredTransactions.map((tx, index) => {
          const isCredit = tx.type === 'credit';
          const iconBg = isCredit ? theme.colors.teal[0] : theme.colors.gray[1];
          const iconColor = isCredit ? theme.colors.teal[7] : theme.colors.gray[6];
          const amountColor = isCredit ? theme.colors.teal[7] : theme.colors.gray[6];
          const isLast = index === filteredTransactions.length - 1;

          return (
            <Box
              key={tx.id}
              role="listitem"
              aria-label={`${tx.name}: ${tx.amount}`}
              tabIndex={onRowClick ? 0 : undefined}
              onClick={() => onRowClick?.(tx)}
              onKeyDown={(e) => {
                if (onRowClick && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  onRowClick(tx);
                }
              }}
              style={{
                display: 'flex',
                gap: rowGap,
                padding: `${rowPadding}px 18px`,
                borderBottom: isLast
                  ? 'none'
                  : `1px solid ${theme.colors.gray[2]}`,
                cursor: onRowClick ? 'pointer' : 'default',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => {
                if (onRowClick) {
                  e.currentTarget.style.background = theme.colors.gray[0];
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {/* Icon container */}
              <Box
                aria-hidden
                style={{
                  width: ICON_BOX_SIZE,
                  height: ICON_BOX_SIZE,
                  borderRadius: ICON_BOX_RADIUS,
                  background: iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: iconColor,
                  flexShrink: 0,
                }}
              >
                {tx.icon ? (
                  <Box
                    style={{
                      width: ICON_SIZE,
                      height: ICON_SIZE,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {tx.icon}
                  </Box>
                ) : (
                  <Text
                    size={isCompact ? 'xs' : 'sm'}
                    fw={700}
                    style={{
                      fontSize: 14,
                      lineHeight: 1,
                      color: iconColor,
                    }}
                  >
                    {isCredit ? '+' : '−'}
                  </Text>
                )}
              </Box>

              {/* Description */}
              <Box
                style={{
                  flex: 1,
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: 2,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: theme.colors.dark[7] ?? theme.colors.dark[6],
                    lineHeight: 1.35,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tx.name}
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    color: theme.colors.gray[5],
                    lineHeight: 1.3,
                  }}
                >
                  {tx.date}
                </Text>
              </Box>

              {/* Amount */}
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexShrink: 0,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: amountColor,
                    lineHeight: 1.35,
                  }}
                >
                  {isCredit ? '+' : '−'}
                  {tx.amount}
                </Text>
              </Box>
            </Box>
          );
        })
      )}
    </Box>
  );
}
