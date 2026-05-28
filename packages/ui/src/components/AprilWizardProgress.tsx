import { Box, Group, Text, useMantineTheme } from '@mantine/core';

export type AprilWizardProgressStepStatus = 'pending' | 'active' | 'done';

export interface AprilWizardProgressStep {
  id: string;
  label: string;
  status: AprilWizardProgressStepStatus;
}

export interface AprilWizardProgressProps {
  steps: AprilWizardProgressStep[];
  className?: string;
  'data-testid'?: string;
}

/**
 * AprilWizardProgress — горизонтальный progress bar с шагами (круги + линии + label'ы).
 *
 * Сверено с прототипом LKFL: круги 24px, линии 2px, padding 14px 24px.
 * Цвета через Mantine primaryColor (teal).
 */
export function AprilWizardProgress({
  steps,
  className,
  'data-testid': dataTestId,
}: AprilWizardProgressProps) {
  const theme = useMantineTheme();

  const primaryColor = theme.colors.teal[6] as unknown as string;
  const borderColor = theme.colors.gray[3] as unknown as string;
  const subtleColor = theme.colors.gray[4] as unknown as string;
  const textColor = theme.colors.dark[8] as unknown as string;
  const bgColor = theme.colors.gray[0] as unknown as string;
  const white = theme.white as unknown as string;

  return (
    <Box
      className={className}
      data-testid={dataTestId}
      style={{
        padding: '14px 24px',
        background: bgColor,
      }}
    >
      <Group
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          flexWrap: 'nowrap',
        }}
      >
        {steps.map((step, index) => {
          const circleBg =
            step.status === 'done'
              ? primaryColor
              : step.status === 'active'
                ? white
                : borderColor;
          const circleColor =
            step.status === 'done'
              ? white
              : step.status === 'active'
                ? primaryColor
                : subtleColor;
          const circleBorder =
            step.status === 'active'
              ? `2px solid ${primaryColor}`
              : `2px solid ${circleBg}`;
          const fontWeight =
            step.status === 'active' ? 800 : 700;

          const labelColor =
            step.status === 'pending' ? subtleColor : textColor;

          return (
            <Box
              key={step.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                flex: index < steps.length - 1 ? 1 : 0,
                flexShrink: 0,
              }}
            >
              {/* Step circle + label */}
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Box
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    fontSize: 10,
                    fontWeight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: circleBg,
                    color: circleColor,
                    border: circleBorder,
                    flexShrink: 0,
                  }}
                >
                  {index + 1}
                </Box>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: labelColor,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {step.label}
                </Text>
              </Box>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <Box
                  style={{
                    height: 2,
                    margin: '0 8px',
                    minWidth: 16,
                    flex: 1,
                    background:
                      step.status === 'done' ? primaryColor : borderColor,
                  }}
                />
              )}
            </Box>
          );
        })}
      </Group>
    </Box>
  );
}
