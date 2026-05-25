import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Trophy } from 'lucide-react';
import { AprilProviders } from '../providers';
import { GamifiedProgress } from './GamifiedProgress';

function wrap(ui: React.ReactNode) {
  return <AprilProviders>{ui}</AprilProviders>;
}

describe('GamifiedProgress', () => {
  it('рендерит с value/max', () => {
    render(wrap(<GamifiedProgress value={3} max={5} />));
    expect(screen.getByText('3/5')).toBeInTheDocument();
  });

  it('отображает label', () => {
    render(
      wrap(
        <GamifiedProgress
          value={3}
          max={5}
          label="Ещё 2 посещения до Золота"
        />,
      ),
    );
    expect(screen.getByText('Ещё 2 посещения до Золота')).toBeInTheDocument();
  });

  it('отображает value/max в тексте', () => {
    render(wrap(<GamifiedProgress value={2} max={10} />));
    expect(screen.getByText('2/10')).toBeInTheDocument();
  });

  it('не показывает value при showValue=false', () => {
    render(wrap(<GamifiedProgress value={3} max={5} showValue={false} />));
    expect(screen.queryByText('3/5')).not.toBeInTheDocument();
  });

  it('completed state (value >= max) — 100%', () => {
    render(wrap(<GamifiedProgress value={5} max={5} />));
    expect(screen.getByText('5/5')).toBeInTheDocument();
    // Проверяем наличие progressbar с aria-valuenow=5
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '5');
    expect(bar).toHaveAttribute('aria-valuemax', '5');
  });

  it('zero value (value === 0)', () => {
    render(wrap(<GamifiedProgress value={0} max={5} />));
    expect(screen.getByText('0/5')).toBeInTheDocument();
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '0');
  });

  it('aria-valuenow/aria-valuemin/aria-valuemax', () => {
    render(wrap(<GamifiedProgress value={3} max={10} />));
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '3');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '10');
  });

  it('icon отображается', () => {
    render(
      wrap(
        <GamifiedProgress
          value={3}
          max={5}
          icon={<Trophy data-testid="award-icon" size={20} />}
        />,
      ),
    );
    expect(screen.getByTestId('award-icon')).toBeInTheDocument();
  });

  it('label отображается', () => {
    render(
      wrap(
        <GamifiedProgress
          value={4}
          max={8}
          label="Прогресс курса"
        />,
      ),
    );
    expect(screen.getByText('Прогресс курса')).toBeInTheDocument();
  });

  it('clamp value: value > max → показывает max/max', () => {
    render(wrap(<GamifiedProgress value={10} max={5} />));
    expect(screen.getByText('5/5')).toBeInTheDocument();
  });

  it('clamp value: отрицательный → 0/max', () => {
    render(wrap(<GamifiedProgress value={-3} max={5} />));
    expect(screen.getByText('0/5')).toBeInTheDocument();
  });

  it('размер sm', () => {
    render(wrap(<GamifiedProgress value={3} max={5} size="sm" />));
    expect(screen.getByText('3/5')).toBeInTheDocument();
  });

  it('размер md (по умолчанию)', () => {
    render(wrap(<GamifiedProgress value={3} max={5} />));
    expect(screen.getByText('3/5')).toBeInTheDocument();
  });

  it('размер lg', () => {
    render(wrap(<GamifiedProgress value={3} max={5} size="lg" />));
    expect(screen.getByText('3/5')).toBeInTheDocument();
  });

  it('aria-label из label', () => {
    render(
      wrap(
        <GamifiedProgress
          value={3}
          max={5}
          label="Ещё 2 до Золота"
        />,
      ),
    );
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-label', 'Ещё 2 до Золота');
  });

  it('aria-label по умолчанию без label', () => {
    render(wrap(<GamifiedProgress value={3} max={5} />));
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-label', 'Прогресс: 3 из 5');
  });

  it('color prop влияет на цвет заполнения', () => {
    const { container } = render(
      wrap(
        <GamifiedProgress
          value={3}
          max={5}
          color="orange"
        />,
      ),
    );
    const fillBar = container.querySelector('[style*="orange"]') as HTMLElement | null;
    expect(fillBar).toBeInTheDocument();
  });
});
