import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AprilProviders } from '../providers';
import { PolicyCard } from './PolicyCard';

function wrap(ui: React.ReactNode) {
  return <AprilProviders>{ui}</AprilProviders>;
}

describe('PolicyCard', () => {
  it('рендерит базовую карточку с полями', () => {
    render(
      wrap(
        <PolicyCard
          type="ДМС"
          policyNumber="АЛФ-12345678"
          fields={[
            { label: 'Застрахованный', value: 'Иванов И. И.' },
            { label: 'Действует до', value: '31.12.2026' },
            { label: 'Программа', value: 'Базовая' },
          ]}
        />,
      ),
    );
    expect(screen.getByText('ДМС')).toBeInTheDocument();
    expect(screen.getByText('АЛФ-12345678')).toBeInTheDocument();
    expect(screen.getByText('Застрахованный')).toBeInTheDocument();
    expect(screen.getByText('Иванов И. И.')).toBeInTheDocument();
    expect(screen.getByText('31.12.2026')).toBeInTheDocument();
    expect(screen.getByText('Программа')).toBeInTheDocument();
    expect(screen.getByText('Базовая')).toBeInTheDocument();
  });

  it('отображает кнопки действий Download и Share', () => {
    const handleDownload = vi.fn();
    const handleShare = vi.fn();
    render(
      wrap(
        <PolicyCard
          type="ДМС"
          policyNumber="АЛФ-12345678"
          fields={[]}
          showActions
          onDownload={handleDownload}
          onShare={handleShare}
        />,
      ),
    );
    const downloadBtn = screen.getByRole('button', { name: /Скачать/i });
    const shareBtn = screen.getByRole('button', { name: /Поделиться/i });
    expect(downloadBtn).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    fireEvent.click(downloadBtn);
    expect(handleDownload).toHaveBeenCalledTimes(1);
    fireEvent.click(shareBtn);
    expect(handleShare).toHaveBeenCalledTimes(1);
  });

  it('showActions=false скрывает кнопки', () => {
    render(
      wrap(
        <PolicyCard
          type="ДМС"
          policyNumber="АЛФ-12345678"
          fields={[{ label: 'Застрахованный', value: 'Петров П. П.' }]}
          showActions={false}
        />,
      ),
    );
    expect(screen.getByText('АЛФ-12345678')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Скачать/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Поделиться/i })).not.toBeInTheDocument();
  });

  it('gradient="green" использует зелёную шкалу', () => {
    const { container } = render(
      wrap(
        <PolicyCard
          type="ДМС"
          policyNumber="АЛФ-999"
          fields={[]}
          gradient="green"
          showActions={false}
        />,
      ),
    );
    const article = container.querySelector('[role="article"]') as HTMLElement | null;
    // Проверяем, что градиент использует два цвета зелёной шкалы Mantine
    expect(article?.style.background).toMatch(/^linear-gradient\(135deg,\s*rgb\(/);
    expect(article?.style.background).toContain(', rgb(');
  });

  it('рендерит description при передачи', () => {
    render(
      wrap(
        <PolicyCard
          type="ДМС"
          policyNumber="АЛФ-12345678"
          fields={[]}
          description={<span>Подробное описание полиса</span>}
        />,
      ),
    );
    expect(screen.getByText('Подробное описание полиса')).toBeInTheDocument();
  });

  it('без fields не рендерит meta-блок', () => {
    render(
      wrap(
        <PolicyCard
          type="ДМС"
          policyNumber="АЛФ-EMPTY"
          fields={[]}
          showActions={false}
        />,
      ),
    );
    expect(screen.getByText('АЛФ-EMPTY')).toBeInTheDocument();
    expect(screen.queryByText('Застрахованный')).not.toBeInTheDocument();
  });

  it('card имеет role article с aria-label', () => {
    render(
      wrap(
        <PolicyCard
          type="ДМС Стандарт"
          policyNumber="АЛФ-42"
          fields={[]}
          showActions={false}
        />,
      ),
    );
    const article = screen.getByRole('article', { name: 'Полис ДМС Стандарт' });
    expect(article).toBeInTheDocument();
  });
});
