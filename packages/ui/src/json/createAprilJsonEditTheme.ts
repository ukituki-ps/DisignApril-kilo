import type { MantineTheme } from '@mantine/core';
import type { Theme } from 'json-edit-react';

export type AprilJsonEditDensity = 'comfortable' | 'compact';

export type CreateAprilJsonEditThemeInput = {
  mantineTheme: MantineTheme;
  colorScheme: 'light' | 'dark';
  density: AprilJsonEditDensity;
};

/**
 * Maps April Mantine tokens into json-edit-react `theme` prop (see json-edit-react README: Themes & Styles).
 */
export function createAprilJsonEditTheme({
  mantineTheme: t,
  colorScheme,
  density,
}: CreateAprilJsonEditThemeInput): Theme {
  const isDark = colorScheme === 'dark';
  const gray = t.colors.gray;
  const dark = t.colors.dark;
  const teal = t.colors.teal;
  const orange = t.colors.orange;
  const blue = t.colors.blue;
  const green = t.colors.green;
  const red = t.colors.red;

  const bodyBg = 'var(--mantine-color-body)';
  const textPrimary = 'var(--mantine-color-text)';
  const textDimmed = 'var(--mantine-color-dimmed)';
  const borderSubtle = isDark ? dark[4] : gray[3];

  const rootFontSize = density === 'compact' ? 13 : 14;

  const propertyColor = isDark ? dark[0] : gray[9];
  const bracketColor = isDark ? dark[2] : gray[6];
  const itemCountColor = textDimmed;

  return {
    displayName: 'April (Mantine)',
    styles: {
      container: {
        backgroundColor: bodyBg,
        color: textPrimary,
        fontFamily: t.fontFamilyMonospace,
        fontSize: rootFontSize,
        lineHeight: 1.45,
        borderRadius: 'var(--mantine-radius-default)',
      },
      collection: {},
      collectionInner: {},
      collectionElement: {},
      dropZone: {
        borderColor: borderSubtle,
      },
      property: propertyColor,
      bracket: { color: bracketColor, fontWeight: 600 },
      itemCount: { color: itemCountColor, fontStyle: 'italic' },
      string: orange[6],
      number: blue[6],
      boolean: { color: green[7], fontWeight: 600 },
      null: { color: red[6], fontVariant: 'small-caps', fontWeight: 700 },
      input: [
        textPrimary,
        {
          fontSize: density === 'compact' ? '0.85rem' : '0.9rem',
          borderRadius: 'var(--mantine-radius-default)',
        },
      ],
      inputHighlight: isDark ? dark[5] : teal[0],
      error: {
        fontSize: '0.8em',
        color: `var(--mantine-color-error)`,
        fontWeight: 600,
      },
      iconCollection: bracketColor,
      iconEdit: teal[6],
      iconDelete: red[6],
      iconAdd: teal[6],
      iconCopy: blue[6],
      iconOk: green[7],
      iconCancel: red[6],
    },
    fragments: {
      accent: { color: teal[6] },
    },
  };
}

export function aprilJsonTreeRootLayout(density: AprilJsonEditDensity): {
  minWidth: number;
  maxWidth: string;
} {
  return {
    minWidth: density === 'compact' ? 220 : 260,
    maxWidth: 'min(720px, 100%)',
  };
}
