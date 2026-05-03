import { Avatar, Box, Card, Text } from '@mantine/core';
import type { LucideIcon } from 'lucide-react';
import type { CardListColumnItem } from './types';

export interface DefaultListCardProps {
  item: CardListColumnItem;
  cardHeight: number;
  selected: boolean;
  isCompactDensity: boolean;
  FallbackIcon: LucideIcon;
  onSelect: () => void;
}

export function DefaultListCard({
  item,
  cardHeight,
  selected,
  isCompactDensity,
  FallbackIcon,
  onSelect,
}: DefaultListCardProps) {
  const avatarSize = isCompactDensity ? 28 : 32;
  const Icon = item.avatarIcon ?? FallbackIcon;

  return (
    <Card
      component="button"
      type="button"
      withBorder
      radius="md"
      p="sm"
      onClick={onSelect}
      style={{
        height: cardHeight,
        overflow: 'hidden',
        width: '100%',
        textAlign: 'left',
        cursor: 'pointer',
        borderColor: selected ? 'var(--mantine-color-teal-filled)' : undefined,
        backgroundColor: selected ? 'var(--mantine-color-teal-light)' : undefined,
      }}
    >
      <Box style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--mantine-spacing-sm)' }}>
        <Avatar src={item.imageUrl} size={avatarSize} radius="xl" alt="">
          <Icon size={avatarSize * 0.45} aria-hidden />
        </Avatar>
        <Box style={{ flex: 1, minWidth: 0 }}>
          <Text fw={600} lineClamp={1}>
            {item.title}
          </Text>
          {item.description ? (
            <Text size="sm" c="dimmed" mt={4} lineClamp={2}>
              {item.description}
            </Text>
          ) : null}
        </Box>
      </Box>
    </Card>
  );
}
