import { useState } from 'react';
import type { TransactionFilter, TransactionItem } from './TransactionList';
import {
  Brain,
  Coins,
  Dumbbell,
  Gift,
  MinusCircle,
  PlusCircle,
  ShoppingBag,
} from 'lucide-react';
import { Box, Stack, Text } from '@mantine/core';
import { TransactionList } from './TransactionList';

export function TransactionListSection() {
  const [filter, setFilter] = useState<TransactionFilter>('all');

  const demoTransactions: TransactionItem[] = [
    {
      id: 'tx1',
      type: 'credit',
      name: 'Бонус за регистрацию',
      amount: '500',
      date: '15 янв 2026',
      icon: <Gift size={18} aria-hidden />,
      category: 'промо',
    },
    {
      id: 'tx2',
      type: 'debit',
      name: 'Посещение психолога',
      amount: '200',
      date: '16 янв 2026',
      icon: <Brain size={18} aria-hidden />,
      category: 'услуги',
    },
    {
      id: 'tx3',
      type: 'credit',
      name: 'Реферальный бонус',
      amount: '300',
      date: '17 янв 2026',
      icon: <Coins size={18} aria-hidden />,
      category: 'реферал',
    },
    {
      id: 'tx4',
      type: 'debit',
      name: 'Покупка мерча СДЭК',
      amount: '150',
      date: '18 янв 2026',
      icon: <ShoppingBag size={18} aria-hidden />,
      category: 'магазин',
    },
    {
      id: 'tx5',
      type: 'credit',
      name: 'Бонус за фитнес-трекер',
      amount: '100',
      date: '19 янв 2026',
      icon: <Dumbbell size={18} aria-hidden />,
      category: 'здоровье',
    },
    {
      id: 'tx6',
      type: 'debit',
      name: 'Апгрейд пакета ДМС',
      amount: '450',
      date: '20 янв 2026',
      icon: <PlusCircle size={18} aria-hidden />,
      category: 'услуги',
    },
    {
      id: 'tx7',
      type: 'credit',
      name: 'Годовая премия лояльности',
      amount: '1000',
      date: '21 янв 2026',
      icon: <Coins size={18} aria-hidden />,
      category: 'промо',
    },
    {
      id: 'tx8',
      type: 'debit',
      name: 'Перевод на карту',
      amount: '600',
      date: '22 янв 2026',
      icon: <MinusCircle size={18} aria-hidden />,
      category: 'вывод',
    },
  ];

  return (
    <Stack gap="xl">
      {/* Basic: с фильтрами */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          TransactionList (с фильтрами)
        </Text>
        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            overflow: 'hidden',
          }}
        >
          <TransactionList
            transactions={demoTransactions}
            filter={filter}
            onFilterChange={setFilter}
            showFilters
          />
        </Box>
      </Stack>

      {/* Без фильтров, с кликом по строке */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          TransactionList (без фильтров, с нажатием на строку)
        </Text>
        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            overflow: 'hidden',
          }}
        >
          <TransactionList
            transactions={demoTransactions}
            showFilters={false}
            onRowClick={(item) => alert(`Транзакция: ${item.name}`)}
          />
        </Box>
      </Stack>

      {/* Empty state */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Empty state
        </Text>
        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            overflow: 'hidden',
          }}
        >
          <TransactionList
            transactions={[]}
            showFilters
            empty={
              <Text size="sm" c="dimmed">
                Нет транзакций за выбранный период
              </Text>
            }
          />
        </Box>
      </Stack>

      {/* Кастомные иконки без icon — fallback +/- */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          TransactionList (без кастомных иконок — fallback +/-)
        </Text>
        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            overflow: 'hidden',
          }}
        >
          <TransactionList
            transactions={demoTransactions.map((tx) => ({ ...tx, icon: undefined }))}
            showFilters
          />
        </Box>
      </Stack>
    </Stack>
  );
}
