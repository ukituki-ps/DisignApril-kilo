import type { ReactNode } from 'react';
import { Stack, Title, Text, Group, Box, Divider } from '@mantine/core';
export function TypographySection() {
  const renderRow = (
  label: string,
  element: ReactNode,
  details: string) =>

  <Group align="center" wrap="nowrap" py="sm">
      <Box w={120}>
        <Text size="sm" c="dimmed" fw={500}>
          {label}
        </Text>
      </Box>
      <Box
      style={{
        flex: 1
      }}>
      
        {element}
      </Box>
      <Box w={100} ta="right">
        <Text size="xs" c="dimmed">
          {details}
        </Text>
      </Box>
    </Group>;

  return (
    <Stack gap={0}>
      {renderRow('H1', <Title order={1}>Page Title</Title>, '24px / 700')}
      <Divider />
      {renderRow('H2', <Title order={2}>Section Heading</Title>, '18px / 600')}
      <Divider />
      {renderRow(
        'H3',
        <Title order={3}>Subsection Heading</Title>,
        '16px / 600'
      )}
      <Divider />
      {renderRow(
        'Body',
        <Text size="sm">
          The quick brown fox jumps over the lazy dog. Used for standard
          paragraph text and general content.
        </Text>,
        '14px / 400'
      )}
      <Divider />
      {renderRow(
        'Body Compact',
        <Text size="xs">
          The quick brown fox jumps over the lazy dog. Used for dense data
          tables and compact UI modes.
        </Text>,
        '13px / 400'
      )}
      <Divider />
      {renderRow(
        'Caption',
        <Text size="xs" c="dimmed">
          Helper text, timestamps, and secondary information.
        </Text>,
        '12px / 400'
      )}
      <Divider />
      {renderRow(
        'Label',
        <Text size="xs" fw={500}>
          FORM INPUT LABEL
        </Text>,
        '12px / 500'
      )}
    </Stack>);

}