import { Coins, Clock, Sparkles } from 'lucide-react';
import { Box, Stack, Text } from '@mantine/core';
import { EventsFeed } from './EventsFeed';

export function EventsFeedSection() {
  const events = [
    {
      id: 'e1',
      variant: 'success' as const,
      icon: <Coins size={14} aria-hidden />,
      text: 'Начислено <b>500 баллов</b> за прохождение опроса',
      time: 'Сегодня, 10:24',
    },
    {
      id: 'e2',
      variant: 'warning' as const,
      icon: <Clock size={14} aria-hidden />,
      text: 'Льгота «Психолог онлайн» ожидает подтверждения HR',
      time: 'Вчера, 15:00',
    },
    {
      id: 'e3',
      variant: 'info' as const,
      icon: <Sparkles size={14} aria-hidden />,
      text: 'Новые льготы в каталоге: <b>Стоматология</b>, <b>ДМС Семья</b>',
      time: '12 мая',
    },
  ];

  return (
    <Stack gap="xl">
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Лента событий (как в прототипе Dashboard)
        </Text>
        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            overflow: 'hidden',
          }}
        >
          <EventsFeed
            events={events}
            onEventClick={(ev) => alert(`Событие: ${ev.id}`)}
          />
        </Box>
      </Stack>

      <Stack gap="sm">
        <Text fw={500} size="sm">
          С maxItems=2
        </Text>
        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            overflow: 'hidden',
          }}
        >
          <EventsFeed events={events} maxItems={2} />
        </Box>
      </Stack>

      <Stack gap="sm">
        <Text fw={500} size="sm">
          Пустое состояние
        </Text>
        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            overflow: 'hidden',
          }}
        >
          <EventsFeed events={[]} />
        </Box>
      </Stack>
    </Stack>
  );
}
