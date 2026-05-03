import { Avatar, Box, Card, Progress, Text } from '@mantine/core';
import type { LucideIcon } from 'lucide-react';
import type { CardListColumnItem } from './types';

export interface GridItemCardProps {
  item: CardListColumnItem;
  selected: boolean;
  isCompactDensity: boolean;
  FallbackIcon: LucideIcon;
  onSelect: () => void;
  /** Псевдо-прогресс для витрины (0–100), без доменной логики. */
  progressPercent?: number;
}

export function GridItemCard({
  item,
  selected,
  isCompactDensity,
  FallbackIcon,
  onSelect,
  progressPercent,
}: GridItemCardProps) {
  const avatarSize = isCompactDensity ? 36 : 40;
  const Icon = item.avatarIcon ?? FallbackIcon;

  return (
    <Card
      component="button"
      type="button"
      withBorder
      radius="md"
      p="md"
      h="100%"
      onClick={onSelect}
      style={{
        cursor: 'pointer',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        borderColor: selected ? 'var(--mantine-color-teal-filled)' : undefined,
        backgroundColor: selected ? 'var(--mantine-color-teal-light)' : undefined,
      }}
    >
      <Box style={{ display: 'flex', alignItems: 'center', gap: 'var(--mantine-spacing-sm)', marginBottom: 8 }}>
        <Avatar src={item.imageUrl} size={avatarSize} radius="xl" alt="">
          <Icon size={avatarSize * 0.45} aria-hidden />
        </Avatar>
        <Text fw={600} lineClamp={2} style={{ flex: 1 }}>
          {item.title}
        </Text>
      </Box>
      {item.description ? (
        <Text size="sm" c="dimmed" lineClamp={3} style={{ flex: 1 }}>
          {item.description}
        </Text>
      ) : (
        <Box style={{ flex: 1 }} />
      )}
      {typeof progressPercent === 'number' ? (
        <Progress value={progressPercent} size="xs" mt="md" color="teal" aria-hidden />
      ) : null}
    </Card>
  );
}
