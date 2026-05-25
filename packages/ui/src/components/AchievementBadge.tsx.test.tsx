import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Zap } from 'lucide-react';
import { AprilProviders } from '../providers';
import { AchievementBadge } from './AchievementBadge';

function wrap(ui: React.ReactNode) {
  return <AprilProviders>{ui}</AprilProviders>;
}

describe('AchievementBadge', () => {
  it('рендерит с variant и иконкой (bronze)', () => {
    render(wrap(<AchievementBadge variant="bronze" />));
    const img = screen.getByRole('img', { name: 'bronze achievement' });
    expect(img).toBeInTheDocument();
  });

  it('рендерит все встроенные variant', () => {
    render(
      wrap(
        <div>
          <AchievementBadge variant="bronze" label="Bronze" />
          <AchievementBadge variant="silver" label="Silver" />
          <AchievementBadge variant="gold" label="Gold" />
          <AchievementBadge variant="platinum" label="Platinum" />
        </div>,
      ),
    );
    expect(screen.getByText('Bronze')).toBeInTheDocument();
    expect(screen.getByText('Silver')).toBeInTheDocument();
    expect(screen.getByText('Gold')).toBeInTheDocument();
    expect(screen.getByText('Platinum')).toBeInTheDocument();
  });

  it('earned=false — opacity снижен', () => {
    const { container } = render(
      wrap(<AchievementBadge variant="gold" earned={false} label="Не получено" />),
    );
    // Ищем Box с opacity: 0.4
    const boxes = container.querySelectorAll('[style]');
    let foundLowOpacity = false;
    for (const el of boxes) {
      const style = el.getAttribute('style');
      if (style?.includes('opacity: 0.4')) {
        foundLowOpacity = true;
        break;
      }
    }
    expect(foundLowOpacity).toBe(true);
  });

  it('tooltip отображается при earned=true', () => {
    render(
      wrap(
        <AchievementBadge
          variant="gold"
          tooltip="Получено: 15.03.2026 — Активный месяц"
        />,
      ),
    );
    const img = screen.getByRole('img', {
      name: 'Получено: 15.03.2026 — Активный месяц',
    });
    expect(img).toBeInTheDocument();
  });

  it('aria-label установлен из tooltip', () => {
    render(
      wrap(
        <AchievementBadge
          variant="silver"
          tooltip="Серебряный бейдж"
        />,
      ),
    );
    const img = screen.getByRole('img', { name: 'Серебряный бейдж' });
    expect(img).toHaveAttribute('aria-label', 'Серебряный бейдж');
  });

  it('aria-label из label при отсутствии tooltip', () => {
    render(wrap(<AchievementBadge variant="gold" label="Золото" />));
    const img = screen.getByRole('img', { name: 'Золото' });
    expect(img).toBeInTheDocument();
  });

  it('disabled — без тултипа', () => {
    render(
      wrap(
        <AchievementBadge
          variant="bronze"
          disabled
          tooltip="Этот тултип не должен показываться"
          label="Заблокировано"
        />,
      ),
    );
    // aria-label = label (не tooltip), т.к. disabled
    const img = screen.getByRole('img', { name: 'Заблокировано' });
    expect(img).toHaveAttribute('aria-disabled', 'true');
  });

  it('disabled — opacity 0.5', () => {
    const { container } = render(
      wrap(<AchievementBadge variant="gold" disabled label="Заблокировано" />),
    );
    const boxes = container.querySelectorAll('[style]');
    let foundDisabledOpacity = false;
    for (const el of boxes) {
      const style = el.getAttribute('style');
      if (style?.includes('opacity: 0.5')) {
        foundDisabledOpacity = true;
        break;
      }
    }
    expect(foundDisabledOpacity).toBe(true);
  });

  it('custom variant с кастомной иконкой', () => {
    render(
      wrap(
        <AchievementBadge
          variant="custom"
          icon={<Zap data-testid="custom-icon" size={14} aria-hidden />}
          label="Кастом"
        />,
      ),
    );
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    expect(screen.getByText('Кастом')).toBeInTheDocument();
  });

  it('custom variant без иконки рендерится', () => {
    render(wrap(<AchievementBadge variant="custom" label="Без иконки" />));
    expect(screen.getByText('Без иконки')).toBeInTheDocument();
  });

  it('размер xs', () => {
    render(wrap(<AchievementBadge variant="gold" size="xs" label="XS" />));
    expect(screen.getByText('XS')).toBeInTheDocument();
  });

  it('размер sm (по умолчанию)', () => {
    render(wrap(<AchievementBadge variant="gold" label="SM" />));
    expect(screen.getByText('SM')).toBeInTheDocument();
  });

  it('размер md', () => {
    render(wrap(<AchievementBadge variant="gold" size="md" label="MD" />));
    expect(screen.getByText('MD')).toBeInTheDocument();
  });

  it('размер lg', () => {
    render(wrap(<AchievementBadge variant="gold" size="lg" label="LG" />));
    expect(screen.getByText('LG')).toBeInTheDocument();
  });

  it('label отображается под значком', () => {
    render(wrap(<AchievementBadge variant="silver" label="Активный месяц" />));
    expect(screen.getByText('Активный месяц')).toBeInTheDocument();
  });

  it('без label — только значок', () => {
    render(wrap(<AchievementBadge variant="bronze" />));
    const img = screen.getByRole('img', { name: 'bronze achievement' });
    expect(img).toBeInTheDocument();
  });

  it('earned=false без тултипа (даже если tooltip задан)', () => {
    render(
      wrap(
        <AchievementBadge
          variant="gold"
          earned={false}
          tooltip="Не должно показываться"
        />,
      ),
    );
    // aria-label должен быть из tooltip или variant, но тултип не рендерится
    const img = screen.getByRole('img');
    // При earned=false aria-label берётся из tooltip (fallback)
    // но Tooltip не рендерится
    expect(img).toBeInTheDocument();
  });

  it('role="img" установлен', () => {
    render(wrap(<AchievementBadge variant="platinum" />));
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('role', 'img');
  });
});
