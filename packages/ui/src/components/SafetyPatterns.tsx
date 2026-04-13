import React, { useState } from 'react';
import {
  Stack,
  Group,
  Button,
  Text,
  Modal,
  TextInput,
  Notification,
  Box } from
'@mantine/core';
import { TrashIcon, AlertTriangleIcon, RotateCcwIcon } from 'lucide-react';
import { useDensity } from '../DensityContext';
export function SafetyPatterns() {
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [showUndo, setShowUndo] = useState(false);
  const { density } = useDensity();
  const isCompact = density === 'compact';
  const size = isCompact ? 'xs' : 'sm';
  const handleDelete = () => {
    setDeleteModalOpened(false);
    setConfirmText('');
    setShowUndo(true);
    // Auto-hide undo toast after 5 seconds
    setTimeout(() => {
      setShowUndo(false);
    }, 5000);
  };
  return (
    <Stack gap="xl">
      <Box>
        <Text fw={500} mb="xs">
          Destructive Actions
        </Text>
        <Text size="sm" c="dimmed" mb="md">
          For critical operations like deleting a project or user, require
          explicit confirmation by typing the item name.
        </Text>

        <Button
          color="red"
          leftSection={<TrashIcon size={16} />}
          onClick={() => setDeleteModalOpened(true)}>
          
          Delete Project "Alpha"
        </Button>
      </Box>

      {showUndo &&
      <Box>
          <Text fw={500} mb="xs">
            Undo Pattern
          </Text>
          <Text size="sm" c="dimmed" mb="md">
            After a destructive action, provide a temporary window to undo the
            change.
          </Text>

          <Notification
          icon={<TrashIcon size={18} />}
          color="gray"
          title="Project deleted"
          onClose={() => setShowUndo(false)}
          style={{
            maxWidth: 400
          }}>
          
            <Group justify="space-between" mt="xs">
              <Text size="sm">Project "Alpha" has been moved to trash.</Text>
              <Button
              variant="subtle"
              size="xs"
              leftSection={<RotateCcwIcon size={14} />}
              onClick={() => setShowUndo(false)}>
              
                Undo
              </Button>
            </Group>
          </Notification>
        </Box>
      }

      <Modal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        title={
        <Group gap="xs" c="red">
            <AlertTriangleIcon size={20} />
            <Text fw={600}>Delete Project</Text>
          </Group>
        }
        centered>
        
        <Stack gap="md">
          <Text size="sm">
            You are about to delete the project <strong>"Alpha"</strong>. This
            action cannot be undone and will permanently delete all associated
            tasks, documents, and data.
          </Text>

          <TextInput
            label="Please type the project name to confirm"
            placeholder="Alpha"
            value={confirmText}
            onChange={(e) => setConfirmText(e.currentTarget.value)}
            size={size} />
          

          <Group justify="flex-end" mt="md">
            <Button
              variant="default"
              onClick={() => setDeleteModalOpened(false)}
              size={size}>
              
              Cancel
            </Button>
            <Button
              color="red"
              disabled={confirmText !== 'Alpha'}
              onClick={handleDelete}
              size={size}>
              
              Delete Permanently
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>);

}