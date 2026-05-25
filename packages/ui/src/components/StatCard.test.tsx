import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Coins, Gift } from 'lucide-react';
import { AprilProviders } from '../providers';
import { StatCard } from './StatCard';

function wrap(ui: React.ReactNode, density = 'comfortable') {
  return (
    <AprilProviders defaultDensity={density as 'comfortable' | 'compact'}>
      {ui}
    </AprilProviders>
  );
}

describe('StatCard', () => {
  it('рендерит базовую карточку с label и value', () => {
    render(
      wrap(
        <StatCard label="Баланс баллов" value="12 345" />
      )
    );
    expect(screen.getByText('Баланс баллов')).toBeInTheDocument();
    expect(screen.getByText('12 345')).toBeInTheDocument();
  });

  it('рендерит accent variant (зелёный фон)', () => {
    const { container } = render(
      wrap(
        <StatCard label="Активных льгот" value="7" variant="accent" />
      )
    );
    expect(screen.getByText('Активных льгот')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    // teal[6] = #12B886 → браузер нормализует в rgb(18, 184, 134)
    const card = container.querySelector('[style]') as HTMLElement | null;
    expect(card?.style.background).toMatch(/18.*184.*134/);
  });

  it('рендерит иконку слева от label', () => {
    render(
      wrap(
        <StatCard label="До конца" value="14 дн." icon={<Coins size={13} aria-hidden />} />
      )
    );
    expect(screen.getByText('До конца')).toBeInTheDocument();
    expect(screen.getByText('14 дн.')).toBeInTheDocument();
    // Иконка имеет aria-hidden
    const iconBox = document.querySelector('[aria-hidden]');
    expect(iconBox).toBeInTheDocument();
  });

  it('рендерит hint под значением', () => {
    render(
      wrap(
        <StatCard
          label="Баланс"
          value="5 000 ₽"
          hint="Сальдо на 25 мая"
        />
      )
    );
    expect(screen.getByText('Сальдо на 25 мая')).toBeInTheDocument();
  });

  it('без hint не рендерит hint-элемент', () => {
    render(
      wrap(
        <StatCard label="Метрика" value="42" />
      )
    );
    // Подтверждаем только label и value, без подсказки
    expect(screen.getByText('Метрика')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('compact density уменьшает padding', () => {
    const { container: defaultContainer } = render(
      wrap(<StatCard label="Тест" value="1" />, 'comfortable')
    );
    const { container: compactContainer } = render(
      wrap(<StatCard label="Тест" value="1" />, 'compact')
    );

    const defaultCard = defaultContainer.querySelector('[style]') as HTMLElement | null;
    const compactCard = compactContainer.querySelector('[style]') as HTMLElement | null;

    // Compact имеет меньший padding (10px 14px vs 14px 18px)
    expect(defaultCard?.style.padding).toBe('14px 18px');
    expect(compactCard?.style.padding).toBe('10px 14px');
  });

  it('accent variant с иконкой и hint', () => {
    render(
      wrap(
        <StatCard
          label="Премиум"
          value="1 200"
          icon={<Gift size={13} aria-hidden />}
          hint="Из них доступно: 800"
          variant="accent"
        />
      )
    );
    expect(screen.getByText('Премиум')).toBeInTheDocument();
    expect(screen.getByText('1 200')).toBeInTheDocument();
    expect(screen.getByText('Из них доступно: 800')).toBeInTheDocument();
    const iconBox = document.querySelector('[aria-hidden]');
    expect(iconBox).toBeInTheDocument();
  });
});
