import { SimpleGrid, Box, Text, Stack } from '@mantine/core';
export function ColorPalette() {
  const renderSwatch = (color: string, name: string, hex: string) => (
    <Stack gap="xs">
      <Box
        w="100%"
        h={80}
        style={{
          backgroundColor: color,
          borderRadius: 'var(--mantine-radius-md)',
          border: '1px solid var(--mantine-color-default-border)',
        }}
      />
      <Box>
        <Text size="sm" fw={500}>
          {name}
        </Text>
        <Text size="xs" c="dimmed" style={{ textTransform: 'uppercase' }}>
          {hex}
        </Text>
      </Box>
    </Stack>
  );

  return (
    <Stack gap="xl">
      <Box>
        <Text fw={600} mb="md">
          Акцент бренда (бирюза)
        </Text>
        <SimpleGrid cols={{ base: 2, sm: 5 }} spacing="md">
          {renderSwatch('var(--mantine-color-teal-1)', 'Бирюза 1', '#C3FAE8')}
          {renderSwatch('var(--mantine-color-teal-3)', 'Бирюза 3', '#63E6BE')}
          {renderSwatch('var(--mantine-color-teal-6)', 'Бирюза 6 (основной)', '#12B886')}
          {renderSwatch('var(--mantine-color-teal-8)', 'Бирюза 8', '#0CA678')}
          {renderSwatch('var(--mantine-color-teal-9)', 'Бирюза 9', '#099268')}
        </SimpleGrid>
      </Box>

      <Box>
        <Text fw={600} mb="md">
          Семантические цвета
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
          {renderSwatch('var(--mantine-color-red-6)', 'Опасность', '#FA5252')}
          {renderSwatch('var(--mantine-color-orange-6)', 'Предупреждение', '#FD7E14')}
          {renderSwatch('var(--mantine-color-green-6)', 'Успех', '#40C057')}
        </SimpleGrid>
      </Box>

      <Box>
        <Text fw={600} mb="md">
          Нейтральные (светлая тема)
        </Text>
        <SimpleGrid cols={{ base: 2, sm: 5 }} spacing="md">
          {renderSwatch('var(--mantine-color-gray-0)', 'Фон', '#F8F9FA')}
          {renderSwatch('#FFFFFF', 'Поверхность', '#FFFFFF')}
          {renderSwatch('var(--mantine-color-gray-3)', 'Граница', '#DEE2E6')}
          {renderSwatch('var(--mantine-color-gray-6)', 'Вторичный текст', '#868E96')}
          {renderSwatch('var(--mantine-color-gray-9)', 'Основной текст', '#212529')}
        </SimpleGrid>
      </Box>

      <Box>
        <Text fw={600} mb="md">
          Нейтральные (тёмная тема)
        </Text>
        <SimpleGrid cols={{ base: 2, sm: 5 }} spacing="md">
          {renderSwatch('var(--mantine-color-dark-7)', 'Фон', '#1A1B1E')}
          {renderSwatch('var(--mantine-color-dark-5)', 'Поверхность', '#2C2E33')}
          {renderSwatch('var(--mantine-color-dark-4)', 'Граница', '#373A40')}
          {renderSwatch('var(--mantine-color-dark-2)', 'Вторичный текст', '#909296')}
          {renderSwatch('var(--mantine-color-dark-0)', 'Основной текст', '#C1C2C5')}
        </SimpleGrid>
      </Box>
    </Stack>
  );
}
