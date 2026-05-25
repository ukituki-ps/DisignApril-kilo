import { Group, Stack, Text } from '@mantine/core';
import { Gem } from 'lucide-react';
import { BalancePill } from './BalancePill';

export function BalancePillSection() {
  return (
    <Stack gap="xl">
      {/* Базовый: с value + unit */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Базовый (с unit)
        </Text>
        <BalancePill value="1 250" unit="баллов" />
      </Stack>

      {/* Без unit */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Без unit
        </Text>
        <BalancePill value="1 250" />
      </Stack>

      {/* С onClick */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          С onClick (нажмите)
        </Text>
        <BalancePill
          value="3 400"
          unit="очков"
          onClick={() => alert('BalancePill clicked!')}
        />
      </Stack>

      {/* С кастомной иконкой */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          С кастомной иконкой
        </Text>
        <BalancePill
          value="500"
          unit="кредитов"
          icon={<Gem size={13} aria-hidden />}
        />
      </Stack>

      {/* Несколько в ряд (как в header) */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Несколько в ряд (header scenario)
        </Text>
        <Group gap="sm">
          <BalancePill value="1 250" unit="баллов" />
          <BalancePill
            value="3 400"
            unit="очков"
            onClick={() => alert('clicked')}
          />
          <BalancePill
            value="500"
            unit="кредитов"
            icon={<Gem size={13} aria-hidden />}
          />
        </Group>
      </Stack>
    </Stack>
  );
}
