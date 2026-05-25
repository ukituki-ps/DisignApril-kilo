import { Table, Text } from '@mantine/core';
import { useDensity } from '../DensityContext';
import { DocumentRow, DocumentRowData } from './DocumentRow';

const documentSamples: DocumentRowData[] = [
  {
    id: 'doc-001',
    name: 'Договор поставки №А-102',
    meta: 'PDF, 2.4 МБ',
    type: 'Договор',
    typeBadge: 'blue',
    date: '12.05.2026',
    status: 'Активен',
    statusBadge: 'green',
    downloadable: true,
  },
  {
    id: 'doc-002',
    name: 'Акт выполненных работ',
    meta: 'DOCX, 1.1 МБ',
    type: 'Акт',
    typeBadge: 'green',
    date: '10.05.2026',
    status: 'На проверке',
    statusBadge: 'yellow',
    downloadable: true,
  },
  {
    id: 'doc-003',
    name: 'Счёт-фактура №15-04',
    meta: 'PDF, 890 КБ',
    type: 'Счёт',
    typeBadge: 'blue',
    date: '08.05.2026',
    status: 'Оплачен',
    statusBadge: 'blue',
    downloadable: true,
  },
  {
    id: 'doc-004',
    name: 'Закрытие проекта Q1-2026',
    meta: 'XLSX, 3.7 МБ',
    type: 'Отчёт',
    typeBadge: 'gray',
    date: '01.04.2026',
    status: 'Архив',
    statusBadge: 'gray',
    downloadable: false,
  },
];

/**
 * Showcase-секция для DocumentRow: таблица документов
 * с типичными строками из прототипа.
 */
export function DocumentRowSection() {
  const { density } = useDensity();
  const isCompact = density === 'compact';
  const padding = isCompact ? '8px 14px' : '12px 16px';

  const rows = documentSamples.map((doc) => (
    <DocumentRow
      key={doc.id}
      document={doc}
      onDownload={(document) => {
        // In a real app this would trigger a file download
        console.log(`Скачивание: ${document.name}`);
      }}
    />
  ));

  return (
    <div>
      <Text size="xs" c="dimmed" mb="md">
        Строка документа для таблицы раздела «Документы». Колонки: название + мета, тип, дата,
        статус, скачивание. Поддержка плотности и light/dark.
      </Text>
      <Table.ScrollContainer minWidth={700}>
        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ padding }}>Название</Table.Th>
              <Table.Th style={{ padding }}>Тип</Table.Th>
              <Table.Th style={{ padding }}>Дата</Table.Th>
              <Table.Th style={{ padding }}>Статус</Table.Th>
              <Table.Th style={{ padding }}>Скачать</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}
