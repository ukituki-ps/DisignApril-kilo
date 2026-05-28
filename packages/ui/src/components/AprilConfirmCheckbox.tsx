import type { ReactNode } from 'react';
import { Box, Checkbox, Text, useMantineTheme } from '@mantine/core';

export interface AprilConfirmCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label: ReactNode;
  className?: string;
}

/**
 * AprilConfirmCheckbox — чекбокс подтверждения с label.
 *
 * Сверено с прототипом LKFL: checkbox 16px, label font-size 12px, color --text-muted.
 */
export function AprilConfirmCheckbox({
  checked = false,
  onChange,
  label,
  className,
}: AprilConfirmCheckboxProps) {
  const theme = useMantineTheme();
  const primaryColor = theme.colors.teal[6] as unknown as string;
  const mutedColor = theme.colors.gray[5] as unknown as string;

  return (
    <Box
      className={className}
      style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}
    >
      <Checkbox
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        styles={{
          input: {
            width: 16,
            height: 16,
            '&:checked': {
              backgroundColor: primaryColor,
              borderColor: primaryColor,
            },
          },
          body: {
            gap: 8,
          },
          label: {
            fontSize: 12,
            color: mutedColor,
            lineHeight: 1.5,
            flex: 1,
          },
        }}
        label={
          <Text
            component="span"
            style={{
              fontSize: 12,
              color: mutedColor,
              lineHeight: 1.5,
            }}
          >
            {label}
          </Text>
        }
      />
    </Box>
  );
}
