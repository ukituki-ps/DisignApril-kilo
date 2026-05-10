import { useState, type ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
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

  it('exposes aria-expanded on the search trigger while collapsed', async () => {
    const user = userEvent.setup();
    render(
      wrap(
        <AprilMobileShellBar
          center={<Text>Центр</Text>}
          searchPlaceholder="Поле поиска"
        />,
      ),
    );
    const openBtn = screen.getByLabelText('Открыть поиск');
    expect(openBtn).toHaveAttribute('aria-expanded', 'false');
    await user.click(openBtn);
    expect(screen.getByLabelText('Поле поиска')).toBeInTheDocument();
  });

  it('uses position absolute on the root bar when requested', () => {
    const { container } = render(
      wrap(
        <AprilMobileShellBar
          position="absolute"
          withSearch={false}
          center={<Text>Abs</Text>}
        />,
      ),
    );
    const root = container.querySelector('[data-april-mobile-shell-bar]');
    expect(root).not.toBeNull();
    expect(root).toHaveStyle({ position: 'absolute' });
  });

  it('respects controlled searchExpanded and hides center while expanded', async () => {
    const user = userEvent.setup();

    function Controlled() {
      const [expanded, setExpanded] = useState(true);
      return (
        <AprilMobileShellBar
          center={<Text>Слот центра</Text>}
          searchPlaceholder="Q"
          searchExpanded={expanded}
          onSearchExpandedChange={setExpanded}
        />
      );
    }

    render(wrap(<Controlled />));
    expect(screen.queryByText('Слот центра')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Q')).toBeInTheDocument();

    await user.click(screen.getByLabelText('Закрыть поиск'));
    expect(screen.getByText('Слот центра')).toBeInTheDocument();
    const openAgain = screen.getByLabelText('Открыть поиск');
    expect(openAgain).toHaveAttribute('aria-expanded', 'false');
  });

  it('forwards search query changes when searchValue is controlled', async () => {
    const user = userEvent.setup();
    const onSearchValueChange = vi.fn();

    function ControlledValue() {
      const [q, setQ] = useState('');
      return (
        <AprilMobileShellBar
          center={<Text>c</Text>}
          searchPlaceholder="Find"
          searchExpanded
          searchValue={q}
          onSearchValueChange={(v) => {
            onSearchValueChange(v);
            setQ(v);
          }}
        />
      );
    }

    render(wrap(<ControlledValue />));
    const field = screen.getByLabelText('Find');
    await user.type(field, 'ab');
    expect(onSearchValueChange).toHaveBeenCalled();
    expect(field).toHaveValue('ab');
  });
});
