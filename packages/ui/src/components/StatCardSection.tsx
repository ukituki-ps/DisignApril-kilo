import { Box, Grid, GridCol, Stack, Text } from '@mantine/core';
import { Coins, Gift, Calendar } from 'lucide-react';
import { StatCard } from './StatCard';

export function StatCardSection() {
  return (
    <Stack gap="xl">
      {/* Basic: 3 карточки как в прототипе Dashboard */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Базовый (Dashboard прототип)
        </Text>
        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            overflow: 'hidden',
            padding: 'var(--mantine-spacing-md)',
          }}
        >
          <Grid grow>
            <GridCol span={{ base: 12, sm: 4 }}>
              <StatCard
                label="Баланс баллов"
                value="12 345"
                icon={<Coins size={13} aria-hidden />}
                hint="Накоплено за год"
                variant="accent"
              />
            </GridCol>
            <GridCol span={{ base: 12, sm: 4 }}>
              <StatCard
                label="Активных льгот"
                value="7"
                icon={<Gift size={13} aria-hidden />}
                hint="Из 12 подключено"
              />
            </GridCol>
            <GridCol span={{ base: 12, sm: 4 }}>
              <StatCard
                label="До конца периода"
                value="14 дн."
                icon={<Calendar size={13} aria-hidden />}
                hint="Сброс 14 июня"
              />
            </GridCol>
          </Grid>
        </Box>
      </Stack>

      {/* Icons-only variant */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Без иконок (минимальный)
        </Text>
        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            overflow: 'hidden',
            padding: 'var(--mantine-spacing-md)',
          }}
        >
          <Grid grow>
            <GridCol span={{ base: 12, sm: 4 }}>
              <StatCard label="Баланс баллов" value="12 345" />
            </GridCol>
            <GridCol span={{ base: 12, sm: 4 }}>
              <StatCard label="Активных льгот" value="7" />
            </GridCol>
            <GridCol span={{ base: 12, sm: 4 }}>
              <StatCard label="До конца периода" value="14 дн." />
            </GridCol>
          </Grid>
        </Box>
      </Stack>

      {/* Compact preview */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Compact density
        </Text>
        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            overflow: 'hidden',
            padding: 'var(--mantine-spacing-md)',
          }}
        >
          <Grid grow>
            <GridCol span={{ base: 12, sm: 4 }}>
              <StatCard
                label="Баланс баллов"
                value="12 345"
                icon={<Coins size={12} aria-hidden />}
                hint="Накоплено за год"
                variant="accent"
              />
            </GridCol>
            <GridCol span={{ base: 12, sm: 4 }}>
              <StatCard
                label="Активных льгот"
                value="7"
                icon={<Gift size={12} aria-hidden />}
                hint="Из 12 подключено"
              />
            </GridCol>
            <GridCol span={{ base: 12, sm: 4 }}>
              <StatCard
                label="До конца периода"
                value="14 дн."
                icon={<Calendar size={12} aria-hidden />}
                hint="Сброс 14 июня"
              />
            </GridCol>
          </Grid>
        </Box>
      </Stack>
    </Stack>
  );
}
