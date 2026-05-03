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
  Tooltip,
  UnstyledButton,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import {
  AlignJustify,
  Check,
  CircleX,
  LayoutGrid,
  Menu,
  Moon,
  Rows3,
  Sun,
  Trash2,
  X,
} from 'lucide-react';
import {
  AprilGradientSegmentedControl,
  AprilMobileBottomSheet,
  AprilVaulBottomSheet,
  AprilMobileShellBar,
  AprilProductHeader,
  AprilIconChevronLeft,
  AprilIconChevronRight,
  AprilIconClipboardList,
  AprilIconPlus,
  AprilIconSearch,
  aprilMobileShellBarContentPaddingBottom,
  useDensity,
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
    title: 'Bottom sheet',
    description: 'AprilVaulBottomSheet — форма, действия в шапке',
  },
  {
    id: 'modal-alert',
    title: 'Bottom sheet — алерт',
    description: 'Подтверждение с опасным действием',
  },
];

/** Плотность, тема и выход в UIKit — дублируем в «системной» шапке mobile-lab (глобальный TopBar скрыт). */
function MobileLabToolbar({ onOpenUIKit }: { onOpenUIKit: () => void }) {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');
  const { density, toggleDensity } = useDensity();

  return (
    <Group wrap="nowrap" gap={4}>
      <Tooltip label="Витрина UIKit" events={{ hover: true, focus: true, touch: true }}>
        <ActionIcon
          variant="default"
          size="md"
          radius="md"
          aria-label="Перейти к витрине UIKit"
          onClick={onOpenUIKit}>
          <LayoutGrid size={18} aria-hidden />
        </ActionIcon>
      </Tooltip>
      <Tooltip
        label={density === 'comfortable' ? 'Плотность: комфортная' : 'Плотность: компактная'}
        events={{ hover: true, focus: true, touch: true }}>
        <ActionIcon
          variant="subtle"
          color="gray"
          size="md"
          radius="md"
          aria-label={
            density === 'comfortable'
              ? 'Плотность комфортная, переключить на компактную'
              : 'Плотность компактная, переключить на комфортную'
          }
          onClick={toggleDensity}>
          {density === 'comfortable' ? (
            <Rows3 size={18} aria-hidden />
          ) : (
            <AlignJustify size={18} aria-hidden />
          )}
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Светлая / тёмная тема" events={{ hover: true, focus: true, touch: true }}>
        <ActionIcon
          variant="subtle"
          color="gray"
          size="md"
          radius="md"
          aria-label="Переключить тему"
          onClick={() => setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')}>
          {computedColorScheme === 'dark' ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}

/** Системная шапка + скролл + фиксированная нижняя панель (панель не внутри скролла). */
function MobileSectionLayout({
  title,
  onBackToMenu,
  shellLeading,
  shellCenter,
  shellWithSearch = true,
  toolbar,
  children,
}: {
  title: string;
  onBackToMenu: () => void;
  /** `undefined` — стрелка «к разделам»; `null` — без ведущего слота (например лист открыт, действия справа). */
  shellLeading?: ReactNode | null;
  shellCenter: ReactNode;
  /** Пока лист открыт — часто `false`, чтобы в `center` поместились кнопки без конкуренции с поиском. */
  shellWithSearch?: boolean;
  toolbar: ReactNode;
  children: ReactNode;
}) {
  const defaultLeading = (
    <ActionIcon size="lg" variant="subtle" color="gray" aria-label="К разделам" onClick={onBackToMenu}>
      <AprilIconChevronLeft size={20} aria-hidden />
    </ActionIcon>
  );

  return (
    <Box
      style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%',
        width: '100%',
      }}>
      <AprilProductHeader
        sticky
        productName={title}
        center={
          <Tooltip label="Поиск (демо)" events={{ hover: true, focus: true, touch: true }}>
            <ActionIcon variant="subtle" color="gray" size="md" radius="md" aria-label="Поиск">
              <AprilIconSearch size={18} aria-hidden />
            </ActionIcon>
          </Tooltip>
        }
        right={toolbar}
      />
      <Box
        style={{
          flex: 1,
          minHeight: 0,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <ScrollArea
          type="auto"
          style={{ flex: 1, minHeight: 0 }}
          styles={{
            viewport: { paddingBottom: aprilMobileShellBarContentPaddingBottom() },
          }}>
          <Box px="md" pt="sm" pb="xl">
            {children}
          </Box>
        </ScrollArea>
        <AprilMobileShellBar
          position="fixed"
          leading={shellLeading === undefined ? defaultLeading : shellLeading}
          center={shellCenter}
          withSearch={shellWithSearch}
        />
      </Box>
    </Box>
  );
}

function MenuView({ onSelect, toolbar }: { onSelect: (id: MobileSectionId) => void; toolbar: ReactNode }) {
  return (
    <Box
      style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%',
        width: '100%',
      }}>
      <AprilProductHeader sticky productName="Mobile lab" right={toolbar} />
      <ScrollArea type="auto" style={{ flex: 1, minHeight: 0 }}>
        <Stack gap="xs" px="md" py="sm">
          <Text size="sm" c="dimmed">
            Разделы демо
          </Text>
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
                <Group justify="space-between" wrap="nowrap" align="center" py="md" gap="md">
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
      </ScrollArea>
    </Box>
  );
}

function PageHome({ onBackToMenu, toolbar }: { onBackToMenu: () => void; toolbar: ReactNode }) {
  const [tab, setTab] = useState('inbox');

  const shellLeading = (
    <Tooltip label="К разделам" events={{ hover: true, focus: true, touch: true }}>
      <ActionIcon size="lg" variant="subtle" color="gray" aria-label="К разделам" onClick={onBackToMenu}>
        <Menu size={20} aria-hidden />
      </ActionIcon>
    </Tooltip>
  );

  return (
    <MobileSectionLayout
      title="Главная"
      onBackToMenu={onBackToMenu}
      shellLeading={shellLeading}
      toolbar={toolbar}
      shellCenter={
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
      }>
      <Title order={4}>Добро пожаловать</Title>
      <Text size="sm" c="dimmed" mt="xs">
        Нижняя панель зафиксирована у низа экрана; прокручивается только эта область.
      </Text>
      {Array.from({ length: 24 }, (_, i) => (
        <Text key={i} size="sm" mt="xs">
          Блок контента {i + 1}
        </Text>
      ))}
    </MobileSectionLayout>
  );
}

function PageList({ onBackToMenu, toolbar }: { onBackToMenu: () => void; toolbar: ReactNode }) {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <MobileSectionLayout
      title="Список"
      onBackToMenu={onBackToMenu}
      toolbar={toolbar}
      shellCenter={
        <Group gap="xs" justify="center" wrap="nowrap" style={{ width: '100%' }}>
          <ActionIcon size="lg" variant="default" aria-label="Фильтр списка">
            <AprilIconClipboardList size={20} aria-hidden />
          </ActionIcon>
        </Group>
      }>
      <Button variant="light" onClick={() => setSheetOpen(true)} mt="xs">
        Открыть нижний лист
      </Button>
      {Array.from({ length: 20 }, (_, i) => (
        <Group key={i} justify="space-between" wrap="nowrap" mt="sm">
          <Text size="sm" truncate style={{ flex: 1 }}>
            Элемент списка {i + 1}
          </Text>
          <Text size="xs" c="dimmed">
            ›
          </Text>
        </Group>
      ))}
      <AprilMobileBottomSheet opened={sheetOpen} onClose={() => setSheetOpen(false)} title="Детали" size="85%">
        <Stack gap="md">
          <Text size="sm">Контент нижнего листа. Нижняя панель остаётся на месте.</Text>
          <Group justify="flex-end" gap="xs" pt="md">
            <Button variant="default" size="xs" onClick={() => setSheetOpen(false)}>
              Закрыть
            </Button>
          </Group>
        </Stack>
      </AprilMobileBottomSheet>
    </MobileSectionLayout>
  );
}

function PageModal({ onBackToMenu, toolbar }: { onBackToMenu: () => void; toolbar: ReactNode }) {
  const [opened, setOpened] = useState(false);

  const closeSheet = () => setOpened(false);

  const shellLeading = opened ? null : undefined;

  const shellCenter = opened ? (
    <Group justify="flex-end" wrap="nowrap" gap={4} style={{ width: '100%' }}>
      <Tooltip label="Отмена" events={{ hover: true, focus: true, touch: true }}>
        <ActionIcon variant="default" size="lg" radius="md" aria-label="Отмена" onClick={closeSheet}>
          <CircleX size={20} aria-hidden />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Сохранить" events={{ hover: true, focus: true, touch: true }}>
        <ActionIcon variant="filled" color="teal" size="lg" radius="md" aria-label="Сохранить" onClick={closeSheet}>
          <Check size={20} aria-hidden />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Закрыть" events={{ hover: true, focus: true, touch: true }}>
        <ActionIcon variant="subtle" color="gray" size="lg" radius="md" aria-label="Закрыть" onClick={closeSheet}>
          <X size={20} aria-hidden />
        </ActionIcon>
      </Tooltip>
    </Group>
  ) : (
    <Text size="sm" c="dimmed" truncate ta="center" style={{ width: '100%' }}>
      Демо формы
    </Text>
  );

  return (
    <MobileSectionLayout
      title="Bottom sheet"
      onBackToMenu={onBackToMenu}
      shellLeading={shellLeading}
      toolbar={toolbar}
      shellCenter={shellCenter}
      shellWithSearch={!opened}>
      <Text size="sm" c="dimmed">
        <code>AprilVaulBottomSheet</code> (mantine-vaul): выезд снизу, свайп. Пока лист открыт — иконки действий и
        закрытие в <code>AprilMobileShellBar</code> справа (как вторичное / основное / крестик у десктоп-модалки).
      </Text>
      <Button mt="md" onClick={() => setOpened(true)}>
        Открыть bottom sheet
      </Button>
      {Array.from({ length: 12 }, (_, i) => (
        <Text key={i} size="sm" mt="sm">
          Строка {i + 1}
        </Text>
      ))}
      <AprilVaulBottomSheet opened={opened} onClose={closeSheet} headerTitle="Новая запись" withCloseButton={false}>
        <Stack gap="sm">
          <TextInput label="Название" placeholder="Введите текст" size="sm" />
          <Text size="xs" c="dimmed">
            Крестик и кнопки — только в нижней панели.
          </Text>
        </Stack>
      </AprilVaulBottomSheet>
    </MobileSectionLayout>
  );
}

function PageModalAlert({ onBackToMenu, toolbar }: { onBackToMenu: () => void; toolbar: ReactNode }) {
  const [opened, setOpened] = useState(false);

  const closeSheet = () => setOpened(false);

  const shellLeading = opened ? null : undefined;

  const shellCenter = opened ? (
    <Group justify="flex-end" wrap="nowrap" gap={4} style={{ width: '100%' }}>
      <Tooltip label="Отмена" events={{ hover: true, focus: true, touch: true }}>
        <ActionIcon variant="default" size="lg" radius="md" aria-label="Отмена" onClick={closeSheet}>
          <CircleX size={20} aria-hidden />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Удалить" events={{ hover: true, focus: true, touch: true }}>
        <ActionIcon variant="filled" color="red" size="lg" radius="md" aria-label="Удалить" onClick={closeSheet}>
          <Trash2 size={20} aria-hidden />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Закрыть" events={{ hover: true, focus: true, touch: true }}>
        <ActionIcon variant="subtle" color="gray" size="lg" radius="md" aria-label="Закрыть" onClick={closeSheet}>
          <X size={20} aria-hidden />
        </ActionIcon>
      </Tooltip>
    </Group>
  ) : (
    <Text size="sm" c="dimmed" truncate ta="center" style={{ width: '100%' }}>
      Подтверждение
    </Text>
  );

  return (
    <MobileSectionLayout
      title="Bottom sheet — алерт"
      onBackToMenu={onBackToMenu}
      shellLeading={shellLeading}
      toolbar={toolbar}
      shellCenter={shellCenter}
      shellWithSearch={!opened}>
      <Text size="sm">Компактный диалог удаления; иконки справа в нижней панели.</Text>
      <Button color="red" variant="light" mt="md" onClick={() => setOpened(true)}>
        Удалить объект…
      </Button>
      <AprilVaulBottomSheet opened={opened} onClose={closeSheet} headerTitle="Удалить запись?" withCloseButton={false}>
        <Text size="sm">Это действие нельзя отменить. Продолжить?</Text>
      </AprilVaulBottomSheet>
    </MobileSectionLayout>
  );
}

export type MobileShowcaseProps = {
  onRequestUIKit: () => void;
};

export function MobileShowcase({ onRequestUIKit }: MobileShowcaseProps) {
  const [view, setView] = useState<'menu' | MobileSectionId>('menu');
  const toolbar = <MobileLabToolbar onOpenUIKit={onRequestUIKit} />;

  return (
    <Box
      style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%',
        width: '100%',
      }}>
      {view === 'menu' ? (
        <MenuView onSelect={setView} toolbar={toolbar} />
      ) : view === 'home' ? (
        <PageHome onBackToMenu={() => setView('menu')} toolbar={toolbar} />
      ) : view === 'list' ? (
        <PageList onBackToMenu={() => setView('menu')} toolbar={toolbar} />
      ) : view === 'modal' ? (
        <PageModal onBackToMenu={() => setView('menu')} toolbar={toolbar} />
      ) : (
        <PageModalAlert onBackToMenu={() => setView('menu')} toolbar={toolbar} />
      )}
    </Box>
  );
}
