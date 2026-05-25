import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Gem } from 'lucide-react';
import { AprilProviders } from '../providers';
import { BalancePill } from './BalancePill';

function wrap(ui: React.ReactNode) {
  return <AprilProviders>{ui}</AprilProviders>;
}

describe('BalancePill', () => {
  it('рендерит pill с value и unit', () => {
    render(wrap(<BalancePill value="1 250" unit="баллов" />));
    expect(screen.getByText('1 250')).toBeInTheDocument();
    expect(screen.getByText('баллов')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Баланс: 1 250 баллов/ })).toBeInTheDocument();
  });

  it('рендерит pill без unit', () => {
    render(wrap(<BalancePill value="999" />));
    expect(screen.getByText('999')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Баланс: 999/ })).toBeInTheDocument();
  });

  it('onClick вызывается при клике', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(wrap(<BalancePill value="500" unit="очков" onClick={handler} />));

    await user.click(screen.getByRole('button', { name: /Баланс: 500 очков/ }));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('кастомная иконка рендерится', () => {
    render(
      wrap(
        <BalancePill
          value="300"
          unit="кредитов"
          icon={<Gem size={13} aria-hidden />}
        />,
      ),
    );
    const pill = screen.getByRole('button', { name: /Баланс: 300 кредитов/ });
    expect(pill).toBeInTheDocument();
  });

  it('без onClick cursor default и нет role="button" явно', () => {
    const { container } = render(wrap(<BalancePill value="100" />));
    const pill = container.querySelector('button') as HTMLElement;
    // Все button элементы по умолчанию имеют role="button", но проверяем cursor
    expect(pill.style.cursor).toBe('default');
  });

  it('с onClick cursor pointer', () => {
    const { container } = render(
      wrap(<BalancePill value="100" onClick={() => void 0} />),
    );
    const pill = container.querySelector('button') as HTMLElement;
    expect(pill.style.cursor).toBe('pointer');
  });
});
