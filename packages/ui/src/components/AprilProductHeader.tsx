import type { ReactNode } from 'react';
import { Box, Group, Text } from '@mantine/core';
import { useDensity } from '../DensityContext';

const TEAL_FILTER =
  'brightness(0) saturate(100%) invert(65%) sepia(51%) saturate(552%) hue-rotate(118deg) brightness(92%) contrast(87%)';

export type AprilProductHeaderProps = {
  /** Левая зона (по умолчанию — логотип + название продукта) */
  left?: ReactNode;
  /** Центр (например глобальный поиск или якорная навигация) */
  center?: ReactNode;
  /** Правая зона (действия, меню пользователя) */
  right?: ReactNode;
  /** Название рядом с логотипом, если не передан свой `left` */
  productName?: string;
  /** Путь к иконке логотипа; `null` — без картинки */
  logoSrc?: string | null;
  /** Закрепить шапку у верхнего края viewport */
  sticky?: boolean;
  'data-testid'?: string;
};

/**
 * Верхняя панель продукта по паттерну Design System (витрина: Product Header).
 * Высота 48px (compact) / 56px (comfortable) через DensityProvider.
 */
export function AprilProductHeader({
  left,
  center,
  right,
  productName = 'April',
  logoSrc = '/logo-icon.svg',
  sticky = false,
  'data-testid': dataTestId,
}: AprilProductHeaderProps) {
  const { density } = useDensity();
  const isCompact = density === 'compact';
  const h = isCompact ? 48 : 56;

  const defaultLeft = (
    <Group gap={isCompact ? 'xs' : 'sm'} wrap="nowrap">
      {logoSrc ? (
        <img
          src={logoSrc}
          alt=""
          width={isCompact ? 22 : 26}
          height={isCompact ? 22 : 26}
          style={{
            objectFit: 'contain',
            filter: TEAL_FILTER,
            flexShrink: 0,
          }}
        />
      ) : null}
      <Text fw={700} size={isCompact ? 'sm' : 'md'}>
        {productName}
      </Text>
    </Group>
  );

  return (
    <Box
      component="header"
      data-testid={dataTestId}
      pos={sticky ? 'sticky' : undefined}
      top={sticky ? 0 : undefined}
      px={isCompact ? 'sm' : 'md'}
      style={{
        height: h,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--mantine-spacing-sm)',
        borderBottom: '1px solid var(--mantine-color-default-border)',
        backgroundColor: 'var(--mantine-color-body)',
        ...(sticky ? { zIndex: 200 } : {}),
      }}
    >
      <Box style={{ flexShrink: 0 }}>{left ?? defaultLeft}</Box>
      <Box
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {center}
      </Box>
      <Group gap={isCompact ? 6 : 10} wrap="nowrap" justify="flex-end" style={{ flexShrink: 0 }}>
        {right}
      </Group>
    </Box>
  );
}
