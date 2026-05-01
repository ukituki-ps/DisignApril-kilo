import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AprilProviders } from '../providers';
import { AprilGradientSegmentedControl } from './AprilGradientSegmentedControl';

describe('AprilGradientSegmentedControl', () => {
  it('renders as a radio group with segment labels', () => {
    render(
      <AprilProviders>
        <AprilGradientSegmentedControl
          name="demo-segmented"
          defaultValue="b"
          data={[
            { label: 'Alpha', value: 'a' },
            { label: 'Beta', value: 'b' },
          ]}
        />
      </AprilProviders>,
    );

    const group = screen.getByRole('radiogroup');
    expect(group).toBeInTheDocument();
    expect(within(group).getByRole('radio', { name: 'Alpha' })).toBeInTheDocument();
    expect(within(group).getByRole('radio', { name: 'Beta' })).toBeChecked();
  });

  it('updates value on segment click', async () => {
    const user = userEvent.setup();
    render(
      <AprilProviders>
        <AprilGradientSegmentedControl
          defaultValue="a"
          data={[
            { label: 'One', value: 'a' },
            { label: 'Two', value: 'b' },
          ]}
        />
      </AprilProviders>,
    );

    const group = screen.getByRole('radiogroup');
    await user.click(within(group).getByRole('radio', { name: 'Two' }));
    expect(within(group).getByRole('radio', { name: 'Two' })).toBeChecked();
  });
});
