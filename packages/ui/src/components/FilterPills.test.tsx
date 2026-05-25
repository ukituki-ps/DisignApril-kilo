import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { AprilProviders } from '../providers';
import { FilterPills, FilterPillItem } from './FilterPills';

function wrap(ui: React.ReactNode, density?: 'comfortable' | 'compact') {
  return (
    <AprilProviders defaultDensity={density}>
      {ui}
    </AprilProviders>
  );
}

const defaultPills: FilterPillItem[] = [
  { value: 'all', label: 'Все' },
  { value: 'dms', label: 'ДМС' },
  { value: 'sport', label: 'Спорт' },
  { value: 'food', label: 'Питание' },
];

describe('FilterPills', () => {
  it('рендерит все pills', () => {
    render(
      wrap(
        <FilterPills
          pills={defaultPills}
          activeValue="all"
          onChange={vi.fn()}
        />,
      ),
    );
    expect(screen.getByRole('button', { name: 'Все' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ДМС' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Спорт' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Питание' })).toBeInTheDocument();
  });

  it('клик по pill вызывает onChange с правильным value', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(
      wrap(
        <FilterPills
          pills={defaultPills}
          activeValue="all"
          onChange={handler}
        />,
      ),
    );

    await user.click(screen.getByRole('button', { name: 'Спорт' }));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith('sport');
  });

  it('активная pill имеет aria-pressed=true, неактивные — false', () => {
    render(
      wrap(
        <FilterPills
          pills={defaultPills}
          activeValue="dms"
          onChange={vi.fn()}
        />,
      ),
    );
    expect(
      screen.getByRole('button', { name: 'ДМС' }),
    ).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.getByRole('button', { name: 'Все' }),
    ).toHaveAttribute('aria-pressed', 'false');
  });

  it('scrollable container имеет overflow-x: auto', () => {
    const { container } = render(
      wrap(
        <FilterPills
          pills={defaultPills}
          activeValue="all"
          onChange={vi.fn()}
          scrollable={true}
        />,
      ),
    );
    const wrapper = container.querySelector<HTMLDivElement>('.filter-pills-scrollable');
    expect(wrapper?.style.overflowX).toBe('auto');
  });

  it('scrollable=false использует flex-wrap', () => {
    const { container } = render(
      wrap(
        <FilterPills
          pills={defaultPills}
          activeValue="all"
          onChange={vi.fn()}
          scrollable={false}
        />,
      ),
    );
    /* The pill buttons wrap; find the parent that contains them */
    const btn = container.querySelector('button');
    const wrapper = btn?.parentElement as HTMLElement | null;
    expect(wrapper?.style.flexWrap).toBe('wrap');
  });

  it('пустые pills не ломают рендер', () => {
    const { container } = render(
      wrap(
        <FilterPills
          pills={[]}
          activeValue="all"
          onChange={vi.fn()}
        />,
      ),
    );
    const wrapper = container.firstChild as HTMLElement | null;
    expect(wrapper).toBeInTheDocument();
    expect(container.querySelectorAll('button')).toHaveLength(0);
  });

  it('count отображается в aria-label', () => {
    const pillsWithCount: FilterPillItem[] = [
      { value: 'all', label: 'Все', count: 120 },
      { value: 'dms', label: 'ДМС', count: 42 },
    ];
    render(
      wrap(
        <FilterPills
          pills={pillsWithCount}
          activeValue="all"
          onChange={vi.fn()}
        />,
      ),
    );
    expect(
      screen.getByRole('button', { name: 'Все (120)' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'ДМС (42)' }),
    ).toBeInTheDocument();
  });

  it('count отображается текстовым элементом внутри pill', () => {
    const pillsWithCount: FilterPillItem[] = [
      { value: 'all', label: 'Все', count: 120 },
    ];
    render(
      wrap(
        <FilterPills
          pills={pillsWithCount}
          activeValue="all"
          onChange={vi.fn()}
        />,
      ),
    );
    expect(screen.getByText('120')).toBeInTheDocument();
  });

  it('compact density уменьшает padding pills', () => {
    const { container } = render(
      wrap(
        <FilterPills
          pills={defaultPills}
          activeValue="all"
          onChange={vi.fn()}
        />,
        'compact',
      ),
    );
    const button = container.querySelector('button') as HTMLElement | null;
    // Compact: padding-top/bottom = 4px
    expect(button?.style.padding).toBe('4px 10px');
  });

  it('comfortable density использует больший padding', () => {
    const { container } = render(
      wrap(
        <FilterPills
          pills={defaultPills}
          activeValue="all"
          onChange={vi.fn()}
        />,
        'comfortable',
      ),
    );
    const button = container.querySelector('button') as HTMLElement | null;
    // Comfortable: padding-top/bottom = 6px
    expect(button?.style.padding).toBe('6px 14px');
  });
});
