import { useEffect, type ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AprilProviders } from '../providers';
import { useDensity } from '../DensityContext';
import { AprilProductHeader } from './AprilProductHeader';

function DensitySetter({ mode, children }: { mode: 'comfortable' | 'compact'; children: ReactNode }) {
  const { setDensity } = useDensity();

  useEffect(() => {
    setDensity(mode);
  }, [mode, setDensity]);

  return <>{children}</>;
}

function wrap(
  ui: React.ReactNode,
  density: 'comfortable' | 'compact' = 'comfortable',
) {
  return (
    <AprilProviders defaultColorScheme="light">
      <DensitySetter mode={density}>{ui}</DensitySetter>
    </AprilProviders>
  );
}

describe('AprilProductHeader', () => {
  it('рендерит productName по умолчанию', () => {
    render(wrap(<AprilProductHeader data-testid="header" />));
    expect(screen.getByText('April')).toBeInTheDocument();
  });

  it('рендерит кастомный productName', () => {
    render(wrap(<AprilProductHeader productName="MyProduct" data-testid="header" />));
    expect(screen.getByText('MyProduct')).toBeInTheDocument();
  });

  it('пробрасывает className на корневой header', () => {
    const { container } = render(
      wrap(<AprilProductHeader className="custom-header" data-testid="header" />),
    );
    const header = container.querySelector('header');
    expect(header).toHaveClass('custom-header');
  });

  it('использует дефолтный px="md" в comfortable режиме', () => {
    const { container } = render(wrap(<AprilProductHeader data-testid="header" />, 'comfortable'));
    const header = container.querySelector('header');
    const style = header!.getAttribute('style') || '';
    // Mantine Box px="md" → padding-inline: var(--mantine-spacing-md)
    expect(style).toContain('--mantine-spacing-md');
  });

  it('использует дефолтный px="sm" в compact режиме', () => {
    const { container } = render(wrap(<AprilProductHeader data-testid="header" />, 'compact'));
    const header = container.querySelector('header');
    const style = header!.getAttribute('style') || '';
    // Mantine Box px="sm" → padding-inline: var(--mantine-spacing-sm)
    expect(style).toContain('--mantine-spacing-sm');
  });

  it('px={0} переопределяет дефолт через inline padding-inline: 0', () => {
    const { container } = render(
      wrap(<AprilProductHeader px={0} data-testid="header" />, 'comfortable'),
    );
    const header = container.querySelector('header');
    const style = header!.getAttribute('style') || '';
    expect(style).toMatch(/padding-inline\s*:\s*0/);
    // не должен содержать дефолтную переменную
    expect(style).not.toContain('--mantine-spacing-md');
  });

  it('px="xl" переопределяет дефолт', () => {
    const { container } = render(
      wrap(<AprilProductHeader px="xl" data-testid="header" />, 'compact'),
    );
    const header = container.querySelector('header');
    const style = header!.getAttribute('style') || '';
    expect(style).toContain('--mantine-spacing-xl');
  });

  it('style накладывается поверх базовых', () => {
    const { container } = render(
      wrap(
        <AprilProductHeader
          style={{ backgroundColor: 'red' }}
          data-testid="header"
        />,
      ),
    );
    const header = container.querySelector('header');
    const style = header!.getAttribute('style') || '';
    expect(style).toContain('red');
  });
});
