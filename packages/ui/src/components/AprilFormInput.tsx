import type { ReactNode } from 'react';
import { Box, Text, TextInput, Textarea, Select, useMantineTheme } from '@mantine/core';

export interface AprilFormInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  label?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

/**
 * AprilFormInput — текстовое поле по дизайну прототипа LKFL.
 *
 * Сверено: bg --bg, border 1.5px, border-radius 8px, padding 10px 14px, font-size 13px.
 */
export function AprilFormInput({
  placeholder,
  value,
  onChange,
  error,
  label,
  className,
  'data-testid': dataTestId,
}: AprilFormInputProps) {
  const theme = useMantineTheme();
  const primaryColor = theme.colors.teal[6] as unknown as string;
  const dangerColor = theme.colors.red[6] as unknown as string;
  const borderColor = theme.colors.gray[2] as unknown as string;
  const bg = theme.colors.gray[0] as unknown as string;
  const labelColor = theme.colors.gray[5] as unknown as string;

  return (
    <Box className={className} data-testid={dataTestId}>
      {label ? (
        <Text
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: labelColor,
            marginBottom: 6,
          }}
        >
          {label}
        </Text>
      ) : null}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        error={error}
        radius={8}
        size="sm"
        styles={(innerTheme) => ({
          input: {
            background: bg,
            border: `1.5px solid ${error ? dangerColor : borderColor}`,
            borderRadius: 8,
            padding: '10px 14px',
            fontSize: 13,
            '&:focus, &:focus-visible': {
              borderColor: error ? dangerColor : primaryColor,
            },
          },
          error: {
            fontSize: 11,
            color: innerTheme.colors.red[6],
            marginTop: 4,
          },
        })}
      />
    </Box>
  );
}

export interface AprilFormTextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  label?: ReactNode;
  rows?: number;
  className?: string;
  'data-testid'?: string;
}

/**
 * AprilFormTextarea — текстовая область по дизайну прототипа LKFL.
 */
export function AprilFormTextarea({
  placeholder,
  value,
  onChange,
  error,
  label,
  rows = 4,
  className,
  'data-testid': dataTestId,
}: AprilFormTextareaProps) {
  const theme = useMantineTheme();
  const primaryColor = theme.colors.teal[6] as unknown as string;
  const dangerColor = theme.colors.red[6] as unknown as string;
  const borderColor = theme.colors.gray[2] as unknown as string;
  const bg = theme.colors.gray[0] as unknown as string;
  const labelColor = theme.colors.gray[5] as unknown as string;

  return (
    <Box className={className} data-testid={dataTestId}>
      {label ? (
        <Text
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: labelColor,
            marginBottom: 6,
          }}
        >
          {label}
        </Text>
      ) : null}
      <Textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        error={error}
        radius={8}
        size="sm"
        minRows={rows}
        styles={(innerTheme) => ({
          input: {
            background: bg,
            border: `1.5px solid ${error ? dangerColor : borderColor}`,
            borderRadius: 8,
            padding: '10px 14px',
            fontSize: 13,
            '&:focus, &:focus-visible': {
              borderColor: error ? dangerColor : primaryColor,
            },
          },
          error: {
            fontSize: 11,
            color: innerTheme.colors.red[6],
            marginTop: 4,
          },
        })}
      />
    </Box>
  );
}

export interface AprilFormSelectOption {
  value: string;
  label: string;
}

export interface AprilFormSelectProps {
  options: AprilFormSelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  label?: ReactNode;
  placeholder?: string;
  className?: string;
  'data-testid'?: string;
}

/**
 * AprilFormSelect — выпадающий список по дизайну прототипа LKFL.
 */
export function AprilFormSelect({
  options,
  value,
  onChange,
  error,
  label,
  placeholder,
  className,
  'data-testid': dataTestId,
}: AprilFormSelectProps) {
  const theme = useMantineTheme();
  const primaryColor = theme.colors.teal[6] as unknown as string;
  const dangerColor = theme.colors.red[6] as unknown as string;
  const borderColor = theme.colors.gray[2] as unknown as string;
  const bg = theme.colors.gray[0] as unknown as string;
  const labelColor = theme.colors.gray[5] as unknown as string;

  return (
    <Box className={className} data-testid={dataTestId}>
      {label ? (
        <Text
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: labelColor,
            marginBottom: 6,
          }}
        >
          {label}
        </Text>
      ) : null}
      <Select
        data={options}
        value={value}
        onChange={(v) => onChange?.(v ?? '')}
        error={error}
        placeholder={placeholder}
        radius={8}
        size="sm"
        styles={(innerTheme) => ({
          input: {
            background: bg,
            border: `1.5px solid ${error ? dangerColor : borderColor}`,
            borderRadius: 8,
            padding: '10px 14px',
            fontSize: 13,
            '&:focus, &:focus-visible': {
              borderColor: error ? dangerColor : primaryColor,
            },
          },
          error: {
            fontSize: 11,
            color: innerTheme.colors.red[6],
            marginTop: 4,
          },
        })}
      />
    </Box>
  );
}
