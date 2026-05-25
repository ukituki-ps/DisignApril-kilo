import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Coins, Clock, Sparkles } from 'lucide-react';
import { AprilProviders } from '../providers';
import { EventsFeed, EventItem } from './EventsFeed';

function wrap(ui: React.ReactNode) {
  return <AprilProviders>{ui}</AprilProviders>;
}

const defaultEvents: EventItem[] = [
  {
    id: 'e1',
    variant: 'success',
    icon: <Coins size={14} aria-hidden />,
    text: 'Начислено 500 баллов за опрос',
    time: 'Сегодня, 10:24',
  },
  {
    id: 'e2',
    variant: 'warning',
    icon: <Clock size={14} aria-hidden />,
    text: 'Психолог онлайн ожидает подтверждения',
    time: 'Вчера, 15:00',
  },
  {
    id: 'e3',
    variant: 'info',
    icon: <Sparkles size={14} aria-hidden />,
    text: 'Новые льготы в каталоге',
    time: '12 мая',
  },
];

describe('EventsFeed', () => {
  it('рендерит события с текстом и временем', () => {
    render(wrap(<EventsFeed events={defaultEvents} />));
    expect(screen.getByText('Начислено 500 баллов за опрос')).toBeInTheDocument();
    expect(screen.getByText('Сегодня, 10:24')).toBeInTheDocument();
    expect(screen.getByText('Психолог онлайн ожидает подтверждения')).toBeInTheDocument();
  });

  it('onEventClick вызывается при клике', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(wrap(<EventsFeed events={defaultEvents} onEventClick={handler} />));

    await user.click(screen.getByText('Новые льготы в каталоге'));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'e3' }),
    );
  });

  it('onEventClick вызывается по Enter', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    const { container } = render(wrap(<EventsFeed events={defaultEvents} onEventClick={handler} />));

    const row = container.querySelector<HTMLDivElement>('div[tabindex="0"]');
    expect(row).not.toBeNull();
    await user.click(row!);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('maxItems ограничивает количество', () => {
    render(wrap(<EventsFeed events={defaultEvents} maxItems={2} />));
    expect(screen.queryByText('Новые льготы в каталоге')).not.toBeInTheDocument();
    expect(screen.getByText('Психолог онлайн ожидает подтверждения')).toBeInTheDocument();
  });

  it('пустой список показывает дефолтный текст', () => {
    render(wrap(<EventsFeed events={[]} />));
    expect(screen.getByText('Нет событий')).toBeInTheDocument();
  });

  it('кастомный empty компонент', () => {
    render(
      wrap(
        <EventsFeed
          events={[]}
          empty={<span>Нет уведомлений</span>}
        />,
      ),
    );
    expect(screen.getByText('Нет уведомлений')).toBeInTheDocument();
  });
});
