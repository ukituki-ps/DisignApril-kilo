import React from 'react';
import { Stack, SimpleGrid, Box, Text, Paper, Group } from '@mantine/core';
const SVG_FULL = "/\u0421\u043D\u0438\u043C\u043E\u043A_\u044D\u043A\u0440\u0430\u043D\u0430_\u043E\u0442_2026-04-13_13-09-29_(1).svg";

const SVG_ICON = "/g12875-8.svg";

const SVG_WORDMARK = "/g12875.svg";

const ACCENT = '#12B886';
export function LogoSection() {
  return (
    <Stack gap="xl">
      {/* Primary: Teal on light/dark backgrounds */}
      <Box>
        <Text fw={500} size="sm" mb="md">
          Primary (Accent Teal)
        </Text>
        <SimpleGrid
          cols={{
            base: 1,
            sm: 3
          }}
          spacing="lg">
          
          <LogoCard
            label="Full Logo"
            description="Primary brand mark. Marketing pages, login screens, documents."
            src={SVG_FULL}
            width={220}
            color={ACCENT}
            bg="var(--mantine-color-gray-0)" />
          
          <LogoCard
            label="Icon Only"
            description="Compact mark for favicons, app icons, avatars, small spaces."
            src={SVG_ICON}
            width={72}
            color={ACCENT}
            bg="var(--mantine-color-gray-0)" />
          
          <LogoCard
            label="Wordmark"
            description="Text-only variant for headers, navigation bars, inline references."
            src={SVG_WORDMARK}
            width={180}
            color={ACCENT}
            bg="var(--mantine-color-gray-0)" />
          
        </SimpleGrid>
      </Box>

      {/* On dark background */}
      <Box>
        <Text fw={500} size="sm" mb="md">
          On Dark Background
        </Text>
        <SimpleGrid
          cols={{
            base: 1,
            sm: 3
          }}
          spacing="lg">
          
          <LogoCard
            label="Full Logo"
            description="White variant for dark surfaces."
            src={SVG_FULL}
            width={220}
            color="#FFFFFF"
            bg="#1A1B1E" />
          
          <LogoCard
            label="Icon Only"
            description="White icon on dark surfaces."
            src={SVG_ICON}
            width={72}
            color="#FFFFFF"
            bg="#1A1B1E" />
          
          <LogoCard
            label="Wordmark"
            description="White wordmark on dark surfaces."
            src={SVG_WORDMARK}
            width={180}
            color="#FFFFFF"
            bg="#1A1B1E" />
          
        </SimpleGrid>
      </Box>

      {/* Monochrome */}
      <Box>
        <Text fw={500} size="sm" mb="md">
          Monochrome (Dark on Light)
        </Text>
        <SimpleGrid
          cols={{
            base: 1,
            sm: 3
          }}
          spacing="lg">
          
          <LogoCard
            label="Full Logo"
            description="Single-color for print and formal documents."
            src={SVG_FULL}
            width={220}
            color="#212529"
            bg="#F8F9FA" />
          
          <LogoCard
            label="Icon Only"
            description="Monochrome icon."
            src={SVG_ICON}
            width={72}
            color="#212529"
            bg="#F8F9FA" />
          
          <LogoCard
            label="Wordmark"
            description="Monochrome wordmark."
            src={SVG_WORDMARK}
            width={180}
            color="#212529"
            bg="#F8F9FA" />
          
        </SimpleGrid>
      </Box>

      <Stack gap="xs">
        <Text fw={500} size="sm">
          Usage Guidelines
        </Text>
        <SimpleGrid
          cols={{
            base: 1,
            sm: 2
          }}
          spacing="md">
          
          <Box>
            <Text size="sm" c="dimmed">
              ✅ Primary color: Teal (#12B886) — preferred for all digital use.
            </Text>
            <Text size="sm" c="dimmed">
              ✅ White variant on dark backgrounds (dark theme, photos).
            </Text>
            <Text size="sm" c="dimmed">
              ✅ Monochrome for print, fax, formal documents.
            </Text>
            <Text size="sm" c="dimmed">
              ✅ Minimum clear space: equal to the icon height on all sides.
            </Text>
          </Box>
          <Box>
            <Text size="sm" c="dimmed">
              ❌ Do not use gradients or custom colors on the logo.
            </Text>
            <Text size="sm" c="dimmed">
              ❌ Do not stretch, rotate, or add effects.
            </Text>
            <Text size="sm" c="dimmed">
              ❌ Do not place on busy backgrounds without a container.
            </Text>
            <Text size="sm" c="dimmed">
              ❌ Do not use the wordmark alone at sizes above 48px.
            </Text>
          </Box>
        </SimpleGrid>
      </Stack>
    </Stack>);

}
function LogoCard({
  label,
  description,
  src,
  width,
  color,
  bg







}: {label: string;description: string;src: string;width: number;color: string;bg: string;}) {
  return (
    <Stack gap="sm">
      <Paper
        p="xl"
        radius="md"
        style={{
          border: '1px dashed var(--mantine-color-default-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 140,
          backgroundColor: bg,
          color: color
        }}>
        
        <img
          src={src}
          alt={label}
          style={{
            height: 72,
            width: width,
            objectFit: 'contain',
            filter:
            color === '#FFFFFF' ?
            'brightness(0) saturate(100%) invert(1)' :
            color === '#12B886' ?
            'brightness(0) saturate(100%) invert(65%) sepia(51%) saturate(552%) hue-rotate(118deg) brightness(92%) contrast(87%)' :
            'brightness(0) saturate(100%)'
          }} />
        
      </Paper>
      <Group gap="xs" align="center">
        <Box
          w={12}
          h={12}
          style={{
            borderRadius: 2,
            backgroundColor: color,
            border: '1px solid var(--mantine-color-default-border)'
          }} />
        
        <Text
          size="xs"
          c="dimmed"
          style={{
            fontFamily: 'monospace'
          }}>
          
          {color}
        </Text>
      </Group>
      <Box>
        <Text fw={500} size="sm">
          {label}
        </Text>
        <Text size="xs" c="dimmed">
          {description}
        </Text>
      </Box>
    </Stack>);

}