import { Stack, Alert, Notification, SimpleGrid, Text } from '@mantine/core';
import { InfoIcon, CheckCircleIcon, AlertTriangleIcon, XCircleIcon } from 'lucide-react';
export function AlertsSection() {
  return (
    <Stack gap="xl">
      <Stack gap="md">
        <Text fw={500} size="sm">
          Алерты (сообщения на странице)
        </Text>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <Alert variant="light" color="blue" title="Информация" icon={<InfoIcon size={16} />}>
            Информационное сообщение. Используйте для общих сведений и подсказок.
          </Alert>

          <Alert variant="light" color="teal" title="Успех" icon={<CheckCircleIcon size={16} />}>
            Изменения успешно сохранены.
          </Alert>

          <Alert variant="light" color="orange" title="Предупреждение" icon={<AlertTriangleIcon size={16} />}>
            Подписка истекает через 3 дня. Продлите её, чтобы избежать перерыва в работе.
          </Alert>

          <Alert variant="light" color="red" title="Ошибка" icon={<XCircleIcon size={16} />}>
            Не удалось подключиться к серверу. Проверьте подключение к сети и попробуйте снова.
          </Alert>
        </SimpleGrid>
      </Stack>

      <Stack gap="md">
        <Text fw={500} size="sm">
          Уведомления (как тосты)
        </Text>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <Notification title="Задача выполнена" color="teal" icon={<CheckCircleIcon size={18} />}>
            Формирование отчёта успешно завершено.
          </Notification>

          <Notification title="Ошибка загрузки" color="red" icon={<XCircleIcon size={18} />}>
            Файл «Q3_Financials.pdf» превышает максимальный размер 10 МБ.
          </Notification>
        </SimpleGrid>
      </Stack>
    </Stack>
  );
}
