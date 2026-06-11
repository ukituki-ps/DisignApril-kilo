import type { LucideIcon } from 'lucide-react';
import { Box, Group, Text } from '@mantine/core';
import {
  Sparkles,
  HeartPulse,
  Star,
  Gift,
  Crown,
  Award,
  Shield,
  Zap,
  Flame,
  Leaf,
  Mountain,
  Sun,
  Moon,
  Cloud,
  Anchor,
  Coffee,
  Palette,
  Music,
  Book,
  Camera,
} from 'lucide-react';
import { AprilIcon } from '../../icons/AprilIcon';

/* ─── Registry (shared with AprilCardBanner) ─── */

/** Карта имён баннера → Lucide-компоненты. */
export const BANNER_ICONS: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  'heart-pulse': HeartPulse,
  star: Star,
  gift: Gift,
  crown: Crown,
  award: Award,
  shield: Shield,
  zap: Zap,
  flame: Flame,
  leaf: Leaf,
  mountain: Mountain,
  sun: Sun,
  moon: Moon,
  cloud: Cloud,
  anchor: Anchor,
  coffee: Coffee,
  palette: Palette,
  music: Music,
  book: Book,
  camera: Camera,
};

/** Публичный список имён для редактора. */
export const BANNER_ICON_NAMES = Object.keys(BANNER_ICONS);

/* ─── Компонент ─── */

/** Пропсы компонента AprilIconPicker. */
export interface AprilIconPickerProps {
  /** Выбранная иконка (имя). */
  value: string;

  /** Вызывается при выборе иконки. */
  onChange: (name: string) => void;

  /** Дополнительные CSS-классы. */
  className?: string;
}

/**
 * Визуальный пикер иконок для баннера.
 *
 * Отображает все доступные иконки в виде сетки с превью.
 */
export function AprilIconPicker({
  value,
  onChange,
  className,
}: AprilIconPickerProps) {
  return (
    <Box className={className}>
      <Text size="xs" fw={500} mb="xs" c="dimmed">
        Иконка баннера
      </Text>
      <Group wrap="wrap" gap={6}>
        {BANNER_ICON_NAMES.map((name) => {
          const Icon = BANNER_ICONS[name];
          const isSelected = name === value;
          return (
            <Box
              key={name}
              className={`april-icon-picker-item ${isSelected ? 'april-icon-picker-item-active' : ''}`}
              onClick={() => onChange(name)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onChange(name);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={name}
              aria-pressed={isSelected}
            >
              <AprilIcon icon={Icon} size={20} />
            </Box>
          );
        })}
      </Group>
    </Box>
  );
}
