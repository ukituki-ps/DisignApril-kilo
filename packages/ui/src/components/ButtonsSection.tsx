import { Stack, Group, Button, Text, ActionIcon } from '@mantine/core';
import { SettingsIcon, PlusIcon, TrashIcon, SearchIcon } from 'lucide-react';
import { useDensity } from '../DensityContext';
export function ButtonsSection() {
  const { density } = useDensity();
  const isCompact = density === 'compact';
  const defaultSize = isCompact ? 'xs' : 'sm';
  return (
    <Stack gap="xl">
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Варианты
        </Text>
        <Group>
          <Button variant="filled" size={defaultSize}>
            Заполненная
          </Button>
          <Button variant="light" size={defaultSize}>
            Светлая
          </Button>
          <Button variant="outline" size={defaultSize}>
            Контур
          </Button>
          <Button variant="subtle" size={defaultSize}>
            Тонкая
          </Button>
          <Button variant="default" size={defaultSize}>
            По умолчанию
          </Button>
        </Group>
      </Stack>

      <Stack gap="sm">
        <Text fw={500} size="sm">
          Состояния
        </Text>
        <Group>
          <Button size={defaultSize}>Обычная</Button>
          <Button size={defaultSize} disabled>
            Отключена
          </Button>
          <Button size={defaultSize} loading>
            Загрузка
          </Button>
          <Button size={defaultSize} color="red">
            Опасное действие
          </Button>
        </Group>
      </Stack>

      <Stack gap="sm">
        <Text fw={500} size="sm">
          С иконками
        </Text>
        <Group>
          <Button size={defaultSize} leftSection={<PlusIcon size={16} />}>
            Добавить задачу
          </Button>
          <Button size={defaultSize} variant="default" rightSection={<SettingsIcon size={16} />}>
            Настройки
          </Button>
          <Button size={defaultSize} variant="light" color="red" leftSection={<TrashIcon size={16} />}>
            Удалить
          </Button>
        </Group>
      </Stack>

      <Stack gap="sm">
        <Text fw={500} size="sm">
          Только иконка
        </Text>
        <Group>
          <ActionIcon size={isCompact ? 'md' : 'lg'} variant="filled" aria-label="Настройки">
            <SettingsIcon size={18} />
          </ActionIcon>
          <ActionIcon size={isCompact ? 'md' : 'lg'} variant="light" aria-label="Поиск">
            <SearchIcon size={18} />
          </ActionIcon>
          <ActionIcon size={isCompact ? 'md' : 'lg'} variant="default" aria-label="Добавить">
            <PlusIcon size={18} />
          </ActionIcon>
          <ActionIcon size={isCompact ? 'md' : 'lg'} variant="subtle" color="red" aria-label="Удалить">
            <TrashIcon size={18} />
          </ActionIcon>
        </Group>
      </Stack>

      <Stack gap="sm">
        <Text fw={500} size="sm">
          Размеры
        </Text>
        <Group align="center">
          <Button size="xs">Очень маленькая</Button>
          <Button size="sm">Маленькая</Button>
          <Button size="md">Средняя</Button>
          <Button size="lg">Большая</Button>
        </Group>
      </Stack>
    </Stack>
  );
}
