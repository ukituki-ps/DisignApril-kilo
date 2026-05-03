import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ActionIcon, Text } from '@mantine/core';
import { AprilProviders } from '../providers';
import { AprilIconChevronLeft } from '../icons';
import { AprilMobileShellBar } from './AprilMobileShellBar';

function wrap(node: ReactNode) {
  return <AprilProviders defaultColorScheme="light">{node}</AprilProviders>;
}

describe('AprilMobileShellBar', () => {
  it('renders leading and center when search is collapsed', () => {
    render(
      wrap(
        <AprilMobileShellBar
          leading={
            <ActionIcon size="lg" variant="subtle" aria-label="Назад">
              <AprilIconChevronLeft size={20} aria-hidden />
            </ActionIcon>
          }
          center={<Text truncate>Контент центра</Text>}
          withSearch
        />,
      ),
    );
    expect(screen.getByLabelText('Назад')).toBeInTheDocument();
    expect(screen.getByText('Контент центра')).toBeInTheDocument();
    expect(screen.getByLabelText('Открыть поиск')).toBeInTheDocument();
  });

  it('expands search and collapses on Escape', async () => {
    const user = userEvent.setup();
    render(
      wrap(
        <AprilMobileShellBar
          center={<Text>Табы</Text>}
          searchPlaceholder="Найти"
          defaultSearchValue=""
        />,
      ),
    );
    await user.click(screen.getByLabelText('Открыть поиск'));
    const field = screen.getByLabelText('Найти');
    expect(field).toBeInTheDocument();
    expect(screen.queryByText('Табы')).not.toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByLabelText('Найти')).not.toBeInTheDocument();
    expect(screen.getByText('Табы')).toBeInTheDocument();
  });

  it('hides search UI when withSearch is false', () => {
    render(
      wrap(
        <AprilMobileShellBar withSearch={false} center={<Text>Только центр</Text>} />,
      ),
    );
    expect(screen.queryByLabelText('Открыть поиск')).not.toBeInTheDocument();
    expect(screen.getByText('Только центр')).toBeInTheDocument();
  });
});
