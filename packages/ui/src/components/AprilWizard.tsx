import type { ReactNode } from 'react';
import { Box } from '@mantine/core';
import { AprilWizardProgress } from './AprilWizardProgress';
import type { AprilWizardProgressStep, AprilWizardProgressStepStatus } from './AprilWizardProgress';

export interface AprilWizardStep {
  id: string;
  label: string;
  content: ReactNode;
  footer?: ReactNode;
}

export interface AprilWizardProps {
  steps: AprilWizardStep[];
  current: string;
  onChange: (step: string) => void;
  /** Показывать progress bar. Default true. */
  withProgress?: boolean;
  /** Контент wizard'а (переопределяет steps[current].content). */
  children?: ReactNode;
  /** Кастомный footer (переопределяет steps[current].footer). */
  footer?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

/**
 * AprilWizard — универсальный multi-step wizard с progress bar, body и footer.
 *
 * Wizard **не управляет state** — продукт передаёт `current` + `onChange`.
 * Wizard только рендерит: progress → content → footer.
 */
export function AprilWizard({
  steps,
  current,
  onChange: _onChange, // продукт управляет state; wizard не вызывает
  withProgress = true,
  children,
  footer,
  className,
  'data-testid': dataTestId,
}: AprilWizardProps) {
  void _onChange; // eslint-disable-line
  const currentStep = steps.find((s) => s.id === current);

  // Build progress steps from the steps array
  const progressSteps: AprilWizardProgressStep[] = steps.map((step, i) => {
    const currentIndex = steps.findIndex((s) => s.id === current);
    let status: AprilWizardProgressStepStatus = 'pending';
    if (step.id === current) {
      status = 'active';
    } else if (i < currentIndex) {
      status = 'done';
    }
    return { id: step.id, label: step.label, status };
  });

  return (
    <Box
      className={className}
      data-testid={dataTestId}
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}
    >
      {/* Progress bar */}
      {withProgress ? (
        <AprilWizardProgress steps={progressSteps} />
      ) : null}

      {/* Body — scrollable */}
      <Box
        style={{
          flex: 1,
          overflow: 'auto',
          padding: 24,
        }}
      >
        {children ?? currentStep?.content}
      </Box>

      {/* Footer */}
      {footer ?? currentStep?.footer ? (
        <Box
          style={{
            padding: '16px 24px',
            borderTop: `1px solid var(--april-border, #EBEBEB)`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {footer ?? currentStep?.footer}
        </Box>
      ) : null}
    </Box>
  );
}
