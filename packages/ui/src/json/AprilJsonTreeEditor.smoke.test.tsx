import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AprilProviders } from '../providers';
import { AprilJsonTreeEditor } from './AprilJsonTreeEditor';

describe('AprilJsonTreeEditor', () => {
  it('renders json-edit-react root inside providers', () => {
    const { container } = render(
      <AprilProviders>
        <AprilJsonTreeEditor data={{ hello: 'world' }} readOnly rootName="demo" />
      </AprilProviders>
    );
    expect(container.querySelector('.jer-editor-container')).toBeTruthy();
  });

  it('shows the search field when showSearch is true', () => {
    render(
      <AprilProviders>
        <AprilJsonTreeEditor data={{ a: 1 }} rootName="demo" showSearch />
      </AprilProviders>
    );
    expect(screen.getByLabelText('Фильтр дерева JSON')).toBeInTheDocument();
  });
});
