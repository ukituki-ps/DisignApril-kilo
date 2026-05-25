import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  Box,
  Button,
  Card,
  Group,
  Image,
  Progress,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useDensity } from '../DensityContext';
import { StatusChip } from './StatusChip';

/** Допустимые статусы BenefitCard (совпадает с StatusChip за исключением custom/sync). */
export type BenefitCardStatus = 'available' | 'active' | 'expired' | 'waiting' | 'error';

export interface BenefitCardProps {
  /** Название льготы. */
  title: string;
  /** Провайдер льготы (отображается под названием). */
  provider?: string;
  /** Краткое описание. */
  description?: string;
  /** Статус (мапится на StatusChip). */
  status?: BenefitCardStatus;
  /** Показать цену. */
  showPrice?: boolean;
  /** Цена (форматированная строка, без суффикса). */
  price?: string;
  /** Суффикс цены (например «₽ / мес», «баллов»). */
  priceSuffix?: string;
  /** Показать прогресс-бар. */
  showProgress?: boolean;
  /** Значение прогресса 0-100. */
  progressValue?: number;
  /** Подпись к прогрессу. */
  progressLabel?: string;
  /** Кнопка быстрого действия (CTA). */
  quickAction?: ReactNode;
  /** Изображение (top section, заменяет иконку). */
  imageUrl?: string;
  /** Lucide-иконка для контейнера-иконки (если нет imageUrl). */
  avatarIcon?: ReactNode;
  /** Callback для quickAction. */
  onQuickAction?: () => void;
  /** Callback на клик по карточке. */
  onCardClick?: () => void;
  /** Карточка неактивна. */
  disabled?: boolean;
}

/** Подпись статуса на русском для StatusChip label. */
const STATUS_LABEL: Record<BenefitCardStatus, string> = {
  available: 'Доступен',
  active: 'Активен',
  expired: 'Истёк',
  waiting: 'Ожидание',
  error: 'Ошибка',
};

const ICON_SIZE = 44;
const ICON_RADIUS = 12;

/**
 * BenefitCard — универсальная карточка льготы/активности для каталога.
 *
 * Layout (прототип ЛК физика):
 *   — иконка (квадрат) или изображение
 *   — название + провайдер
 *   — описание (multiline)
 *   — футер: цена слева, статус справа (разделитель border-top)
 *   — прогресс (опционально)
 *   — CTA (опционально)
 *
 * Hover: лёгкий lift + усиление тени.
 * Disabled: opacity 0.6, pointer-events none.
 */
export function BenefitCard({
  title,
  provider,
  description,
  status,
  showPrice = false,
  price,
  priceSuffix,
  showProgress = false,
  progressValue = 0,
  progressLabel,
  quickAction,
  imageUrl,
  avatarIcon,
  onQuickAction,
  onCardClick,
  disabled = false,
}: BenefitCardProps) {
  const theme = useMantineTheme();
  const { density } = useDensity();
  const isCompact = density === 'compact';
  const [hovered, setHovered] = useState(false);

  const clampedProgress = Math.max(0, Math.min(100, progressValue ?? 0));

  const cardRadius = 14;
  const cardPadding = isCompact ? 14 : 18;
  const footerPadding = isCompact ? 10 : 12;

  // Hover transform и тень
  const cardTransform = disabled ? undefined : hovered ? 'translateY(-2px)' : undefined;
  const cardShadow = disabled
    ? 'none'
    : hovered
      ? '0 4px 16px rgba(0,0,0,0.1)'
      : '0 1px 4px rgba(0,0,0,0.06)';

  const iconContainer = avatarIcon ? (
    <Box
      w={ICON_SIZE}
      h={ICON_SIZE}
      style={{
        borderRadius: ICON_RADIUS,
        background: theme.colors.gray[0],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colors.teal[6],
        flexShrink: 0,
        marginBottom: 12,
      }}
    >
      {avatarIcon}
    </Box>
  ) : null;

  const imageSection = imageUrl ? (
    <Image
      src={imageUrl}
      alt={title}
      h={140}
      w="100%"
      fit="cover"
      radius={`${cardRadius}px`}
      mb="sm"
    />
  ) : null;

  // Тело карточки: иконка/изображение + контент
  const body = (
    <Stack gap={isCompact ? 'xs' : 'sm'} style={{ flex: 1, minWidth: 0 }}>
      {imageSection}
      {iconContainer}

      {/* Название */}
      <Text fw={700} size={isCompact ? 'sm' : 'md'}>
        {title}
      </Text>

      {/* Провайдер */}
      {provider ? (
        <Text size="xs" c="dimmed">
          {provider}
        </Text>
      ) : null}

      {/* Описание */}
      {description ? (
        <Text size={isCompact ? 'xs' : 'sm'} c="dimmed" style={{ lineHeight: 1.5 }}>
          {description}
        </Text>
      ) : null}

      {/* Прогресс (в теле, если есть) */}
      {showProgress ? (
        <Stack gap={4}>
          {progressLabel ? (
            <Group wrap="nowrap" justify="space-between">
              <Text size="xs" c="dimmed">
                {progressLabel}
              </Text>
              <Text size="xs" c="dimmed">
                {clampedProgress}%
              </Text>
            </Group>
          ) : (
            <Text size="xs" c="dimmed">
              {clampedProgress}%
            </Text>
          )}
          <Progress
            value={clampedProgress}
            size={isCompact ? 'sm' : 'md'}
            color="teal"
            radius="xl"
          />
        </Stack>
      ) : null}

      {/* CTA */}
      {quickAction ? (
        <Box style={{ marginTop: 'auto', width: '100%' }}>
          {typeof quickAction === 'string' ? (
            <Button
              fullWidth
              variant="filled"
              color="teal"
              size={isCompact ? 'xs' : 'sm'}
              onClick={(e) => {
                e.stopPropagation();
                onQuickAction?.();
              }}
            >
              {quickAction}
            </Button>
          ) : (
            <Box onClick={(e) => { e.stopPropagation(); onQuickAction?.(); }}>
              {quickAction}
            </Box>
          )}
        </Box>
      ) : null}
    </Stack>
  );

  // Футер: цена + статус (разделитель border-top)
  const hasFooter = (status || showPrice) && !showProgress;
  const footer = hasFooter ? (
    <Box
      style={{
        borderTop: `1px solid ${theme.colors.gray[1]}`,
        padding: `${footerPadding}px ${cardPadding}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {showPrice && price ? (
        <Text fw={700} size={isCompact ? 'sm' : 'md'}>
          {price}
          {priceSuffix ? (
            <Text component="span" fw={500} size="xs" c="dimmed" ml={4}>
              {priceSuffix}
            </Text>
          ) : null}
        </Text>
      ) : (
        <Box />
      )}
      {status ? (
        <StatusChip
          status={status}
          label={STATUS_LABEL[status]}
          size={isCompact ? 'xs' : 'sm'}
        />
      ) : null}
    </Box>
  ) : null;

  // Если нет отдельного футера — показываем status+price в теле
  const inlineStatusPrice = (!hasFooter && (status || showPrice)) ? (
    <Group wrap="nowrap" gap="sm" align="center" mt="xs">
      {status ? (
        <StatusChip
          status={status}
          label={STATUS_LABEL[status]}
          size={isCompact ? 'xs' : 'sm'}
        />
      ) : null}
      {showPrice && price ? (
        <Text fw={600} size={isCompact ? 'sm' : 'md'}>
          {price}
          {priceSuffix ? ` ${priceSuffix}` : null}
        </Text>
      ) : null}
    </Group>
  ) : null;

  const cardInner = (
    <Card
      padding={0}
      withBorder
      radius={cardRadius}
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: cardShadow,
        transform: cardTransform,
        transition: 'transform 0.15s, box-shadow 0.15s',
        cursor: disabled ? 'default' : (onCardClick ? 'pointer' : 'default'),
        opacity: disabled ? 0.6 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={!disabled && onCardClick ? (e) => {
        e.stopPropagation();
        onCardClick();
      } : undefined}
    >
      <Box
        role="article"
        aria-label={title}
        style={{ padding: cardPadding, flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        {body}
        {inlineStatusPrice}
      </Box>
      {footer}
    </Card>
  );

  return <Box>{cardInner}</Box>;
}
