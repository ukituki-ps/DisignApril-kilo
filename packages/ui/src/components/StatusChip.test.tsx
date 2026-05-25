import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AprilProviders } from '../providers';
import { StatusChip } from './StatusChip';

function wrap(ui: React.ReactNode) {
  return <AprilProviders>{ui}</AprilProviders>;
}

describe('StatusChip', () => {
  describe('chip variant', () => {
    it('рендерит все встроенные статусы с правильными текстами', () => {
      render(
        wrap(
          <div>
            <StatusChip status="available" label="Доступен" />
            <StatusChip status="active" label="Активен" />
            <StatusChip status="expired" label="Истёк" />
            <StatusChip status="waiting" label="Ожидание" />
            <StatusChip status="error" label="Ошибка" />
            <StatusChip status="sync" label="Синхронизация" />
            <StatusChip status="custom" label="Пользовательский" color="violet" />
          </div>,
        ),
      );

      expect(screen.getByText('Доступен')).toBeInTheDocument();
      expect(screen.getByText('Активен')).toBeInTheDocument();
      expect(screen.getByText('Истёк')).toBeInTheDocument();
      expect(screen.getByText('Ожидание')).toBeInTheDocument();
      expect(screen.getByText('Ошибка')).toBeInTheDocument();
      expect(screen.getByText('Синхронизация')).toBeInTheDocument();
      expect(screen.getByText('Пользовательский')).toBeInTheDocument();
    });

    it('без label показывает статус в качестве текста', () => {
      render(wrap(<StatusChip status="error" />));
      expect(screen.getByText('error')).toBeInTheDocument();
    });

    it('pulse variant добавляет стиль пульсации', () => {
      const { container } = render(
        wrap(<StatusChip status="sync" label="Синхр." pulse />),
      );
      const badge = container.querySelector('.mantine-Badge-root');
      expect(badge).toBeInTheDocument();
      // Пульсация через inline style — animation: statusChipPulse 2s ease-in-out infinite
      expect(badge?.getAttribute('style')).toContain('statusChipPulse');
    });

    it('custom status с color рендерится', () => {
      render(wrap(<StatusChip status="custom" color="violet" label="Custom" />));
      expect(screen.getByText('Custom')).toBeInTheDocument();
    });

    it('custom status без color использует gray', () => {
      render(wrap(<StatusChip status="custom" label="Gray custom" />));
      expect(screen.getByText('Gray custom')).toBeInTheDocument();
    });

    it('chip variant имеет role="status"', () => {
      render(wrap(<StatusChip status="active" label="Активен" />));
      const badge = screen.getByRole('status');
      expect(badge).toBeInTheDocument();
    });
  }); // chip variant

  describe('dot variant', () => {
    it('рендерит точку для каждого встроенного статуса', () => {
      render(
        wrap(
          <div>
            <StatusChip status="available" variant="dot" label="Доступен" />
            <StatusChip status="error" variant="dot" label="Ошибка" />
          </div>,
        ),
      );
      // Dot variant использует span с role="status" и aria-label (из label)
      expect(screen.getByRole('status', { name: 'Доступен' })).toBeInTheDocument();
      expect(screen.getByRole('status', { name: 'Ошибка' })).toBeInTheDocument();
    });

    it('dot variant без label использует status как aria-label', () => {
      render(wrap(<StatusChip status="sync" variant="dot" />));
      const dot = screen.getByRole('status', { name: 'sync' });
      expect(dot).toBeInTheDocument();
    });

    it('dot variant с label использует label как aria-label', () => {
      render(wrap(<StatusChip status="error" variant="dot" label="Ошибка системы" />));
      const dot = screen.getByRole('status', { name: 'Ошибка системы' });
      expect(dot).toBeInTheDocument();
    });

    it('dot variant имеет фиксированный размер', () => {
      render(wrap(<StatusChip status="active" variant="dot" label="Активен" />));
      const dot = screen.getByRole('status', { name: 'Активен' });
      expect(dot).toHaveStyle({ width: '8px', height: '8px' });
    });
  }); // dot variant

  describe('размеры', () => {
    it('использует размер по умолчанию sm', () => {
      const { container } = render(
        wrap(<StatusChip status="active" label="Def" />),
      );
      const badge = container.querySelector('.mantine-Badge-root');
      expect(badge).toBeInTheDocument();
    });

    it('поддерживает размеры xs, sm, md', () => {
      render(
        wrap(
          <div>
            <StatusChip status="available" size="xs" label="XS" />
            <StatusChip status="active" size="sm" label="SM" />
            <StatusChip status="sync" size="md" label="MD" />
          </div>,
        ),
      );
      expect(screen.getByText('XS')).toBeInTheDocument();
      expect(screen.getByText('SM')).toBeInTheDocument();
      expect(screen.getByText('MD')).toBeInTheDocument();
    });
  });
});
