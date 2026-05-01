export type AprilIconTokenSize = 'xs' | 'sm' | 'md' | 'lg';

const SIZE_PX: Record<AprilIconTokenSize, number> = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
};

/** Числовой размер в px для Lucide `size` и для согласования с контролами Mantine (`sm` ≈ 16px). */
export function resolveAprilIconSize(size: AprilIconTokenSize | number): number {
  return typeof size === 'number' ? size : SIZE_PX[size];
}
