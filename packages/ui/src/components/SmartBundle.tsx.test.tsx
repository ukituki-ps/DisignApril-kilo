import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { HeartPulse, Dumbbell, Smile } from 'lucide-react';
import { AprilProviders } from '../providers';
import { SmartBundle, type BundleItem } from './SmartBundle';

function wrap(ui: React.ReactNode) {
  return <AprilProviders>{ui}</AprilProviders>;
}

const sampleItems: BundleItem[] = [
  {
    id: 'item-1',
    name: 'ДМС — Базовая',
    status: 'active',
    icon: <HeartPulse size={18} aria-hidden />,
    price: 'Включено',
  },
  {
    id: 'item-2',
    name: 'Фитнес',
    status: 'available',
    icon: <Dumbbell size={18} aria-hidden />,
    price: '3 500 ₽ / мес',
  },
  {
    id: 'item-3',
    name: 'Стоматология',
    status: 'expired',
    icon: <Smile size={18} aria-hidden />,
    included: false,
  },
];

describe('SmartBundle', () => {
  it('рендерит с title и items', () => {
    render(
      wrap(
        <SmartBundle
          title="Семейный пакет"
          description="Пакет для всей семьи"
          items={sampleItems}
          bundlePrice="12 000 ₽"
        />,
      ),
    );
    expect(screen.getByText('Семейный пакет')).toBeInTheDocument();
    expect(screen.getByText('ДМС — Базовая')).toBeInTheDocument();
    expect(screen.getByText('Фитнес')).toBeInTheDocument();
    expect(screen.getByText('Стоматология')).toBeInTheDocument();
  });

  it('рендерит description', () => {
    render(
      wrap(
        <SmartBundle
          title="Тест"
          description="Описание пакета"
          items={sampleItems}
        />,
      ),
    );
    expect(screen.getByText('Описание пакета')).toBeInTheDocument();
  });

  it('рендерит bundlePrice', () => {
    render(
      wrap(
        <SmartBundle
          title="Пакет"
          items={sampleItems}
          bundlePrice="15 000 ₽"
        />,
      ),
    );
    expect(screen.getByText('15 000 ₽')).toBeInTheDocument();
  });

  it('показывает discount badge при isDiscounted', () => {
    render(
      wrap(
        <SmartBundle
          title="Скидочный пакет"
          items={sampleItems}
          isDiscounted
          discountPercent={30}
        />,
      ),
    );
    expect(screen.getByText('−30%')).toBeInTheDocument();
  });

  it('без isDiscounted — badge скидки не показан', () => {
    render(
      wrap(
        <SmartBundle
          title="Без скидки"
          items={sampleItems}
          bundlePrice="10 000 ₽"
        />,
      ),
    );
    expect(screen.queryByText('−0%')).not.toBeInTheDocument();
  });

  it('expandable: клик по header вызывает onToggle', () => {
    const onToggle = vi.fn();
    render(
      wrap(
        <SmartBundle
          title="Expandable"
          items={sampleItems}
          defaultExpanded={true}
          onToggle={onToggle}
        />,
      ),
    );
    // Клик по header (UnstyledButton)
    const header = screen.getByRole('button', { name: /Expandable/i });
    fireEvent.click(header);
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  it('aria-expanded на header', () => {
    render(
      wrap(
        <SmartBundle
          title="ARIA тест"
          items={sampleItems}
          defaultExpanded={true}
        />,
      ),
    );
    const header = screen.getByRole('button', { name: /ARIA тест/i });
    expect(header).toHaveAttribute('aria-expanded', 'true');
  });

  it('items отображаются в списке с role="list"', () => {
    render(
      wrap(
        <SmartBundle
          title="Список"
          items={sampleItems}
          defaultExpanded={true}
        />,
      ),
    );
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(sampleItems.length);
  });

  it('onItemSelect вызывается при клике на item', () => {
    const onItemSelect = vi.fn();
    render(
      wrap(
        <SmartBundle
          title="Клик"
          items={sampleItems}
          defaultExpanded={true}
          onItemSelect={onItemSelect}
        />,
      ),
    );
    const listItems = screen.getAllByRole('listitem');
    fireEvent.click(listItems[0]);
    expect(onItemSelect).toHaveBeenCalledWith(sampleItems[0]);
  });

  it('onAddBundle вызывается при клике на CTA', () => {
    const onAddBundle = vi.fn();
    render(
      wrap(
        <SmartBundle
          title="CTA тест"
          items={sampleItems}
          onAddBundle={onAddBundle}
          defaultExpanded={true}
        />,
      ),
    );
    const button = screen.getByRole('button', {
      name: /Добавить пакет CTA тест/i,
    });
    fireEvent.click(button);
    expect(onAddBundle).toHaveBeenCalledTimes(1);
  });

  it('StatusChip для элементов отображается', () => {
    render(
      wrap(
        <SmartBundle
          title="Статусы"
          items={sampleItems}
          defaultExpanded={true}
        />,
      ),
    );
    // StatusChip показывает label: «Активен», «Доступен», «Истёк»
    expect(screen.getByText('Активен')).toBeInTheDocument();
    expect(screen.getByText('Доступен')).toBeInTheDocument();
    expect(screen.getByText('Истёк')).toBeInTheDocument();
  });

  it('элемент без status — StatusChip не показан', () => {
    render(
      wrap(
        <SmartBundle
          title="Пакет без статусов"
          items={[{ id: 'no-status', name: 'Элемент без статуса' }]}
          defaultExpanded={true}
        />,
      ),
    );
    expect(screen.getByText('Элемент без статуса')).toBeInTheDocument();
    // Не должно быть StatusChip (нет role="status" в DOM)
    const statusElements = screen.queryAllByRole('status');
    // StatusChip рендерит Badge с role="status" — их не должно быть для элемента без status
    expect(statusElements).toHaveLength(0);
  });

  it('элемент с included=false — цена не показана', () => {
    render(
      wrap(
        <SmartBundle
          title="Без цены"
          items={[
            { id: 'excluded', name: 'Исключён', price: '100 ₽', included: false },
          ]}
          defaultExpanded={true}
        />,
      ),
    );
    expect(screen.getByText('Исключён')).toBeInTheDocument();
    expect(screen.queryByText('100 ₽')).not.toBeInTheDocument();
  });

  it('элемент с included=true (по умолчанию) — цена показана', () => {
    render(
      wrap(
        <SmartBundle
          title="С ценой"
          items={[{ id: 'included', name: 'Включён', price: '500 ₽' }]}
          defaultExpanded={true}
        />,
      ),
    );
    expect(screen.getByText('500 ₽')).toBeInTheDocument();
  });

  it('expandable=false — без кнопки expand и без aria-expanded', () => {
    render(
      wrap(
        <SmartBundle
          title="Не сворачивается"
          items={sampleItems}
          expandable={false}
        />,
      ),
    );
    const header = screen.getByRole('button', { name: /Не сворачивается/i });
    expect(header).not.toHaveAttribute('aria-expanded');
  });
});
