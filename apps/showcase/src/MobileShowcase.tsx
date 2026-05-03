import { useState, type ReactNode } from 'react';
import {
  ActionIcon,
  Box,
  Button,
  Group,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import {
  AprilGradientSegmentedControl,
  AprilMobileBottomSheet,
  AprilMobileShellBar,
  AprilIconChevronLeft,
  AprilIconClipboardList,
  AprilIconPlus,
  aprilMobileShellBarContentPaddingBottom,
} from '@ukituki-ps/april-ui';

type DeviceFrameProps = {
  width: number;
  height: number;
  label: string;
  children: ReactNode;
};

function DeviceFrame({ width, height, label, children }: DeviceFrameProps) {
  return (
    <Stack gap="xs" style={{ flexShrink: 0 }}>
      <Text size="sm" c="dimmed" ff="monospace">
        {label}
      </Text>
      <Box
        style={{
          width,
          height,
          borderRadius: 28,
          border: '2px solid light-dark(var(--mantine-color-gray-4), var(--mantine-color-dark-4))',
          boxShadow: 'var(--mantine-shadow-xl)',
          overflow: 'hidden',
          backgroundColor: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-7))',
        }}>
        {children}
      </Box>
    </Stack>
  );
}

/** Корневой экран: табы в центре панели + поиск (§8 Mobile). */
function DemoRootShell() {
  const [tab, setTab] = useState('inbox');

  return (
    <Box style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ScrollArea
        type="auto"
        style={{ flex: 1, minHeight: 0 }}
        styles={{
          viewport: { paddingBottom: aprilMobileShellBarContentPaddingBottom() },
        }}>
        <Stack p="md" gap="sm">
          <Title order={5}>Входящие</Title>
          {Array.from({ length: 24 }, (_, i) => (
            <Text key={i} size="sm">
              Строка списка {i + 1} — нижний отступ задан через{' '}
              <code style={{ fontSize: 11 }}>aprilMobileShellBarContentPaddingBottom()</code>
            </Text>
          ))}
        </Stack>
      </ScrollArea>
      <AprilMobileShellBar
        position="absolute"
        center={
          <Group wrap="nowrap" gap={6} align="center" style={{ width: '100%' }}>
            <Box style={{ flex: 1, minWidth: 0 }}>
              <AprilGradientSegmentedControl
                size="xs"
                fullWidth
                value={tab}
                onChange={setTab}
                data={[
                  { label: 'Входящие', value: 'inbox' },
                  { label: 'Сегодня', value: 'today' },
                  { label: 'Все', value: 'all' },
                ]}
              />
            </Box>
            <ActionIcon variant="light" color="teal" size="lg" aria-label="Добавить">
              <AprilIconPlus size={20} aria-hidden />
            </ActionIcon>
          </Group>
        }
      />
    </Box>
  );
}

/** Drill-down: «Назад», действия, поиск; нижний лист (`AprilMobileBottomSheet`) не перекрывает shell bar. */
function DemoDrillShell() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Box style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ScrollArea
        type="auto"
        style={{ flex: 1, minHeight: 0 }}
        styles={{
          viewport: { paddingBottom: aprilMobileShellBarContentPaddingBottom() },
        }}>
        <Stack p="md" gap="md">
          <Title order={5}>Карточка задачи</Title>
          <Text size="sm" c="dimmed">
            Нижний лист выезжает снизу; <strong>AprilMobileShellBar</strong> остаётся поверх затемнения и
            доступен (поиск, назад, действия). Для центрированных форм по-прежнему см.{' '}
            <code>AprilModal</code>.
          </Text>
          <Button variant="light" onClick={() => setSheetOpen(true)}>
            Открыть нижний лист
          </Button>
          {Array.from({ length: 12 }, (_, i) => (
            <Text key={i} size="sm">
              Дополнительный текст {i + 1}
            </Text>
          ))}
        </Stack>
      </ScrollArea>

      <AprilMobileShellBar
        position="absolute"
        leading={
          <ActionIcon size="lg" variant="subtle" color="gray" aria-label="Назад к списку">
            <AprilIconChevronLeft size={20} aria-hidden />
          </ActionIcon>
        }
        center={
          <Group gap="xs" justify="center" wrap="nowrap" style={{ width: '100%' }}>
            <ActionIcon size="lg" variant="default" aria-label="Список / фильтр">
              <AprilIconClipboardList size={20} aria-hidden />
            </ActionIcon>
          </Group>
        }
      />

      <AprilMobileBottomSheet
        opened={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="Черновик"
        size="72%"
        withinPortal={false}>
        <Stack gap="md">
          <TextInput label="Название" placeholder="Задача" size="sm" />
          <Text size="xs" c="dimmed">
            Поля с <code>size=&quot;sm&quot;</code> — проверяйте zoom на iOS при необходимости (§8 Mobile).
          </Text>
          <Group justify="flex-end" gap="xs" pt="md">
            <Button variant="default" size="xs" onClick={() => setSheetOpen(false)}>
              Отмена
            </Button>
            <Button size="xs" onClick={() => setSheetOpen(false)}>
              Сохранить
            </Button>
          </Group>
        </Stack>
      </AprilMobileBottomSheet>
    </Box>
  );
}

export function MobileShowcase() {
  return (
    <Stack gap="lg" p={{ base: 'md', sm: 'xl' }} maw={1400}>
      <Stack gap={4}>
        <Title order={2}>Mobile lab</Title>
        <Text size="sm" c="dimmed" maw={720}>
          Эталонные контейнеры с фиксированными размерами (логические px).{' '}
          <code>AprilMobileShellBar</code> внутри кадра — <code>position=&quot;absolute&quot;</code>; в микрофронте на
          весь viewport — <code>position=&quot;fixed&quot;</code>. Нижний лист —{' '}
          <code>AprilMobileBottomSheet</code> (<code>{'withinPortal={false}'}</code> в кадре); в проде обычно портал
          по умолчанию.
        </Text>
      </Stack>

      <Group align="flex-start" gap="xl" wrap="wrap">
        <DeviceFrame width={390} height={844} label="390 × 844">
          <DemoRootShell />
        </DeviceFrame>
        <DeviceFrame width={360} height={800} label="360 × 800">
          <DemoDrillShell />
        </DeviceFrame>
      </Group>
    </Stack>
  );
}
