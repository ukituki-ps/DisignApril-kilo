import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AprilProviders } from '../providers';
import { AprilJsonValidationSummary } from './AprilJsonValidationSummary';

describe('AprilJsonValidationSummary', () => {
  it('renders nothing when items are empty', () => {
    const { container } = render(
      <AprilProviders>
        <AprilJsonValidationSummary items={[]} />
      </AprilProviders>
    );
    expect(container.querySelector('[role="alert"]')).toBeNull();
  });

  it('renders an alert with path and message for each item', () => {
    render(
      <AprilProviders>
        <AprilJsonValidationSummary
          title="Проверка данных"
          items={[
            { path: '/title', message: 'too short' },
            { path: '(корень)', message: 'required' },
          ]}
        />
      </AprilProviders>
    );
    expect(screen.getByRole('alert', { name: 'Проверка данных' })).toBeInTheDocument();
    expect(screen.getByText(/^\/title$/)).toBeInTheDocument();
    expect(screen.getByText(/too short/)).toBeInTheDocument();
    expect(screen.getByText(/^\(корень\)$/)).toBeInTheDocument();
    expect(screen.getByText(/required$/)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
