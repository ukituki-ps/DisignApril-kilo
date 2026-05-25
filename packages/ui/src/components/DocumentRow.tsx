import { Badge, Text, Button } from '@mantine/core';
import { Download } from 'lucide-react';
import { useDensity } from '../DensityContext';

/** Данные строки документа. */
export interface DocumentRowData {
  id: string;
  name: string;
  meta?: string;
  type: string;
  typeBadge?: 'blue' | 'gray' | 'green';
  date: string;
  status: string;
  statusBadge: 'green' | 'yellow' | 'blue' | 'gray';
  downloadable?: boolean;
}

/** Публичные пропсы DocumentRow. */
export interface DocumentRowProps {
  document: DocumentRowData;
  onDownload?: (document: DocumentRowData) => void;
}

/** Цвет statusBadge → Mantine color token. */
const STATUS_COLOR: Record<DocumentRowData['statusBadge'], string> = {
  green: 'green',
  yellow: 'yellow',
  blue: 'blue',
  gray: 'gray',
};

/**
 * Строка документа для таблицы раздела «Документы».
 *
 * Рендерит `<tr>` с ячееками: название + мета, тип (badge), дата, статус (badge), скачивание.
 * Поддержка плотности (размеры badge/button), light/dark, hover row.
 */
export function DocumentRow({
  document: {
    id,
    name,
    meta,
    type,
    typeBadge = 'blue',
    date,
    status,
    statusBadge,
    downloadable = true,
  },
  onDownload,
}: DocumentRowProps) {
  const { density } = useDensity();
  const isCompact = density === 'compact';

  return (
    <tr
      data-testid={`doc-row-${id}`}
      style={{
        borderBottom: '1px solid var(--mantine-color-gray-2)',
        transition: 'background-color 150ms ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor =
          'var(--mantine-color-gray-0)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
      }}
    >
      {/* Название + мета */}
      <td style={{ padding: isCompact ? '8px 14px' : '14px 18px' }}>
        <Text
          fw={600}
          size={isCompact ? 'xs' : 'sm'}
          style={{ lineHeight: 1.3 }}
        >
          {name}
        </Text>
        {meta ? (
          <Text
            size="xs"
            c="dimmed"
            style={{ fontSize: 11, marginTop: 2 }}
          >
            {meta}
          </Text>
        ) : null}
      </td>

      {/* Тип */}
      <td style={{ padding: isCompact ? '8px 14px' : '14px 18px' }}>
        <Badge variant="light" color={typeBadge} size={isCompact ? 'xs' : 'sm'}>
          {type}
        </Badge>
      </td>

      {/* Дата */}
      <td style={{ padding: isCompact ? '8px 14px' : '14px 18px' }}>
        <Text size={isCompact ? 'xs' : 'sm'} c="dimmed">
          {date}
        </Text>
      </td>

      {/* Статус */}
      <td style={{ padding: isCompact ? '8px 14px' : '14px 18px' }}>
        <Badge
          variant="light"
          color={STATUS_COLOR[statusBadge]}
          size={isCompact ? 'xs' : 'sm'}
        >
          {status}
        </Badge>
      </td>

      {/* Скачивание */}
      <td style={{ padding: isCompact ? '8px 14px' : '14px 18px' }}>
        {downloadable ? (
          <Button
            variant="subtle"
            leftSection={<Download size={14} />}
            onClick={() => onDownload?.({
              id,
              name,
              meta,
              type,
              typeBadge,
              date,
              status,
              statusBadge,
              downloadable,
            })}
            aria-label={`Скачать ${name}`}
            size={isCompact ? 'xs' : 'sm'}
            style={{
              padding: isCompact ? '4px 10px' : '6px 12px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              backgroundColor: 'transparent',
              borderColor: 'var(--mantine-color-gray-3)',
              borderWidth: 1,
              borderStyle: 'solid',
              display: 'inline-flex',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = 'var(--mantine-color-teal-0)';
              el.style.color = 'var(--mantine-color-teal-6)';
              el.style.borderColor = 'var(--mantine-color-teal-2)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = 'transparent';
              el.style.color = '';
              el.style.borderColor = 'var(--mantine-color-gray-3)';
            }}
          >
            Скачать
          </Button>
        ) : null}
      </td>
    </tr>
  );
}
