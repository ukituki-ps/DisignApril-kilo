import { useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { Accordion, Text, Group } from '@mantine/core';
import { ChevronDown } from 'lucide-react';

/** Элемент FAQ-аккордеона. */
export interface FAQItem {
  id: string;
  question: string;
  answer: ReactNode;
}

/** Публичные пропсы SupportFAQ. */
export interface SupportFAQProps {
  items: FAQItem[];
  /** Разрешить одновременное раскрытие нескольких вопросов. По умолчанию — один. */
  multiple?: boolean;
  /** Callback при раскрытии. Передается id или массив id. */
  onChange?: (openedId: string | string[] | undefined) => void;
}

/**
 * SupportFAQ — FAQ-аккордеон для раздела «Поддержка».
 *
 * Обёртка над Mantine Accordion с кастомным chevron (ChevronDown, rotation 180° при раскрытии),
 * hover-эффектом на вопросе (цвет → teal.6) и стилем, соответствующим прототипу:
 *   — faq-item — border-bottom
 *   — faq-question — padding 16px 20px, flex, 13px fw 600, cursor pointer
 *   — faq-question:hover → color teal.6
 *   — faq-item.open .faq-question → color teal.6
 *   — faq-answer — padding 0 20px 16px, 13px muted, lineHeight 1.6
 *   — Chevron: rotate 180deg при открытии
 *
 * Поддерживает single и multiple режимы.
 */
export function SupportFAQ({ items, multiple, onChange }: SupportFAQProps) {
  const [opened, setOpened] = useState<string | string[] | null>(null);

  const handleChange = useCallback(
    (value: string | string[] | null) => {
      /* Mantine может передать null, когда все элементы закрыты → нормализуем в undefined */
      const normalized = value ?? undefined;
      setOpened(value);
      onChange?.(normalized as string | string[] | undefined);
    },
    [onChange],
  );

  /* Определяет, открыт ли конкретный элемент — работает и в single, и в multiple режиме. */
  const isItemOpened = useCallback(
    (id: string) => {
      if (multiple) {
        return Array.isArray(opened) && opened.includes(id);
      }
      return opened === id;
    },
    [multiple, opened],
  );

  return (
    <Accordion
      multiple={multiple}
      value={opened || undefined}
      onChange={handleChange}
      variant="gap"
      chevronPosition="right"
      classNames={{
        item: 'faq-item',
        control: 'faq-question',
        label: 'faq-question-label',
      }}
      styles={(innerTheme) => ({
        item: {
          border: 'none',
          borderBottom: `1px solid ${innerTheme.colors.gray[3] as unknown as string}`,
          background: 'transparent',
          overflow: 'visible',
        },
        control: {
          padding: '16px 20px',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          display: 'flex',
          cursor: 'pointer',
          transition: 'color 150ms ease',
          fontSize: 13,
          fontWeight: 600,
          flex: 1,
          /* Скрываем hover Mantine-овского дефолтного чеVRona — у нас свой. */
          '&:hover': {
            color: innerTheme.colors.teal[6],
          },
        },
        label: {
          flex: 1,
          margin: 0,
        },
        /* Скрываем дефолтный chevron Mantine — используем свой из lucide-react */
        chevron: {
          display: 'none',
        },
        content: {
          padding: '0 20px 16px',
        },
      })}
    >
      {items.map((item) => (
        <Accordion.Item key={item.id} value={item.id}>
          <Accordion.Control>
            <Group justify="space-between" align="center" style={{ width: '100%' }}>
              <Text
                size="xs"
                fw={600}
                style={{
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.question}
              </Text>
              <ChevronDown
                size={18}
                aria-hidden
                style={{
                  flexShrink: 0,
                  transition: 'transform 200ms ease',
                  transform: isItemOpened(item.id) ? 'rotate(180deg)' : 'rotate(0deg)',
                  marginLeft: 8,
                }}
              />
            </Group>
          </Accordion.Control>
          <Accordion.Panel>
            <Text
              size="xs"
              c="dimmed"
              className="faq-answer"
              style={{ lineHeight: 1.6, padding: 0 }}
            >
              {item.answer}
            </Text>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
