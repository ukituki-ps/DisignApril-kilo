import {
  AppShell,
  Group,
  Title,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Button
} from '@mantine/core';
import { SunIcon, MoonIcon } from 'lucide-react';
import { logoFilters } from '@ukituki-ps/april-tokens';
import { AprilProviders, UIKit, useDensity } from '@ukituki-ps/april-ui';

function TopBar() {
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
        <Group>
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
  return (
    <AppShell
      header={{
        height: 60
      }}
      padding="md">
      <TopBar />
      <AppShell.Main bg="var(--mantine-color-body)">
        <UIKit />
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
