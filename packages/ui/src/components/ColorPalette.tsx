import { SimpleGrid, Box, Text, Stack } from '@mantine/core';
export function ColorPalette() {
  const renderSwatch = (color: string, name: string, hex: string) =>
  <Stack gap="xs">
      <Box
      w="100%"
      h={80}
      style={{
        backgroundColor: color,
        borderRadius: 'var(--mantine-radius-md)',
        border: '1px solid var(--mantine-color-default-border)'
      }} />
    
      <Box>
        <Text size="sm" fw={500}>
          {name}
        </Text>
        <Text
        size="xs"
        c="dimmed"
        style={{
          textTransform: 'uppercase'
        }}>
        
          {hex}
        </Text>
      </Box>
    </Stack>;

  return (
    <Stack gap="xl">
      <Box>
        <Text fw={600} mb="md">
          Brand Accent (Teal)
        </Text>
        <SimpleGrid
          cols={{
            base: 2,
            sm: 5
          }}
          spacing="md">
          
          {renderSwatch('var(--mantine-color-teal-1)', 'Teal 1', '#C3FAE8')}
          {renderSwatch('var(--mantine-color-teal-3)', 'Teal 3', '#63E6BE')}
          {renderSwatch(
            'var(--mantine-color-teal-6)',
            'Teal 6 (Primary)',
            '#12B886'
          )}
          {renderSwatch('var(--mantine-color-teal-8)', 'Teal 8', '#0CA678')}
          {renderSwatch('var(--mantine-color-teal-9)', 'Teal 9', '#099268')}
        </SimpleGrid>
      </Box>

      <Box>
        <Text fw={600} mb="md">
          Semantic Colors
        </Text>
        <SimpleGrid
          cols={{
            base: 1,
            sm: 3
          }}
          spacing="md">
          
          {renderSwatch('var(--mantine-color-red-6)', 'Danger', '#FA5252')}
          {renderSwatch('var(--mantine-color-orange-6)', 'Warning', '#FD7E14')}
          {renderSwatch('var(--mantine-color-green-6)', 'Success', '#40C057')}
        </SimpleGrid>
      </Box>

      <Box>
        <Text fw={600} mb="md">
          Neutrals (Light Theme Reference)
        </Text>
        <SimpleGrid
          cols={{
            base: 2,
            sm: 5
          }}
          spacing="md">
          
          {renderSwatch('var(--mantine-color-gray-0)', 'Background', '#F8F9FA')}
          {renderSwatch('#FFFFFF', 'Surface', '#FFFFFF')}
          {renderSwatch('var(--mantine-color-gray-3)', 'Border', '#DEE2E6')}
          {renderSwatch(
            'var(--mantine-color-gray-6)',
            'Text Secondary',
            '#868E96'
          )}
          {renderSwatch(
            'var(--mantine-color-gray-9)',
            'Text Primary',
            '#212529'
          )}
        </SimpleGrid>
      </Box>

      <Box>
        <Text fw={600} mb="md">
          Neutrals (Dark Theme Reference)
        </Text>
        <SimpleGrid
          cols={{
            base: 2,
            sm: 5
          }}
          spacing="md">
          
          {renderSwatch('var(--mantine-color-dark-7)', 'Background', '#1A1B1E')}
          {renderSwatch('var(--mantine-color-dark-5)', 'Surface', '#2C2E33')}
          {renderSwatch('var(--mantine-color-dark-4)', 'Border', '#373A40')}
          {renderSwatch(
            'var(--mantine-color-dark-2)',
            'Text Secondary',
            '#909296'
          )}
          {renderSwatch(
            'var(--mantine-color-dark-0)',
            'Text Primary',
            '#C1C2C5'
          )}
        </SimpleGrid>
      </Box>
    </Stack>);

}