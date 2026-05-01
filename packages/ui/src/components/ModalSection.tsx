import { useState } from 'react';
import { Modal, Button, TextInput, Textarea, Group, Stack, Select } from '@mantine/core';
import { useDensity } from '../DensityContext';
export function ModalSection() {
  const [opened, setOpened] = useState(false);
  const { density } = useDensity();
  const isCompact = density === 'compact';
  const size = isCompact ? 'xs' : 'sm';
  return (
    <>
      <Button onClick={() => setOpened(true)}>Открыть пример модального окна</Button>

      <Modal opened={opened} onClose={() => setOpened(false)} title="Создать проект" size="md" centered>
        <Stack gap="md">
          <TextInput label="Название проекта" placeholder="Например, маркетинг Q4" required size={size} />

          <Select
            label="Отдел"
            placeholder="Выберите отдел"
            data={['Маркетинг', 'Инженерия', 'HR', 'Продажи', 'Дизайн']}
            size={size}
          />

          <Textarea label="Описание" placeholder="Кратко опишите цели проекта…" minRows={3} size={size} />

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={() => setOpened(false)} size={size}>
              Отмена
            </Button>
            <Button onClick={() => setOpened(false)} size={size}>
              Создать проект
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
