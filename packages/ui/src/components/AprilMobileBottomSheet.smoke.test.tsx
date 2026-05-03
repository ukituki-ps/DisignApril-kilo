import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { AprilProviders } from '../providers';
import { AprilMobileBottomSheet } from './AprilMobileBottomSheet';

function wrap(node: ReactNode) {
  return <AprilProviders defaultColorScheme="light">{node}</AprilProviders>;
}

describe('AprilMobileBottomSheet', () => {
  it('renders title and body when opened', () => {
    render(
      wrap(
        <AprilMobileBottomSheet opened title="Нижний лист" onClose={vi.fn()}>
          <p>Содержимое</p>
        </AprilMobileBottomSheet>,
      ),
    );
    expect(screen.getByRole('dialog', { name: 'Нижний лист' })).toBeInTheDocument();
    expect(screen.getByText('Содержимое')).toBeInTheDocument();
  });

  it('closes when close button is activated', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      wrap(
        <AprilMobileBottomSheet opened title="Закрытие" onClose={onClose}>
          Текст
        </AprilMobileBottomSheet>,
      ),
    );
    await user.click(screen.getByRole('button', { name: 'Закрыть' }));
    expect(onClose).toHaveBeenCalled();
  });
});
