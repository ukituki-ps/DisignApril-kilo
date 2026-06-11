import { useState } from 'react';
import { Group, Paper, Text } from '@mantine/core';
import {
  AprilCardAppearanceEditor,
  AprilCardBanner,
  AprilCatalogCard,
  DEFAULT_CARD_APPEARANCE,
  type AprilCardAppearanceState,
} from './aprilCardAppearance';

/**
 * Showcase-секция CardAppearance для UIKit.
 *
 * Интерактивный редактор настроек внешнего вида карточки с live-preview баннера и карточки.
 */
export function CardAppearanceSection() {
  const [appearance, setAppearance] = useState<AprilCardAppearanceState>({
    ...DEFAULT_CARD_APPEARANCE,
    color: '#3B82F6',
    color2: '#8B5CF6',
    colorMode: 'gradient',
    pattern: 'dots',
    patternOpacity: 0.35,
    patternScale: 1,
    patternRatio: 1,
    bannerType: 'icon',
    bannerIcon: 'sparkles',
    bannerText: '',
    bannerTextColor: '#FFFFFF',
    bannerTextOpacity: 0.8,
    bannerTextSize: 18,
    bannerImageName: '',
    bannerImageUrl: '',
  });

  return (
    <Group wrap="wrap" gap="md">
      {/* Левая колонка — редактор */}
      <Paper
        withBorder
        p="md"
        radius="md"
        style={{ flex: '1 1 320px', minWidth: 280 }}
      >
        <Text size="sm" fw={600} mb="md">
          Редактор внешнего вида
        </Text>
        <AprilCardAppearanceEditor
          value={appearance}
          onChange={setAppearance}
        />
      </Paper>

      {/* Правая колонка — превью */}
      <Paper
        withBorder
        p="md"
        radius="md"
        style={{ flex: '1 1 320px', minWidth: 280 }}
      >
        <Text size="sm" fw={600} mb="md">
          Превью баннера
        </Text>
        <AprilCardBanner appearance={appearance} />

        <Text size="sm" fw={600} mt="lg" mb="md">
          Превью карточки каталога
        </Text>
        <AprilCatalogCard
          appearance={appearance}
          content={{
            name: 'ДМС — Базовая',
            category: 'Здоровье',
            price: 500,
            currency: 'points',
            period: 'monthly',
            status: 'active',
            plugin: 'dms-detail',
          }}
        />
      </Paper>
    </Group>
  );
}
