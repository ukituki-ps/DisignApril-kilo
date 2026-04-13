import { createTheme } from '@mantine/core';
import { mantineDark, mantineGray } from '@april/tokens';

export function createAprilTheme() {
  return createTheme({
    primaryColor: 'teal',
    fontFamily: 'Inter, sans-serif',
    headings: {
      fontFamily: 'Inter, sans-serif',
      sizes: {
        h1: { fontSize: '24px', fontWeight: '700' },
        h2: { fontSize: '18px', fontWeight: '600' },
        h3: { fontSize: '16px', fontWeight: '600' }
      }
    },
    colors: {
      gray: mantineGray,
      dark: mantineDark
    }
  });
}
