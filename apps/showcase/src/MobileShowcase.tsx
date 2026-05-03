import { useState, type CSSProperties } from 'react';
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
  UnstyledButton,
} from '@mantine/core';
import {
  AprilGradientSegmentedControl,
  AprilModal,
  AprilMobileBottomSheet,
  AprilMobileShellBar,
  AprilIconChevronLeft,
  AprilIconChevronRight,
  AprilIconClipboardList,
  AprilIconPlus,
  aprilMobileShellBarContentPaddingBottom,
} from '@ukituki-ps/april-ui';

type MobileSectionId = 'home' | 'list' | 'modal' | 'modal-alert';

type MobileSection = {
  id: MobileSectionId;
  title: string;
  description: string;
};

const SECTIONS: MobileSection[] = [
  {
    id: 'home',
    title: 'Главная',
    description: 'Корневой экран: табы и поиск в нижней панели',
  },
  {
    id: 'list',
    title: 'Список',
    description: 'Скролл, «Назад», нижний лист поверх контента',
  },
  {
    id: 'modal',
    title: 'Модалка',
    description: 'AprilModal — форма, действия в шапке',
  },
  {
    id: 'modal-alert',
    title: 'Модалка — алерт',
    description: 'Подтверждение с опасным действием',
  },
];

const DEMO_VIEWPORT_STYLE: CSSProperties = {
  position: 'relative',
  flex: 1,
  minHeight: 0,
  width: '100%',
  maxWidth: 430,
  marginInline: 'auto',
  borderRadius: 16,
  border: '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
  overflow: 'hidden',
  backgroundColor: 'light-dark(var(--mantine-color-body), var(--mantine-color-dark-7))',
};

function MenuView({ onSelect }: { onSelect: (id: MobileSectionId) => void }) {
  return (
    <Stack gap="lg" maw={430} mx="auto" w="100%">
      <Stack gap={4}>
        <Title order={2}>Mobile lab</Title>
        <Text size="sm" c="dimmed">
          Выберите раздел — откроется полноэкранное демо внутри витрины (нижняя панель с{' '}
          <code>position=&quot;absolute&quot;</code> привязана к области просмотра).
        </Text>
      </Stack>
      <Stack gap={0} role="list">
        {SECTIONS.map((section, index) => (
          <UnstyledButton
            key={section.id}
            role="listitem"
            onClick={() => onSelect(section.id)}
            style={{
              borderBottom:
                index < SECTIONS.length - 1
                  ? '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))'
                  : undefined,
            }}>
            <Group justify="space-between" wrap="nowrap" align="center" p="md" gap="md">
              <Stack gap={4} align="flex-start" style={{ flex: 1, minWidth: 0 }}>
                <Text fw={600} size="md">
                  {index + 1}. {section.title}
                </Text>
                <Text size="sm" c="dimmed" lineClamp={2}>
                  {section.description}
                </Text>
              </Stack>
              <AprilIconChevronRight size={20} aria-hidden style={{ flexShrink: 0, opacity: 0.6 }} />
            </Group>
          </UnstyledButton>
        ))}
      </Stack>
    </Stack>
  );
}

/** Главная: табы + действие + поиск (без «Назад» в панели). */
function PageHome() {
  const [tab, setTab] = useState('inbox');

  return (
    <Box style={{ ...DEMO_VIEWPORT_STYLE, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ScrollArea
        type="auto"
        style={{ flex: 1, minHeight: 0 }}
        styles={{
          viewport: { paddingBottom: aprilMobileShellBarContentPaddingBottom() },
        }}>
        <Stack p="md" gap="sm">
          <Title order={4}>Добро пожаловать</Title>
          <Text size="sm" c="dimmed">
            Нижняя панель — глобальные разделы и поиск. Контент прокручивается с отступом снизу под капсулу.
          </Text>
          {Array.from({ length: 20 }, (_, i) => (
            <Text key={i} size="sm">
              Блок контента {i + 1}
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

/** Список: назад в панели → к меню; нижний лист. */
function PageList({ onShellBack }: { onShellBack: () => void }) {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Box style={{ ...DEMO_VIEWPORT_STYLE, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ScrollArea
        type="auto"
        style={{ flex: 1, minHeight: 0 }}
        styles={{
          viewport: { paddingBottom: aprilMobileShellBarContentPaddingBottom() },
        }}>
        <Stack p="md" gap="md">
          <Text size="sm" c="dimmed">
            Кнопка «Назад» в нижней панели ведёт к списку разделов витрины. Нижний лист не перекрывает
            капсулу.
          </Text>
          <Button variant="light" onClick={() => setSheetOpen(true)}>
            Открыть нижний лист
          </Button>
          {Array.from({ length: 18 }, (_, i) => (
            <Group key={i} justify="space-between" wrap="nowrap">
              <Text size="sm" truncate style={{ flex: 1 }}>
                Элемент списка {i + 1}
              </Text>
              <Text size="xs" c="dimmed">
                ›
              </Text>
            </Group>
          ))}
        </Stack>
      </ScrollArea>

      <AprilMobileShellBar
        position="absolute"
        leading={
          <ActionIcon size="lg" variant="subtle" color="gray" aria-label="Назад к разделам" onClick={onShellBack}>
            <AprilIconChevronLeft size={20} aria-hidden />
          </ActionIcon>
        }
        center={
          <Group gap="xs" justify="center" wrap="nowrap" style={{ width: '100%' }}>
            <ActionIcon size="lg" variant="default" aria-label="Фильтр списка">
              <AprilIconClipboardList size={20} aria-hidden />
            </ActionIcon>
          </Group>
        }
      />

      <AprilMobileBottomSheet
        opened={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="Детали"
        size="70%"
        withinPortal={false}>
        <Stack gap="md">
          <Text size="sm">Контент нижнего листа. Панель управления снизу остаётся доступной.</Text>
          <Group justify="flex-end" gap="xs" pt="md">
            <Button variant="default" size="xs" onClick={() => setSheetOpen(false)}>
              Закрыть
            </Button>
          </Group>
        </Stack>
      </AprilMobileBottomSheet>
    </Box>
  );
}

/** Модалка: форма AprilModal поверх shell (z-index выше панели). */
function PageModal() {
  const [opened, setOpened] = useState(false);

  return (
    <Box style={{ ...DEMO_VIEWPORT_STYLE, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ScrollArea
        type="auto"
        style={{ flex: 1, minHeight: 0 }}
        styles={{
          viewport: { paddingBottom: aprilMobileShellBarContentPaddingBottom() },
        }}>
        <Stack p="md" gap="md">
          <Text size="sm" c="dimmed">
            <code>AprilModal</code> с <code>{'zIndex={520}'}</code> рисуется над нижней панелью (как в продукте для
            полноэкранных форм).
          </Text>
          <Button onClick={() => setOpened(true)}>Открыть модальное окно</Button>
          <Text size="sm">Прокрутите экран вниз, чтобы проверить отступ под панелью.</Text>
          {Array.from({ length: 14 }, (_, i) => (
            <Text key={i} size="sm">
              Строка {i + 1}
            </Text>
          ))}
        </Stack>
      </ScrollArea>

      <AprilMobileShellBar
        position="absolute"
        center={
          <Text size="sm" c="dimmed" truncate ta="center" style={{ width: '100%' }}>
            Панель под модалкой ниже по z-index
          </Text>
        }
      />

      <AprilModal
        zIndex={520}
        opened={opened}
        onClose={() => setOpened(false)}
        headerTitle="Новая запись"
        headerActions={
          <>
            <Button variant="default" size="xs" onClick={() => setOpened(false)}>
              Отмена
            </Button>
            <Button size="xs" onClick={() => setOpened(false)}>
              Сохранить
            </Button>
          </>
        }
        size="md"
        centered>
        <Stack gap="sm">
          <TextInput label="Название" placeholder="Введите текст" size="sm" />
          <Text size="xs" c="dimmed">
            Действия в шапке — паттерн DS-010.
          </Text>
        </Stack>
      </AprilModal>
    </Box>
  );
}

/** Алерт: компактное подтверждение. */
function PageModalAlert() {
  const [opened, setOpened] = useState(false);

  return (
    <Box style={{ ...DEMO_VIEWPORT_STYLE, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ScrollArea
        type="auto"
        style={{ flex: 1, minHeight: 0 }}
        styles={{
          viewport: { paddingBottom: aprilMobileShellBarContentPaddingBottom() },
        }}>
        <Stack p="md" gap="md">
          <Text size="sm">Нажмите кнопку, чтобы открыть диалог подтверждения.</Text>
          <Button color="red" variant="light" onClick={() => setOpened(true)}>
            Удалить объект…
          </Button>
        </Stack>
      </ScrollArea>

      <AprilMobileShellBar
        position="absolute"
        center={
          <Text size="sm" c="dimmed" truncate ta="center" style={{ width: '100%' }}>
            Нижняя панель
          </Text>
        }
      />

      <AprilModal
        zIndex={520}
        opened={opened}
        onClose={() => setOpened(false)}
        headerTitle="Удалить запись?"
        headerActions={
          <>
            <Button variant="default" size="xs" onClick={() => setOpened(false)}>
              Отмена
            </Button>
            <Button color="red" size="xs" onClick={() => setOpened(false)}>
              Удалить
            </Button>
          </>
        }
        size="sm"
        centered>
        <Text size="sm">Это действие нельзя отменить. Продолжить?</Text>
      </AprilModal>
    </Box>
  );
}

export function MobileShowcase() {
  const [view, setView] = useState<'menu' | MobileSectionId>('menu');

  const sectionTitle = SECTIONS.find((s) => s.id === view)?.title ?? '';

  return (
    <Stack gap="md" w="100%" mih="calc(100dvh - 120px)" px={{ base: 'sm', sm: 'md' }} py="md">
      {view === 'menu' ? (
        <MenuView onSelect={setView} />
      ) : (
        <Stack gap="md" style={{ flex: 1, minHeight: 0 }} maw={480} mx="auto" w="100%">
          <Group wrap="nowrap" gap="sm" align="center">
            <ActionIcon
              variant="default"
              size="lg"
              radius="md"
              aria-label="К списку разделов"
              onClick={() => setView('menu')}>
              <AprilIconChevronLeft size={20} aria-hidden />
            </ActionIcon>
            <Title
              order={3}
              style={{
                flex: 1,
                minWidth: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
              {sectionTitle}
            </Title>
          </Group>

          <Box style={{ flex: 1, minHeight: 480, display: 'flex', flexDirection: 'column' }}>
            {view === 'home' ? <PageHome /> : null}
            {view === 'list' ? <PageList onShellBack={() => setView('menu')} /> : null}
            {view === 'modal' ? <PageModal /> : null}
            {view === 'modal-alert' ? <PageModalAlert /> : null}
          </Box>
        </Stack>
      )}
    </Stack>
  );
}
