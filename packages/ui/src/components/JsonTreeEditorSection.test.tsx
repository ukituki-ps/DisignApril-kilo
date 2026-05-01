import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AprilProviders } from '../providers';
import { JsonTreeEditorSection } from './JsonTreeEditorSection';

function renderSection() {
  return render(
    <AprilProviders>
      <JsonTreeEditorSection />
    </AprilProviders>
  );
}

describe('JsonTreeEditorSection', () => {
  it('renders schema + instance demo blocks and json-edit-react roots', async () => {
    const { container } = renderSection();
    expect(screen.getByText('JSON Schema (редактируемое дерево)')).toBeInTheDocument();
    expect(screen.getByText('Данные экземпляра: форма и дерево (встроенная панель)')).toBeInTheDocument();
    await waitFor(() => {
      const roots = container.querySelectorAll('.jer-editor-container');
      expect(roots.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('loads invalid instance when warning action is used', async () => {
    const user = userEvent.setup();
    renderSection();
    await user.click(
      screen.getByRole('button', { name: 'Загрузить невалидный экземпляр (демо отправки формы)' })
    );
    await waitFor(() => {
      const titleControl = screen.getByLabelText(/Название/i);
      expect(titleControl).toHaveValue('');
    });
  });

  it('resets demo data when reset is clicked after invalid load', async () => {
    const user = userEvent.setup();
    renderSection();
    await user.click(
      screen.getByRole('button', { name: 'Загрузить невалидный экземпляр (демо отправки формы)' })
    );
    await waitFor(() => {
      expect(screen.getByLabelText(/Название/i)).toHaveValue('');
    });
    await user.click(screen.getByRole('button', { name: 'Сбросить схему и экземпляр к демо-данным' }));
    await waitFor(() => {
      expect(screen.getAllByDisplayValue('Мой процесс').length).toBeGreaterThanOrEqual(1);
    });
  });

  it('mounts instance tree tab and shows a third editor root', async () => {
    const user = userEvent.setup();
    const { container } = renderSection();
    await waitFor(() => {
      expect(container.querySelectorAll('.jer-editor-container').length).toBeGreaterThanOrEqual(2);
    });
    const before = container.querySelectorAll('.jer-editor-container').length;
    await user.click(screen.getByRole('tab', { name: 'Дерево' }));
    await waitFor(() => {
      expect(container.querySelectorAll('.jer-editor-container').length).toBe(before + 1);
    });
  });

  it('submits instance form and shows a hint with top-level field count', async () => {
    const user = userEvent.setup();
    renderSection();
    const submit = screen.getByRole('button', { name: 'Отправить форму' });
    expect(submit).not.toBeDisabled();
    await user.click(submit);
    await waitFor(() => {
      expect(screen.getByText(/Форма принята в /)).toBeInTheDocument();
      expect(screen.getByText(/Полей верхнего уровня в данных: 4/)).toBeInTheDocument();
    });
  });

  it('disables external submit when not on the form tab', async () => {
    const user = userEvent.setup();
    renderSection();
    await user.click(screen.getByRole('tab', { name: 'Дерево' }));
    expect(screen.getByRole('button', { name: 'Отправить форму' })).toBeDisabled();
  });

  it('renders readonly schema tree block', async () => {
    const { container } = renderSection();
    expect(screen.getByText('Дерево только для чтения')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('schemaReadOnly')).toBeInTheDocument();
      expect(container.querySelectorAll('.jer-editor-container').length).toBeGreaterThanOrEqual(2);
    });
  });
});
