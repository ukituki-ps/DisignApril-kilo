import React, { useState } from 'react';
import {
  Modal,
  Button,
  TextInput,
  Textarea,
  Group,
  Stack,
  Select } from
'@mantine/core';
import { useDensity } from '../DensityContext';
export function ModalSection() {
  const [opened, setOpened] = useState(false);
  const { density } = useDensity();
  const isCompact = density === 'compact';
  const size = isCompact ? 'xs' : 'sm';
  return (
    <>
      <Button onClick={() => setOpened(true)}>Open Sample Modal</Button>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create New Project"
        size="md"
        centered>
        
        <Stack gap="md">
          <TextInput
            label="Project Name"
            placeholder="e.g. Q4 Marketing Campaign"
            required
            size={size} />
          

          <Select
            label="Department"
            placeholder="Select department"
            data={['Marketing', 'Engineering', 'HR', 'Sales', 'Design']}
            size={size} />
          

          <Textarea
            label="Description"
            placeholder="Briefly describe the project goals..."
            minRows={3}
            size={size} />
          

          <Group justify="flex-end" mt="md">
            <Button
              variant="default"
              onClick={() => setOpened(false)}
              size={size}>
              
              Cancel
            </Button>
            <Button onClick={() => setOpened(false)} size={size}>
              Create Project
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>);

}