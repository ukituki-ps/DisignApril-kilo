import type { AprilJsonEditDensity } from './createAprilJsonEditTheme';

/** Mantine `size` for form controls from April density. */
export function aprilJsonMantineFieldSize(density: AprilJsonEditDensity): 'xs' | 'sm' {
  return density === 'compact' ? 'xs' : 'sm';
}
