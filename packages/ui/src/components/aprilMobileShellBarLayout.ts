/** Default margin from viewport bottom to the floating pill (above `env(safe-area-inset-bottom)`). */
export const APRIL_MOBILE_SHELL_BAR_MARGIN_BOTTOM_PX = 12;

/** Minimum inner height of the pill row (single-line controls). */
export const APRIL_MOBILE_SHELL_BAR_PILL_MIN_HEIGHT_PX = 52;

/**
 * Recommended `padding-bottom` for the scrollable main area so content clears the default shell bar
 * (margin + pill + safe-area). If the bar grows (multi-line center), increase padding in the product.
 */
export function aprilMobileShellBarContentPaddingBottom(): string {
  return `calc(${APRIL_MOBILE_SHELL_BAR_MARGIN_BOTTOM_PX}px + ${APRIL_MOBILE_SHELL_BAR_PILL_MIN_HEIGHT_PX}px + env(safe-area-inset-bottom, 0px))`;
}
