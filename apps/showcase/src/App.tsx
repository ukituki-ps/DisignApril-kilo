import { useState } from 'react';
import {
  AppShell,
  Group,
  ActionIcon,
  Tooltip,
  VisuallyHidden,
  useMantineColorScheme,
  useComputedColorScheme,
} from '@mantine/core';
import { AlignJustify, LayoutGrid, Moon, Rows3, Smartphone, Sun } from 'lucide-react';
import { logoFilters } from '@ukituki-ps/april-tokens';
import { AprilProviders, UIKit, useDensity } from '@ukituki-ps/april-ui';
import { MobileShowcase } from './MobileShowcase';

type ShowcaseMode = 'uikit' | 'mobile';

function TopBar({
  mode,
  onModeChange
}: {
  mode: ShowcaseMode;
  onModeChange: (mode: ShowcaseMode) => void;
}) {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');
  const { density, toggleDensity } = useDensity();
  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <AppShell.Header
      px={{ base: 'xs', sm: 'md' }}
      py={{ base: 6, sm: 'md' }}
      style={{
        borderBottom: '1px solid var(--mantine-color-default-border)'
      }}>
      <VisuallyHidden>Витрина дизайн-системы April</VisuallyHidden>
      <Group justify="space-between" align="center" wrap="nowrap" gap="xs" h="100%">
        <Group wrap="nowrap" align="center" gap="xs" style={{ minWidth: 0 }}>
          <img
            src="/logo-icon.svg"
            alt="April"
            style={{
              height: 28,
              width: 28,
              objectFit: 'contain',
              filter: logoFilters.primary,
              flexShrink: 0,
            }}
          />
          <Group wrap="nowrap" gap={4}>
            <Tooltip label="UIKit — галерея компонентов" events={{ hover: true, focus: true, touch: true }}>
              <ActionIcon
                variant={mode === 'uikit' ? 'filled' : 'default'}
                color="teal"
                size="lg"
                radius="md"
                aria-label="Открыть UIKit"
                aria-pressed={mode === 'uikit'}
                onClick={() => onModeChange('uikit')}>
                <LayoutGrid size={20} aria-hidden />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Mobile lab" events={{ hover: true, focus: true, touch: true }}>
              <ActionIcon
                variant={mode === 'mobile' ? 'filled' : 'default'}
                color="teal"
                size="lg"
                radius="md"
                aria-label="Открыть Mobile lab"
                aria-pressed={mode === 'mobile'}
                onClick={() => onModeChange('mobile')}>
                <Smartphone size={20} aria-hidden />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
        <Group wrap="nowrap" gap="xs" style={{ flexShrink: 0 }}>
          <Tooltip
            label={density === 'comfortable' ? 'Плотность: комфортная' : 'Плотность: компактная'}
            events={{ hover: true, focus: true, touch: true }}>
            <ActionIcon
              variant="light"
              color="gray"
              size="lg"
              radius="md"
              aria-label={
                density === 'comfortable'
                  ? 'Плотность комфортная, переключить на компактную'
                  : 'Плотность компактная, переключить на комфортную'
              }
              onClick={toggleDensity}>
              {density === 'comfortable' ? (
                <Rows3 size={20} aria-hidden />
              ) : (
                <AlignJustify size={20} aria-hidden />
              )}
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Светлая / тёмная тема" events={{ hover: true, focus: true, touch: true }}>
            <ActionIcon
              variant="default"
              size="lg"
              radius="md"
              aria-label="Переключить светлую и тёмную тему"
              onClick={toggleColorScheme}>
              {computedColorScheme === 'dark' ? <Sun size={20} aria-hidden /> : <Moon size={20} aria-hidden />}
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
    </AppShell.Header>
  );
}

function Shell() {
  const [mode, setMode] = useState<ShowcaseMode>('uikit');

  return (
    <AppShell
      header={mode === 'uikit' ? { height: 60 } : undefined}
      padding={mode === 'uikit' ? 'md' : 0}
      styles={{
        root: {
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
        },
        ...(mode === 'mobile'
          ? {
              main: {
                flex: 1,
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                padding: 0,
              },
            }
          : {}),
      }}>
      {mode === 'uikit' ? <TopBar mode={mode} onModeChange={setMode} /> : null}
      <AppShell.Main bg="var(--mantine-color-body)">
        {mode === 'uikit' ? (
          <UIKit />
        ) : (
          <MobileShowcase onRequestUIKit={() => setMode('uikit')} />
        )}
      </AppShell.Main>
    </AppShell>
  );
}

export function App() {
  return (
    <AprilProviders>
      <Shell />
    </AprilProviders>
  );
}
