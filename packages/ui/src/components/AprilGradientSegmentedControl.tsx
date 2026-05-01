import { forwardRef, useMemo } from 'react';
import { SegmentedControl } from '@mantine/core';
import type { SegmentedControlProps } from '@mantine/core';

/**
 * Mantine UI gradient recipe + April teal. Cast: nested selectors are valid for Emotion but not in `CSSProperties`.
 */
const DEFAULT_STYLES = {
  root: {
    backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-6))',
    boxShadow: 'var(--mantine-shadow-md)',
    border: '1px solid light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-4))',
  },
  indicator: {
    backgroundImage: 'linear-gradient(to right, var(--mantine-color-teal-4), var(--mantine-color-teal-8))',
  },
  control: {
    '&::before': { display: 'none' },
  },
  label: {
    '&, &:hover': {
      '&[data-active]': {
        color: 'var(--mantine-color-white)',
      },
    },
  },
} as NonNullable<SegmentedControlProps['styles']>;

function mergeStyles(
  base: NonNullable<SegmentedControlProps['styles']>,
  override?: SegmentedControlProps['styles'],
): SegmentedControlProps['styles'] {
  if (!override) {
    return base;
  }
  if (typeof override === 'function') {
    return (theme, props, ctx) => {
      const user = override(theme, props, ctx);
      return { ...base, ...user };
    };
  }
  return { ...base, ...override };
}

export type AprilGradientSegmentedControlProps = Omit<SegmentedControlProps, 'styles'> & {
  styles?: SegmentedControlProps['styles'];
};

/**
 * Mantine {@link SegmentedControl} with April-branded gradient indicator (Mantine UI recipe pattern).
 * Default look uses inline `styles` (tsup-safe for published `dist`). Consumer `styles` are merged shallowly
 * on top of defaults (per top-level Styles API key); for deep overrides pass a `styles` function.
 */
export const AprilGradientSegmentedControl = forwardRef<HTMLDivElement, AprilGradientSegmentedControlProps>(
  function AprilGradientSegmentedControl({ styles, radius = 'xl', size = 'md', ...rest }, ref) {
    const mergedStyles = useMemo(() => mergeStyles(DEFAULT_STYLES, styles), [styles]);

    return (
      <SegmentedControl ref={ref} radius={radius} size={size} styles={mergedStyles} {...rest} />
    );
  },
);
