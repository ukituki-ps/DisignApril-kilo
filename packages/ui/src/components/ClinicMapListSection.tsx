import { useState } from 'react';
import { Box, Grid, GridCol, Stack, Text } from '@mantine/core';
import { ClinicMapList, ClinicItem } from './ClinicMapList';

const showClinics: ClinicItem[] = [
  {
    id: 'sm1',
    name: 'Поликлиника №1',
    address: 'ул. Пушкина, 10',
    schedule: 'Пн–Пт 8:00–20:00',
    lat: 55.7558,
    lng: 37.6173,
  },
  {
    id: 'sm2',
    name: 'МедЦентр Здоровье',
    address: 'пр. Мира, 25',
    lat: 55.7522,
    lng: 37.6156,
  },
  {
    id: 'sm3',
    name: 'Стоматология Улыбка',
    address: 'ул. Гагарина, 8',
    schedule: 'Ежедневно 9:00–21:00',
    lat: 55.758,
    lng: 37.62,
  },
  {
    id: 'sm4',
    name: 'Клиника Семейная',
    address: 'ул. Советская, 42',
    schedule: 'Пн–Сб 7:30–19:00',
    lat: 55.76,
    lng: 37.625,
  },
];

const OSM_EMBED_URL =
  'https://www.openstreetmap.org/export/embed.html?bbox=37.6%2C55.75%2C37.63%2C55.76&layer=mapnik';

export function ClinicMapListSection() {
  const [selectedClinic, setSelectedClinic] = useState<ClinicItem | null>(null);

  return (
    <Stack gap="xl">
      {/* С картой и списком */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Карта + список клиник
        </Text>
        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            overflow: 'hidden',
            padding: 'var(--mantine-spacing-md)',
          }}
        >
          <ClinicMapList
            clinics={showClinics}
            mapUrl={OSM_EMBED_URL}
            onClinicClick={setSelectedClinic}
          />
          {selectedClinic ? (
            <Text size="xs" c="dimmed" mt="sm">
              Выбрана: {selectedClinic.name}
            </Text>
          ) : null}
        </Box>
      </Stack>

      {/* Только список */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Только список (без карты)
        </Text>
        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            overflow: 'hidden',
            padding: 'var(--mantine-spacing-md)',
          }}
        >
          <ClinicMapList clinics={showClinics} />
        </Box>
      </Stack>

      {/* Две колонки демо */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Разная высота карты
        </Text>
        <Grid grow>
          <GridCol span={{ base: 12, md: 6 }}>
            <ClinicMapList
              clinics={showClinics.slice(0, 2)}
              mapUrl={OSM_EMBED_URL}
              mapHeight="160px"
            />
          </GridCol>
          <GridCol span={{ base: 12, md: 6 }}>
            <ClinicMapList
              clinics={showClinics.slice(2)}
              mapUrl={OSM_EMBED_URL}
              mapHeight="280px"
            />
          </GridCol>
        </Grid>
      </Stack>

      {/* Empty state */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Пустое состояние
        </Text>
        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            overflow: 'hidden',
            padding: 'var(--mantine-spacing-md)',
          }}
        >
          <ClinicMapList clinics={[]} />
        </Box>
      </Stack>
    </Stack>
  );
}
