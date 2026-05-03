import { useState } from 'react';
import {
  AppShell,
  Group,
  Title,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Button,
  Tabs
} from '@mantine/core';
import { SunIcon, MoonIcon } from 'lucide-react';
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
      p="md"
      style={{
        borderBottom: '1px solid var(--mantine-color-default-border)'
      }}>
      <Group justify="space-between" h="100%">
        <Group wrap="nowrap" align="center" gap="lg">
          <Group wrap="nowrap">
            <img
              src="/logo-icon.svg"
              alt="Логотип April"
              style={{
                height: 28,
                width: 28,
                objectFit: 'contain',
                filter: logoFilters.primary
              }}
            />
            <Title order={3}>April — дизайн-система</Title>
          </Group>
          <Tabs
            value={mode}
            onChange={(v) => {
              if (v === 'uikit' || v === 'mobile') {
                onModeChange(v);
              }
            }}
            variant="pills"
            radius="md">
            <Tabs.List>
              <Tabs.Tab value="uikit">UIKit</Tabs.Tab>
              <Tabs.Tab value="mobile">Mobile lab</Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </Group>
        <Group>
          <Button variant="light" color="gray" onClick={toggleDensity} size="sm">
            Режим: {density === 'comfortable' ? 'комфортный' : 'компактный'}
          </Button>
          <ActionIcon
            variant="default"
            size="lg"
            aria-label="Переключить светлую и тёмную тему"
            onClick={toggleColorScheme}>
            {computedColorScheme === 'dark' ? (
              <SunIcon size={18} />
            ) : (
              <MoonIcon size={18} />
            )}
          </ActionIcon>
        </Group>
      </Group>
    </AppShell.Header>
  );
}

function Shell() {
  const [mode, setMode] = useState<ShowcaseMode>('uikit');

  return (
    <AppShell
      header={{
        height: 60
      }}
      padding="md">
      <TopBar mode={mode} onModeChange={setMode} />
      <AppShell.Main bg="var(--mantine-color-body)">
        {mode === 'uikit' ? <UIKit /> : <MobileShowcase />}
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
