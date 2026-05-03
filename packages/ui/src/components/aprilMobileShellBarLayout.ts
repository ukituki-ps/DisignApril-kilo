import type { ActionIconProps } from '@mantine/core';

/** Default margin from viewport bottom to the floating pill (above `env(safe-area-inset-bottom)`). */
export const APRIL_MOBILE_SHELL_BAR_MARGIN_BOTTOM_PX = 12;

/** Minimum inner height of the pill row (single-line controls). */
export const APRIL_MOBILE_SHELL_BAR_PILL_MIN_HEIGHT_PX = 52;

/**
 * Shell bar sits above bottom sheets / modal overlays so it stays visible and clickable (April mobile pattern).
 * Bottom sheet default: {@link APRIL_MOBILE_BOTTOM_SHEET_Z_INDEX}.
 */
export const APRIL_MOBILE_SHELL_BAR_Z_INDEX = 400;

/** Default `zIndex` for {@link AprilMobileBottomSheet} — below {@link APRIL_MOBILE_SHELL_BAR_Z_INDEX}. */
export const APRIL_MOBILE_BOTTOM_SHEET_Z_INDEX = 350;

/**
 * Recommended `padding-bottom` for the scrollable main area so content clears the default shell bar
 * (margin + pill + safe-area). If the bar grows (multi-line center), increase padding in the product.
 */
export function aprilMobileShellBarContentPaddingBottom(): string {
  return `calc(${APRIL_MOBILE_SHELL_BAR_MARGIN_BOTTOM_PX}px + ${APRIL_MOBILE_SHELL_BAR_PILL_MIN_HEIGHT_PX}px + env(safe-area-inset-bottom, 0px))`;
}

/**
 * Max height for a fixed bottom sheet (e.g. Vaul) so it does not extend under {@link AprilMobileShellBar}.
 * Pairs with `bottom: {@link aprilMobileShellBarContentPaddingBottom}` on the sheet container.
 */
export function aprilMobileVaulBottomMaxHeight(): string {
  return `calc(100dvh - ${APRIL_MOBILE_SHELL_BAR_MARGIN_BOTTOM_PX}px - ${APRIL_MOBILE_SHELL_BAR_PILL_MIN_HEIGHT_PX}px - env(safe-area-inset-bottom, 0px))`;
}

/** Панель: «Бирюза 9» (DESIGN_SYSTEM / ColorPalette). */
export const APRIL_MOBILE_SHELL_BAR_PAPER_BACKGROUND = 'var(--mantine-color-teal-9)';

/** Лёгкая кромка на насыщенном teal. */
export const APRIL_MOBILE_SHELL_BAR_PAPER_BORDER = '1px solid rgba(255, 255, 255, 0.2)';

/**
 * Кнопки на нижней панели при фоне {@link APRIL_MOBILE_SHELL_BAR_PAPER_BACKGROUND} (teal.9): без заливки, белая кромка, светлая иконка.
 * Используйте с `variant="default"` (корень переопределяется стилями).
 */
export const aprilMobileShellBarGhostWhiteBorderActionStyles: NonNullable<ActionIconProps['styles']> = {
  root: {
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.92)',
    border: '1px solid rgba(255, 255, 255, 0.55)',
    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
  },
};

/**
 * Тёмно-зелёная заливка (демо «продуктовые иконки» в витрине вариантов панели).
 * В основном UI панели см. {@link aprilMobileShellBarGhostWhiteBorderActionStyles}.
 */
export const aprilMobileShellBarDarkGreenActionStyles: NonNullable<ActionIconProps['styles']> = {
  root: {
    backgroundColor: 'var(--mantine-color-green-9)',
    color: 'var(--mantine-color-white)',
    border: 'none',
    '&:hover': { backgroundColor: 'var(--mantine-color-green-8)' },
  },
};
