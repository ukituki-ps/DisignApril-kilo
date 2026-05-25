import { useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  ScrollArea,
  Stack,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useDensity } from '../DensityContext';
import { StatusChip } from './StatusChip';

/** Элемент пакета льгот. */
export interface BundleItem {
  /** Уникальный ID элемента. */
  id: string;
  /** Название льготы. */
  name: string;
  /** Статус элемента. */
  status?: 'available' | 'active' | 'expired';
  /** Иконка элемента (Lucide). */
  icon?: ReactNode;
  /** Включено в пакет. */
  included?: boolean;
  /** Индивидуальная цена элемента (для показа «выгода»). */
  price?: string;
}

/** Публичные пропсы SmartBundle. */
export interface SmartBundleProps {
  /** Название пакета. */
  title: string;
  /** Краткое описание пакета. */
  description?: string;
  /** Состав пакета. */
  items: BundleItem[];
  /** Цена пакета (форматированная строка). */
  bundlePrice?: string;
  /** Есть скидка. */
  isDiscounted?: boolean;
  /** Процент скидки для отображения badge. */
  discountPercent?: number;
  /** Можно раскрыть/свернуть. */
  expandable?: boolean;
  /** Начальное состояние раскрытия. */
  defaultExpanded?: boolean;
  /** Callback при раскрытии/сворачивании. */
  onToggle?: (expanded: boolean) => void;
  /** Callback при клике на элемент. */
  onItemSelect?: (item: BundleItem) => void;
  /** Callback кнопки «Добавить пакет». */
  onAddBundle?: () => void;
}

const ICON_SIZE = 38;
const ICON_RADIUS = 10;
const MOBILE_BREAKPOINT = '(max-width: 767px)';
const MOBILE_MAX_HEIGHT_PX = 300;

/** Подпись статуса на русском для StatusChip label. */
const STATUS_LABEL: Record<NonNullable<BundleItem['status']>, string> = {
  available: 'Доступен',
  active: 'Активен',
  expired: 'Истёк',
};

/**
 * SmartBundle — компонент пакета льгот (сценария).
 *
 * Layout:
 *   Header: title + description + bundlePrice + discount badge
 *   Body (expandable): список BundleItem (icon + name + status + цена)
 *   Footer: CTA «Добавить пакет»
 *
 * Desktop: раскрыто по умолчанию, CTA справа.
 * Mobile (<768px): свёрнуто по умолчанию, раскрытие по тапу header, CTA на всю ширину.
 */
export function SmartBundle({
  title,
  description,
  items,
  bundlePrice,
  isDiscounted = false,
  discountPercent,
  expandable = true,
  defaultExpanded,
  onToggle,
  onItemSelect,
  onAddBundle,
}: SmartBundleProps) {
  const theme = useMantineTheme();
  const { density } = useDensity();
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);
  const isCompact = density === 'compact';

  // На desktop раскрыто по умолчанию, на mobile — свёрнуто.
  const initialExpanded = defaultExpanded ?? !isMobile;
  const [expanded, setExpanded] = useState(initialExpanded);

  const toggleExpanded = useCallback(() => {
    if (!expandable) return;
    const next = !expanded;
    setExpanded(next);
    onToggle?.(next);
  }, [expandable, expanded, onToggle]);

  const handleItemSelect = useCallback(
    (item: BundleItem) => {
      onItemSelect?.(item);
    },
    [onItemSelect],
  );

  const cardPadding = isCompact ? 14 : 18;
  const bodyGap = isCompact ? 'xs' : 'sm';
  const footerPadding = isCompact ? 10 : 12;

  // Header: title + description слева, price + badge справа
  const header = useMemo(
    () => (
      <UnstyledButton
        onClick={toggleExpanded}
        style={{ width: '100%', textAlign: 'left', padding: 0 }}
        aria-expanded={expandable ? expanded : undefined}
        aria-controls="smartbundle-body"
      >
        <Group wrap="nowrap" justify="space-between" align="flex-start" gap="sm">
          <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
            <Group wrap="nowrap" gap="sm" align="center">
              <Text fw={700} size={isCompact ? 'sm' : 'md'}>
                {title}
              </Text>
              {isDiscounted ? (
                <Badge
                  size={isCompact ? 'xs' : 'sm'}
                  color="teal"
                  variant="light"
                  style={{ flexShrink: 0 }}
                >
                  −{discountPercent ?? 0}%
                </Badge>
              ) : null}
            </Group>
            {description ? (
              <Text size="xs" c="dimmed" lineClamp={2}>
                {description}
              </Text>
            ) : null}
          </Stack>
          <Group wrap="nowrap" align="center" gap="xs" style={{ flexShrink: 0 }}>
            {bundlePrice ? (
              <Text fw={700} size={isCompact ? 'sm' : 'md'} style={{ whiteSpace: 'nowrap' }}>
                {bundlePrice}
              </Text>
            ) : null}
            {expandable ? (
              <Box
                style={{
                  color: theme.colors.gray[6],
                  transition: 'transform 0.2s',
                  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                {expanded ? (
                  <ChevronUp size={18} aria-hidden />
                ) : (
                  <ChevronDown size={18} aria-hidden />
                )}
              </Box>
            ) : null}
          </Group>
        </Group>
      </UnstyledButton>
    ),
    [
      title,
      description,
      bundlePrice,
      isDiscounted,
      discountPercent,
      expandable,
      expanded,
      isCompact,
      toggleExpanded,
      theme.colors.gray,
    ],
  );

  // Body: список BundleItem
  const body = useMemo(
    () => (
      <Box
        id="smartbundle-body"
        role="region"
        style={{
          display: expanded || !expandable ? 'block' : 'none',
          paddingTop: expandable ? 8 : 0,
        }}
      >
        <ScrollArea
          type="auto"
          style={{
            maxHeight: isMobile ? MOBILE_MAX_HEIGHT_PX : undefined,
          }}
        >
          <Stack gap={isCompact ? 4 : 8} role="list">
            {items.map((item) => (
              <BundleItemRow
                key={item.id}
                item={item}
                isCompact={isCompact}
                theme={theme}
                onSelect={handleItemSelect}
              />
            ))}
          </Stack>
        </ScrollArea>
      </Box>
    ),
    [items, expanded, expandable, isCompact, isMobile, handleItemSelect, theme],
  );

  // Footer: CTA + цена (если есть скидка — показать выгоду)
  const footer = useMemo(
    () => (
      <Box
        style={{
          borderTop: `1px solid ${theme.colors.gray[1]}`,
          padding: `${footerPadding}px ${cardPadding}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMobile ? 'flex-start' : 'flex-end',
          gap: 'sm',
        }}
      >
        {onAddBundle ? (
          <Button
            variant="filled"
            color="teal"
            size={isCompact ? 'xs' : 'sm'}
            fullWidth={isMobile}
            aria-label={`Добавить пакет ${title}`}
            onClick={onAddBundle}
          >
            Добавить пакет
          </Button>
        ) : null}
      </Box>
    ),
    [footerPadding, cardPadding, isMobile, isCompact, onAddBundle, title, theme.colors.gray],
  );

  return (
    <Card
      padding={0}
      withBorder
      radius={14}
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box style={{ padding: cardPadding, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Stack gap={bodyGap}>
          {header}
          {body}
        </Stack>
      </Box>
      {footer}
    </Card>
  );
}

/** Одна строка элемента пакета. */
function BundleItemRow({
  item,
  isCompact,
  theme,
  onSelect,
}: {
  item: BundleItem;
  isCompact: boolean;
  theme: ReturnType<typeof useMantineTheme>;
  onSelect: (item: BundleItem) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      role="listitem"
      onClick={() => onSelect(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 13,
        padding: isCompact ? 8 : 10,
        borderRadius: 8,
        cursor: 'pointer',
        background: hovered ? theme.colors.teal[0] : 'transparent',
        transition: 'background 0.13s',
      }}
    >
      {/* Иконка */}
      {item.icon ? (
        <Box
          style={{
            width: ICON_SIZE,
            height: ICON_SIZE,
            borderRadius: ICON_RADIUS,
            background: theme.colors.gray[0],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: theme.colors.teal[6],
          }}
        >
          {item.icon}
        </Box>
      ) : null}

      {/* Название + статус + цена */}
      <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
        <Group wrap="nowrap" gap="xs" align="center">
          <Text fw={600} size={isCompact ? 'xs' : 'sm'} truncate>
            {item.name}
          </Text>
          {item.status ? (
            <Box style={{ flexShrink: 0 }}>
              <StatusChip
                status={item.status}
                label={STATUS_LABEL[item.status]}
                size={isCompact ? 'xs' : 'sm'}
                variant="chip"
              />
            </Box>
          ) : null}
        </Group>
        {item.price && item.included !== false ? (
          <Text size="xs" c="dimmed">
            {item.price}
          </Text>
        ) : null}
      </Stack>
    </Box>
  );
}
