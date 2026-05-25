import { Stack, Group, Text } from '@mantine/core';
import { StatusChip } from './StatusChip';

export function StatusChipSection() {
  return (
    <Stack gap="xl">
      {/* Все статусы в строке */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Статусы
        </Text>
        <Group gap="sm" wrap="nowrap">
          <StatusChip status="available" label="Доступен" />
          <StatusChip status="active" label="Активен" />
          <StatusChip status="expired" label="Истёк" />
          <StatusChip status="waiting" label="Ожидание" />
          <StatusChip status="error" label="Ошибка" />
          <StatusChip status="sync" label="Синхронизация" />
        </Group>
      </Stack>

      {/* Custom статусы */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Пользовательские цвета
        </Text>
        <Group gap="sm" wrap="nowrap">
          <StatusChip status="custom" label="Фиолетовый" color="violet" />
          <StatusChip status="custom" label="Лимон" color="yellow" />
          <StatusChip status="custom" label="Стандарт gray" />
        </Group>
      </Stack>

      {/* Dot variant */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Dot variant
        </Text>
        <Group gap="lg" align="center">
          <Group gap="xs" align="center">
            <StatusChip status="available" variant="dot" label="Доступен" />
            <Text size="sm">Доступен</Text>
          </Group>
          <Group gap="xs" align="center">
            <StatusChip status="active" variant="dot" label="Активен" />
            <Text size="sm">Активен</Text>
          </Group>
          <Group gap="xs" align="center">
            <StatusChip status="error" variant="dot" label="Ошибка" />
            <Text size="sm">Ошибка</Text>
          </Group>
          <Group gap="xs" align="center">
            <StatusChip status="sync" variant="dot" label="Синхронизация" />
            <Text size="sm">Синхронизация</Text>
          </Group>
        </Group>
      </Stack>

      {/* Pulse animation */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Пульсация
        </Text>
        <Group gap="sm" align="center" wrap="nowrap">
          <StatusChip status="sync" label="Синхр." pulse />
          <StatusChip status="active" label="Активен" pulse />
          <StatusChip status="sync" variant="dot" label="Синхр." pulse />
          <StatusChip status="error" variant="dot" label="Ошибка" pulse />
        </Group>
      </Stack>

      {/* Размеры */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Размеры
        </Text>
        <Group gap="sm" align="center" wrap="nowrap">
          <StatusChip status="active" size="xs" label="XS" />
          <StatusChip status="active" size="sm" label="SM" />
          <StatusChip status="active" size="md" label="MD" />
        </Group>
      </Stack>

      {/* Без label — показывается статус */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Без label (показывается значение status)
        </Text>
        <Group gap="sm" wrap="nowrap">
          <StatusChip status="available" />
          <StatusChip status="error" />
          <StatusChip status="sync" />
        </Group>
      </Stack>
    </Stack>
  );
}
