import { DEFAULT_THEME } from '@mantine/core';
import { describe, expect, it } from 'vitest';
import { createAprilJsonEditTheme } from './createAprilJsonEditTheme';

describe('createAprilJsonEditTheme', () => {
  it('maps light comfortable theme to json-edit-react styles', () => {
    const theme = createAprilJsonEditTheme({
      mantineTheme: DEFAULT_THEME,
      colorScheme: 'light',
      density: 'comfortable',
    });
    expect(theme.displayName).toBe('April (Mantine)');
    const styles = theme.styles;
    expect(styles.container).toMatchObject({
      backgroundColor: 'var(--mantine-color-body)',
      fontFamily: DEFAULT_THEME.fontFamilyMonospace,
    });
    expect(styles.string).toBe(DEFAULT_THEME.colors.orange[6]);
  });

  it('uses smaller root font for compact density', () => {
    const comfortable = createAprilJsonEditTheme({
      mantineTheme: DEFAULT_THEME,
      colorScheme: 'dark',
      density: 'comfortable',
    });
    const compact = createAprilJsonEditTheme({
      mantineTheme: DEFAULT_THEME,
      colorScheme: 'dark',
      density: 'compact',
    });
    expect((comfortable.styles.container as { fontSize: number }).fontSize).toBe(14);
    expect((compact.styles.container as { fontSize: number }).fontSize).toBe(13);
  });
});
