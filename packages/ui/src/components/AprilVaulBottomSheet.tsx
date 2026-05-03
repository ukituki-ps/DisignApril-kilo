import 'mantine-vaul/style.css';
import { useMemo, type CSSProperties, type ReactNode } from 'react';
import type { MantineTheme } from '@mantine/core';
import { Vaul, type VaulProps } from 'mantine-vaul';
import {
  APRIL_MOBILE_BOTTOM_SHEET_Z_INDEX,
  aprilMobileShellBarContentPaddingBottom,
  aprilMobileVaulBottomMaxHeight,
} from './aprilMobileShellBarLayout';

type VaulStyleObject = Partial<
  Record<
    | 'content'
    | 'overlay'
    | 'header'
    | 'title'
    | 'handler'
    | 'body'
    | 'footer'
    | 'description'
    | 'target'
    | 'closeTarget',
    CSSProperties
  >
>;

const VAUL_STYLE_PARTS = [
  'content',
  'overlay',
  'header',
  'title',
  'handler',
  'body',
  'footer',
  'description',
  'target',
  'closeTarget',
] as const satisfies readonly (keyof VaulStyleObject)[];

const DEFAULT_CLOSE_BUTTON_SIZE = 32.17;
const DEFAULT_CLOSE_ICON_SIZE = 18;

const BASE_STYLES: VaulStyleObject = {
  /** mantine-vaul defaults `height: 100%` on content — override so the sheet height follows children up to `maxHeight` / `--vaul-max-height`. */
  content: {
    height: 'auto',
    minHeight: 0,
  },
  title: {
    textAlign: 'left',
    width: '100%',
    fontWeight: 600,
    lineHeight: 1.3,
    paddingRight: 44,
  },
  header: {
    alignItems: 'stretch',
    paddingLeft: 'var(--mantine-spacing-md)',
    paddingRight: 'var(--mantine-spacing-md)',
    paddingTop: 'var(--mantine-spacing-xs)',
  },
  body: {
    padding: 'var(--mantine-spacing-md)',
    paddingTop: 'var(--mantine-spacing-sm)',
    height: 'auto',
    flex: '1 1 auto',
    minHeight: 0,
    overflowY: 'auto',
  },
};

function mergeCss(a: CSSProperties, b?: CSSProperties): CSSProperties {
  return b ? { ...a, ...b } : a;
}

function mergeVaulStylesObjects(base: VaulStyleObject, user: VaulStyleObject): VaulStyleObject {
  const out: VaulStyleObject = { ...base, ...user };
  for (const k of VAUL_STYLE_PARTS) {
    out[k] = mergeCss(base[k] ?? {}, user[k] ?? {});
  }
  return out;
}

function mergeVaulStyles(base: VaulStyleObject, user?: VaulProps['styles']): VaulProps['styles'] {
  if (!user) {
    return base;
  }
  if (typeof user === 'function') {
    return ((theme: MantineTheme, props: unknown, ctx: unknown) => {
      const resolved = (user as (t: MantineTheme, p: unknown, c: unknown) => VaulStyleObject)(
        theme,
        props,
        ctx,
      );
      return mergeVaulStylesObjects(base, resolved);
    }) as VaulProps['styles'];
  }
  return mergeVaulStylesObjects(base, user as VaulStyleObject);
}

export type AprilVaulBottomSheetProps = Omit<
  VaulProps,
  'title' | 'target' | 'opened' | 'onOpenChange' | 'direction' | 'children'
> & {
  opened: boolean;
  onClose: () => void;
  headerTitle: ReactNode;
  headerActions?: ReactNode;
  children: ReactNode;
};

/**
 * Mobile **bottom sheet** on [Vaul](https://github.com/emilkowalski/vaul) via [mantine-vaul](https://github.com/AndrejNemec/mantine-vaul):
 * drag handle, swipe-to-dismiss, same **header title + actions** pattern as {@link AprilModal}.
 *
 * Requires peer **`@mantine/hooks`** (same major as `@mantine/core`). Styles ship with `mantine-vaul/style.css`
 * (imported from this module). Stacking matches {@link AprilMobileBottomSheet}: sheet below {@link AprilMobileShellBar},
 * content lifted with {@link aprilMobileShellBarContentPaddingBottom}. The sheet **grows with content** until
 * `maxHeight` (default {@link aprilMobileVaulBottomMaxHeight}); taller content scrolls inside the body.
 */
export function AprilVaulBottomSheet({
  opened,
  onClose,
  headerTitle,
  headerActions,
  children,
  styles,
  closeButtonProps,
  contentProps,
  zIndex = APRIL_MOBILE_BOTTOM_SHEET_Z_INDEX,
  overlayZIndex = APRIL_MOBILE_BOTTOM_SHEET_Z_INDEX - 1,
  maxHeight = aprilMobileVaulBottomMaxHeight(),
  radius = 'xl',
  withHandler = true,
  withOverlay = true,
  ...rest
}: AprilVaulBottomSheetProps) {
  const mergedStyles = useMemo(() => mergeVaulStyles(BASE_STYLES, styles), [styles]);
  const mergedCloseButtonProps = useMemo(
    () => ({
      size: DEFAULT_CLOSE_BUTTON_SIZE,
      iconSize: DEFAULT_CLOSE_ICON_SIZE,
      'aria-label': 'Закрыть',
      ...closeButtonProps,
    }),
    [closeButtonProps],
  );

  const mergedContentProps = useMemo(() => {
    const bottom = aprilMobileShellBarContentPaddingBottom();
    return {
      ...contentProps,
      style: { bottom, ...contentProps?.style },
    };
  }, [contentProps]);

  const title = (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--mantine-spacing-md)',
        width: '100%',
        minWidth: 0,
      }}>
      <span style={{ flex: 1, minWidth: 0 }}>{headerTitle}</span>
      {headerActions ? (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 'var(--mantine-spacing-xs)',
            flexShrink: 0,
            marginLeft: 'auto',
            marginRight: 'var(--mantine-spacing-xs)',
          }}>
          {headerActions}
        </span>
      ) : null}
    </span>
  );

  return (
    <Vaul
      direction="bottom"
      opened={opened}
      onOpenChange={(next) => {
        if (!next) {
          onClose();
        }
      }}
      title={title}
      zIndex={zIndex}
      overlayZIndex={overlayZIndex}
      maxHeight={maxHeight}
      radius={radius}
      withHandler={withHandler}
      withOverlay={withOverlay}
      styles={mergedStyles}
      closeButtonProps={mergedCloseButtonProps}
      contentProps={mergedContentProps}
      {...rest}>
      {children}
    </Vaul>
  );
}

AprilVaulBottomSheet.displayName = 'AprilVaulBottomSheet';
