import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AprilProviders } from '../providers';
import { FacetedSearch } from './FacetedSearch';

function wrap(ui: React.ReactNode) {
  return <AprilProviders>{ui}</AprilProviders>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const sampleFacets = [
  {
    id: 'category',
    label: 'Категория',
    type: 'checkbox' as const,
    options: [
      { value: 'dms', label: 'ДМС', count: 12 },
      { value: 'fitness', label: 'Фитнес', count: 5 },
      { value: 'food', label: 'Питание', count: 3 },
    ],
  },
  {
    id: 'status',
    label: 'Статус',
    type: 'radio' as const,
    options: [
      { value: 'active', label: 'Активен' },
      { value: 'available', label: 'Доступен' },
      { value: 'expired', label: 'Истёк' },
    ],
  },
  {
    id: 'price',
    label: 'Цена',
    type: 'range' as const,
    min: 0,
    max: 10000,
    unit: '₽',
  },
  {
    id: 'provider',
    label: 'Провайдер',
    type: 'select' as const,
    options: [
      { value: 'alfa', label: 'АльфаСтрахование', count: 8 },
      { value: 'skillbox', label: 'Skillbox', count: 4 },
      { value: 'worldclass', label: 'World Class', count: 2 },
    ],
  },
];

describe('FacetedSearch', () => {
  it('рендерит inline-панель с facets', () => {
    const { container } = render(
      wrap(
        <FacetedSearch
          facets={sampleFacets}
          selected={{}}
          onChange={noop}
          mode="inline"
        />,
      ),
    );
    expect(screen.getByText('Фильтры')).toBeInTheDocument();
    expect(screen.getByText('Категория')).toBeInTheDocument();
    expect(screen.getByText('Фитнес')).toBeInTheDocument();
    expect(screen.getByText('Цена')).toBeInTheDocument();
    expect(screen.getByText('Провайдер')).toBeInTheDocument();
    expect(container.querySelector('[role="search"]')).toBeInTheDocument();
  });

  it('checkbox selection вызывает onChange', () => {
    const handleChange = vi.fn();
    render(
      wrap(
        <FacetedSearch
          facets={sampleFacets}
          selected={{}}
          onChange={handleChange}
          mode="inline"
        />,
      ),
    );
    // Find checkbox input by its value attribute
    const allInputs = screen.getAllByRole('checkbox');
    const dmsCheckbox = allInputs.find(
      (el) => (el as HTMLInputElement).value === 'dms',
    ) as HTMLInputElement;
    expect(dmsCheckbox).toBeDefined();
    fireEvent.click(dmsCheckbox);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        category: ['dms'],
      }),
    );
  });

  it('radio selection вызывает onChange', () => {
    const handleChange = vi.fn();
    render(
      wrap(
        <FacetedSearch
          facets={sampleFacets}
          selected={{}}
          onChange={handleChange}
          mode="inline"
        />,
      ),
    );
    const radio = screen.getByLabelText('Активен') as HTMLInputElement;
    fireEvent.click(radio);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        status: ['active'],
      }),
    );
  });

  it('range input обновляет selected', () => {
    const handleChange = vi.fn();
    render(
      wrap(
        <FacetedSearch
          facets={sampleFacets}
          selected={{}}
          onChange={handleChange}
          mode="inline"
        />,
      ),
    );
    // Find the TextInput for minimum (not the Slider which also has the same aria-label)
    const numberInputs = screen.getAllByRole('spinbutton');
    const minInput = numberInputs[0] as HTMLInputElement;
    expect(minInput).toBeDefined();
    fireEvent.change(minInput, { target: { value: '500' } });
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        price: ['500', '10000'],
      }),
    );
  });

  it('clear all сбрасывает все фильтры', () => {
    const handleChange = vi.fn();
    const onClearAll = vi.fn();
    const initial = {
      category: ['dms'],
      status: ['active'],
      price: ['100', '500'],
      provider: ['alfa'],
    };
    render(
      wrap(
        <FacetedSearch
          facets={sampleFacets}
          selected={initial}
          onChange={handleChange}
          onClearAll={onClearAll}
          mode="inline"
          clearAllLabel="Сбросить"
        />,
      ),
    );
    const clearBtn = screen.getByRole('button', { name: /Сбросить/i });
    fireEvent.click(clearBtn);
    expect(onClearAll).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith({
      category: [],
      status: [],
      price: [],
      provider: [],
    });
  });

  it('active filters count отображается в badge', () => {
    render(
      wrap(
        <FacetedSearch
          facets={sampleFacets}
          selected={{
            category: ['dms'],
            status: ['active'],
          }}
          onChange={noop}
          mode="drawer"
        />,
      ),
    );
    // Trigger button should show badge with count 2
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('drawer mode opens on trigger', () => {
    render(
      wrap(
        <FacetedSearch
          facets={sampleFacets}
          selected={{
            category: ['dms'],
          }}
          onChange={noop}
          mode="drawer"
        />,
      ),
    );
    const trigger = screen.getByRole('button', { name: 'Открыть фильтры' });
    fireEvent.click(trigger);
    // After click — the Drawer root appears in a portal (outside container)
    const drawerRoot = document.body.querySelector('.mantine-Drawer-root');
    expect(drawerRoot).toBeInTheDocument();
  });

  it('active filter pills display for non-inline mode', () => {
    render(
      wrap(
        <FacetedSearch
          facets={sampleFacets}
          selected={{
            category: ['dms'],
          }}
          onChange={noop}
          mode="drawer"
        />,
      ),
    );
    expect(screen.getByText('ДМС')).toBeInTheDocument();
  });
});
