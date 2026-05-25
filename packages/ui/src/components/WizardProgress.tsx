import { Box, Group, useMantineTheme } from '@mantine/core';

/** Публичные пропсы WizardProgress. */
export interface WizardProgressProps {
  /** Общее количество шагов. */
  totalSteps: number;
  /** Индекс текущего шага (с нуля). */
  currentStep: number;
}

/**
 * WizardProgress — горизонтальная линия с кружками-шагами.
 *
 * Состояния:
 * - done   : teal[6] фон + белая цифра
 * - active : teal[6] обводка + цифра teal[6], белый фон
 * - pending: серый фон + серая цифра
 *
 * ARIA: каждый круг — role="listitem" с aria-label.
 */
export function WizardProgress({
  totalSteps,
  currentStep,
}: WizardProgressProps) {
  const theme = useMantineTheme();

  if (totalSteps < 1) {
    return null;
  }

  const tealStep = theme.colors.teal[6] as unknown as string;
  const grayCircle = theme.colors.gray[1] as unknown as string;

  const steps = Array.from({ length: totalSteps }, (_, i) => i);

  return (
    <Box
      className="wizard-progress"
      style={{
        padding: '14px 24px',
        background: theme.colors.gray[0] as unknown as string,
        borderBottom: `1px solid ${theme.colors.gray[2] as unknown as string}`,
      }}
    >
      <Group
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {steps.map((idx) => {
          const isDone = idx < currentStep;
          const isActive = idx === currentStep;
          // pending = !isDone && !isActive

          const state = isActive ? 'active' : isDone ? 'done' : 'pending';

          // Circle styles
          const circleBg = isDone
            ? tealStep
            : isActive
              ? theme.white
              : grayCircle;
          const circleColor = isDone
            ? 'white'
            : isActive
              ? tealStep
              : theme.colors.gray[5] as unknown as string;
          const circleBorder = isActive
            ? `2px solid ${tealStep}`
            : undefined;

          // Connector line (only between steps, not after the last one)
          const showLine = idx < totalSteps - 1;
          const lineColor = idx < currentStep
            ? tealStep
            : theme.colors.gray[3] as unknown as string;

          return (
            <Box
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                flex: showLine ? 1 : 0,
                flexShrink: 0,
              }}
            >
              {/* Step circle */}
              <Box
                role="listitem"
                aria-label={`Шаг ${idx + 1}${isActive ? ' (текущий)' : isDone ? ' (выполнен)' : ''}`}
                aria-current={isActive ? 'step' : undefined}
                className={`wizard-step wizard-step-${state}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box
                  className="wizard-step-circle"
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    fontSize: 10,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: circleBg,
                    color: circleColor,
                    border: circleBorder,
                  }}
                >
                  {idx + 1}
                </Box>
              </Box>

              {/* Connector line to next step */}
              {showLine ? (
                <Box
                  className={`wizard-step-line wizard-step-line-${idx < currentStep ? 'done' : 'pending'}`}
                  style={{
                    flex: 1,
                    height: 2,
                    minHeight: 2,
                    background: lineColor,
                  }}
                />
              ) : null}
            </Box>
          );
        })}
      </Group>
    </Box>
  );
}
