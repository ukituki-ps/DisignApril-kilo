import type { ReactNode } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AprilProviders } from '../providers';
import { AprilVaulBottomSheet } from './AprilVaulBottomSheet';

function wrap(node: ReactNode) {
  return <AprilProviders defaultColorScheme="light">{node}</AprilProviders>;
}

describe('AprilVaulBottomSheet', () => {
  it('renders title and body when opened', () => {
    render(
      wrap(
        <AprilVaulBottomSheet opened onClose={vi.fn()} headerTitle="Лист">
          <p>Содержимое</p>
        </AprilVaulBottomSheet>,
      ),
    );
    expect(screen.getByText('Лист')).toBeInTheDocument();
    expect(screen.getByText('Содержимое')).toBeInTheDocument();
  });

  it('closes when close button is activated', () => {
    const onClose = vi.fn();
    render(
      wrap(
        <AprilVaulBottomSheet opened onClose={onClose} headerTitle="Закрытие">
          Текст
        </AprilVaulBottomSheet>,
      ),
    );
    // Vaul uses pointer capture; jsdom lacks it — use click synthesis, not full pointer path.
    fireEvent.click(screen.getByRole('button', { name: 'Закрыть' }));
    expect(onClose).toHaveBeenCalled();
  });
});
