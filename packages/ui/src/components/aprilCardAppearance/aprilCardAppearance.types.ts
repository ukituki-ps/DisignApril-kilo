/**
 * Типы, константы и валидаторы для настройки внешнего вида карточек каталога льгот (LKFLv2).
 *
 * @module aprilCardAppearance
 */

/* ─── Палитра ─── */

/** Палитра из 8 swatch-цветов для заливки карточек. */
export const APRIL_CARD_APPEARANCE_COLORS = [
  '#00B33C', // зелёный (брендовый)
  '#3B82F6', // синий
  '#8B5CF6', // фиолетовый
  '#F97316', // оранжевый
  '#EC4899', // розовый
  '#EF4444', // красный
  '#14B8A6', // бирюзовый
  '#1E293B', // тёмно-серый
] as const;

/* ─── Типы ─── */

/**
 * Настройки внешнего вида карточки каталога.
 *
 * Определяет фон (solid / gradient), CSS-паттерн-оверлей и контент баннера
 * (изображение / иконка / текст / пусто).
 */
export interface AprilCardAppearanceState {
  /** Основной HEX-цвет, напр. '#00B33C'. Обязательное. */
  color: string;

  /** Второй цвет для градиента, напр. '#047857'. Используется только при colorMode='gradient'. */
  color2?: string;

  /** Режим заливки фона: сплошной цвет или градиент. */
  colorMode: 'solid' | 'gradient';

  /** CSS-паттерн поверх фона. Пустая строка — без паттерна. */
  pattern: '' | 'dots' | 'stripes' | 'grid' | 'waves' | 'cross';

  /** Прозрачность паттерна: 0.1 … 0.8. */
  patternOpacity: number;

  /** Масштаб паттерна: 0.5 | 0.75 | 1 | 1.5 | 2. */
  patternScale: number;

  /**
   * Соотношение линия:промежуток. Только для pattern='stripes' и pattern='cross'.
   * Допустимые значения: 0.25 | 0.33 | 0.5 | 1 | 2 | 3 | 4.
   * Например, ratio=0.5 → тонкая линия, широкий промежуток.
   */
  patternRatio: number;

  /** Тип контента баннера: пусто, изображение, иконка или текст. */
  bannerType: '' | 'image' | 'icon' | 'text';

  /** Имя Lucide-иконки для bannerType='icon'. Дефолт: 'sparkles'. */
  bannerIcon: string;

  /** Текст на баннере для bannerType='text'. */
  bannerText: string;

  /** Цвет текста баннера (HEX). Дефолт: '#FFFFFF'. */
  bannerTextColor: string;

  /** Прозрачность текста баннера: 0.1 .. 1. Дефолт: 0.8. */
  bannerTextOpacity: number;

  /** Размер текста баннера в px: 12 | 14 | 16 | 18 | 20 | 24 | 28. Дефолт: 18. */
  bannerTextSize: number;

  /** Имя загруженного файла изображения. */
  bannerImageName: string;

  /** URL для предпросмотра (ObjectURL или S3-url). */
  bannerImageUrl: string;
}

/**
 * Данные тела карточки каталога.
 *
 * Описывает содержимое нижней части карточки: название, категория, цена,
 * валюта, период, статус и опциональный плагин.
 */
export interface AprilCatalogCardContent {
  /** Название льготы / карточки. */
  name: string;

  /** Категория (например, 'Здоровье'). */
  category?: string;

  /** Числовая цена. */
  price?: number;

  /** Тип валюты: баллы, рубли, включено. */
  currency?: 'points' | 'rub' | 'included';

  /** Период списания. */
  period?: 'monthly' | 'yearly' | 'one-time' | 'daily';

  /** Статус карточки. */
  status: 'active' | 'draft' | 'archived';

  /** Имя плагина детализации (опционально). */
  plugin?: string;

  /** Обработчик клика по карточке. */
  onClick?: () => void;
}

/* ─── Значения по умолчанию ─── */

/**
 * Значения по умолчанию для состояния внешнего вида карточки.
 * Используется как стартовая точка редактора и для валидации.
 */
export const DEFAULT_CARD_APPEARANCE: AprilCardAppearanceState = {
  color: '#00B33C',
  color2: '#047857',
  colorMode: 'solid',
  pattern: '',
  patternOpacity: 0.35,
  patternScale: 1,
  patternRatio: 1,
  bannerType: '',
  bannerIcon: 'sparkles',
  bannerText: '',
  bannerTextColor: '#FFFFFF',
  bannerTextOpacity: 0.8,
  bannerTextSize: 18,
  bannerImageName: '',
  bannerImageUrl: '',
};

/* ─── Допустимые значения для snap/clamp ─── */

const VALID_PATTERN_OPACITY = [0.1, 0.2, 0.35, 0.5, 0.65, 0.8] as const;
const VALID_PATTERN_SCALE = [0.5, 0.75, 1, 1.5, 2] as const;
const VALID_PATTERN_RATIO = [0.25, 0.33, 0.5, 1, 2, 3, 4] as const;
const VALID_TEXT_OPACITY = [0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 1] as const;
const VALID_TEXT_SIZE = [12, 14, 16, 18, 20, 24, 28] as const;

/* ─── Валидаторы ─── */

/**
 * Нормализует HEX-строку: добавляет `#` если нет, возвращает fallback при невалидности.
 */
function normalizeHex(value: string | undefined, fallback: string): string {
  if (!value) return fallback;
  const trimmed = value.trim();
  // Если нет #, добавляем
  const withHash = trimmed.startsWith('#') ? trimmed : `#${trimmed}`;
  // Проверяем 6-символьный HEX
  if (/^#[0-9A-Fa-f]{6}$/.test(withHash)) {
    return withHash;
  }
  return fallback;
}

/**
 * Приводит число к ближайшему значению из массива.
 */
function snapToClosest(value: number, valid: readonly number[]): number {
  if (valid.includes(value)) return value;
  let closest = valid[0];
  let minDist = Math.abs(value - closest);
  for (let i = 1; i < valid.length; i++) {
    const dist = Math.abs(value - valid[i]);
    if (dist < minDist) {
      minDist = dist;
      closest = valid[i];
    }
  }
  return closest;
}

/**
 * Ограничивает число диапазоном [min, max].
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Валидирует и санитизирует частичное состояние внешнего вида карточки.
 *
 * - HEX-цвета: добавляет `#`, fallback на DEFAULT_CARD_APPEARANCE
 * - patternOpacity: clamp [0.1, 0.8] + snap к ближайшему
 * - patternScale: snap к ближайшему из [0.5, 0.75, 1, 1.5, 2]
 * - patternRatio: snap к ближайшему из [0.25, 0.33, 0.5, 1, 2, 3, 4]
 * - bannerIcon: fallback на 'sparkles'
 *
 * @param partial — частичное или полное состояние
 * @returns валидный объект AprilCardAppearanceState
 */
export function validateCardAppearanceState(
  partial: Partial<AprilCardAppearanceState>,
): AprilCardAppearanceState {
  const color = normalizeHex(partial.color, DEFAULT_CARD_APPEARANCE.color);
  const defaultColor2 = DEFAULT_CARD_APPEARANCE.color2 ?? '#047857';
  const color2 = partial.color2 != null && partial.color2 !== ''
    ? normalizeHex(partial.color2, defaultColor2)
    : undefined;
  const colorMode =
    partial.colorMode === 'gradient' ? 'gradient' : 'solid';

  const pattern =
    (partial.pattern ?? '') === 'dots' ||
    (partial.pattern ?? '') === 'stripes' ||
    (partial.pattern ?? '') === 'grid' ||
    (partial.pattern ?? '') === 'waves' ||
    (partial.pattern ?? '') === 'cross'
      ? (partial.pattern as AprilCardAppearanceState['pattern'])
      : '';

  const rawOpacity = partial.patternOpacity ?? DEFAULT_CARD_APPEARANCE.patternOpacity;
  const clampedOpacity = clamp(rawOpacity, 0.1, 0.8);
  const patternOpacity = snapToClosest(clampedOpacity, VALID_PATTERN_OPACITY);

  const patternScale = snapToClosest(
    partial.patternScale ?? DEFAULT_CARD_APPEARANCE.patternScale,
    VALID_PATTERN_SCALE,
  );
  const patternRatio = snapToClosest(
    partial.patternRatio ?? DEFAULT_CARD_APPEARANCE.patternRatio,
    VALID_PATTERN_RATIO,
  );

  const bannerType =
    (partial.bannerType ?? '') === 'image' ||
    (partial.bannerType ?? '') === 'icon' ||
    (partial.bannerType ?? '') === 'text'
      ? (partial.bannerType as AprilCardAppearanceState['bannerType'])
      : '';

  const bannerIcon = partial.bannerIcon || DEFAULT_CARD_APPEARANCE.bannerIcon;
  const bannerText = partial.bannerText ?? '';
  const bannerTextColor = normalizeHex(
    partial.bannerTextColor,
    DEFAULT_CARD_APPEARANCE.bannerTextColor,
  );
  const rawTextOpacity = partial.bannerTextOpacity ?? DEFAULT_CARD_APPEARANCE.bannerTextOpacity;
  const bannerTextOpacity = snapToClosest(
    clamp(rawTextOpacity, 0.1, 1),
    VALID_TEXT_OPACITY,
  );
  const bannerTextSize = snapToClosest(
    partial.bannerTextSize ?? DEFAULT_CARD_APPEARANCE.bannerTextSize,
    VALID_TEXT_SIZE,
  );
  const bannerImageName = partial.bannerImageName ?? '';
  const bannerImageUrl = partial.bannerImageUrl ?? '';

  return {
    color,
    color2,
    colorMode,
    pattern,
    patternOpacity,
    patternScale,
    patternRatio,
    bannerType,
    bannerIcon,
    bannerText,
    bannerTextColor,
    bannerTextOpacity,
    bannerTextSize,
    bannerImageName,
    bannerImageUrl,
  };
}
