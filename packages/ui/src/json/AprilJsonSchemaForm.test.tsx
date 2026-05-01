import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AprilProviders } from '../providers';
import { AprilJsonSchemaForm } from './AprilJsonSchemaForm';

const minimalSchema = {
  type: 'object',
  properties: {
    title: { type: 'string', title: 'Title' },
  },
} as const;

const schemaWithNullProperty = {
  type: 'object',
  properties: {
    broken: null,
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

  it('renders when a property subschema is null (RJSF lodash/get edge case)', () => {
    const { getByRole } = render(
      <AprilProviders>
        <AprilJsonSchemaForm
          schema={schemaWithNullProperty}
          formData={{ title: 'ok' }}
          onChange={() => undefined}
        />
      </AprilProviders>
    );
    expect(getByRole('textbox')).toHaveValue('ok');
  });

  it('sanitizes nested null property schemas', () => {
    const schema = {
      type: 'object',
      properties: {
        config: {
          type: 'object',
          properties: { enabled: null, retries: { type: 'integer', title: 'Retries' } },
        },
      },
    } as const;
    const { getByRole } = render(
      <AprilProviders>
        <AprilJsonSchemaForm
          schema={schema}
          formData={{ config: { retries: 2 } }}
          onChange={() => undefined}
        />
      </AprilProviders>
    );
    expect(getByRole('textbox', { name: /Retries/i })).toHaveValue('2');
  });

  it('does not render the default RJSF submit control when hideDefaultSubmit is true', () => {
    const { container } = render(
      <AprilProviders>
        <AprilJsonSchemaForm
          schema={minimalSchema}
          formData={{ title: 'a' }}
          onChange={() => undefined}
          hideDefaultSubmit
        />
      </AprilProviders>
    );
    const form = container.querySelector('form');
    expect(form).toBeTruthy();
    expect(form!.querySelector('button[type="submit"]')).toBeNull();
  });

  it('renders the default submit control when hideDefaultSubmit is false', () => {
    const { container } = render(
      <AprilProviders>
        <AprilJsonSchemaForm schema={minimalSchema} formData={{ title: 'a' }} onChange={() => undefined} />
      </AprilProviders>
    );
    expect(container.querySelector('form button[type="submit"]')).toBeTruthy();
  });

  it('accepts hideDefaultSubmit together with partial ui:submitButtonOptions', () => {
    const { container } = render(
      <AprilProviders>
        <AprilJsonSchemaForm
          schema={minimalSchema}
          formData={{ title: 'a' }}
          onChange={() => undefined}
          hideDefaultSubmit
          uiSchema={{ 'ui:submitButtonOptions': { submitText: 'Send' } } as never}
        />
      </AprilProviders>
    );
    expect(container.querySelector('form button[type="submit"]')).toBeNull();
  });

  it('forwards id to the form element', () => {
    const { container } = render(
      <AprilProviders>
        <AprilJsonSchemaForm
          id="april-json-form-test"
          schema={minimalSchema}
          formData={{ title: 'a' }}
          onChange={() => undefined}
        />
      </AprilProviders>
    );
    expect(container.querySelector('form#april-json-form-test')).toBeTruthy();
  });

  it('disables inputs when disabled is true', () => {
    const { getByRole } = render(
      <AprilProviders>
        <AprilJsonSchemaForm
          schema={minimalSchema}
          formData={{ title: 'a' }}
          onChange={() => undefined}
          disabled
        />
      </AprilProviders>
    );
    expect(getByRole('textbox')).toBeDisabled();
  });

  it('treats readonly like disabled in Mantine text widgets', () => {
    const { getByRole } = render(
      <AprilProviders>
        <AprilJsonSchemaForm
          schema={minimalSchema}
          formData={{ title: 'a' }}
          onChange={() => undefined}
          readonly
        />
      </AprilProviders>
    );
    expect(getByRole('textbox')).toBeDisabled();
  });

  it('calls onSubmit when the form is submitted with valid data', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(
      <AprilProviders>
        <AprilJsonSchemaForm
          schema={minimalSchema}
          formData={{ title: 'hello' }}
          onChange={() => undefined}
          onSubmit={onSubmit}
        />
      </AprilProviders>
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('maps transformErrors over validation errors after submit', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    try {
      const requiredSchema = {
        type: 'object',
        required: ['title'],
        properties: { title: { type: 'string', title: 'Title' } },
      } as const;
      const transformErrors = (
        errors: { property?: string; message?: string; stack?: string; name?: string }[]
      ) => errors.map((e) => ({ ...e, message: `ERR:${e.stack ?? e.message ?? 'field'}` }));
      const user = userEvent.setup();
      const onError = vi.fn();
      const { container } = render(
        <AprilProviders>
          <AprilJsonSchemaForm
            schema={requiredSchema}
            formData={{}}
            onChange={() => undefined}
            onError={onError}
            transformErrors={transformErrors}
          />
        </AprilProviders>
      );
      await user.click(screen.getByRole('button', { name: 'Submit' }));
      await waitFor(() => {
        expect(container.textContent).toContain('ERR:');
      });
      expect(onError).toHaveBeenCalled();
    } finally {
      vi.mocked(console.error).mockRestore();
    }
  });
});
