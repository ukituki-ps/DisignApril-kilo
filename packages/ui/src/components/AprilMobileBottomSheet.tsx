import { forwardRef, useMemo, type CSSProperties } from 'react';
import { Drawer, type DrawerProps, type MantineTheme } from '@mantine/core';
import {
  APRIL_MOBILE_BOTTOM_SHEET_Z_INDEX,
  aprilMobileShellBarContentPaddingBottom,
} from './aprilMobileShellBarLayout';

type DrawerStyles = NonNullable<DrawerProps['styles']>;

const BASE_STYLES: DrawerStyles = {
  inner: {
    bottom: aprilMobileShellBarContentPaddingBottom(),
    top: 'auto',
  },
  content: {
    borderTopLeftRadius: 'var(--mantine-radius-xl)',
    borderTopRightRadius: 'var(--mantine-radius-xl)',
  },
};

function mergeCss(a: CSSProperties, b?: CSSProperties): CSSProperties {
  return b ? { ...a, ...b } : a;
}

function mergeDrawerStylesObjects(base: DrawerStyles, user: DrawerStyles): DrawerStyles {
  return {
    ...base,
    ...user,
    root: mergeCss((base.root ?? {}) as CSSProperties, user.root as CSSProperties | undefined),
    inner: mergeCss((base.inner ?? {}) as CSSProperties, user.inner as CSSProperties | undefined),
    content: mergeCss((base.content ?? {}) as CSSProperties, user.content as CSSProperties | undefined),
    overlay: mergeCss((base.overlay ?? {}) as CSSProperties, user.overlay as CSSProperties | undefined),
    header: mergeCss((base.header ?? {}) as CSSProperties, user.header as CSSProperties | undefined),
    body: mergeCss((base.body ?? {}) as CSSProperties, user.body as CSSProperties | undefined),
  };
}

function mergeDrawerStyles(base: DrawerStyles, user?: DrawerProps['styles']): DrawerProps['styles'] {
  if (!user) {
    return base;
  }
  if (typeof user === 'function') {
    return ((theme: MantineTheme, props: unknown, ctx: unknown) => {
      const resolved = (user as (t: MantineTheme, p: unknown, c: unknown) => DrawerStyles)(
        theme,
        props,
        ctx,
      );
      return mergeDrawerStylesObjects(base, resolved);
    }) as DrawerProps['styles'];
  }
  return mergeDrawerStylesObjects(base, user as DrawerStyles);
}

export type AprilMobileBottomSheetProps = Omit<DrawerProps, 'position'>;

/**
 * Bottom **sheet** (Mantine `Drawer` with `position="bottom"`) for mobile flows: slides up from the bottom,
 * rounded top corners, dimmed overlay. The sheet stops **above** {@link AprilMobileShellBar} so the shell
 * bar stays visible and clickable (higher `z-index` than this drawer).
 *
 * Pair with {@link aprilMobileShellBarContentPaddingBottom} on scrollable `main` as for the bar alone.
 */
export const AprilMobileBottomSheet = forwardRef<HTMLDivElement, AprilMobileBottomSheetProps>(
  function AprilMobileBottomSheet(
    {
      styles,
      zIndex = APRIL_MOBILE_BOTTOM_SHEET_Z_INDEX,
      overlayProps,
      transitionProps,
      closeButtonProps,
      ...rest
    },
    ref,
  ) {
    const mergedStyles = useMemo(() => mergeDrawerStyles(BASE_STYLES, styles), [styles]);
    const mergedOverlay = useMemo(
      () => ({
        backgroundOpacity: 0.45,
        blur: 2,
        ...overlayProps,
      }),
      [overlayProps],
    );

    return (
      <Drawer
        ref={ref}
        position="bottom"
        zIndex={zIndex}
        styles={mergedStyles}
        overlayProps={mergedOverlay}
        transitionProps={{ transition: 'slide-up', ...transitionProps }}
        closeButtonProps={{
          'aria-label': 'Закрыть',
          ...closeButtonProps,
        }}
        {...rest}
      />
    );
  },
);

AprilMobileBottomSheet.displayName = 'AprilMobileBottomSheet';
