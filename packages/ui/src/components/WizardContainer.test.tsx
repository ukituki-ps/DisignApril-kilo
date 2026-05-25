import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AprilProviders } from '../providers';
import { WizardContainer } from './WizardContainer';
import type { WizardStepConfig } from './WizardContainer';

function wrap(ui: React.ReactNode) {
  return <AprilProviders>{ui}</AprilProviders>;
}

const makeSteps = (count: number, opts?: { validateFailsAt?: number }): WizardStepConfig[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `step-${i}`,
    label: `Шаг ${i + 1}`,
    content: <div data-testid={`step-content-${i}`}>{`Контент шага ${i + 1}`}</div>,
    ...(opts?.validateFailsAt !== undefined && i === opts.validateFailsAt
      ? { validate: () => false }
      : i !== opts?.validateFailsAt
        ? { validate: () => true }
        : {}),
  }));

describe('WizardContainer — базовый рендер', () => {
  it('рендерит N шагов в прогресс-баре', () => {
    const steps = makeSteps(4);
    render(wrap(<WizardContainer steps={steps} />));

    // Прогресс-бар должен показать 4 кружка
    const circles = document.querySelectorAll('.wizard-step-circle');
    expect(circles.length).toBe(4);
    expect(circles[0]?.textContent).toBe('1');
    expect(circles[3]?.textContent).toBe('4');
  });

  it('показывает контент первого шага по умолчанию', () => {
    const steps = makeSteps(3);
    render(wrap(<WizardContainer steps={steps} />));
    expect(screen.getByTestId('step-content-0')).toBeInTheDocument();
  });

  it('начальный шаг initialStep работает', () => {
    const steps = makeSteps(3);
    render(wrap(<WizardContainer steps={steps} initialStep={1} />));
    expect(screen.getByTestId('step-content-1')).toBeInTheDocument();
  });

  it('без showProgress не рендерит прогресс-бар', () => {
    const steps = makeSteps(3);
    render(wrap(<WizardContainer steps={steps} showProgress={false} />));
    expect(document.querySelector('.wizard-progress')).not.toBeInTheDocument();
  });
});

describe('WizardContainer — навигация forward', () => {
  it('кнопка "Далее" переходит к следующему шагу', () => {
    const steps = makeSteps(3);
    render(wrap(<WizardContainer steps={steps} />));

    expect(screen.getByTestId('step-content-0')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('wizard-next'));
    expect(screen.getByTestId('step-content-1')).toBeInTheDocument();
  });

  it('кнопка "Далее" не переходит дальше последнего шага', () => {
    const steps = makeSteps(2);
    render(wrap(<WizardContainer steps={steps} />));

    fireEvent.click(screen.getByTestId('wizard-next'));
    expect(screen.getByTestId('step-content-1')).toBeInTheDocument();
    // На последнем шаге кнопка превращается в финальную
    expect(screen.getByTestId('wizard-final')).toBeInTheDocument();
    expect(screen.queryByTestId('wizard-next')).not.toBeInTheDocument();
  });
});

describe('WizardContainer — навигация back', () => {
  it('кнопка "Назад" появляется на шаге 2 и переходит назад', () => {
    const steps = makeSteps(3);
    render(wrap(<WizardContainer steps={steps} initialStep={1} />));

    expect(screen.getByTestId('step-content-1')).toBeInTheDocument();
    expect(screen.getByTestId('wizard-back')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('wizard-back'));
    expect(screen.getByTestId('step-content-0')).toBeInTheDocument();
  });

  it('кнопка "Назад" не показывается на первом шаге', () => {
    const steps = makeSteps(3);
    render(wrap(<WizardContainer steps={steps} />));
    expect(screen.queryByTestId('wizard-back')).not.toBeInTheDocument();
  });

  it('кнопка "Назад" не уходит за шаг 0', () => {
    const steps = makeSteps(3);
    render(wrap(<WizardContainer steps={steps} initialStep={0} />));
    expect(screen.queryByTestId('wizard-back')).not.toBeInTheDocument();
  });
});

describe('WizardContainer — валидация', () => {
  it('валидация блокирует переход forward', () => {
    const steps = makeSteps(3, { validateFailsAt: 0 });
    render(wrap(<WizardContainer steps={steps} />));

    expect(screen.getByTestId('step-content-0')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('wizard-next'));
    // Остаёмся на шаге 0, потому что validate вернула false
    expect(screen.getByTestId('step-content-0')).toBeInTheDocument();
    expect(screen.queryByTestId('step-content-1')).not.toBeInTheDocument();
  });

  it('валидация блокирует финальную кнопку', () => {
    const steps = makeSteps(3, { validateFailsAt: 2 });
    const onFinal = vi.fn();
    render(wrap(<WizardContainer steps={steps} initialStep={2} onFinalStep={onFinal} />));

    fireEvent.click(screen.getByTestId('wizard-final'));
    expect(onFinal).not.toHaveBeenCalled();
  });
});

describe('WizardContainer — финальный шаг', () => {
  it('клик по финальной кнопке вызывает onFinalStep', () => {
    const steps = makeSteps(3);
    const onFinal = vi.fn();
    render(wrap(<WizardContainer steps={steps} initialStep={2} onFinalStep={onFinal} />));

    fireEvent.click(screen.getByTestId('wizard-final'));
    expect(onFinal).toHaveBeenCalledTimes(1);
  });

  it('подписи кнопок настраиваются', () => {
    const steps = makeSteps(2);
    render(wrap(
      <WizardContainer
        steps={steps}
        backLabel="Вернуться"
        nextLabel="Вперёд"
        finalLabel="Завершить"
      />
    ));

    expect(screen.getByTestId('wizard-next')).toHaveTextContent('Вперёд');
    fireEvent.click(screen.getByTestId('wizard-next'));
    expect(screen.getByTestId('wizard-final')).toHaveTextContent('Завершить');
  });
});

describe('WizardContainer — controlled mode', () => {
  it('currentStep + onChange управляют текущим шагом', () => {
    const steps = makeSteps(3);
    const changeFn = vi.fn();
    render(wrap(<WizardContainer steps={steps} currentStep={1} onChange={changeFn} />));
    expect(screen.getByTestId('step-content-1')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('wizard-next'));
    expect(changeFn).toHaveBeenCalledWith(2);
  });

  it('external currentStep change updates content', () => {
    const steps = makeSteps(3);
    render(wrap(<WizardContainer steps={steps} currentStep={0} />));
    expect(screen.getByTestId('step-content-0')).toBeInTheDocument();
  });
});

describe('WizardContainer — одношаговый мастер', () => {
  it('без кнопок навигации при 1 шаге', () => {
    const steps = makeSteps(1);
    render(wrap(<WizardContainer steps={steps} />));
    expect(screen.queryByTestId('wizard-next')).not.toBeInTheDocument();
    expect(screen.queryByTestId('wizard-back')).not.toBeInTheDocument();
    expect(screen.queryByTestId('wizard-final')).not.toBeInTheDocument();
  });
});
