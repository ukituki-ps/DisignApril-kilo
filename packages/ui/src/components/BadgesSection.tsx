import { Stack, Group, Badge, Text } from '@mantine/core';
export function BadgesSection() {
  return (
    <Stack gap="xl">
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Варианты
        </Text>
        <Group>
          <Badge variant="filled">Заполненный</Badge>
          <Badge variant="light">Светлый</Badge>
          <Badge variant="outline">Контур</Badge>
          <Badge variant="dot">Точка</Badge>
          <Badge variant="transparent">Прозрачный</Badge>
        </Group>
      </Stack>

      <Stack gap="sm">
        <Text fw={500} size="sm">
          Семантические цвета
        </Text>
        <Group>
          <Badge color="teal">Активен</Badge>
          <Badge color="blue">В работе</Badge>
          <Badge color="orange">Предупреждение</Badge>
          <Badge color="red">Ошибка</Badge>
          <Badge color="gray">В архиве</Badge>
        </Group>
      </Stack>

      <Stack gap="sm">
        <Text fw={500} size="sm">
          Размеры
        </Text>
        <Group align="center">
          <Badge size="xs">Очень маленький</Badge>
          <Badge size="sm">Маленький</Badge>
          <Badge size="md">Средний</Badge>
          <Badge size="lg">Большой</Badge>
          <Badge size="xl">Очень большой</Badge>
        </Group>
      </Stack>
    </Stack>
  );
}
