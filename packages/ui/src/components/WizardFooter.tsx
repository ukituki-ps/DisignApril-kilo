import type { ReactNode } from 'react';
import { Box, Button, Group, useMantineTheme } from '@mantine/core';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

/** Публичные пропсы WizardFooter. */
export interface WizardFooterProps {
  /** Индекс текущего шага (с нуля). */
  currentStep: number;
  /** Общее количество шагов. */
  totalSteps: number;
  /** Клик по кнопке "Назад". */
  onBack?: () => void;
  /** Клик по кнопке "Далее". */
  onNext?: () => void;
  /** Клик по финальной кнопке. */
  onFinal?: () => void;
  /** Подпись кнопки "Назад". */
  backLabel?: string;
  /** Подпись кнопки "Далее". */
  nextLabel?: string;
  /** Подпись финальной кнопки (заменяет nextLabel на последнем шаге). */
  finalLabel?: string;
  /** Пользовательский контент в футере (помимо кнопок навигации). */
  customFooter?: ReactNode;
}

/**
 * WizardFooter — нижняя панель навигации мастера.
 *
 * Back: скрыт на шаге 1 (currentStep === 0).
 * Next: на последнем шаге заменяется на finalLabel + onFinal.
 * Иконки: ArrowLeft (back), ArrowRight (next), Check (confirm/final).
 */
export function WizardFooter({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onFinal,
  backLabel = 'Назад',
  nextLabel = 'Далее',
  finalLabel = 'Подтвердить',
  customFooter,
}: WizardFooterProps) {
  const theme = useMantineTheme();

  const isFirst = currentStep === 0;
  const isLast = currentStep >= totalSteps - 1;
  const hasMultipleSteps = totalSteps > 1;

  return (
    <Box
      className="wizard-footer"
      style={{
        padding: '16px 24px',
        borderTop: `1px solid ${theme.colors.gray[2] as unknown as string}`,
      }}
    >
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Left: custom content or spacer */}
        <Box>{customFooter}</Box>

        {/* Right: navigation buttons */}
        <Group gap="sm" style={{ justifyContent: 'flex-end' }}>
          {/* Back button — hidden on first step */}
          {!isFirst && hasMultipleSteps ? (
            <Button
              variant="default"
              leftSection={<ArrowLeft size={16} aria-hidden />}
              onClick={onBack}
              data-testid="wizard-back"
            >
              {backLabel}
            </Button>
          ) : null}

          {/* Next / Final button */}
          {hasMultipleSteps ? (
            <Button
              variant="filled"
              color="teal"
              rightSection={
                isLast
                  ? <Check size={16} aria-hidden />
                  : <ArrowRight size={16} aria-hidden />
              }
              onClick={isLast ? onFinal : onNext}
              data-testid={isLast ? 'wizard-final' : 'wizard-next'}
            >
              {isLast ? finalLabel : nextLabel}
            </Button>
          ) : null}
        </Group>
      </Box>
    </Box>
  );
}
