import type { ReactNode } from 'react';
import { Stack, Title, Text, Group, Box, Divider } from '@mantine/core';
export function TypographySection() {
  const renderRow = (label: string, element: ReactNode, details: string) => (
    <Group align="center" wrap="nowrap" py="sm">
      <Box w={120}>
        <Text size="sm" c="dimmed" fw={500}>
          {label}
        </Text>
      </Box>
      <Box style={{ flex: 1 }}>{element}</Box>
      <Box w={100} ta="right">
        <Text size="xs" c="dimmed">
          {details}
        </Text>
      </Box>
    </Group>
  );

  return (
    <Stack gap={0}>
      {renderRow('H1', <Title order={1}>Заголовок страницы</Title>, '24px / 700')}
      <Divider />
      {renderRow('H2', <Title order={2}>Заголовок раздела</Title>, '18px / 600')}
      <Divider />
      {renderRow('H3', <Title order={3}>Подзаголовок</Title>, '16px / 600')}
      <Divider />
      {renderRow(
        'Основной',
        <Text size="sm">
          Съешь ещё этих мягких французских булок, да выпей чаю. Стандартный абзац и основной текст интерфейса.
        </Text>,
        '14px / 400'
      )}
      <Divider />
      {renderRow(
        'Плотный',
        <Text size="xs">
          Съешь ещё этих мягких французских булок, да выпей чаю. Используется в таблицах и компактном режиме.
        </Text>,
        '13px / 400'
      )}
      <Divider />
      {renderRow(
        'Подпись',
        <Text size="xs" c="dimmed">
          Подсказки, время, второстепенная информация.
        </Text>,
        '12px / 400'
      )}
      <Divider />
      {renderRow(
        'Метка',
        <Text size="xs" fw={500}>
          МЕТКА ПОЛЯ ФОРМЫ
        </Text>,
        '12px / 500'
      )}
    </Stack>
  );
}
