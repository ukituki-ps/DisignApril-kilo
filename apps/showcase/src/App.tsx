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
import { logoFilters } from '@april/tokens';
import { AprilProviders, UIKit, useDensity } from '@april/ui';

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
            alt="April logo"
            style={{
              height: 28,
              width: 28,
              objectFit: 'contain',
              filter: logoFilters.primary
            }}
          />
          <Title order={3}>April Design System</Title>
        </Group>
        <Group>
          <Button variant="light" color="gray" onClick={toggleDensity} size="sm">
            Mode: {density === 'comfortable' ? 'Comfortable' : 'Compact'}
          </Button>
          <ActionIcon
            variant="default"
            size="lg"
            aria-label="Toggle color scheme"
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
