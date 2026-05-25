import type { ReactNode } from 'react';
import { Box, Button, Group, Text, useMantineTheme } from '@mantine/core';
import { Download, Share2 } from 'lucide-react';

export interface PolicyField {
  label: string;
  value: string;
}

export interface PolicyCardProps {
  /** Тип полиса (отображается как label). */
  type: string;
  /** Номер полиса. */
  policyNumber: string;
  /** Мета-поля (до 3 колонок). */
  fields: PolicyField[];
  /** Градиент: 'teal' (по умолчанию), 'green' или произвольное имя шкалы Mantine. */
  gradient?: 'teal' | 'green' | string;
  /** Показать кнопки действий (Download / Share). */
  showActions?: boolean;
  /** Callback для кнопки Download. */
  onDownload?: () => void;
  /** Callback для кнопки Share. */
  onShare?: () => void;
  /** Дополнительное описание (опционально). */
  description?: ReactNode;
}

/**
 * PolicyCard — градиентная карточка полиса ДМС для модалки льготы.
 *
 * Сверено с прототипом:
 *   — gradient bg, borderRadius 14px, padding 20px 22px, цвет белый
 *   — policy-label: 10px, fw 600, uppercase, opacity 0.72
 *   — policy-number: 20px, fw 800, letterSpacing 2px
 *   — policy-meta: flex, gap 24px, до 3 колонок (label 10px opacity 0.7 / value 13px fw 700)
 *   — policy-actions: flex, gap 10px, padding 0 24px 20px
 *
 * Градиент строится из шкалы theme.colors[gradientName]:
 *   linear-gradient(135deg, scale[6] → scale[9]).
 * Не использует хардкод hex-цветов.
 */
export function PolicyCard({
  type,
  policyNumber,
  fields,
  gradient = 'teal',
  showActions = true,
  onDownload,
  onShare,
  description,
}: PolicyCardProps) {
  const theme = useMantineTheme();

  /* --- Градиент из Mantine theme colors --- */
  const colorScale = (theme.colors[gradient as keyof typeof theme.colors] as [string, string, string, string, string, string, string, string, string, string] | undefined);
  const gradFrom = colorScale?.[6] ?? theme.colors.teal[6];
  const gradTo = colorScale?.[9] ?? theme.colors.teal[9];
  const gradientBg = `linear-gradient(135deg, ${gradFrom}, ${gradTo})`;

  return (
    <Box
      role="article"
      aria-label={`Полис ${type}`}
      style={{
        background: gradientBg,
        borderRadius: 14,
        color: 'white',
        overflow: 'hidden',
      }}
    >
      {/* Тело карточки: padding 20px 22px */}
      <Box style={{ padding: '20px 22px' }}>
        {/* Label типа полиса */}
        <Text
          style={{
            fontSize: 10,
            fontWeight: 600,
            textTransform: 'uppercase',
            opacity: 0.72,
            marginBottom: 6,
            letterSpacing: '0.5px',
          }}
        >
          {type}
        </Text>

        {/* Номер полиса */}
        <Text
          style={{
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 2,
            lineHeight: 1.3,
            marginBottom: 16,
          }}
        >
          {policyNumber}
        </Text>

        {/* Meta-поля: flex, gap 24px, до 3 колонок */}
        {fields.length > 0 ? (
          <Group gap={24} wrap="nowrap" style={{ flexWrap: 'wrap' }}>
            {fields.map((field) => (
              <Box key={field.label}>
                <Text
                  style={{
                    fontSize: 10,
                    opacity: 0.7,
                    marginBottom: 2,
                    textTransform: 'uppercase',
                    letterSpacing: '0.4px',
                  }}
                >
                  {field.label}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    lineHeight: 1.3,
                  }}
                >
                  {field.value}
                </Text>
              </Box>
            ))}
          </Group>
        ) : null}

        {/* Описание (опционально) */}
        {description ? (
          <Box
            style={{
              borderTop: '1px solid rgba(255,255,255,0.25)',
              marginTop: 12,
              paddingTop: 12,
            }}
          >
            {description}
          </Box>
        ) : null}
      </Box>

      {/* Actions: flex, gap 10px, padding 0 24px 20px */}
      {showActions ? (
        <Group gap={10} style={{ padding: '0 24px 20px' }}>
          <Button
            variant="filled"
            color="white"
            size="sm"
            leftSection={<Download size={16} aria-hidden />}
            onClick={onDownload}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              borderColor: 'rgba(255, 255, 255, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            Скачать
          </Button>
          <Button
            variant="outline"
            color="white"
            size="sm"
            leftSection={<Share2 size={16} aria-hidden />}
            onClick={onShare}
            style={{
              borderColor: 'rgba(255, 255, 255, 0.5)',
              color: 'white',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Поделиться
          </Button>
        </Group>
      ) : null}
    </Box>
  );
}
