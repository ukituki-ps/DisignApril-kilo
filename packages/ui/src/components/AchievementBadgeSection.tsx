import { Shield, Star, Trophy, Zap } from 'lucide-react';
import { Box, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { AchievementBadge } from './AchievementBadge';

export function AchievementBadgeSection() {
  return (
    <Stack gap="xl">
      {/* All variants */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Все варианты (bronze / silver / gold / platinum)
        </Text>
        <Group gap="md" align="center">
          <AchievementBadge variant="bronze" tooltip="Бронзовый — 1 посещение" label="Bronze" />
          <AchievementBadge variant="silver" tooltip="Серебряный — 5 посещений" label="Silver" />
          <AchievementBadge variant="gold" tooltip="Золотой — 10 посещений" label="Gold" />
          <AchievementBadge variant="platinum" tooltip="Платиновый — 20 посещений" label="Platinum" />
        </Group>
      </Stack>

      {/* Earned vs Unearned */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Earned vs Unearned
        </Text>
        <Group gap="md" align="center">
          <AchievementBadge variant="gold" earned tooltip="Получено: 15.03.2026" label="Получено" />
          <AchievementBadge variant="gold" earned={false} tooltip="Не получено" label="Не получено" />
        </Group>
      </Stack>

      {/* С тултипами */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          С тултипами (hover для просмотра)
        </Text>
        <Group gap="md" align="center">
          <AchievementBadge
            variant="bronze"
            tooltip="Получено: 01.01.2026 — Первое посещение"
            label="1-й визит"
          />
          <AchievementBadge
            variant="silver"
            tooltip="Получено: 15.03.2026 — Активный месяц"
            label="Активный"
          />
          <AchievementBadge
            variant="gold"
            tooltip="Получено: 01.05.2026 — Золотой статус"
            label="Золото"
          />
        </Group>
      </Stack>

      {/* Размеры */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Размеры (xs / sm / md / lg)
        </Text>
        <Group gap="md" align="center">
          <AchievementBadge variant="gold" size="xs" label="XS" />
          <AchievementBadge variant="gold" size="sm" label="SM" />
          <AchievementBadge variant="gold" size="md" label="MD" />
          <AchievementBadge variant="gold" size="lg" label="LG" />
        </Group>
      </Stack>

      {/* Custom иконки */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Custom variant с кастомными иконками
        </Text>
        <Group gap="md" align="center">
          <AchievementBadge
            variant="custom"
            icon={<Trophy size={14} aria-hidden />}
            label="Трофей"
            tooltip="Достижение: трофей"
          />
          <AchievementBadge
            variant="custom"
            icon={<Zap size={14} aria-hidden />}
            label="Молния"
            tooltip="Достижение: скорость"
          />
          <AchievementBadge
            variant="custom"
            icon={<Shield size={14} aria-hidden />}
            label="Щит"
            tooltip="Достижение: защита"
          />
          <AchievementBadge
            variant="custom"
            icon={<Star size={14} aria-hidden />}
            label="Звезда"
            tooltip="Достижение: звезда"
          />
        </Group>
      </Stack>

      {/* Disabled */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Disabled (заблокировано)
        </Text>
        <Group gap="md" align="center">
          <AchievementBadge variant="bronze" disabled label="Заблокировано" />
          <AchievementBadge variant="silver" disabled label="Заблокировано" />
          <AchievementBadge variant="gold" disabled label="Заблокировано" />
        </Group>
      </Stack>

      {/* Mobile preview */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Mobile preview
        </Text>
        <Box
          style={{
            maxWidth: 375,
            margin: '0 auto',
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            padding: 'var(--mantine-spacing-md)',
          }}
        >
          <SimpleGrid cols={4}>
            <AchievementBadge variant="bronze" tooltip="Бронзовый" label="Bronze" />
            <AchievementBadge variant="silver" tooltip="Серебряный" label="Silver" />
            <AchievementBadge variant="gold" tooltip="Золотой" label="Gold" />
            <AchievementBadge variant="platinum" tooltip="Платиновый" label="Platinum" />
          </SimpleGrid>
        </Box>
      </Stack>
    </Stack>
  );
}
