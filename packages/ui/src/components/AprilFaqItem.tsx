import { useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { Box, Text, useMantineTheme } from '@mantine/core';
import { ChevronDown } from 'lucide-react';

export interface AprilFaqItemProps {
  /** Вопрос. */
  question: string;
  /** Ответ (ReactNode — можно разметка). */
  answer: ReactNode;
  /** Управляемое состояние. */
  opened?: boolean;
  onOpenedChange?: (opened: boolean) => void;
  /** Начальное состояние. */
  defaultOpened?: boolean;
  className?: string;
  'data-testid'?: string;
}

/**
 * AprilFaqItem — аккордеон FAQ (вопрос + раскрывающийся ответ).
 *
 * Сверено с прототипом LKFL: padding 16px 20px, chevron 16px, rotate 180deg.
 * Поддерживает управляемый и неуправляемый режимы.
 */
export function AprilFaqItem({
  question,
  answer,
  opened: openedProp,
  onOpenedChange,
  defaultOpened = false,
  className,
  'data-testid': dataTestId,
}: AprilFaqItemProps) {
  const theme = useMantineTheme();
  const isControlled = openedProp !== undefined;
  const [internalOpened, setInternalOpened] = useState(defaultOpened);
  const opened = isControlled ? openedProp : internalOpened;

  const toggle = useCallback(() => {
    const next = !opened;
    if (!isControlled) {
      setInternalOpened(next);
    }
    onOpenedChange?.(next);
  }, [opened, isControlled, onOpenedChange]);

  const borderColor = theme.colors.gray[2] as unknown as string;
  const primaryColor = theme.colors.teal[6] as unknown as string;
  const mutedColor = theme.colors.gray[5] as unknown as string;

  return (
    <Box
      className={className}
      data-testid={dataTestId}
      style={{
        borderBottom: `1px solid ${borderColor}`,
      }}
    >
      {/* Question */}
      <button
        type="button"
        aria-expanded={opened}
        onClick={toggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '16px 20px',
          fontSize: 13,
          fontWeight: 600,
          color: opened ? primaryColor : 'inherit',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
          textAlign: 'left',
          transition: 'color 150ms ease',
        }}
        onMouseEnter={(e) => {
          if (!opened) {
            e.currentTarget.style.color = primaryColor;
          }
        }}
        onMouseLeave={(e) => {
          if (!opened) {
            e.currentTarget.style.color = 'inherit';
          }
        }}
      >
        <Text
          style={{
            flex: 1,
            fontSize: 13,
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {question}
        </Text>
        <ChevronDown
          size={16}
          aria-hidden
          style={{
            flexShrink: 0,
            marginLeft: 8,
            transition: 'transform 200ms ease, color 150ms ease',
            transform: opened ? 'rotate(180deg)' : 'rotate(0deg)',
            color: opened ? primaryColor : 'inherit',
          }}
        />
      </button>

      {/* Answer */}
      <Box
        role="region"
        id={`faq-answer-${question}`}
        style={{
          display: opened ? 'block' : 'none',
          padding: '0 20px 16px',
        }}
      >
        <Text
          component="div"
          style={{
            fontSize: 13,
            color: mutedColor,
            lineHeight: 1.6,
          }}
        >
          {answer}
        </Text>
      </Box>
    </Box>
  );
}
