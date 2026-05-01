import { forwardRef } from 'react';
import type { SVGProps } from 'react';
import type { LucideIcon } from 'lucide-react';
import { resolveAprilIconSize, type AprilIconTokenSize } from './aprilIconSizes';

/** Тип слота «иконка» в пропсах компонентов DS (совместим с `lucide-react`). */
export type AprilLucideIcon = LucideIcon;

export type AprilIconProps = {
  icon: LucideIcon;
  size?: AprilIconTokenSize | number;
  strokeWidth?: number;
} & Omit<SVGProps<SVGSVGElement>, 'ref' | 'children'>;

/**
 * Обёртка над иконкой Lucide: единые размеры, наследование `currentColor`, безопасные умолчания a11y.
 * Декоративная иконка (без непустого `aria-label`) получает `aria-hidden`; для осмысленной standalone-иконки задайте `aria-label`.
 */
export const AprilIcon = forwardRef<SVGSVGElement, AprilIconProps>(function AprilIcon(
  {
    icon: Icon,
    size = 'sm',
    strokeWidth,
    className,
    'aria-label': ariaLabel,
    'aria-hidden': ariaHiddenProp,
    ...rest
  },
  ref
) {
  const px = resolveAprilIconSize(size);
  const hasAccessibleName = ariaLabel != null && String(ariaLabel).trim() !== '';
  const ariaHidden =
    hasAccessibleName ? false : ariaHiddenProp !== undefined ? ariaHiddenProp : true;

  return (
    <Icon
      ref={ref}
      size={px}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden={ariaHidden}
      aria-label={hasAccessibleName ? ariaLabel : undefined}
      {...rest}
    />
  );
});
