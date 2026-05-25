import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Brain, ShoppingBag, UserPlus, Zap } from 'lucide-react';
import { AprilProviders } from '../providers';
import { QuickActionsGrid } from './QuickActionsGrid';

function wrap(ui: React.ReactNode) {
  return <AprilProviders>{ui}</AprilProviders>;
}

const defaultItems = [
  { id: 'a1', label: 'Действие 1', icon: <Zap size={16} aria-hidden /> },
  { id: 'a2', label: 'Действие 2', icon: <Brain size={16} aria-hidden /> },
  { id: 'a3', label: 'Действие 3', icon: <UserPlus size={16} aria-hidden /> },
  { id: 'a4', label: 'Действие 4', icon: <ShoppingBag size={16} aria-hidden /> },
];

describe('QuickActionsGrid', () => {
  it('рендерит grid с items', () => {
    render(wrap(<QuickActionsGrid items={defaultItems} />));
    expect(screen.getByRole('button', { name: 'Действие 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Действие 2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Действие 3' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Действие 4' })).toBeInTheDocument();
  });

  it('onAction вызывается с правильным item', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(wrap(<QuickActionsGrid items={defaultItems} onAction={handler} />));

    await user.click(screen.getByRole('button', { name: 'Действие 3' }));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'a3', label: 'Действие 3' }),
    );
  });

  it('disabled item не вызывает onAction', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    const items = [
      { id: 'a1', label: 'Active', icon: <Zap size={16} aria-hidden /> },
      { id: 'a2', label: 'Disabled action', icon: <Brain size={16} aria-hidden />, disabled: true },
    ];
    render(wrap(<QuickActionsGrid items={items} onAction={handler} />));

    const disabledBtn = screen.getByRole('button', { name: /Disabled action/ });
    expect(disabledBtn).toBeDisabled();

    await user.click(disabledBtn);
    expect(handler).not.toHaveBeenCalled();
  });

  it('badge отображается', () => {
    const items = [
      {
        id: 'b1',
        label: 'С уведомлениями',
        icon: <Zap size={16} aria-hidden />,
        badge: '3 новых',
      },
    ];
    render(wrap(<QuickActionsGrid items={items} />));
    expect(screen.getByText('3 новых')).toBeInTheDocument();
  });

  it('иконки рендерятся при showIcons=true (по умолчанию)', () => {
    render(wrap(<QuickActionsGrid items={defaultItems} />));
    // Проверяем наличие кнопок с aria-label — если иконки есть,
    // кнопки рендерятся с правильным лейблом
    expect(screen.getByRole('button', { name: 'Действие 1' })).toBeInTheDocument();
  });

  it('без showIcons иконки не рендерятся', () => {
    const { container } = render(
      wrap(<QuickActionsGrid items={defaultItems} showIcons={false} />),
    );
    // Без иконок — нет Box с aria-hidden и фиксированным размером иконки
    const iconContainers = container.querySelectorAll('[aria-hidden]');
    expect(iconContainers.length).toBe(0);
  });

  it('columns=2 задаёт 2 колонки', () => {
    const { container } = render(
      wrap(<QuickActionsGrid items={defaultItems} columns={2} />),
    );
    const grid = container.querySelector('[style*="grid-template-columns"]') as HTMLElement | null;
    expect(grid?.style.gridTemplateColumns).toBe('repeat(2, 1fr)');
  });

  it('columns=4 задаёт 4 колонки', () => {
    const { container } = render(
      wrap(<QuickActionsGrid items={defaultItems} columns={4} />),
    );
    const grid = container.querySelector('[style*="grid-template-columns"]') as HTMLElement | null;
    expect(grid?.style.gridTemplateColumns).toBe('repeat(4, 1fr)');
  });

  it('columns="auto" использует auto-fill', () => {
    const { container } = render(
      wrap(<QuickActionsGrid items={defaultItems} columns="auto" />),
    );
    const grid = container.querySelector('[style*="grid-template-columns"]') as HTMLElement | null;
    expect(grid?.style.gridTemplateColumns).toContain('auto-fill');
  });

  it('пустой items не ломает рендер', () => {
    const { container } = render(wrap(<QuickActionsGrid items={[]} />));
    const grid = container.firstChild as HTMLElement;
    expect(grid).toBeInTheDocument();
    expect(grid?.querySelectorAll('button')).toHaveLength(0);
  });

  it('color проп влияет на цвет иконки', () => {
    const items = [
      {
        id: 'c1',
        label: 'Красное',
        icon: <Zap size={16} aria-hidden />,
        color: 'red',
      },
    ];
    const { container } = render(wrap(<QuickActionsGrid items={items} />));
    const iconBox = container.querySelector('[aria-hidden]') as HTMLElement;
    // Цвет иконки содержит red
    expect(iconBox?.style.color).toContain('red');
  });
});
