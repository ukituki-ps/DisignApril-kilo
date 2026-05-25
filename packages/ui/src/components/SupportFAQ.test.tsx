import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AprilProviders } from '../providers';
import { SupportFAQ, FAQItem } from './SupportFAQ';

function wrap(ui: React.ReactNode) {
  return <AprilProviders>{ui}</AprilProviders>;
}

const sampleItems: FAQItem[] = [
  {
    id: 'q1',
    question: 'Как активировать ДМС?',
    answer: 'Обратитесь в HR-отдел или активируйте полис в личном кабинете.',
  },
  {
    id: 'q2',
    question: 'Сколько баллов начисляется?',
    answer: 'Каждый месяц начисляется 100 баллов за активность.',
  },
  {
    id: 'q3',
    question: 'Можно ли передать баллы?',
    answer: 'Баллы можно передать близким родственникам один раз в квартал.',
  },
];

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

describe('SupportFAQ', () => {
  it('рендерит все вопросы', () => {
    render(wrap(<SupportFAQ items={sampleItems} onChange={noop} />));

    expect(screen.getByText('Как активировать ДМС?')).toBeInTheDocument();
    expect(screen.getByText('Сколько баллов начисляется?')).toBeInTheDocument();
    expect(screen.getByText('Можно ли передать баллы?')).toBeInTheDocument();
  });

  it('раскрывает ответ при клике на вопрос', () => {
    render(wrap(<SupportFAQ items={sampleItems} onChange={noop} />));

    // Проверяем, что кнопки закрыты
    const button = screen.getByRole('button', { name: 'Как активировать ДМС?' });
    expect(button).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    // Панель видна для скринридеров
    const panel = screen.getByRole('region', { name: 'Как активировать ДМС?' });
    expect(panel).toHaveAttribute('aria-hidden', 'false');
  });

  it('вызывает onChange при раскрытии', () => {
    const onChange = vi.fn();
    render(wrap(<SupportFAQ items={sampleItems} onChange={onChange} />));

    const questionButton = screen.getByRole('button', { name: 'Как активировать ДМС?' });
    fireEvent.click(questionButton);

    expect(onChange).toHaveBeenCalledWith('q1');
  });

  it('multiple mode: позволяет раскрыть несколько вопросов', () => {
    const onChange = vi.fn();
    render(wrap(<SupportFAQ items={sampleItems} multiple onChange={onChange} />));

    // Раскрываем первый вопрос
    const q1 = screen.getByRole('button', { name: 'Как активировать ДМС?' });
    fireEvent.click(q1);

    // Раскрываем второй вопрос
    const q2 = screen.getByRole('button', { name: 'Сколько баллов начисляется?' });
    fireEvent.click(q2);

    // Оба должны быть открыты
    expect(q1).toHaveAttribute('aria-expanded', 'true');
    expect(q2).toHaveAttribute('aria-expanded', 'true');

    // onChange получает массив с обоими id
    expect(onChange).toHaveBeenLastCalledWith(expect.arrayContaining(['q1', 'q2']));
  });

  it('сворачивает ранее открытый вопрос при открытии другого (single mode)', () => {
    render(wrap(<SupportFAQ items={sampleItems} onChange={noop} />));

    const q1 = screen.getByRole('button', { name: 'Как активировать ДМС?' });
    const q2 = screen.getByRole('button', { name: 'Сколько баллов начисляется?' });

    fireEvent.click(q1);
    expect(q1).toHaveAttribute('aria-expanded', 'true');
    expect(q2).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(q2);
    expect(q1).toHaveAttribute('aria-expanded', 'false');
    expect(q2).toHaveAttribute('aria-expanded', 'true');
  });

  it('рендерит ответ как ReactNode', () => {
    const items: FAQItem[] = [
      {
        id: 'r1',
        question: 'Что поддерживает ответ?',
        answer: <span data-testid="custom-answer">ReactNode контент</span>,
      },
    ];
    render(wrap(<SupportFAQ items={items} onChange={noop} />));

    const button = screen.getByRole('button', { name: 'Что поддерживает ответ?' });
    fireEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    const panel = screen.getByRole('region', { name: 'Что поддерживает ответ?' });
    expect(panel).toHaveAttribute('aria-hidden', 'false');
    expect(screen.getByTestId('custom-answer')).toBeInTheDocument();
  });
});
