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
          aria-label="Card list scroll area"
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
  { id: '1', title: 'First task', description: 'First description' },
  { id: '2', title: 'Second task', description: 'Second description' }
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
    renderCardListColumn(<CardListColumn title="Inbox" mode="inline" items={items} withAdd={false} />);

    expect(screen.getByText('Inbox')).toBeTruthy();
    expect(screen.getByText('2')).toBeTruthy();
    expect(screen.getByText('First task')).toBeTruthy();
    expect(screen.getByText('Second task')).toBeTruthy();
  });

  it('calls onSearchChange when user types in search input', async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();

    renderCardListColumn(
      <CardListColumn title="Inbox" mode="inline" items={items} onSearchChange={onSearchChange} withAdd={false} />
    );

    const searchInput = screen.getByLabelText('Search cards');
    await user.type(searchInput, 'abc');

    expect(onSearchChange).toHaveBeenLastCalledWith('abc');
  });

  it('handles inline collapse and expand', async () => {
    const user = userEvent.setup();

    renderCardListColumn(<CardListColumn title="Inbox" mode="inline" items={items} withAdd={false} />);

    await user.click(screen.getByLabelText('Collapse list'));
    expect(screen.getByLabelText('Expand list')).toBeTruthy();

    await user.click(screen.getByLabelText('Expand list'));
    expect(screen.getByLabelText('Collapse list')).toBeTruthy();
  });

  it('handles overlay open and close flow', async () => {
    const user = userEvent.setup();

    renderCardListColumn(<CardListColumn title="Inbox" mode="overlay" items={items} />);

    expect(screen.getByText('Hide overlay list')).toBeTruthy();
    expect(screen.getByLabelText('Close overlay list')).toBeTruthy();

    await user.click(screen.getByLabelText('Close overlay list'));
    expect(screen.queryByLabelText('Close overlay list')).toBeNull();
    expect(screen.getByText('Show overlay list')).toBeTruthy();

    await user.click(screen.getByText('Show overlay list'));
    expect(screen.getByLabelText('Close overlay list')).toBeTruthy();
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

    await user.click(screen.getByLabelText('Open filter options'));
    await user.click(await screen.findByRole('button', { name: 'Set custom filter' }));
    await user.click(await screen.findByRole('button', { name: 'Apply custom filter' }));
    expect(onFilterChange).toHaveBeenCalledWith({ status: 'done' });

    await user.click(screen.getByLabelText('Open sorting options'));
    await user.click(await screen.findByRole('button', { name: 'Set custom sort' }));
    await user.click(await screen.findByRole('button', { name: 'Apply custom sort' }));
    expect(onSortChange).toHaveBeenCalledWith({ field: 'title', direction: 'asc' });

    await user.click(screen.getByLabelText('Add new item'));
    expect(onAddItem).toHaveBeenCalledTimes(1);
  });

  it('opens fallback add modal when onAddItem is not provided', async () => {
    const user = userEvent.setup();

    renderCardListColumn(<CardListColumn title="Inbox" mode="inline" items={items} />);

    await user.click(screen.getByLabelText('Add new item'));
    expect(
      await screen.findByText('Add flow can be implemented with product-specific form fields.')
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

    await user.click(screen.getByLabelText('Open filter options'));
    await user.click(await screen.findByRole('button', { name: 'Set draft filter' }));
    await user.click(await screen.findByRole('button', { name: 'Reset filter' }));
    expect(onFilterChange).toHaveBeenCalledWith({});

    await user.click(screen.getByLabelText('Open filter options'));
    await user.click(await screen.findByRole('button', { name: 'Close filter modal' }));
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Filters' })).toBeNull();
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

    await user.click(screen.getByLabelText('Open sorting options'));
    await user.click(await screen.findByRole('button', { name: 'Set draft sort' }));
    await user.click(await screen.findByRole('button', { name: 'Reset sort' }));
    expect(onSortChange).toHaveBeenCalledWith({ field: 'createdAt', direction: 'desc' });

    await user.click(screen.getByLabelText('Open sorting options'));
    await user.click(await screen.findByRole('button', { name: 'Close sort modal' }));
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Sort' })).toBeNull();
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

    await user.click(screen.getByLabelText('Open filter options'));
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
      expect(screen.queryByRole('dialog', { name: 'Filters' })).toBeNull();
    });

    await user.click(screen.getByLabelText('Open filter options'));
    expect(await screen.findByText('Draft filter status: in-progress')).toBeTruthy();
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

    await user.click(screen.getByLabelText('Open sorting options'));
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
      expect(screen.queryByRole('dialog', { name: 'Sort' })).toBeNull();
    });

    await user.click(screen.getByLabelText('Open sorting options'));
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

    await user.click(screen.getByLabelText('Open filter options'));
    await user.click(await screen.findByRole('button', { name: 'Set apply filter value' }));
    await user.click(await screen.findByRole('button', { name: 'Apply filter value' }));
    expect(onFilterChange).toHaveBeenCalledWith({ status: 'done' });

    await user.click(screen.getByLabelText('Open filter options'));
    await user.click(await screen.findByRole('button', { name: 'Reset filter value' }));
    expect(onFilterChange).toHaveBeenCalledWith({});

    await user.click(screen.getByLabelText('Open sorting options'));
    await user.click(await screen.findByRole('button', { name: 'Set apply sort value' }));
    await user.click(await screen.findByRole('button', { name: 'Apply sort value' }));
    expect(onSortChange).toHaveBeenCalledWith({ field: 'title', direction: 'asc' });

    await user.click(screen.getByLabelText('Open sorting options'));
    await user.click(await screen.findByRole('button', { name: 'Reset sort value' }));
    expect(onSortChange).toHaveBeenCalledWith({ field: 'createdAt', direction: 'desc' });
  });

  it('closes fallback add modal via close button', async () => {
    const user = userEvent.setup();

    renderCardListColumn(<CardListColumn title="Inbox" mode="inline" items={items} />);

    await user.click(screen.getByLabelText('Add new item'));
    expect(
      await screen.findByText('Add flow can be implemented with product-specific form fields.')
    ).toBeTruthy();

    const addDialog = screen.getByRole('dialog', { name: 'Add new item' });
    await user.click(within(addDialog).getByRole('button'));
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Add new item' })).toBeNull();
    });
  });

  it('renders empty and loading states', () => {
    const { rerender } = renderCardListColumn(
      <CardListColumn title="Inbox" mode="inline" items={[]} loading={false} withAdd={false} />
    );

    expect(screen.getByText('No items for current server query.')).toBeTruthy();

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

    expect(screen.getByText('Reloading 1..2 from server...')).toBeTruthy();
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

    const scrollContainer = screen.getByRole('region', { name: 'Card list scroll area' });
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

    expect(screen.getByRole('textbox', { name: 'Search cards' })).toBeTruthy();
    expect(screen.getByLabelText('Open filter options')).toBeTruthy();
    expect(screen.getByLabelText('Open sorting options')).toBeTruthy();
    expect(screen.getByLabelText('Add new item')).toBeTruthy();
    expect(screen.getByRole('separator', { name: 'Resize list width' })).toBeTruthy();
  });
});
