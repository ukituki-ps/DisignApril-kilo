import { useState } from 'react';
import { Button, TextInput, Textarea, Stack, Select, Text } from '@mantine/core';
import { AprilIconCheck } from '../icons';
import { useDensity } from '../DensityContext';
import { AprilModal } from './AprilModal';

export function ModalSection() {
  const [opened, setOpened] = useState(false);
  const { density } = useDensity();
  const isCompact = density === 'compact';
  const size = isCompact ? 'xs' : 'sm';
  return (
    <>
      <Button onClick={() => setOpened(true)}>Открыть пример модального окна</Button>

      <AprilModal
        opened={opened}
        onClose={() => setOpened(false)}
        headerTitle="Создать проект"
        headerActions={
          <>
            <Button variant="default" onClick={() => setOpened(false)} size={size}>
              Отмена
            </Button>
            <Button onClick={() => setOpened(false)} size={size} leftSection={<AprilIconCheck size={16} aria-hidden />}>
              Создать проект
            </Button>
          </>
        }
        size="md"
        centered
      >
        <Stack gap="md">
          <TextInput label="Название проекта" placeholder="Например, маркетинг Q4" required size={size} />

          <Select
            label="Отдел"
            placeholder="Выберите отдел"
            data={['Маркетинг', 'Инженерия', 'HR', 'Продажи', 'Дизайн']}
            size={size}
          />

          <Textarea label="Описание" placeholder="Кратко опишите цели проекта…" minRows={3} size={size} />

          <Text size="sm" c="dimmed">
            Ниже — дополнительный текст, чтобы продемонстрировать прокрутку тела модалки при зафиксированной шапке с
            действиями.
          </Text>
          {Array.from({ length: 10 }, (_, i) => (
            <Text key={i} size="sm">
              Пункт {i + 1}: цели, сроки, заинтересованные стороны и критерии успеха фиксируются в карточке проекта.
            </Text>
          ))}
        </Stack>
      </AprilModal>
    </>
  );
}
