import type { CSSProperties, ReactNode } from 'react';
import type { ActionIconProps } from '@mantine/core';
import { ActionIcon, Box, Button, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { PlusIcon, SearchIcon, SettingsIcon } from 'lucide-react';
import { AprilMobileShellBar } from './AprilMobileShellBar';
import { AprilGradientSegmentedControl } from './AprilGradientSegmentedControl';
import { AprilIconChevronLeft } from '../icons';
import { aprilMobileShellBarDarkGreenActionStyles } from './aprilMobileShellBarLayout';
import { useDensity } from '../DensityContext';

type PanelChrome = 'light' | 'dark';

type SlotMode =
  | 'segmented'
  /** Как раздел «Кнопки» UIKit: filled, light, outline, subtle, default */
  | 'buttons_uikit'
  /** ActionIcon: прозрачный фон, без контура */
  | 'icons_ghost'
  /** ActionIcon: прозрачный фон + видимая граница */
  | 'icons_ghost_bordered'
  /** Текущий продукт: заливка green.9 на иконках */
  | 'icons_product';

type Variant = {
  id: string;
  title: string;
  subtitle?: string;
  paperStyle: CSSProperties;
  /** Контраст иконок / мелкого текста на панели */
  panel: PanelChrome;
  slotMode: SlotMode;
  /** Высота превью-фрейма */
  previewHeight?: number;
};

const STRIPE_BG: CSSProperties = {
  backgroundColor: 'light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-7))',
  backgroundImage: `repeating-linear-gradient(
    -45deg,
    light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-5)) 0 10px,
    light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6)) 10px 20px
  )`,
};

function ghostIconStyles(isDarkPanel: boolean): NonNullable<ActionIconProps['styles']> {
  return {
    root: {
      backgroundColor: 'transparent',
      border: '1px solid transparent',
      color: isDarkPanel ? 'rgba(255, 255, 255, 0.92)' : 'var(--mantine-color-text)',
      '&:hover': {
        backgroundColor: isDarkPanel ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.06)',
      },
    },
  };
}

function ghostBorderedIconStyles(isDarkPanel: boolean): NonNullable<ActionIconProps['styles']> {
  return {
    root: {
      backgroundColor: 'transparent',
      color: isDarkPanel ? 'rgba(255, 255, 255, 0.92)' : 'var(--mantine-color-text)',
      border: isDarkPanel ? '1px solid rgba(255, 255, 255, 0.55)' : '1px solid light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-2))',
      '&:hover': {
        backgroundColor: isDarkPanel ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
      },
    },
  };
}

const SURFACE_VARIANTS: Variant[] = [
  {
    id: 'clear',
    title: 'Бесцветный',
    subtitle: 'прозрачный фон, без границы и тени',
    panel: 'light',
    slotMode: 'segmented',
    paperStyle: {
      backgroundColor: 'transparent',
      border: '1px solid transparent',
      boxShadow: 'none',
    },
  },
  {
    id: 'clear-white-border',
    title: 'Бесцветный + белая граница',
    subtitle: 'прозрачный фон, контур для читаемости на фото/контенте',
    panel: 'light',
    slotMode: 'segmented',
    paperStyle: {
      backgroundColor: 'transparent',
      border: '1px solid rgba(255, 255, 255, 0.92)',
      boxShadow: 'none',
    },
  },
  {
    id: 'teal9-ds',
    title: 'Бирюза 9 (текущий DS)',
    panel: 'dark',
    slotMode: 'segmented',
    paperStyle: {
      backgroundColor: 'var(--mantine-color-teal-9)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: 'var(--mantine-shadow-md)',
    },
  },
  {
    id: 'white-card',
    title: 'Белая «карточка»',
    panel: 'light',
    slotMode: 'segmented',
    paperStyle: {
      backgroundColor: 'var(--mantine-color-white)',
      border: '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
      boxShadow: 'var(--mantine-shadow-md)',
    },
  },
  {
    id: 'teal1',
    title: 'Светлая бирюза (teal-1)',
    panel: 'light',
    slotMode: 'segmented',
    paperStyle: {
      backgroundColor: 'var(--mantine-color-teal-1)',
      border: '1px solid var(--mantine-color-teal-3)',
      boxShadow: 'var(--mantine-shadow-sm)',
    },
  },
  {
    id: 'teal6',
    title: 'Акцент teal-6',
    panel: 'dark',
    slotMode: 'segmented',
    paperStyle: {
      backgroundColor: 'var(--mantine-color-teal-6)',
      border: '1px solid var(--mantine-color-teal-8)',
      boxShadow: 'var(--mantine-shadow-md)',
    },
  },
  {
    id: 'green9',
    title: 'Тёмно-зелёный (green-9)',
    panel: 'dark',
    slotMode: 'segmented',
    paperStyle: {
      backgroundColor: 'var(--mantine-color-green-9)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      boxShadow: 'var(--mantine-shadow-md)',
    },
  },
  {
    id: 'gray2',
    title: 'Нейтраль gray-2 / dark',
    panel: 'light',
    slotMode: 'segmented',
    paperStyle: {
      backgroundColor: 'light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-5))',
      border: '1px solid light-dark(var(--mantine-color-gray-4), var(--mantine-color-dark-3))',
      boxShadow: 'var(--mantine-shadow-sm)',
    },
  },
  {
    id: 'dark6',
    title: 'Поверхность dark-6',
    panel: 'dark',
    slotMode: 'segmented',
    paperStyle: {
      backgroundColor: 'var(--mantine-color-dark-6)',
      border: '1px solid var(--mantine-color-dark-4)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
    },
  },
  {
    id: 'glass-light',
    title: 'Стекло (blur + светлая кромка)',
    panel: 'light',
    slotMode: 'segmented',
    paperStyle: {
      backgroundColor: 'rgba(255, 255, 255, 0.22)',
      backdropFilter: 'blur(12px) saturate(1.2)',
      WebkitBackdropFilter: 'blur(12px) saturate(1.2)',
      border: '1px solid rgba(255, 255, 255, 0.45)',
      boxShadow: 'var(--mantine-shadow-sm)',
    },
  },
  {
    id: 'grad-teal',
    title: 'Градиент teal-4 → teal-9',
    panel: 'dark',
    slotMode: 'segmented',
    paperStyle: {
      backgroundImage: 'linear-gradient(100deg, var(--mantine-color-teal-4), var(--mantine-color-teal-9))',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      boxShadow: 'var(--mantine-shadow-md)',
    },
  },
  {
    id: 'dark9',
    title: 'Почти чёрный (dark-9)',
    panel: 'dark',
    slotMode: 'segmented',
    paperStyle: {
      backgroundColor: 'var(--mantine-color-dark-9)',
      border: '1px solid var(--mantine-color-dark-4)',
      boxShadow: '0 10px 28px rgba(0, 0, 0, 0.45)',
    },
  },
  {
    id: 'blue9',
    title: 'Индиго (blue-9)',
    panel: 'dark',
    slotMode: 'segmented',
    paperStyle: {
      backgroundColor: 'var(--mantine-color-blue-9)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: 'var(--mantine-shadow-md)',
    },
  },
  {
    id: 'grape8',
    title: 'Фиолетовый (grape-8)',
    panel: 'dark',
    slotMode: 'segmented',
    paperStyle: {
      backgroundColor: 'var(--mantine-color-grape-8)',
      border: '1px solid var(--mantine-color-grape-6)',
      boxShadow: 'var(--mantine-shadow-md)',
    },
  },
  {
    id: 'orange8',
    title: 'Тёплый orange-8',
    panel: 'dark',
    slotMode: 'segmented',
    paperStyle: {
      backgroundColor: 'var(--mantine-color-orange-8)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: 'var(--mantine-shadow-md)',
    },
  },
  {
    id: 'white92',
    title: 'Матовый белый 92%',
    panel: 'light',
    slotMode: 'segmented',
    paperStyle: {
      backgroundColor: 'rgba(255, 255, 255, 0.92)',
      border: '1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4))',
      boxShadow: 'var(--mantine-shadow-md)',
    },
  },
  {
    id: 'glass-dark',
    title: 'Тёмное стекло',
    panel: 'dark',
    slotMode: 'segmented',
    paperStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.42)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      boxShadow: 'var(--mantine-shadow-sm)',
    },
  },
  {
    id: 'border-only',
    title: 'Без тени, только граница',
    panel: 'light',
    slotMode: 'segmented',
    paperStyle: {
      backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-6))',
      border: '1px solid light-dark(var(--mantine-color-gray-4), var(--mantine-color-dark-3))',
      boxShadow: 'none',
    },
  },
  {
    id: 'double-teal',
    title: 'Двойной контур (teal)',
    panel: 'light',
    slotMode: 'segmented',
    paperStyle: {
      backgroundColor: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))',
      border: '2px solid var(--mantine-color-teal-5)',
      boxShadow: '0 0 0 1px light-dark(var(--mantine-color-teal-2), var(--mantine-color-teal-8))',
    },
  },
  {
    id: 'metal',
    title: 'Металлик (нейтральный градиент)',
    panel: 'light',
    slotMode: 'segmented',
    paperStyle: {
      backgroundImage:
        'linear-gradient(165deg, light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-5)) 0%, light-dark(var(--mantine-color-gray-4), var(--mantine-color-dark-7)) 100%)',
      border: '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-3))',
      boxShadow: 'var(--mantine-shadow-md)',
    },
  },
  // --- Иконки: бесцветные / с границей ---
  {
    id: 'teal9-icons-ghost',
    title: 'Бирюза 9 + бесцветные иконки',
    subtitle: 'прозрачный фон кнопок, без контура',
    panel: 'dark',
    slotMode: 'icons_ghost',
    paperStyle: {
      backgroundColor: 'var(--mantine-color-teal-9)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: 'var(--mantine-shadow-md)',
    },
  },
  {
    id: 'teal9-icons-ghost-border',
    title: 'Бирюза 9 + бесцветные иконки с границей',
    panel: 'dark',
    slotMode: 'icons_ghost_bordered',
    paperStyle: {
      backgroundColor: 'var(--mantine-color-teal-9)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: 'var(--mantine-shadow-md)',
    },
  },
  {
    id: 'white-icons-ghost',
    title: 'Белая панель + бесцветные иконки',
    panel: 'light',
    slotMode: 'icons_ghost',
    paperStyle: {
      backgroundColor: 'var(--mantine-color-white)',
      border: '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
      boxShadow: 'var(--mantine-shadow-md)',
    },
  },
  {
    id: 'white-icons-ghost-border',
    title: 'Белая панель + иконки с границей',
    panel: 'light',
    slotMode: 'icons_ghost_bordered',
    paperStyle: {
      backgroundColor: 'var(--mantine-color-white)',
      border: '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
      boxShadow: 'var(--mantine-shadow-md)',
    },
  },
  {
    id: 'clear-icons-ghost',
    title: 'Бесцветная панель + бесцветные иконки',
    panel: 'light',
    slotMode: 'icons_ghost',
    paperStyle: {
      backgroundColor: 'transparent',
      border: '1px solid transparent',
      boxShadow: 'none',
    },
  },
  {
    id: 'clear-white-border-icons-ghost-border',
    title: 'Бесцветная + белая кромка панели + иконки с границей',
    panel: 'light',
    slotMode: 'icons_ghost_bordered',
    paperStyle: {
      backgroundColor: 'transparent',
      border: '1px solid rgba(255, 255, 255, 0.92)',
      boxShadow: 'none',
    },
  },
  {
    id: 'dark9-icons-ghost',
    title: 'dark-9 + бесцветные иконки',
    panel: 'dark',
    slotMode: 'icons_ghost',
    paperStyle: {
      backgroundColor: 'var(--mantine-color-dark-9)',
      border: '1px solid var(--mantine-color-dark-4)',
      boxShadow: '0 10px 28px rgba(0, 0, 0, 0.45)',
    },
  },
  // --- Кнопки как в разделе UIKit «Кнопки» (filled / light / outline / subtle / default) ---
  {
    id: 'teal9-buttons-uikit',
    title: 'Бирюза 9 + кнопки (как раздел «Кнопки»)',
    subtitle: 'Заполненная, светлая, контур, тонкая, по умолчанию',
    panel: 'dark',
    slotMode: 'buttons_uikit',
    previewHeight: 152,
    paperStyle: {
      backgroundColor: 'var(--mantine-color-teal-9)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: 'var(--mantine-shadow-md)',
    },
  },
  {
    id: 'white-buttons-uikit',
    title: 'Белая панель + те же кнопки',
    panel: 'light',
    slotMode: 'buttons_uikit',
    previewHeight: 152,
    paperStyle: {
      backgroundColor: 'var(--mantine-color-white)',
      border: '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
      boxShadow: 'var(--mantine-shadow-md)',
    },
  },
  {
    id: 'clear-buttons-uikit',
    title: 'Бесцветная панель + те же кнопки',
    panel: 'light',
    slotMode: 'buttons_uikit',
    previewHeight: 152,
    paperStyle: {
      backgroundColor: 'transparent',
      border: '1px solid rgba(255, 255, 255, 0.75)',
      boxShadow: 'none',
    },
  },
  {
    id: 'glass-dark-buttons-uikit',
    title: 'Тёмное стекло + кнопки',
    panel: 'dark',
    slotMode: 'buttons_uikit',
    previewHeight: 152,
    paperStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.42)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      boxShadow: 'var(--mantine-shadow-sm)',
    },
  },
  {
    id: 'teal9-icons-product',
    title: 'Бирюза 9 + «продуктовые» иконки (тёмно-зелёная заливка)',
    panel: 'dark',
    slotMode: 'icons_product',
    paperStyle: {
      backgroundColor: 'var(--mantine-color-teal-9)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: 'var(--mantine-shadow-md)',
    },
  },
];

function DemoSegmentedTabs() {
  return (
    <AprilGradientSegmentedControl
      size="xs"
      fullWidth
      defaultValue="a"
      data={[
        { label: 'А', value: 'a' },
        { label: 'Б', value: 'b' },
      ]}
    />
  );
}

function DemoUIKitButtonsRow({ size }: { size: 'xs' | 'sm' }) {
  return (
    <Group gap={4} wrap="wrap" justify="center" align="center" style={{ width: '100%' }}>
      <Button variant="filled" size={size}>
        Заполненная
      </Button>
      <Button variant="light" size={size}>
        Светлая
      </Button>
      <Button variant="outline" size={size}>
        Контур
      </Button>
      <Button variant="subtle" size={size}>
        Тонкая
      </Button>
      <Button variant="default" size={size}>
        По умолчанию
      </Button>
    </Group>
  );
}

function DemoIconRow({
  mode,
  isDarkPanel,
}: {
  mode: 'icons_ghost' | 'icons_ghost_bordered' | 'icons_product';
  isDarkPanel: boolean;
}) {
  if (mode === 'icons_product') {
    return (
      <Group gap={6} justify="center" wrap="nowrap" style={{ width: '100%' }}>
        <ActionIcon
          variant="filled"
          color="green"
          size="lg"
          radius="xl"
          styles={aprilMobileShellBarDarkGreenActionStyles}
          aria-label="Настройки (демо)">
          <SettingsIcon size={18} aria-hidden />
        </ActionIcon>
        <ActionIcon
          variant="filled"
          color="green"
          size="lg"
          radius="xl"
          styles={aprilMobileShellBarDarkGreenActionStyles}
          aria-label="Поиск (демо)">
          <SearchIcon size={18} aria-hidden />
        </ActionIcon>
        <ActionIcon
          variant="filled"
          color="green"
          size="lg"
          radius="xl"
          styles={aprilMobileShellBarDarkGreenActionStyles}
          aria-label="Добавить (демо)">
          <PlusIcon size={18} aria-hidden />
        </ActionIcon>
      </Group>
    );
  }
  const styles =
    mode === 'icons_ghost_bordered' ? ghostBorderedIconStyles(isDarkPanel) : ghostIconStyles(isDarkPanel);
  return (
    <Group gap={6} justify="center" wrap="nowrap" style={{ width: '100%' }}>
      <ActionIcon variant="subtle" size="lg" radius="xl" styles={styles} aria-label="Настройки (демо)">
        <SettingsIcon size={18} aria-hidden />
      </ActionIcon>
      <ActionIcon variant="subtle" size="lg" radius="xl" styles={styles} aria-label="Поиск (демо)">
        <SearchIcon size={18} aria-hidden />
      </ActionIcon>
      <ActionIcon variant="subtle" size="lg" radius="xl" styles={styles} aria-label="Добавить (демо)">
        <PlusIcon size={18} aria-hidden />
      </ActionIcon>
    </Group>
  );
}

function ShellBarPreview({ variant }: { variant: Variant }) {
  const { density } = useDensity();
  const isCompact = density === 'compact';
  const buttonSize: 'xs' | 'sm' = isCompact ? 'xs' : 'sm';
  const isDark = variant.panel === 'dark';
  const h = variant.previewHeight ?? (variant.slotMode === 'buttons_uikit' ? 152 : 112);

  const ghostBack = ghostIconStyles(isDark);
  const borderedBack = ghostBorderedIconStyles(isDark);
  const productBack = aprilMobileShellBarDarkGreenActionStyles;

  let leading: ReactNode;
  if (variant.slotMode === 'icons_product') {
    leading = (
      <ActionIcon
        variant="filled"
        color="green"
        size="lg"
        radius="xl"
        styles={productBack}
        aria-label="Назад (демо)">
        <AprilIconChevronLeft size={20} aria-hidden />
      </ActionIcon>
    );
  } else if (variant.slotMode === 'icons_ghost') {
    leading = (
      <ActionIcon variant="subtle" size="lg" radius="xl" styles={ghostBack} aria-label="Назад (демо)">
        <AprilIconChevronLeft size={20} aria-hidden />
      </ActionIcon>
    );
  } else if (variant.slotMode === 'icons_ghost_bordered') {
    leading = (
      <ActionIcon variant="subtle" size="lg" radius="xl" styles={borderedBack} aria-label="Назад (демо)">
        <AprilIconChevronLeft size={20} aria-hidden />
      </ActionIcon>
    );
  } else {
    leading = (
      <ActionIcon variant="default" size="lg" radius="xl" aria-label="Назад (демо)">
        <AprilIconChevronLeft size={20} aria-hidden />
      </ActionIcon>
    );
  }

  let center: ReactNode;
  if (variant.slotMode === 'segmented') {
    center = (
      <Box style={{ minWidth: 0 }}>
        <DemoSegmentedTabs />
      </Box>
    );
  } else if (variant.slotMode === 'buttons_uikit') {
    center = <DemoUIKitButtonsRow size={buttonSize} />;
  } else {
    center = <DemoIconRow mode={variant.slotMode} isDarkPanel={isDark} />;
  }

  return (
    <Box
      style={{
        position: 'relative',
        height: h,
        borderRadius: 'var(--mantine-radius-md)',
        overflow: 'hidden',
        ...STRIPE_BG,
      }}>
      <AprilMobileShellBar
        position="absolute"
        horizontalInset="sm"
        withSearch={false}
        leading={leading}
        center={center}
        paperProps={{ style: variant.paperStyle }}
      />
    </Box>
  );
}

export function MobileShellBarSurfaceVariantsSection() {
  return (
    <Stack gap="md">
      <Text size="sm" c="dimmed">
        Превью <Text span fw={600} c="inherit">AprilMobileShellBar</Text> через{' '}
        <Text span fw={600} c="inherit">paperProps.style</Text>. Полосатый фон показывает прозрачные панели. Режимы
        слотов: сегментированные табы; иконки без заливки и с обводкой; ряд кнопок как в UIKit (раздел «Кнопки» —
        filled / light / outline / subtle / default); «продуктовые» иконки с тёмно-зелёной заливкой.
      </Text>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        {SURFACE_VARIANTS.map((v) => (
          <Stack key={v.id} gap={6}>
            <ShellBarPreview variant={v} />
            <Text size="sm" fw={600}>
              {v.title}
            </Text>
            {v.subtitle ? (
              <Text size="xs" c="dimmed" lineClamp={3}>
                {v.subtitle}
              </Text>
            ) : null}
          </Stack>
        ))}
      </SimpleGrid>
    </Stack>
  );
}
