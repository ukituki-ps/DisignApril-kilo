import { useCallback, useState } from 'react';
import type { ReactNode } from 'react';
import { Box, Paper, useMantineTheme } from '@mantine/core';
import { WizardProgress } from './WizardProgress';
import { WizardFooter } from './WizardFooter';

/** Конфигурация одного шага мастера. */
export interface WizardStepConfig {
  /** Уникальный идентификатор шага. */
  id: string;
  /** Подпись шага (отображается в прогресс-баре). */
  label: string;
  /** Содержимое шага. */
  content: ReactNode;
  /**
   * Валидация текущего шага.
   * Если возвращает false, переход к следующему шагу блокируется.
   * По умолчанию — всегда true (валидация пропущена).
   */
  validate?: () => boolean;
}

/** Публичные пропсы WizardContainer. */
export interface WizardContainerProps {
  /** Массив шагов мастера (минимум 1 элемент). */
  steps: WizardStepConfig[];
  /**
   * Управляемый режим: индекс текущего шага (с нуля).
   * Если не задан, используется внутренний state.
   */
  currentStep?: number;
  /** Начальный шаг (для неуправляемого режима). По умолчанию 0. */
  initialStep?: number;
  /** Callback при изменении шага. */
  onChange?: (step: number) => void;
  /** Подпись кнопки "Далее". По умолчанию "Далее". */
  nextLabel?: string;
  /** Подпись кнопки "Назад". По умолчанию "Назад". */
  backLabel?: string;
  /** Подпись финальной кнопки. По умолчанию "Подтвердить". */
  finalLabel?: string;
  /** Дополнительный контент в футере. */
  footer?: ReactNode;
  /** Показать прогресс-бар. По умолчанию true. */
  showProgress?: boolean;
  /** Callback при нажатии финальной кнопки. */
  onFinalStep?: () => void;
}

/**
 * WizardContainer — универсальный контейнер для многошаговых форм.
 *
 * Layout: WizardProgress (sticky top) → WizardStepContent (scrollable) → WizardFooter (sticky bottom).
 *
 * Поддерживает управляемый (currentStep + onChange) и неуправляемый (initialStep) режимы.
 * Валидация шага блокирует переход вперёд, если validate() вернула false.
 */
export function WizardContainer({
  steps,
  currentStep: currentStepProp,
  initialStep = 0,
  onChange,
  nextLabel,
  backLabel,
  finalLabel,
  footer,
  showProgress = true,
  onFinalStep,
}: WizardContainerProps) {
  const theme = useMantineTheme();

  // Controlled vs uncontrolled
  const isControlled = currentStepProp !== undefined;
  const [internalStep, setInternalStep] = useState(initialStep ?? 0);
  const currentStep = isControlled ? currentStepProp : internalStep;

  const goToStep = useCallback(
    (next: number) => {
      if (!isControlled) {
        setInternalStep(next);
      }
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const handleNext = useCallback(() => {
    // Validate current step
    const step = steps[currentStep];
    if (step?.validate?.() === false) {
      return;
    }
    const next = Math.min(currentStep + 1, steps.length - 1);
    goToStep(next);
  }, [currentStep, steps, goToStep]);

  const handleBack = useCallback(() => {
    const prev = Math.max(currentStep - 1, 0);
    goToStep(prev);
  }, [currentStep, goToStep]);

  const handleFinal = useCallback(() => {
    // Validate last step before final
    const step = steps[currentStep];
    if (step?.validate?.() === false) {
      return;
    }
    onFinalStep?.();
  }, [currentStep, steps, onFinalStep]);

  const totalSteps = steps.length;

  return (
    <Paper
      withBorder
      radius="md"
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Progress bar — top */}
      {showProgress ? (
        <WizardProgress totalSteps={totalSteps} currentStep={currentStep} />
      ) : null}

      {/* Scrollable content area */}
      <Box
        className="wizard-body"
        style={{
          flex: 1,
          padding: 24,
          minHeight: 240,
          overflow: 'auto',
          background: theme.colors.gray[0] as unknown as string,
        }}
      >
        {steps[currentStep]?.content}
      </Box>

      {/* Footer — bottom */}
      <WizardFooter
        currentStep={currentStep}
        totalSteps={totalSteps}
        onBack={handleBack}
        onNext={handleNext}
        onFinal={handleFinal}
        backLabel={backLabel}
        nextLabel={nextLabel}
        finalLabel={finalLabel}
        customFooter={footer}
      />
    </Paper>
  );
}
