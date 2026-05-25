import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { AprilProviders } from '../providers';
import { ClinicMapList, ClinicItem } from './ClinicMapList';

function wrap(ui: React.ReactNode) {
  return <AprilProviders>{ui}</AprilProviders>;
}

const sampleClinics: ClinicItem[] = [
  {
    id: 'c1',
    name: 'Поликлиника №1',
    address: 'ул. Ленина, 10',
    schedule: 'Пн–Пт 8:00–20:00',
    lat: 55.7558,
    lng: 37.6173,
  },
  {
    id: 'c2',
    name: 'МедЦентр Здоровье',
    address: 'пр. Мира, 25',
    lat: 55.7522,
    lng: 37.6156,
  },
  {
    id: 'c3',
    name: 'Стоматология Улыбка',
    address: 'ул. Гагарина, 8',
    schedule: 'Ежедневно 9:00–21:00',
    lat: 55.758,
    lng: 37.620,
  },
];

describe('ClinicMapList', () => {
  it('рендерит список клиник с name и address', () => {
    render(wrap(<ClinicMapList clinics={sampleClinics} />));
    expect(screen.getByText('Поликлиника №1')).toBeInTheDocument();
    expect(screen.getByText('ул. Ленина, 10')).toBeInTheDocument();
    expect(screen.getByText('МедЦентр Здоровье')).toBeInTheDocument();
    expect(screen.getByText('пр. Мира, 25')).toBeInTheDocument();
    expect(screen.getByText('Стоматология Улыбка')).toBeInTheDocument();
  });

  it('рендерит schedule если он задан', () => {
    render(wrap(<ClinicMapList clinics={sampleClinics} />));
    expect(screen.getByText('Пн–Пт 8:00–20:00')).toBeInTheDocument();
    expect(screen.getByText('Ежедневно 9:00–21:00')).toBeInTheDocument();
    // c2 не имеет schedule
    expect(screen.queryByText('пр. Мира, 25')).toBeInTheDocument();
  });

  it('mapUrl показывает iframe с src', () => {
    const mapUrl = 'https://www.openstreetmap.org/export/embed.html?bbox=37.6,55.7,37.7,55.8';
    render(wrap(<ClinicMapList clinics={sampleClinics} mapUrl={mapUrl} />));
    const iframe = screen.getByTitle('Карта клиник');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', mapUrl);
  });

  it('без mapUrl iframe не рендерится', () => {
    render(wrap(<ClinicMapList clinics={sampleClinics} />));
    expect(screen.queryByTitle('Карта клиник')).not.toBeInTheDocument();
  });

  it('onClinicClick вызывается при клике на элемент списка', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(wrap(<ClinicMapList clinics={sampleClinics} onClinicClick={handler} />));
    // Клики по кнопкам (clinic items)
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'c1',
        name: 'Поликлиника №1',
      }),
    );
  });

  it('onClinicClick вызывается по клавише Enter', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(wrap(<ClinicMapList clinics={sampleClinics} onClinicClick={handler} />));
    const buttons = screen.getAllByRole('button');
    buttons[2].focus();
    await user.keyboard('{Enter}');
    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'c3',
        name: 'Стоматология Улыбка',
      }),
    );
  });

  it('empty state показывает "Нет клиник"', () => {
    render(wrap(<ClinicMapList clinics={[]} />));
    expect(screen.getByText('Нет клиник')).toBeInTheDocument();
  });

  it('showList=false скрывает список', () => {
    render(wrap(<ClinicMapList clinics={sampleClinics} showList={false} mapUrl="https://example.com/map" />));
    expect(screen.queryByText('Поликлиника №1')).not.toBeInTheDocument();
    // Карта всё ещё есть
    expect(screen.getByTitle('Карта клиник')).toBeInTheDocument();
  });
});
