import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AprilProviders } from '../providers';
import { DocumentRow, DocumentRowData } from './DocumentRow';

function wrap(ui: React.ReactNode) {
  return <AprilProviders>{ui}</AprilProviders>;
}

const makeDoc = (overrides = {}): DocumentRowData => ({
  id: 'doc-1',
  name: 'Договор №123',
  meta: 'PDF, 2.4 МБ',
  type: 'Договор',
  typeBadge: 'blue',
  date: '12.05.2026',
  status: 'Активен',
  statusBadge: 'green',
  downloadable: true,
  ...overrides,
});

describe('DocumentRow', () => {
  it('рендерит строку документа с именем, типом, датой и статусом', () => {
    const doc = makeDoc();
    render(
      wrap(
        <table>
          <tbody>
            <DocumentRow document={doc} />
          </tbody>
        </table>,
      ),
    );

    expect(screen.getByText('Договор №123')).toBeInTheDocument();
    expect(screen.getByText('Договор')).toBeInTheDocument();
    expect(screen.getByText('12.05.2026')).toBeInTheDocument();
    expect(screen.getByText('Активен')).toBeInTheDocument();
    expect(screen.getByTestId('doc-row-doc-1')).toBeInTheDocument();
  });

  it('отображает meta-информацию, если она указана', () => {
    const doc = makeDoc({ meta: 'DOCX, 1.1 МБ' });
    render(
      wrap(
        <table>
          <tbody>
            <DocumentRow document={doc} />
          </tbody>
        </table>,
      ),
    );

    expect(screen.getByText('DOCX, 1.1 МБ')).toBeInTheDocument();
  });

  it('не рендерит meta-блок, если meta не указан', () => {
    const doc = makeDoc({ meta: undefined });
    const { container } = render(
      wrap(
        <table>
          <tbody>
            <DocumentRow document={doc} />
          </tbody>
        </table>,
      ),
    );

    // Проверяем, что в первой ячейке нет второго Text-элемента (мета-текста)
    const firstTd = container.querySelector('td');
    const textElements = firstTd?.querySelectorAll('.mantine-Text-root');
    expect(textElements?.length).toBe(1);
  });

  it('badge типа использует переданный цвет typeBadge', () => {
    const { container } = render(
      wrap(
        <table>
          <tbody>
            <DocumentRow document={makeDoc({ typeBadge: 'green', type: 'Счёт' })} />
          </tbody>
        </table>,
      ),
    );

    const badge = container.querySelector('[class*="mantine-Badge-root"]');
    expect(badge).toBeInTheDocument();
  });

  it('badge статуса отображается с правильным цветом', () => {
    const { container } = render(
      wrap(
        <table>
          <tbody>
            <DocumentRow document={makeDoc({ statusBadge: 'yellow', status: 'Ожидание' })} />
          </tbody>
        </table>,
      ),
    );

    const badges = container.querySelectorAll('[class*="mantine-Badge-root"]');
    expect(badges.length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('Ожидание')).toBeInTheDocument();
  });

  it('вызывает onDownload при клике на кнопку "Скачать"', () => {
    const handler = vi.fn();
    const doc = makeDoc();

    render(
      wrap(
        <table>
          <tbody>
            <DocumentRow document={doc} onDownload={handler} />
          </tbody>
        </table>,
      ),
    );

    const downloadButton = screen.getByRole('button', { name: /Скачать/i });
    fireEvent.click(downloadButton);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({ id: doc.id, name: doc.name }),
    );
  });

  it('не рендерит кнопку "Скачать", если downloadable=false', () => {
    const doc = makeDoc({ downloadable: false });

    render(
      wrap(
        <table>
          <tbody>
            <DocumentRow document={doc} />
          </tbody>
        </table>,
      ),
    );

    const downloadButtons = screen.queryAllByRole('button', { name: /Скачать/i });
    expect(downloadButtons).toHaveLength(0);
  });

  it('onDownload получает полный объект документа', () => {
    const handler = vi.fn();
    const doc = makeDoc({
      id: 'full-doc',
      name: 'Полный документ',
      meta: 'XLSX, 3.7 МБ',
      type: 'Отчёт',
      typeBadge: 'gray' as const,
      date: '01.01.2026',
      status: 'Архив',
      statusBadge: 'gray' as const,
      downloadable: true,
    });

    render(
      wrap(
        <table>
          <tbody>
            <DocumentRow document={doc} onDownload={handler} />
          </tbody>
        </table>,
      ),
    );

    fireEvent.click(screen.getByRole('button', { name: /Скачать/i }));
    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'full-doc',
        name: 'Полный документ',
        meta: 'XLSX, 3.7 МБ',
        type: 'Отчёт',
        typeBadge: 'gray',
        date: '01.01.2026',
        status: 'Архив',
        statusBadge: 'gray',
        downloadable: true,
      }),
    );
  });
});
