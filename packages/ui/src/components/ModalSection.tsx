import { useState } from 'react';
import { ActionIcon, Button, TextInput, Textarea, Stack, Select, Text } from '@mantine/core';
import { AprilIconCheck, AprilIconClose } from '../icons';
import { useDensity } from '../DensityContext';
import { AprilModal } from './AprilModal';

export function ModalSection() {
  const [opened, setOpened] = useState(false);
  const { density } = useDensity();
  const isCompact = density === 'compact';
  const size = isCompact ? 'xs' : 'sm';
  const actionIconSize = isCompact ? 'md' : 'lg';
  return (
    <>
      <Button onClick={() => setOpened(true)}>Открыть пример модального окна</Button>

      <AprilModal
        opened={opened}
        onClose={() => setOpened(false)}
        headerTitle="Создать проект"
        headerActions={
          <>
            <ActionIcon
              variant="default"
              size={actionIconSize}
              onClick={() => setOpened(false)}
              aria-label="Отменить создание проекта"
              title="Отмена"
            >
              <AprilIconClose size={18} aria-hidden />
            </ActionIcon>
            <ActionIcon
              variant="filled"
              color="teal"
              size={actionIconSize}
              onClick={() => setOpened(false)}
              aria-label="Создать проект"
              title="Создать проект"
            >
              <AprilIconCheck size={18} aria-hidden />
            </ActionIcon>
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
