import { Stack, Text, SimpleGrid, Paper, Group, Button, ActionIcon, Tooltip, Code } from '@mantine/core';
import { useDensity } from '../DensityContext';
import { AprilIcon } from '../icons/AprilIcon';
import { aprilIconShowcaseGroups } from '../icons/aprilIconShowcaseGroups';
import { AprilIconSettings, AprilIconPlus } from '../icons/aprilUiIcons';

export function IconsSection() {
  const { density } = useDensity();

  return (
    <Stack gap="xl">
      <Stack gap="xs">
        <Text size="sm" c="dimmed">
          Курируемые символы импортируйте из <Code>@april/ui</Code> (префикс <Code>AprilIcon*</Code>). Компонент{' '}
          <Code>AprilIcon</Code> задаёт размеры <Code>xs | sm | md | lg</Code> и по умолчанию помечает иконку как
          декоративную (<Code>aria-hidden</Code>); для кнопок только с иконкой задайте <Code>aria-label</Code> на
          кнопке или осмысленный <Code>aria-label</Code> на <Code>AprilIcon</Code>.
        </Text>
        <Text size="sm" c="dimmed">
          Текущая плотность витрины: <strong>{density}</strong> — ниже примеры с <Code>Button</Code> и{' '}
          <Code>ActionIcon</Code> согласованы с контролами Mantine.
        </Text>
      </Stack>

      <Stack gap="md">
        <Text fw={500} size="sm">
          С кнопками (декоративная иконка слева)
        </Text>
        <Group>
          <Button leftSection={<AprilIcon icon={AprilIconPlus} size="sm" />} variant="filled">
            Создать
          </Button>
          <Tooltip label="Настройки">
            <ActionIcon variant="default" aria-label="Настройки раздела" size="lg">
              <AprilIcon icon={AprilIconSettings} size="md" />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Stack>

      {aprilIconShowcaseGroups.map((group) => (
        <Stack key={group.label} gap="sm">
          <Text fw={600} size="sm">
            {group.label}
          </Text>
          <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="sm">
            {group.items.map((item) => (
              <Paper key={item.exportName} withBorder p="sm" radius="md">
                <Stack gap={6} align="center">
                  <AprilIcon icon={item.component} size="md" />
                  <Code fz="xs" style={{ wordBreak: 'break-all', textAlign: 'center' }}>
                    {item.exportName}
                  </Code>
                  <Text size="xs" c="dimmed" ta="center" lineClamp={2}>
                    {item.hint}
                  </Text>
                </Stack>
              </Paper>
            ))}
          </SimpleGrid>
        </Stack>
      ))}
    </Stack>
  );
}
