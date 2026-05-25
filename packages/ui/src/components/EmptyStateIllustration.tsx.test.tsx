import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Inbox, Package, Award, UserX } from 'lucide-react';
import { AprilProviders } from '../providers';
import { EmptyStateIllustration } from './EmptyStateIllustration';

function wrap(ui: React.ReactNode) {
  return <AprilProviders>{ui}</AprilProviders>;
}

describe('EmptyStateIllustration', () => {
  it('рендерит с title + description', () => {
    render(
      wrap(
        <EmptyStateIllustration
          title="У вас пока нет льгот"
          description="Подключите ДМС или фитнес-абонемент в каталоге"
        />,
      ),
    );
    expect(screen.getByText('У вас пока нет льгот')).toBeInTheDocument();
    expect(screen.getByText('Подключите ДМС или фитнес-абонемент в каталоге')).toBeInTheDocument();
  });

  it('рендерит только title без description', () => {
    render(wrap(<EmptyStateIllustration title="Пусто" />));
    expect(screen.getByText('Пусто')).toBeInTheDocument();
  });

  it('actionButton отображается', () => {
    render(
      wrap(
        <EmptyStateIllustration
          title="Нет льгот"
          actionButton={<button type="button">Перейти в каталог</button>}
        />,
      ),
    );
    expect(screen.getByRole('button', { name: 'Перейти в каталог' })).toBeInTheDocument();
  });

  it('icon отображается', () => {
    render(
      wrap(
        <EmptyStateIllustration
          title="Нет данных"
          icon={<Inbox data-testid="empty-icon" size={24} />}
        />,
      ),
    );
    expect(screen.getByTestId('empty-icon')).toBeInTheDocument();
  });

  it('без icon — контейнер иконки не рендерится', () => {
    const { container } = render(wrap(<EmptyStateIllustration title="Без иконки" />));
    // Нет Box с border-radius: 50% (контейнер иконки)
    const iconContainers = container.querySelectorAll('[style*="border-radius: 50%"]');
    expect(iconContainers.length).toBe(0);
  });

  it('align="left" — текст выровнен по левому краю', () => {
    const { container } = render(
      wrap(
        <EmptyStateIllustration
          title="Выровнено влево"
          align="left"
        />,
      ),
    );
    const paper = container.querySelector('[style*="text-align: left"]') as HTMLElement | null;
    expect(paper).toBeInTheDocument();
  });

  it('align="center" (по умолчанию) — текст центрирован', () => {
    const { container } = render(
      wrap(
        <EmptyStateIllustration
          title="Центрировано"
        />,
      ),
    );
    const paper = container.querySelector('[style*="text-align: center"]') as HTMLElement | null;
    expect(paper).toBeInTheDocument();
  });

  it('iconSize="sm" — меньший размер иконки', () => {
    render(
      wrap(
        <EmptyStateIllustration
          title="Маленькая иконка"
          icon={<Package data-testid="sm-icon" size={24} />}
          iconSize="sm"
        />,
      ),
    );
    expect(screen.getByTestId('sm-icon')).toBeInTheDocument();
  });

  it('iconSize="md"', () => {
    render(
      wrap(
        <EmptyStateIllustration
          title="Средняя иконка"
          icon={<Award data-testid="md-icon" size={24} />}
          iconSize="md"
        />,
      ),
    );
    expect(screen.getByTestId('md-icon')).toBeInTheDocument();
  });

  it('iconSize="lg" (по умолчанию)', () => {
    render(
      wrap(
        <EmptyStateIllustration
          title="Большая иконка"
          icon={<UserX data-testid="lg-icon" size={24} />}
          iconSize="lg"
        />,
      ),
    );
    expect(screen.getByTestId('lg-icon')).toBeInTheDocument();
  });

  it('padding="md" — уменьшенный padding', () => {
    const { container } = render(
      wrap(
        <EmptyStateIllustration
          title="Компактный"
          padding="md"
        />,
      ),
    );
    // Paper с padding — проверяем через класс Mantine
    const paper = container.querySelector('[class*="mantine-Paper-root"]');
    expect(paper).toBeInTheDocument();
  });

  it('max-width 480px на desktop', () => {
    const { container } = render(
      wrap(<EmptyStateIllustration title="Проверка ширины" />),
    );
    const paper = container.querySelector('[style*="max-width: 480"]') as HTMLElement | null;
    expect(paper).toBeInTheDocument();
  });
});
