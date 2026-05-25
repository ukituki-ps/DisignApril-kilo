import { Box, SimpleGrid, Stack, Text } from '@mantine/core';
import { PolicyCard } from './PolicyCard';

export function PolicyCardSection() {
  return (
    <Stack gap="xl">
      {/* Полис ДМС — прототип модалки льготы */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Полис ДМС (как в прототипе модалки льготы)
        </Text>
        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            overflow: 'hidden',
            padding: 'var(--mantine-spacing-md)',
          }}
        >
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
            <PolicyCard
              type="ДМС"
              policyNumber="АЛФ-12345678"
              fields={[
                { label: 'Застрахованный', value: 'Иванов И. И.' },
                { label: 'Действует до', value: '31.12.2026' },
                { label: 'Программа', value: 'Базовая' },
              ]}
              gradient="teal"
              showActions
              onDownload={() => alert('Download')}
              onShare={() => alert('Share')}
            />
            <PolicyCard
              type="ДМС — Расширенная"
              policyNumber="АЛФ-87654321"
              fields={[
                { label: 'Застрахованный', value: 'Петрова А. С.' },
                { label: 'Действует до', value: '15.03.2027' },
                { label: 'Программа', value: 'Премиум' },
              ]}
              gradient="green"
              showActions
              onDownload={() => alert('Download')}
              onShare={() => alert('Share')}
              description={<Text size="xs" c="white" style={{ opacity: 0.8 }}>Расширенная программа: стоматология, офтальмология, вызов врача на дом</Text>}
            />
          </SimpleGrid>
        </Box>
      </Stack>

      {/* Без кнопок действий */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Без кнопок действий (showActions = false)
        </Text>
        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            overflow: 'hidden',
            padding: 'var(--mantine-spacing-md)',
          }}
        >
          <PolicyCard
            type="ДМС Семья"
            policyNumber="АЛФ-11112222"
            fields={[
              { label: 'Застрахованный', value: 'Сидоров В. К.' },
              { label: 'Действует до', value: '01.07.2026' },
              { label: 'Программа', value: 'Семья' },
            ]}
            gradient="teal"
            showActions={false}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
