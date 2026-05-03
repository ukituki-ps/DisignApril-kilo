import { useState } from 'react';
import { Stack, Group, Button, Text, TextInput, Notification, Box } from '@mantine/core';
import { TrashIcon, RotateCcwIcon } from 'lucide-react';
import { AprilIconTrash, AprilIconWarning } from '../icons';
import { useDensity } from '../DensityContext';
import { AprilModal } from './AprilModal';
export function SafetyPatterns() {
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [showUndo, setShowUndo] = useState(false);
  const { density } = useDensity();
  const isCompact = density === 'compact';
  const size = isCompact ? 'xs' : 'sm';
  const projectName = 'Альфа';
  const handleDelete = () => {
    setDeleteModalOpened(false);
    setConfirmText('');
    setShowUndo(true);
    setTimeout(() => {
      setShowUndo(false);
    }, 5000);
  };
  return (
    <Stack gap="xl">
      <Box>
        <Text fw={500} mb="xs">
          Опасные действия
        </Text>
        <Text size="sm" c="dimmed" mb="md">
          Для критичных операций (удаление проекта, пользователя) требуйте явное подтверждение — например, ввод имени
          объекта.
        </Text>

        <Button color="red" leftSection={<TrashIcon size={16} />} onClick={() => setDeleteModalOpened(true)}>
          Удалить проект «{projectName}»
        </Button>
      </Box>

      {showUndo ? (
        <Box>
          <Text fw={500} mb="xs">
            Отмена действия
          </Text>
          <Text size="sm" c="dimmed" mb="md">
            После разрушительного действия дайте короткое окно, чтобы пользователь мог отменить его.
          </Text>

          <Notification
            icon={<TrashIcon size={18} />}
            color="gray"
            title="Проект удалён"
            onClose={() => setShowUndo(false)}
            style={{ maxWidth: 400 }}
          >
            <Group justify="space-between" mt="xs">
              <Text size="sm">Проект «{projectName}» перемещён в корзину.</Text>
              <Button variant="subtle" size="xs" leftSection={<RotateCcwIcon size={14} />} onClick={() => setShowUndo(false)}>
                Отменить
              </Button>
            </Group>
          </Notification>
        </Box>
      ) : null}

      <AprilModal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        headerTitle={
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontWeight: 600,
              color: 'var(--mantine-color-red-filled)',
            }}
          >
            <AprilIconWarning size={20} aria-hidden />
            Удаление проекта
          </span>
        }
        headerActions={
          <>
            <Button variant="default" onClick={() => setDeleteModalOpened(false)} size={size}>
              Отмена
            </Button>
            <Button
              color="red"
              disabled={confirmText !== projectName}
              onClick={handleDelete}
              size={size}
              leftSection={<AprilIconTrash size={16} aria-hidden />}
            >
              Удалить
            </Button>
          </>
        }
        centered
      >
        <Stack gap="md">
          <Text size="sm">
            Вы собираетесь удалить проект <strong>«{projectName}»</strong>. Это действие нельзя отменить: будут удалены
            связанные задачи, документы и данные.
          </Text>

          <TextInput
            label="Введите имя проекта для подтверждения"
            placeholder={projectName}
            value={confirmText}
            onChange={(e) => setConfirmText(e.currentTarget.value)}
            size={size}
          />
        </Stack>
      </AprilModal>
    </Stack>
  );
}
