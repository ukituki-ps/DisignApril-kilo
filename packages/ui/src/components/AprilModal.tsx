import { forwardRef, useMemo, type CSSProperties, type ReactNode } from 'react';
import { Modal, type ModalProps } from '@mantine/core';

type ModalStyles = NonNullable<ModalProps['styles']>;

/** Keeps Mantine header fixed while the dialog body scrolls (April DS pattern). */
const SCROLL_LAYOUT_STYLES: ModalStyles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'min(86dvh, 720px)',
    overflow: 'hidden',
  },
  body: {
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
  },
  /** Title cell grows so `headerActions` sit flush to the right, before the close control. */
  title: {
    flex: 1,
    minWidth: 0,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    /** Зазор между ячейкой заголовка (текст + действия) и кнопкой закрытия. */
    gap: 'var(--mantine-spacing-md)',
  },
  /** Match header `ActionIcon` hit-area (~32px); icon scales via `closeButtonProps.iconSize`. */
  close: {
    flexShrink: 0,
  },
};

/** Outer control ≈32.17px (Mantine converts numeric `size` from px to rem). */
const DEFAULT_CLOSE_BUTTON_SIZE = 32.17;
const DEFAULT_CLOSE_ICON_SIZE = 18;

function mergeCss(a: CSSProperties, b?: CSSProperties): CSSProperties {
  return b ? { ...a, ...b } : a;
}

function mergeModalStylesObjects(base: ModalStyles, user: ModalStyles): ModalStyles {
  return {
    ...base,
    ...user,
    content: mergeCss((base.content ?? {}) as CSSProperties, user.content as CSSProperties | undefined),
    body: mergeCss((base.body ?? {}) as CSSProperties, user.body as CSSProperties | undefined),
    title: mergeCss((base.title ?? {}) as CSSProperties, user.title as CSSProperties | undefined),
    header: mergeCss((base.header ?? {}) as CSSProperties, user.header as CSSProperties | undefined),
    close: mergeCss((base.close ?? {}) as CSSProperties, user.close as CSSProperties | undefined),
  };
}

function mergeModalStyles(base: ModalStyles, override?: ModalProps['styles']): ModalProps['styles'] {
  if (!override) {
    return base;
  }
  if (typeof override === 'function') {
    return ((...args: unknown[]) => {
      const user = (override as (...a: unknown[]) => ModalStyles)(...args);
      return mergeModalStylesObjects(base, user);
    }) as ModalProps['styles'];
  }
  return mergeModalStylesObjects(base, override as ModalStyles);
}

export type AprilModalProps = Omit<ModalProps, 'title'> & {
  /** Left part of the header (inside `ModalTitle`, before actions and the close control). */
  headerTitle: ReactNode;
  /** Secondary / primary actions in the header, immediately before the Mantine close button. */
  headerActions?: ReactNode;
};

/**
 * Mantine {@link Modal} with April layout: **actions live in the header** (aligned to the right, next to close),
 * **body scrolls** under a fixed header. Pass `headerActions` for confirm/cancel (or icon buttons with labels).
 *
 * `styles` merges with built-in rules (`content`, `body`, `title`, `header`, `close`).
 * Default close control is **32.17×32.17 px** (Mantine `size` + `iconSize`) so it matches header `ActionIcon`s.
 */
export const AprilModal = forwardRef<HTMLDivElement, AprilModalProps>(function AprilModal(
  { headerTitle, headerActions, styles, closeButtonProps, ...rest },
  ref,
) {
  const mergedStyles = useMemo(() => mergeModalStyles(SCROLL_LAYOUT_STYLES, styles), [styles]);
  const mergedCloseButtonProps = useMemo(
    () => ({
      size: DEFAULT_CLOSE_BUTTON_SIZE,
      iconSize: DEFAULT_CLOSE_ICON_SIZE,
      ...closeButtonProps,
    }),
    [closeButtonProps],
  );

  const title = (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--mantine-spacing-md)',
        width: '100%',
        minWidth: 0,
      }}
    >
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
          }}
        >
          {headerActions}
        </span>
      ) : null}
    </span>
  );

  return (
    <Modal
      ref={ref}
      title={title}
      styles={mergedStyles}
      closeButtonProps={mergedCloseButtonProps}
      {...rest}
    />
  );
});

AprilModal.displayName = 'AprilModal';
