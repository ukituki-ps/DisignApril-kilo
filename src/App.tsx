import React, { useState } from 'react';
import {
  MantineProvider,
  createTheme,
  ColorSchemeScript,
  AppShell,
  Group,
  Title,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Button,
  Text } from
'@mantine/core';
import { SunIcon, MoonIcon } from 'lucide-react';
import { DensityProvider, useDensity } from './DensityContext';
import { UIKit } from './components/UIKit';
const theme = createTheme({
  primaryColor: 'teal',
  fontFamily: 'Inter, sans-serif',
  headings: {
    fontFamily: 'Inter, sans-serif',
    sizes: {
      h1: {
        fontSize: '24px',
        fontWeight: '700'
      },
      h2: {
        fontSize: '18px',
        fontWeight: '600'
      },
      h3: {
        fontSize: '16px',
        fontWeight: '600'
      }
    }
  },
  colors: {
    // Customizing gray to match the requested neutral palette
    gray: [
    '#F8F9FA',
    '#F1F3F5',
    '#E9ECEF',
    '#DEE2E6',
    '#CED4DA',
    '#ADB5BD',
    '#868E96',
    '#495057',
    '#343A40',
    '#212529'],

    dark: [
    '#C1C2C5',
    '#A6A7AB',
    '#909296',
    '#5C5F66',
    '#373A40',
    '#2C2E33',
    '#25262B',
    '#1A1B1E',
    '#141517',
    '#101113']

  }
});
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
            src="/g12875-8.svg"
            alt="April logo"
            style={{
              height: 28,
              width: 28,
              objectFit: 'contain',
              filter:
              'brightness(0) saturate(100%) invert(65%) sepia(51%) saturate(552%) hue-rotate(118deg) brightness(92%) contrast(87%)'
            }} />
          
          <Title order={3}>April Design System</Title>
        </Group>
        <Group>
          <Button
            variant="light"
            color="gray"
            onClick={toggleDensity}
            size="sm">
            
            Mode: {density === 'comfortable' ? 'Comfortable' : 'Compact'}
          </Button>
          <ActionIcon
            variant="default"
            size="lg"
            aria-label="Toggle color scheme"
            onClick={toggleColorScheme}>
            
            {computedColorScheme === 'dark' ?
            <SunIcon size={18} /> :

            <MoonIcon size={18} />
            }
          </ActionIcon>
        </Group>
      </Group>
    </AppShell.Header>);

}
function MainApp() {
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
    </AppShell>);

}
export function App() {
  return (
    <DensityProvider>
      <ColorSchemeScript defaultColorScheme="light" />
      <MantineProvider theme={theme} defaultColorScheme="light">
        <MainApp />
      </MantineProvider>
    </DensityProvider>);

}