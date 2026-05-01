import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AprilProviders } from '../providers';
import { AprilJsonSchemaForm } from './AprilJsonSchemaForm';

const minimalSchema = {
  type: 'object',
  properties: {
    title: { type: 'string', title: 'Title' },
  },
} as const;

describe('AprilJsonSchemaForm', () => {
  it('renders a Mantine text control for a string field', () => {
    const { getByRole } = render(
      <AprilProviders>
        <AprilJsonSchemaForm
          schema={minimalSchema}
          formData={{ title: 'hello' }}
          onChange={() => undefined}
        />
      </AprilProviders>
    );
    expect(getByRole('textbox')).toHaveValue('hello');
  });

  it('maps density compact to Mantine input data-size xs', () => {
    const { getByRole } = render(
      <AprilProviders defaultDensity="compact">
        <AprilJsonSchemaForm
          schema={minimalSchema}
          formData={{ title: 'x' }}
          onChange={() => undefined}
        />
      </AprilProviders>
    );
    const textbox = getByRole('textbox');
    const sized = textbox.closest('[data-size]');
    expect(sized).toBeTruthy();
    expect(sized).toHaveAttribute('data-size', 'xs');
  });

  it('maps density comfortable to Mantine input data-size sm', () => {
    const { getByRole } = render(
      <AprilProviders defaultDensity="comfortable">
        <AprilJsonSchemaForm
          schema={minimalSchema}
          formData={{ title: 'x' }}
          onChange={() => undefined}
        />
      </AprilProviders>
    );
    const textbox = getByRole('textbox');
    const sized = textbox.closest('[data-size]');
    expect(sized).toHaveAttribute('data-size', 'sm');
  });

  it('notifies onChange when the value changes', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    const { getByRole } = render(
      <AprilProviders>
        <AprilJsonSchemaForm
          schema={minimalSchema}
          formData={{ title: 'a' }}
          onChange={onChange}
        />
      </AprilProviders>
    );
    const field = getByRole('textbox');
    await user.clear(field);
    await user.type(field, 'bc');
    expect(onChange).toHaveBeenCalled();
    const last = onChange.mock.calls[onChange.mock.calls.length - 1][0] as { title?: string };
    expect(last.title).toBe('bc');
  });
});
