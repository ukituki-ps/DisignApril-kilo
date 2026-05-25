import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AprilProviders } from '../providers';
import { BenefitCard } from './BenefitCard';

function wrap(ui: React.ReactNode) {
  return <AprilProviders>{ui}</AprilProviders>;
}

describe('BenefitCard', () => {
  it('рендерит базовую карточку с title и description', () => {
    render(
      wrap(
        <BenefitCard
          title="ДМС Стандарт"
          description="Медицинская страховка для сотрудников компании"
        />,
      ),
    );
    expect(screen.getByText('ДМС Стандарт')).toBeInTheDocument();
    expect(screen.getByText('Медицинская страховка для сотрудников компании')).toBeInTheDocument();
  });

  it('рендерит только title без description', () => {
    render(wrap(<BenefitCard title="Фитнес клуб" />));
    expect(screen.getByText('Фитнес клуб')).toBeInTheDocument();
  });

  it('отображает провайдера', () => {
    render(
      wrap(
        <BenefitCard
          title="ДМС"
          provider="АльфаСтрахование"
        />,
      ),
    );
    expect(screen.getByText('АльфаСтрахование')).toBeInTheDocument();
  });

  it('отображает статус через StatusChip', () => {
    render(
      wrap(
        <BenefitCard
          title="Кино билеты"
          status="available"
        />,
      ),
    );
    expect(screen.getByText('Доступен')).toBeInTheDocument();
  });

  it('отображает цену при showPrice=true', () => {
    render(
      wrap(
        <BenefitCard
          title="Онлайн-курс"
          showPrice
          price="2 500"
          priceSuffix="₽ / мес"
        />,
      ),
    );
    expect(screen.getByText('2 500')).toBeInTheDocument();
    expect(screen.getByText('₽ / мес')).toBeInTheDocument();
  });

  it('не показывает цену при showPrice=false', () => {
    render(
      wrap(
        <BenefitCard
          title="Опрос"
          price="100 ₽"
        />,
      ),
    );
    expect(screen.queryByText('100 ₽')).not.toBeInTheDocument();
  });

  it('отображает прогресс при showProgress=true', () => {
    render(
      wrap(
        <BenefitCard
          title="Курс JS"
          showProgress
          progressValue={75}
          progressLabel="Прогресс"
        />,
      ),
    );
    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByText('Прогресс')).toBeInTheDocument();
  });

  it('не показывает прогресс при showProgress=false', () => {
    render(
      wrap(
        <BenefitCard
          title="Без прогресса"
          progressValue={50}
        />,
      ),
    );
    expect(screen.queryByText('50%')).not.toBeInTheDocument();
  });

  it('кликает по quickAction строкового типа', () => {
    const handleClick = vi.fn();
    render(
      wrap(
        <BenefitCard
          title="Действие"
          quickAction="Активировать"
          onQuickAction={handleClick}
        />,
      ),
    );
    const button = screen.getByRole('button', { name: 'Активировать' });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('quickAction не вызывает onCardClick (stopPropagation)', () => {
    const handleQuick = vi.fn();
    const handleCard = vi.fn();
    render(
      wrap(
        <BenefitCard
          title="Тест"
          quickAction="Нажми"
          onQuickAction={handleQuick}
          onCardClick={handleCard}
        />,
      ),
    );
    const button = screen.getByRole('button', { name: 'Нажми' });
    fireEvent.click(button);
    expect(handleQuick).toHaveBeenCalledTimes(1);
    expect(handleCard).not.toHaveBeenCalled();
  });

  it('onCardClick вызывается при клике на карточку', () => {
    const handleClick = vi.fn();
    render(
      wrap(
        <BenefitCard
          title="Кликабельная карточка"
          onCardClick={handleClick}
        />,
      ),
    );
    const article = screen.getByRole('article', { name: 'Кликабельная карточка' });
    fireEvent.click(article);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disabled состояние: opacity 0.6, no click', () => {
    const handleClick = vi.fn();
    const { container } = render(
      wrap(
        <BenefitCard
          title="Неактивная"
          disabled
          onCardClick={handleClick}
        />,
      ),
    );
    const styledEls = container.querySelectorAll('[style]');
    let foundDisabled = false;
    for (const el of styledEls) {
      const style = el.getAttribute('style');
      if (style?.includes('opacity: 0.6') && style?.includes('pointer-events: none')) {
        foundDisabled = true;
        break;
      }
    }
    expect(foundDisabled).toBe(true);
    const article = screen.getByRole('article', { name: 'Неактивная' });
    fireEvent.click(article);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('role="article" с aria-label из title', () => {
    render(
      wrap(
        <BenefitCard
          title="Тестовая льгота"
        />,
      ),
    );
    const article = screen.getByRole('article', { name: 'Тестовая льгота' });
    expect(article).toBeInTheDocument();
  });

  it('карточка с изображением рендерится', () => {
    render(
      wrap(
        <BenefitCard
          title="С изображением"
          imageUrl="https://example.com/img.png"
        />,
      ),
    );
    expect(screen.getByText('С изображением')).toBeInTheDocument();
    const image = screen.getByAltText('С изображением');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/img.png');
  });

  it('карточка с avatarIcon рендерится', () => {
    render(
      wrap(
        <BenefitCard
          title="С иконкой"
          avatarIcon={<span data-testid="avatar-icon">ICON</span>}
        />,
      ),
    );
    expect(screen.getByTestId('avatar-icon')).toBeInTheDocument();
  });

  it('clamp progressValue в 0-100', () => {
    render(
      wrap(
        <BenefitCard
          title="Тест clamp"
          showProgress
          progressValue={150}
        />,
      ),
    );
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.queryByText('150%')).not.toBeInTheDocument();
  });

  it('отрицательный progressValue clamp до 0', () => {
    render(
      wrap(
        <BenefitCard
          title="Тест отрицательный"
          showProgress
          progressValue={-10}
        />,
      ),
    );
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('футер: цена слева, статус справа', () => {
    render(
      wrap(
        <BenefitCard
          title="ДМС — Базовая"
          provider="АльфаСтрахование"
          description="Полис ДМС"
          status="active"
          showPrice
          price="Включено"
        />,
      ),
    );
    // Футер показывает статус и цену
    expect(screen.getByText('Активен')).toBeInTheDocument();
    expect(screen.getByText('Включено')).toBeInTheDocument();
    // Провайдер в теле
    expect(screen.getByText('АльфаСтрахование')).toBeInTheDocument();
  });

  it('priceSuffix отображается рядом с ценой', () => {
    render(
      wrap(
        <BenefitCard
          title="Фитнес"
          showPrice
          price="500"
          priceSuffix="баллов / мес"
          status="active"
        />,
      ),
    );
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('баллов / мес')).toBeInTheDocument();
  });
});
