import type { ReactNode } from 'react';
import { Box, Group, Paper, Text, Title, useMantineTheme } from '@mantine/core';
import { useDensity } from '../DensityContext';

/** Размер иконки EmptyStateIllustration. */
export type EmptyStateIconSize = 'sm' | 'md' | 'lg';

/** Выравнивание контента. */
export type EmptyStateAlign = 'center' | 'left';

/** Публичные пропсы EmptyStateIllustration. */
export interface EmptyStateIllustrationProps {
  /** Заголовок пустого состояния. */
  title: string;
  /** Описание/подсказка. */
  description?: string;
  /** Кнопка действия (CTA). */
  actionButton?: ReactNode;
  /** Иконка/иллюстрация (Lucide или кастомная SVG). */
  icon?: ReactNode;
  /** Размер иконки. */
  iconSize?: EmptyStateIconSize;
  /** Выравнивание. */
  align?: EmptyStateAlign;
  /** Дополнительный padding. */
  padding?: string | number;
}

/** Размер иконки в пикселях по размеру. */
const ICON_SIZE_MAP: Record<EmptyStateIconSize, number> = {
  sm: 40,
  md: 56,
  lg: 72,
};

/**
 * EmptyStateIllustration — компонент для пустых состояний.
 *
 * Центрированный стек: icon → title → description → actionButton.
 * Desktop: max-width 480px, центрировано.
 * Mobile (<768px): padding уменьшается, icon size md, actionButton на всю ширину.
 *
 * DS не предоставляет SVG-иллюстрации (контент сервиса).
 * DS предоставляет `icon` проп для кастомной иконки.
 *
 * a11y: title в Title, description в Text, actionButton с aria-label.
 * Density: gap через useDensity().
 * Темизация: CSS variables, light/dark.
 */
export function EmptyStateIllustration({
  title,
  description,
  actionButton,
  icon,
  iconSize = 'lg',
  align = 'center',
  padding = 'xl',
}: EmptyStateIllustrationProps) {
  const theme = useMantineTheme();
  const { density } = useDensity();
  const isCompact = density === 'compact';

  const iconSizePx = ICON_SIZE_MAP[iconSize];

  const alignCenter = align === 'center';

  // Иконка в контейнере с нейтральным фоном
  const iconContainer = icon ? (
    <Box
      style={{
        width: iconSizePx,
        height: iconSizePx,
        borderRadius: '50%',
        background: theme.colors.gray[0],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colors.gray[5],
        margin: alignCenter ? '0 auto' : 0,
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
  ) : null;

  return (
    <Paper
      p={padding}
      withBorder
      radius="md"
      style={{
        maxWidth: 480,
        width: '100%',
        margin: alignCenter ? '0 auto' : 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: alignCenter ? 'center' : 'flex-start',
        textAlign: alignCenter ? 'center' : 'left',
      }}
    >
      <Box style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: isCompact ? 8 : 12 }}>
        {/* Иконка */}
        {iconContainer}

        {/* Заголовок */}
        <Title
          order={4}
          style={{
            color: theme.colors.dark[8],
            lineHeight: 1.4,
          }}
        >
          {title}
        </Title>

        {/* Описание */}
        {description ? (
          <Text
            size={isCompact ? 'xs' : 'sm'}
            c="dimmed"
            style={{ lineHeight: 1.6 }}
          >
            {description}
          </Text>
        ) : null}

        {/* Кнопка действия */}
        {actionButton ? (
          <Group
            wrap="nowrap"
            style={{
              width: '100%',
              justifyContent: alignCenter ? 'center' : 'flex-start',
              marginTop: 'auto',
            }}
          >
            <Box style={{ width: alignCenter ? 'auto' : 'auto' }}>
              {actionButton}
            </Box>
          </Group>
        ) : null}
      </Box>
    </Paper>
  );
}
