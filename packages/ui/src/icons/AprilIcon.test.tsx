import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AprilIcon } from './AprilIcon';
import { AprilIconInfo } from './aprilUiIcons';

describe('AprilIcon', () => {
  it('renders svg from lucide icon', () => {
    const { container } = render(<AprilIcon icon={AprilIconInfo} size="md" />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('sets aria-hidden when decorative', () => {
    const { container } = render(<AprilIcon icon={AprilIconInfo} />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
  });

  it('exposes accessible name when aria-label is set', () => {
    render(<AprilIcon icon={AprilIconInfo} aria-label="Информация о поле" />);
    expect(screen.getByLabelText('Информация о поле')).toBeInTheDocument();
  });
});
