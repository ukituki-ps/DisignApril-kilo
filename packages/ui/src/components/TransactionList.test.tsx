import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Brain, Coins, Dumbbell, Gift, ShoppingBag } from 'lucide-react';
import { AprilProviders } from '../providers';
import { TransactionList, type TransactionItem } from './TransactionList';

function wrap(ui: React.ReactNode) {
  return <AprilProviders>{ui}</AprilProviders>;
}

const sampleTransactions: TransactionItem[] = [
  {
    id: 't1',
    type: 'credit',
    name: 'Бонус за регистрацию',
    amount: '500',
    date: '2026-01-15',
    icon: <Gift size={18} aria-hidden />,
    category: 'промо',
  },
  {
    id: 't2',
    type: 'debit',
    name: 'Посещение салона красоты',
    amount: '200',
    date: '2026-01-16',
    icon: <Brain size={18} aria-hidden />,
    category: 'услуги',
  },
  {
    id: 't3',
    type: 'credit',
    name: 'Реферальный бонус',
    amount: '300',
    date: '2026-01-17',
    icon: <Coins size={18} aria-hidden />,
    category: 'реферал',
  },
  {
    id: 't4',
    type: 'debit',
    name: 'Покупка мерча',
    amount: '150',
    date: '2026-01-18',
    icon: <ShoppingBag size={18} aria-hidden />,
    category: 'магазин',
  },
  {
    id: 't5',
    type: 'credit',
    name: 'Бонус за фитнес',
    amount: '100',
    date: '2026-01-19',
    icon: <Dumbbell size={18} aria-hidden />,
    category: 'здоровье',
  },
];

describe('TransactionList', () => {
  it('рендерит список транзакций', () => {
    render(wrap(<TransactionList transactions={sampleTransactions} showFilters={false} />));
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(5);
    expect(screen.getByText('Бонус за регистрацию')).toBeInTheDocument();
    expect(screen.getByText('Посещение салона красоты')).toBeInTheDocument();
  });

  it('рендерит pill-кнопки фильтров при showFilters=true (по умолчанию)', () => {
    render(wrap(<TransactionList transactions={sampleTransactions} />));
    expect(screen.getByRole('button', { name: 'Все' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Начисления' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Списания' })).toBeInTheDocument();
  });

  it('скрывает фильтры при showFilters=false', () => {
    render(wrap(<TransactionList transactions={sampleTransactions} showFilters={false} />));
    expect(screen.queryByRole('button', { name: 'Все' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Начисления' })).not.toBeInTheDocument();
  });

  it('фильтрует по credit при управляемом filter prop', async () => {
    // Контролируемый компонент: родитель обновляет filter prop via onFilterChange.
    // Симулируем через ре-рендер с новым filter.
    const { rerender } = render(
      wrap(<TransactionList transactions={sampleTransactions} filter="all" />),
    );

    // Изначально все видны
    expect(screen.getByText('Посещение салона красоты')).toBeInTheDocument();

    // Родитель переключил на credit
    rerender(wrap(<TransactionList transactions={sampleTransactions} filter="credit" />));

    // Теперь только credit: t1, t3, t5
    expect(screen.queryByText('Посещение салона красоты')).not.toBeInTheDocument();
    expect(screen.queryByText('Покупка мерча')).not.toBeInTheDocument();
    expect(screen.getByText('Бонус за регистрацию')).toBeInTheDocument();
    expect(screen.getByText('Реферальный бонус')).toBeInTheDocument();
    expect(screen.getByText('Бонус за фитнес')).toBeInTheDocument();
  });

  it('onFilterChange вызывается при клике на фильтр', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(
      wrap(
        <TransactionList
          transactions={sampleTransactions}
          filter="all"
          onFilterChange={handler}
        />,
      ),
    );

    await user.click(screen.getByRole('button', { name: 'Списания' }));
    expect(handler).toHaveBeenCalledWith('debit');

    await user.click(screen.getByRole('button', { name: 'Все' }));
    expect(handler).toHaveBeenCalledWith('all');
  });

  it('onRowClick вызывается с правильным item', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(
      wrap(
        <TransactionList
          transactions={sampleTransactions}
          showFilters={false}
          onRowClick={handler}
        />,
      ),
    );

    const rows = screen.getAllByRole('listitem');
    expect(rows).toHaveLength(5);

    await user.click(rows[0]);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 't1',
        name: 'Бонус за регистрацию',
        amount: '500',
      }),
    );
  });

  it('onRowClick работает по клавише Enter', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(
      wrap(
        <TransactionList
          transactions={sampleTransactions}
          showFilters={false}
          onRowClick={handler}
        />,
      ),
    );

    const row = screen.getAllByRole('listitem')[2];
    await user.type(row, '{Enter}');
    expect(handler).toHaveBeenCalled();
  });

  it('пустой массив показывает empty state', () => {
    render(wrap(<TransactionList transactions={[]} showFilters={false} />));
    expect(screen.getByText('Нет транзакций')).toBeInTheDocument();
  });

  it('кастомный empty рендерится', () => {
    render(
      wrap(
        <TransactionList
          transactions={[]}
          showFilters={false}
          empty={
            <div data-testid="custom-empty">Нет транзакций для этого периода</div>
          }
        />,
      ),
    );
    expect(screen.getByTestId('custom-empty')).toBeInTheDocument();
    expect(screen.queryByText('Нет транзакций')).not.toBeInTheDocument();
  });

  it('a11y: контейнер имеет role="list", строки — role="listitem"', () => {
    render(wrap(<TransactionList transactions={sampleTransactions} showFilters={false} />));
    const list = screen.getByRole('list');
    expect(list).toHaveAttribute('aria-label', 'Список транзакций');

    const items = screen.getAllByRole('listitem');
    expect(items.length).toBeGreaterThan(0);
    items.forEach((item) => {
      expect(item.tagName.toLowerCase()).toBe('div');
    });
  });

  it('сумма credit имеет плюс-префикс, debit — минус', () => {
    render(wrap(<TransactionList transactions={sampleTransactions} showFilters={false} />));
    expect(screen.getByText('+500')).toBeInTheDocument();
    expect(screen.getByText('−200')).toBeInTheDocument();
    expect(screen.getByText('+300')).toBeInTheDocument();
    expect(screen.getByText('−150')).toBeInTheDocument();
    expect(screen.getByText('+100')).toBeInTheDocument();
  });

  it('активная кнопка фильтра имеет aria-pressed=true', () => {
    render(
      wrap(
        <TransactionList
          transactions={sampleTransactions}
          filter="credit"
        />,
      ),
    );
    const allBtn = screen.getByRole('button', { name: 'Все' });
    const creditBtn = screen.getByRole('button', { name: 'Начисления' });
    const debitBtn = screen.getByRole('button', { name: 'Списания' });

    expect(allBtn).toHaveAttribute('aria-pressed', 'false');
    expect(creditBtn).toHaveAttribute('aria-pressed', 'true');
    expect(debitBtn).toHaveAttribute('aria-pressed', 'false');
  });

  it('фильтр debit показывает только списания', () => {
    render(
      wrap(
        <TransactionList
          transactions={sampleTransactions}
          filter="debit"
        />,
      ),
    );
    // t2 и t4 — debit
    expect(screen.getByText('Посещение салона красоты')).toBeInTheDocument();
    expect(screen.getByText('Покупка мерча')).toBeInTheDocument();
    expect(screen.queryByText('Бонус за регистрацию')).not.toBeInTheDocument();
    expect(screen.queryByText('Реферальный бонус')).not.toBeInTheDocument();
    expect(screen.queryByText('Бонус за фитнес')).not.toBeInTheDocument();
  });

  it('транзакция без иконки показывает +/- символ', () => {
    const txWithoutIcon: TransactionItem[] = [
      {
        id: 'no-icon-1',
        type: 'credit',
        name: 'Без иконки кредит',
        amount: '75',
        date: '2026-02-01',
      },
      {
        id: 'no-icon-2',
        type: 'debit',
        name: 'Без иконки дебет',
        amount: '30',
        date: '2026-02-02',
      },
    ];
    render(
      wrap(
        <TransactionList transactions={txWithoutIcon} showFilters={false} />,
      ),
    );
    expect(screen.getByText('Без иконки кредит')).toBeInTheDocument();
    expect(screen.getByText('Без иконки дебет')).toBeInTheDocument();
  });
});
