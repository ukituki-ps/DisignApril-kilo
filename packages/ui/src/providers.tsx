import type { ReactNode } from 'react';
import {
  ColorSchemeScript,
  MantineProvider,
  type MantineColorScheme,
  type MantineThemeOverride
} from '@mantine/core';
import { DensityProvider } from './DensityContext';
import { createAprilTheme } from './theme';

export type AprilProvidersProps = {
  children: ReactNode;
  /** Mantine theme override; default is `createAprilTheme()`. Merge app-specific tweaks in the shell. */
  theme?: MantineThemeOverride;
  defaultColorScheme?: MantineColorScheme;
  /** Initial value for `useDensity()` (default `comfortable`). */
  defaultDensity?: 'comfortable' | 'compact';
};

/**
 * Wraps app with density context + Mantine + color scheme script.
 * Use once at the root of each microfrontend shell.
 */
export function AprilProviders({
  children,
  theme,
  defaultColorScheme = 'auto',
  defaultDensity = 'comfortable',
}: AprilProvidersProps) {
  return (
    <DensityProvider initialDensity={defaultDensity}>
      <ColorSchemeScript defaultColorScheme={defaultColorScheme} />
      <MantineProvider
        theme={theme ?? createAprilTheme()}
        defaultColorScheme={defaultColorScheme}>
        {children}
      </MantineProvider>
    </DensityProvider>
  );
}
