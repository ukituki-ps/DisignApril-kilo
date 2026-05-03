import { useEffect } from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CardListColumn } from './CardListColumn';
import { AprilProviders } from '../providers';
import { useDensity } from '../DensityContext';

vi.mock('@mantine/core', async () => {
  const React = await vi.importActual<typeof import('react')>('react');
  const actual = await vi.importActual<typeof import('@mantine/core')>('@mantine/core');

  return {
    ...actual,
    ScrollArea: ({
      children,
      viewportRef,
      onScrollPositionChange,
      ...props
    }: {
      children: React.ReactNode;
      viewportRef?: React.Ref<HTMLDivElement>;
      onScrollPositionChange?: (position: { x: number; y: number }) => void;
    }) => {
      const localViewportRef = React.useRef<HTMLDivElement | null>(null);

      React.useEffect(() => {
        if (!viewportRef) {
          return;
        }

        if (typeof viewportRef === 'function') {
          viewportRef(localViewportRef.current);
          return;
        }

        (viewportRef as { current: HTMLDivElement | null }).current = localViewportRef.current;
      }, [viewportRef]);

      return (
        <div
          role="region"
          aria-label="Область прокрутки списка карточек"
          ref={localViewportRef}
          onScroll={(event) => {
            onScrollPositionChange?.({ x: 0, y: event.currentTarget.scrollTop });
          }}
          {...props}>
          {children}
        </div>
      );
    }
  };
});

const items = [
  { id: '1', title: 'Первая задача', description: 'Первое описание' },
  { id: '2', title: 'Вторая задача', description: 'Второе описание' },
];

function DensityModeSetter({ mode }: { mode: 'comfortable' | 'compact' }) {
  const { setDensity } = useDensity();

  useEffect(() => {
    setDensity(mode);
  }, [mode, setDensity]);

  return null;
}

function renderCardListColumn(ui: React.ReactNode) {
  return render(<AprilProviders defaultColorScheme="dark">{ui}</AprilProviders>);
}

describe('CardListColumn', () => {
  it('renders title, counter and list items', () => {
    const { container } = renderCardListColumn(
      <CardListColumn title="Inbox" mode="inline" items={items} withAdd={false} />
    );

    expect(screen.getByText('Inbox')).toBeTruthy();
    expect(screen.getByText('2')).toBeTruthy();
    expect(screen.getByText('Первая задача')).toBeTruthy();
    expect(screen.getByText('Вторая задача')).toBeTruthy();
    expect(container.querySelector('.mantine-Group-root')).toBeNull();
  });

  it('keeps fixed height by default and supports fill mode', () => {
    const { rerender } = renderCardListColumn(
      <CardListColumn title="Inbox" mode="inline" items={items} withAdd={false} />
    );

    const fixedHeader = screen.getByText('Inbox');
    const fixedPaper = fixedHeader.closest('.mantine-Paper-root');
    expect(fixedPaper).toHaveStyle({ height: '520px' });

    rerender(
      <AprilProviders defaultColorScheme="dark">
        <div style={{ height: '640px' }}>
          <CardListColumn title="Inbox" mode="inline" items={items} withAdd={false} heightMode="fill" />
        </div>
      </AprilProviders>
    );

    const fillHeader = screen.getByText('Inbox');
    const fillPaper = fillHeader.closest('.mantine-Paper-root');
    expect(fillPaper).toHaveStyle({ height: '100%' });
  });

  it('calls onSearchChange when user types in search input', async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();

    renderCardListColumn(
      <CardListColumn title="Inbox" mode="inline" items={items} onSearchChange={onSearchChange} withAdd={false} />
    );

    const searchInput = screen.getByLabelText('Поиск по карточкам');
    await user.type(searchInput, 'abc');

    expect(onSearchChange).toHaveBeenLastCalledWith('abc');
  });

  it('cycles inline views list → grid → collapsed → list', async () => {
    const user = userEvent.setup();

    renderCardListColumn(<CardListColumn title="Inbox" mode="inline" items={items} withAdd={false} />);

    expect(screen.getByLabelText('Поиск по карточкам')).toBeTruthy();
    await user.click(screen.getByLabelText('Следующий вид: сетку карточек'));
    expect(screen.getByLabelText('Следующий вид: свёрнутую колонку')).toBeTruthy();
    expect(screen.queryByRole('separator', { name: 'Изменить ширину списка' })).toBeNull();

    await user.click(screen.getByLabelText('Следующий вид: свёрнутую колонку'));
    expect(screen.queryByLabelText('Поиск по карточкам')).toBeNull();
    expect(screen.getByLabelText('Следующий вид: список')).toBeTruthy();

    await user.click(screen.getByLabelText('Следующий вид: список'));
    expect(screen.getByLabelText('Поиск по карточкам')).toBeTruthy();
    expect(screen.getByLabelText('Следующий вид: сетку карточек')).toBeTruthy();
    expect(screen.getByRole('separator', { name: 'Изменить ширину списка' })).toBeTruthy();
  });

  it('handles overlay open and close flow', async () => {
    const user = userEvent.setup();

    renderCardListColumn(<CardListColumn title="Inbox" mode="overlay" items={items} />);

    expect(screen.getByText('Скрыть список поверх')).toBeTruthy();
    expect(screen.getByLabelText('Закрыть список поверх страницы')).toBeTruthy();

    await user.click(screen.getByLabelText('Закрыть список поверх страницы'));
    expect(screen.queryByLabelText('Закрыть список поверх страницы')).toBeNull();
    expect(screen.getByText('Показать список поверх')).toBeTruthy();

    await user.click(screen.getByText('Показать список поверх'));
    expect(screen.getByLabelText('Закрыть список поверх страницы')).toBeTruthy();
  });

  it('calls filter/sort/add callbacks from actions panel', async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();
    const onSortChange = vi.fn();
    const onAddItem = vi.fn();

    renderCardListColumn(
      <CardListColumn
        title="Inbox"
        mode="inline"
        items={items}
        onFilterChange={onFilterChange}
        onSortChange={onSortChange}
        onAddItem={onAddItem}
        renderFilterModal={({ setDraftFilter, applyFilter }) => (
          <div>
            <button type="button" onClick={() => setDraftFilter({ status: 'done' })}>
              Set custom filter
            </button>
            <button type="button" onClick={applyFilter}>
              Apply custom filter
            </button>
          </div>
        )}
        renderSortModal={({ setDraftSort, applySort }) => (
          <div>
            <button type="button" onClick={() => setDraftSort({ field: 'title', direction: 'asc' })}>
              Set custom sort
            </button>
            <button type="button" onClick={applySort}>
              Apply custom sort
            </button>
          </div>
        )}
      />
    );

    await user.click(screen.getByLabelText('Открыть фильтры'));
    await user.click(await screen.findByRole('button', { name: 'Set custom filter' }));
    await user.click(await screen.findByRole('button', { name: 'Apply custom filter' }));
    expect(onFilterChange).toHaveBeenCalledWith({ status: 'done' });

    await user.click(screen.getByLabelText('Открыть сортировку'));
    await user.click(await screen.findByRole('button', { name: 'Set custom sort' }));
    await user.click(await screen.findByRole('button', { name: 'Apply custom sort' }));
    expect(onSortChange).toHaveBeenCalledWith({ field: 'title', direction: 'asc' });

    await user.click(screen.getByLabelText('Добавить элемент'));
    expect(onAddItem).toHaveBeenCalledTimes(1);
  });

  it('opens fallback add modal when onAddItem is not provided', async () => {
    const user = userEvent.setup();

    renderCardListColumn(<CardListColumn title="Inbox" mode="inline" items={items} />);

    await user.click(screen.getByLabelText('Добавить элемент'));
    expect(
      await screen.findByText('Сценарий добавления можно реализовать полями, специфичными для продукта.')
    ).toBeTruthy();
  });

  it('supports filter modal reset and close actions', async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();

    renderCardListColumn(
      <CardListColumn
        title="Inbox"
        mode="inline"
        items={items}
        onFilterChange={onFilterChange}
        renderFilterModal={({ setDraftFilter, resetFilter, closeModal }) => (
          <div>
            <button type="button" onClick={() => setDraftFilter({ status: 'in-progress' })}>
              Set draft filter
            </button>
            <button type="button" onClick={resetFilter}>
              Reset filter
            </button>
            <button type="button" onClick={closeModal}>
              Close filter modal
            </button>
          </div>
        )}
      />
    );

    await user.click(screen.getByLabelText('Открыть фильтры'));
    await user.click(await screen.findByRole('button', { name: 'Set draft filter' }));
    await user.click(await screen.findByRole('button', { name: 'Reset filter' }));
    expect(onFilterChange).toHaveBeenCalledWith({});

    await user.click(screen.getByLabelText('Открыть фильтры'));
    await user.click(await screen.findByRole('button', { name: 'Close filter modal' }));
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Фильтры' })).toBeNull();
    });
  });

  it('supports sort modal reset and close actions', async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();

    renderCardListColumn(
      <CardListColumn
        title="Inbox"
        mode="inline"
        items={items}
        onSortChange={onSortChange}
        renderSortModal={({ setDraftSort, resetSort, closeModal }) => (
          <div>
            <button type="button" onClick={() => setDraftSort({ field: 'title', direction: 'asc' })}>
              Set draft sort
            </button>
            <button type="button" onClick={resetSort}>
              Reset sort
            </button>
            <button type="button" onClick={closeModal}>
              Close sort modal
            </button>
          </div>
        )}
      />
    );

    await user.click(screen.getByLabelText('Открыть сортировку'));
    await user.click(await screen.findByRole('button', { name: 'Set draft sort' }));
    await user.click(await screen.findByRole('button', { name: 'Reset sort' }));
    expect(onSortChange).toHaveBeenCalledWith({ field: 'createdAt', direction: 'desc' });

    await user.click(screen.getByLabelText('Открыть сортировку'));
    await user.click(await screen.findByRole('button', { name: 'Close sort modal' }));
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Сортировка' })).toBeNull();
    });
  });

  it('does not resync filter draft while modal is open and resyncs after close', async () => {
    const user = userEvent.setup();
    const { rerender } = renderCardListColumn(
      <CardListColumn
        title="Inbox"
        mode="inline"
        items={items}
        filterValue={{ status: 'todo' }}
        renderFilterModal={({ draftFilter, setDraftFilter, closeModal }) => (
          <div>
            <span>Draft filter status: {draftFilter.status ?? 'none'}</span>
            <button type="button" onClick={() => setDraftFilter({ status: 'done' })}>
              Set draft to done
            </button>
            <button type="button" onClick={closeModal}>
              Close filter modal
            </button>
          </div>
        )}
      />
    );

    await user.click(screen.getByLabelText('Открыть фильтры'));
    expect(await screen.findByText('Draft filter status: todo')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Set draft to done' }));
    expect(screen.getByText('Draft filter status: done')).toBeTruthy();

    rerender(
      <AprilProviders defaultColorScheme="dark">
        <CardListColumn
          title="Inbox"
          mode="inline"
          items={items}
          filterValue={{ status: 'in-progress' }}
          renderFilterModal={({ draftFilter, setDraftFilter, closeModal }) => (
            <div>
              <span>Draft filter status: {draftFilter.status ?? 'none'}</span>
              <button type="button" onClick={() => setDraftFilter({ status: 'done' })}>
                Set draft to done
              </button>
              <button type="button" onClick={closeModal}>
                Close filter modal
              </button>
            </div>
          )}
        />
      </AprilProviders>
    );

    expect(screen.getByText('Draft filter status: done')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Close filter modal' }));
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Фильтры' })).toBeNull();
    });

    await user.click(screen.getByLabelText('Открыть фильтры'));
    expect(await screen.findByText('Draft filter status: in-progress')).toBeTruthy();
  });

  it('does not treat reordered filter keys as a new sync value', async () => {
    const user = userEvent.setup();
    const { rerender } = renderCardListColumn(
      <CardListColumn
        title="Inbox"
        mode="inline"
        items={items}
        filterValue={{ status: 'todo', priority: 'high' }}
        renderFilterModal={({ draftFilter, closeModal }) => (
          <div>
            <span>Draft key order: {Object.keys(draftFilter).join(',')}</span>
            <button type="button" onClick={closeModal}>
              Close stable filter modal
            </button>
          </div>
        )}
      />
    );

    await user.click(screen.getByLabelText('Открыть фильтры'));
    expect(await screen.findByText('Draft key order: status,priority')).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Close stable filter modal' }));

    rerender(
      <AprilProviders defaultColorScheme="dark">
        <CardListColumn
          title="Inbox"
          mode="inline"
          items={items}
          filterValue={{ priority: 'high', status: 'todo' }}
          renderFilterModal={({ draftFilter, closeModal }) => (
            <div>
              <span>Draft key order: {Object.keys(draftFilter).join(',')}</span>
              <button type="button" onClick={closeModal}>
                Close stable filter modal
              </button>
            </div>
          )}
        />
      </AprilProviders>
    );

    await user.click(screen.getByLabelText('Открыть фильтры'));
    expect(await screen.findByText('Draft key order: status,priority')).toBeTruthy();
  });

  it('does not resync sort draft while modal is open and resyncs after close', async () => {
    const user = userEvent.setup();
    const { rerender } = renderCardListColumn(
      <CardListColumn
        title="Inbox"
        mode="inline"
        items={items}
        sortValue={{ field: 'createdAt', direction: 'desc' }}
        renderSortModal={({ draftSort, setDraftSort, closeModal }) => (
          <div>
            <span>
              Draft sort: {draftSort.field}:{draftSort.direction}
            </span>
            <button type="button" onClick={() => setDraftSort({ field: 'title', direction: 'asc' })}>
              Set draft sort custom
            </button>
            <button type="button" onClick={closeModal}>
              Close sort modal
            </button>
          </div>
        )}
      />
    );

    await user.click(screen.getByLabelText('Открыть сортировку'));
    expect(await screen.findByText('Draft sort: createdAt:desc')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Set draft sort custom' }));
    expect(screen.getByText('Draft sort: title:asc')).toBeTruthy();

    rerender(
      <AprilProviders defaultColorScheme="dark">
        <CardListColumn
          title="Inbox"
          mode="inline"
          items={items}
          sortValue={{ field: 'title', direction: 'desc' }}
          renderSortModal={({ draftSort, setDraftSort, closeModal }) => (
            <div>
              <span>
                Draft sort: {draftSort.field}:{draftSort.direction}
              </span>
              <button type="button" onClick={() => setDraftSort({ field: 'title', direction: 'asc' })}>
                Set draft sort custom
              </button>
              <button type="button" onClick={closeModal}>
                Close sort modal
              </button>
            </div>
          )}
        />
      </AprilProviders>
    );

    expect(screen.getByText('Draft sort: title:asc')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Close sort modal' }));
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Сортировка' })).toBeNull();
    });

    await user.click(screen.getByLabelText('Открыть сортировку'));
    expect(await screen.findByText('Draft sort: title:desc')).toBeTruthy();
  });

  it('calls parent callbacks with reset and apply values for filter and sort', async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();
    const onSortChange = vi.fn();

    renderCardListColumn(
      <CardListColumn
        title="Inbox"
        mode="inline"
        items={items}
        onFilterChange={onFilterChange}
        onSortChange={onSortChange}
        renderFilterModal={({ setDraftFilter, applyFilter, resetFilter }) => (
          <div>
            <button type="button" onClick={() => setDraftFilter({ status: 'done' })}>
              Set apply filter value
            </button>
            <button type="button" onClick={applyFilter}>
              Apply filter value
            </button>
            <button type="button" onClick={resetFilter}>
              Reset filter value
            </button>
          </div>
        )}
        renderSortModal={({ setDraftSort, applySort, resetSort }) => (
          <div>
            <button type="button" onClick={() => setDraftSort({ field: 'title', direction: 'asc' })}>
              Set apply sort value
            </button>
            <button type="button" onClick={applySort}>
              Apply sort value
            </button>
            <button type="button" onClick={resetSort}>
              Reset sort value
            </button>
          </div>
        )}
      />
    );

    await user.click(screen.getByLabelText('Открыть фильтры'));
    await user.click(await screen.findByRole('button', { name: 'Set apply filter value' }));
    await user.click(await screen.findByRole('button', { name: 'Apply filter value' }));
    expect(onFilterChange).toHaveBeenCalledWith({ status: 'done' });

    await user.click(screen.getByLabelText('Открыть фильтры'));
    await user.click(await screen.findByRole('button', { name: 'Reset filter value' }));
    expect(onFilterChange).toHaveBeenCalledWith({});

    await user.click(screen.getByLabelText('Открыть сортировку'));
    await user.click(await screen.findByRole('button', { name: 'Set apply sort value' }));
    await user.click(await screen.findByRole('button', { name: 'Apply sort value' }));
    expect(onSortChange).toHaveBeenCalledWith({ field: 'title', direction: 'asc' });

    await user.click(screen.getByLabelText('Открыть сортировку'));
    await user.click(await screen.findByRole('button', { name: 'Reset sort value' }));
    expect(onSortChange).toHaveBeenCalledWith({ field: 'createdAt', direction: 'desc' });
  });

  it('closes fallback add modal via close button', async () => {
    const user = userEvent.setup();

    renderCardListColumn(<CardListColumn title="Inbox" mode="inline" items={items} />);

    await user.click(screen.getByLabelText('Добавить элемент'));
    expect(
      await screen.findByText('Сценарий добавления можно реализовать полями, специфичными для продукта.')
    ).toBeTruthy();

    const addDialog = screen.getByRole('dialog', { name: 'Новый элемент' });
    await user.click(within(addDialog).getByRole('button'));
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Новый элемент' })).toBeNull();
    });
  });

  it('renders empty and loading states', () => {
    const { rerender } = renderCardListColumn(
      <CardListColumn title="Inbox" mode="inline" items={[]} loading={false} withAdd={false} />
    );

    expect(screen.getByText('Нет элементов для текущего запроса.')).toBeTruthy();

    rerender(
      <AprilProviders defaultColorScheme="dark">
        <CardListColumn
          title="Inbox"
          mode="inline"
          items={items}
          loading
          loadedItemsCount={2}
          totalItems={10}
          withAdd={false}
        />
      </AprilProviders>
    );

    expect(screen.getByText('Обновление: 1…2 с сервера…')).toBeTruthy();
  });

  it('calls onReachListEnd once and guards repeat trigger while loading', () => {
    const onReachListEnd = vi.fn();

    renderCardListColumn(
      <CardListColumn
        title="Inbox"
        mode="inline"
        items={items}
        loadedItemsCount={2}
        totalItems={10}
        withAdd={false}
        onReachListEnd={onReachListEnd}
      />
    );

    const scrollContainer = screen.getByRole('region', { name: 'Область прокрутки списка карточек' });
    Object.defineProperty(scrollContainer, 'scrollHeight', { value: 400, configurable: true });
    Object.defineProperty(scrollContainer, 'clientHeight', { value: 300, configurable: true });
    Object.defineProperty(scrollContainer, 'scrollTop', { value: 100, writable: true, configurable: true });

    fireEvent.scroll(scrollContainer);
    fireEvent.scroll(scrollContainer);

    expect(onReachListEnd).toHaveBeenCalledTimes(1);
  });

  it('keeps interactive controls available by role/aria-label in compact density', () => {
    render(
      <AprilProviders defaultColorScheme="dark">
        <DensityModeSetter mode="compact" />
        <CardListColumn title="Inbox" mode="inline" items={items} />
      </AprilProviders>
    );

    expect(screen.getByRole('textbox', { name: 'Поиск по карточкам' })).toBeTruthy();
    expect(screen.getByLabelText('Открыть фильтры')).toBeTruthy();
    expect(screen.getByLabelText('Открыть сортировку')).toBeTruthy();
    expect(screen.getByLabelText('Добавить элемент')).toBeTruthy();
    expect(screen.getByRole('separator', { name: 'Изменить ширину списка' })).toBeTruthy();
    expect(screen.getByLabelText('Следующий вид: сетку карточек')).toBeTruthy();
  });

  it('selects and deselects item by click', async () => {
    const user = userEvent.setup();
    const onSelectItem = vi.fn();

    renderCardListColumn(
      <CardListColumn title="Inbox" mode="inline" items={items} withAdd={false} onSelectItem={onSelectItem} />
    );

    await user.click(screen.getByRole('button', { name: /Первая задача/i }));
    expect(onSelectItem).toHaveBeenLastCalledWith('1');

    await user.click(screen.getByRole('button', { name: /Первая задача/i }));
    expect(onSelectItem).toHaveBeenLastCalledWith(null);
  });
});
