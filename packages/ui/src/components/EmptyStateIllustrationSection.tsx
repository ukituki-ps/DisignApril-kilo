import { Stack, Group, Text, Button } from '@mantine/core';
import { Inbox, Package, Award, UserX } from 'lucide-react';
import { EmptyStateIllustration } from './EmptyStateIllustration';

export function EmptyStateIllustrationSection() {
  return (
    <Stack gap="xl">
      {/* Basic: title + description + button */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Базовое состояние
        </Text>
        <EmptyStateIllustration
          title="У вас пока нет льгот"
          description="Подключите ДМС или фитнес-абонемент в каталоге, чтобы начать пользоваться преимуществами"
          icon={<Inbox size={28} />}
          actionButton={
            <Button variant="filled" color="teal" size="sm">
              Перейти в каталог
            </Button>
          }
        />
      </Stack>

      {/* No icon */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Без иконки
        </Text>
        <EmptyStateIllustration
          title="Нет доступных данных"
          description="Данные будут отображены после синхронизации с сервисом"
        />
      </Stack>

      {/* Left aligned */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Выровнено влево
        </Text>
        <EmptyStateIllustration
          title="Список пуст"
          description="Добавьте первый элемент, чтобы увидеть его здесь"
          icon={<Package size={24} />}
          align="left"
          actionButton={
            <Button variant="light" color="teal" size="sm">
              Добавить элемент
            </Button>
          }
        />
      </Stack>

      {/* Catalog context: разные сценарии */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Сценарии каталога
        </Text>
        <Group gap="md" wrap="wrap">
          <EmptyStateIllustration
            title="Нет льгот"
            description="Подключите ДМС или фитнес-абонемент"
            icon={<Inbox size={20} />}
            iconSize="sm"
            padding="lg"
            actionButton={
              <Button variant="subtle" color="teal" size="xs">
                Каталог
              </Button>
            }
          />
          <EmptyStateIllustration
            title="Нет наград"
            description="Выполняйте действия для получения наград"
            icon={<Award size={20} />}
            iconSize="sm"
            padding="lg"
          />
          <EmptyStateIllustration
            title="Онбординг не пройден"
            description="Завершите настройки для доступа ко всем функциям"
            icon={<UserX size={20} />}
            iconSize="sm"
            padding="lg"
            actionButton={
              <Button variant="subtle" color="teal" size="xs">
                Начать онбординг
              </Button>
            }
          />
        </Group>
      </Stack>

      {/* Icon sizes */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Размеры иконки
        </Text>
        <Group gap="md" wrap="wrap">
          <EmptyStateIllustration
            title="SM"
            icon={<Inbox size={16} />}
            iconSize="sm"
            padding="md"
          />
          <EmptyStateIllustration
            title="MD"
            icon={<Inbox size={20} />}
            iconSize="md"
            padding="md"
          />
          <EmptyStateIllustration
            title="LG"
            icon={<Inbox size={24} />}
            iconSize="lg"
            padding="md"
          />
        </Group>
      </Stack>
    </Stack>
  );
}
