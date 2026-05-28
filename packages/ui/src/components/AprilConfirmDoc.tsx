import type { ReactNode } from 'react';
import { Box, Text, useMantineTheme } from '@mantine/core';

export interface AprilConfirmDocProps {
  /** Заголовок документа. */
  title: string;
  /** Содержимое документа. */
  content: ReactNode;
  className?: string;
}

/**
 * AprilConfirmDoc — блок превью документа для confirmation step.
 *
 * Сверено с прототипом LKFL: bg --row, border 1px, border-radius 10px, padding 16px.
 */
export function AprilConfirmDoc({
  title,
  content,
  className,
}: AprilConfirmDocProps) {
  const theme = useMantineTheme();

  const bgColor = theme.colors.gray[0] as unknown as string;
  const borderColor = theme.colors.gray[2] as unknown as string;
  const titleColor = theme.colors.dark[8] as unknown as string;
  const mutedColor = theme.colors.gray[5] as unknown as string;

  return (
    <Box
      className={className}
      style={{
        background: bgColor,
        border: `1px solid ${borderColor}`,
        borderRadius: 10,
        padding: 16,
      }}
    >
      <Text
        style={{
          color: titleColor,
          fontSize: 13,
          fontWeight: 700,
          marginBottom: 8,
        }}
      >
        {title}
      </Text>
      <Text
        component="div"
        style={{
          fontSize: 12,
          color: mutedColor,
          lineHeight: 1.6,
        }}
      >
        {content}
      </Text>
    </Box>
  );
}
