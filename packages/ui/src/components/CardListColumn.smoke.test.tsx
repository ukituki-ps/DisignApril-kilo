import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CardListColumn } from './CardListColumn';
import { AprilProviders } from '../providers';

const items = [
  { id: '1', title: 'First task' },
  { id: '2', title: 'Second task' }
];

describe('CardListColumn smoke', () => {
  it('renders items and triggers search callback', async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();

    render(
      <AprilProviders>
        <CardListColumn
          title="Inbox"
          mode="inline"
          items={items}
          onSearchChange={onSearchChange}
          withAdd={false}
        />
      </AprilProviders>
    );

    expect(screen.getByText('Inbox')).toBeInTheDocument();
    expect(screen.getByText('First task')).toBeInTheDocument();
    expect(screen.getByText('Second task')).toBeInTheDocument();

    const searchInput = screen.getByLabelText('Search cards');
    await user.type(searchInput, 'abc');

    expect(onSearchChange).toHaveBeenLastCalledWith('abc');
  });
});
