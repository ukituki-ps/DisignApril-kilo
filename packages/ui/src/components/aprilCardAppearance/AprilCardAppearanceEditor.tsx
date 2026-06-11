import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  ActionIcon,
  Button,
  Box,
  ColorPicker,
  FileInput,
  Group,
  Popover,
  SegmentedControl,
  Select,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { Plus } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { AprilCardAppearanceState } from './aprilCardAppearance.types';
import {
  APRIL_CARD_APPEARANCE_COLORS,
  validateCardAppearanceState,
} from './aprilCardAppearance.types';
import { AprilIconPicker } from './AprilIconPicker';
import './aprilCardAppearance.css';

/* ─── Опции селеКТов ─── */

const PATTERN_OPTIONS = [
  { value: '', label: '— Без узора —' },
  { value: 'dots', label: 'Точечный' },
  { value: 'stripes', label: 'Полоски' },
  { value: 'grid', label: 'Сетка' },
  { value: 'waves', label: 'Волны' },
  { value: 'cross', label: 'Ромбы' },
];

const OPACITY_OPTIONS = [
  { value: '0.1', label: '10%' },
  { value: '0.2', label: '20%' },
  { value: '0.35', label: '35%' },
  { value: '0.5', label: '50%' },
  { value: '0.65', label: '65%' },
  { value: '0.8', label: '80%' },
];

const SCALE_OPTIONS = [
  { value: '0.5', label: '0.5×' },
  { value: '0.75', label: '0.75×' },
  { value: '1', label: '1×' },
  { value: '1.5', label: '1.5×' },
  { value: '2', label: '2×' },
];

const RATIO_OPTIONS = [
  { value: '0.25', label: '1:4' },
  { value: '0.33', label: '1:3' },
  { value: '0.5', label: '1:2' },
  { value: '1', label: '1:1' },
  { value: '2', label: '2:1' },
  { value: '3', label: '3:1' },
  { value: '4', label: '4:1' },
];

const BANNER_TYPE_OPTIONS = [
  { value: '', label: 'Нет' },
  { value: 'image', label: '🖼️ Изображение' },
  { value: 'icon', label: '🔣 Иконка' },
  { value: 'text', label: '📝 Текст' },
];

const TEXT_SIZE_OPTIONS = [
  { value: '12', label: '12px' },
  { value: '14', label: '14px' },
  { value: '16', label: '16px' },
  { value: '18', label: '18px' },
  { value: '20', label: '20px' },
  { value: '24', label: '24px' },
  { value: '28', label: '28px' },
];

const TEXT_OPACITY_OPTIONS = [
  { value: '0.1', label: '10%' },
  { value: '0.2', label: '20%' },
  { value: '0.35', label: '35%' },
  { value: '0.5', label: '50%' },
  { value: '0.65', label: '65%' },
  { value: '0.8', label: '80%' },
  { value: '1', label: '100%' },
];

/* ─── Компонент swatch-выбора цвета ─── */

function ColorSwatches({
  colors,
  active,
  onChange,
  label,
}: {
  colors: readonly string[];
  active: string;
  onChange: (color: string) => void;
  label: string;
}) {
  return (
    <Box>
      <Text size="xs" fw={500} mb="xs" c="dimmed">
        {label}
      </Text>
      <div className="april-color-swatches">
        {colors.map((c) => (
          <div
            key={c}
            className={`april-color-swatch ${c === active ? 'april-color-swatch-active' : ''}`}
            style={{ background: c } as CSSProperties}
            onClick={() => onChange(c)}
            role="button"
            tabIndex={0}
            aria-label={`Цвет ${c}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onChange(c);
              }
            }}
          />
        ))}

        {/* Плюсик — произвольный цвет */}
        <Popover width={220} position="top" withArrow shadow="md">
          <Popover.Target>
            <ActionIcon
              variant="default"
              aria-label="Выбрать произвольный цвет"
              title="Произвольный цвет"
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                border: '2px dashed var(--mantine-color-gray-4)',
                background: 'var(--mantine-color-gray-0)',
                color: 'var(--mantine-color-gray-6)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--mantine-color-teal-6)';
                e.currentTarget.style.background = 'var(--mantine-color-teal-0)';
                e.currentTarget.style.color = 'var(--mantine-color-teal-7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--mantine-color-gray-4)';
                e.currentTarget.style.background = 'var(--mantine-color-gray-0)';
                e.currentTarget.style.color = 'var(--mantine-color-gray-6)';
              }}
            >
              <Plus size={14} />
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            <ColorPicker
              format="hex"
              value={active}
              onChange={onChange}
              withPicker
              fullWidth
            />
          </Popover.Dropdown>
        </Popover>
      </div>
    </Box>
  );
}

/* ─── Пропсы ─── */

/** Пропсы компонента AprilCardAppearanceEditor. */
export interface AprilCardAppearanceEditorProps {
  /** Текущее состояние внешнего вида (контролируемое). */
  value: AprilCardAppearanceState;

  /** Вызывается при изменении любого поля. */
  onChange: (state: AprilCardAppearanceState) => void;

  /** Дополнительные CSS-классы. */
  className?: string;

  /** Инлайн-стили. */
  style?: CSSProperties;
}

/* ─── Компонент ─── */

/**
 * Контролируемый редактор настроек внешнего вида карточки каталога.
 *
 * Предоставляет секции для настройки: режим цвета, swatch-цвета, узор с параметрами,
 * и контент баннера (иконка / текст / изображение). Секции показываются/скрываются
 * в зависимости от текущих значений.
 */
export function AprilCardAppearanceEditor({
  value,
  onChange,
  className,
  style,
}: AprilCardAppearanceEditorProps) {
  /* URL для cleanup */
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  /* Cleanup при размонтировании */
  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  /* Общий хелпер обновления */
  const set = useCallback(
    (patch: Partial<AprilCardAppearanceState>) => {
      onChange(validateCardAppearanceState({ ...value, ...patch }));
    },
    [value, onChange],
  );

  /* Цвет 1 */
  const onColor1 = useCallback(
    (c: string) => set({ color: c }),
    [set],
  );

  /* Цвет 2 */
  const onColor2 = useCallback(
    (c: string) => set({ color2: c }),
    [set],
  );

  /* Режим цвета */
  const onColorModeChange = useCallback(
    (mode: string) => set({ colorMode: mode as 'solid' | 'gradient' }),
    [set],
  );

  /* Узор */
  const onPatternChange = useCallback(
    (p: string | null) => set({ pattern: p as AprilCardAppearanceState['pattern'] }),
    [set],
  );

  /* Прозрачность */
  const onOpacityChange = useCallback(
    (v: string | null) => {
      if (v != null) set({ patternOpacity: parseFloat(v) });
    },
    [set],
  );

  /* Масштаб */
  const onScaleChange = useCallback(
    (v: string | null) => {
      if (v != null) set({ patternScale: parseFloat(v) });
    },
    [set],
  );

  /* Соотношение */
  const onRatioChange = useCallback(
    (v: string | null) => {
      if (v != null) set({ patternRatio: parseFloat(v) });
    },
    [set],
  );

  /* Тип баннера */
  const onBannerTypeChange = useCallback(
    (t: string) => {
      set({
        bannerType: t as AprilCardAppearanceState['bannerType'],
        bannerText: '',
        bannerImageName: '',
        bannerImageUrl: '',
      });
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
        setObjectUrl(null);
      }
    },
    [set, objectUrl],
  );

  /* Иконка баннера */
  const onBannerIconChange = useCallback(
    (v: string | null) => {
      if (v) set({ bannerIcon: v });
    },
    [set],
  );

  /* Текст баннера */
  const onBannerTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => set({ bannerText: e.target.value }),
    [set],
  );

  /* Загрузка файла */
  const onFileChange = useCallback(
    (file: File | null) => {
      if (!file) return;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
      const url = URL.createObjectURL(file);
      setObjectUrl(url);
      set({ bannerImageName: file.name, bannerImageUrl: url });
    },
    [set, objectUrl],
  );

  /* Очистка файла */
  const onClearFile = useCallback(() => {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }
    set({ bannerImageName: '', bannerImageUrl: '' });
  }, [set, objectUrl]);

  /* Вычисляемые значения для селеКТов */
  const patternValue = useMemo(
    () => (value.pattern || '') as string,
    [value.pattern],
  );

  const opacityValue = useMemo(
    () => String(value.patternOpacity),
    [value.patternOpacity],
  );

  const scaleValue = useMemo(() => String(value.patternScale), [value.patternScale]);
  const ratioValue = useMemo(() => String(value.patternRatio), [value.patternRatio]);

  const showRatio = value.pattern === 'stripes' || value.pattern === 'cross';

  return (
    <Stack className={className} style={style} gap="md">
      {/* 1. Режим цвета */}
      <Box>
        <Text size="xs" fw={500} mb="xs" c="dimmed">
          Режим цвета
        </Text>
        <SegmentedControl
          data={[
            { label: 'Заливка', value: 'solid' },
            { label: 'Градиент', value: 'gradient' },
          ]}
          value={value.colorMode}
          onChange={onColorModeChange}
        />
      </Box>

      {/* 2. Цвет 1 */}
      <ColorSwatches
        colors={APRIL_CARD_APPEARANCE_COLORS}
        active={value.color}
        onChange={onColor1}
        label="Цвет 1"
      />

      {/* 3. Цвет 2 (только gradient) */}
      {value.colorMode === 'gradient' && (
        <ColorSwatches
          colors={APRIL_CARD_APPEARANCE_COLORS}
          active={value.color2 ?? APRIL_CARD_APPEARANCE_COLORS[0]}
          onChange={onColor2}
          label="Цвет 2"
        />
      )}

      {/* 4. Узор */}
      <Box>
        <Text size="xs" fw={500} mb="xs" c="dimmed">
          Узор
        </Text>
        <Select
          data={PATTERN_OPTIONS}
          value={patternValue}
          onChange={onPatternChange}
          allowDeselect={false}
        />
      </Box>

      {/* 5. Прозрачность */}
      <Box>
        <Text size="xs" fw={500} mb="xs" c="dimmed">
          Прозрачность узора
        </Text>
        <Select
          data={OPACITY_OPTIONS}
          value={opacityValue}
          onChange={onOpacityChange}
          allowDeselect={false}
        />
      </Box>

      {/* 6. Масштаб */}
      <Box>
        <Text size="xs" fw={500} mb="xs" c="dimmed">
          Масштаб
        </Text>
        <Select
          data={SCALE_OPTIONS}
          value={scaleValue}
          onChange={onScaleChange}
          allowDeselect={false}
        />
      </Box>

      {/* 7. Соотношение (только stripes/cross) */}
      {showRatio && (
        <Box>
          <Text size="xs" fw={500} mb="xs" c="dimmed">
            Соотношение
          </Text>
          <Select
            data={RATIO_OPTIONS}
            value={ratioValue}
            onChange={onRatioChange}
            allowDeselect={false}
          />
        </Box>
      )}

      {/* 8. Контент баннера */}
      <Box>
        <Text size="xs" fw={500} mb="xs" c="dimmed">
          Контент баннера
        </Text>
        <SegmentedControl
          data={BANNER_TYPE_OPTIONS}
          value={value.bannerType}
          onChange={onBannerTypeChange}
        />
      </Box>

      {/* 9. Иконка (только bannerType='icon') */}
      {value.bannerType === 'icon' && (
        <AprilIconPicker
          value={value.bannerIcon}
          onChange={onBannerIconChange}
        />
      )}

      {/* 10. Текст (только bannerType='text') */}
      {value.bannerType === 'text' && (
        <Box>
          <Text size="xs" fw={500} mb="xs" c="dimmed">
            Текст на баннере
          </Text>
          <TextInput
            value={value.bannerText}
            onChange={onBannerTextChange}
            placeholder="Акция!"
          />

          <Group mt="sm" gap="sm">
            <Box style={{ flex: 1 }}>
              <Text size="xs" fw={500} mb="xs" c="dimmed">
                Размер
              </Text>
              <Select
                data={TEXT_SIZE_OPTIONS}
                value={String(value.bannerTextSize)}
                onChange={(v) => { if (v) set({ bannerTextSize: parseFloat(v) }); }}
                allowDeselect={false}
              />
            </Box>

            <Box style={{ flex: 1 }}>
              <Text size="xs" fw={500} mb="xs" c="dimmed">
                Прозрачность
              </Text>
              <Select
                data={TEXT_OPACITY_OPTIONS}
                value={String(value.bannerTextOpacity)}
                onChange={(v) => { if (v) set({ bannerTextOpacity: parseFloat(v) }); }}
                allowDeselect={false}
              />
            </Box>

            <Box style={{ flexShrink: 0 }}>
              <Text size="xs" fw={500} mb="xs" c="dimmed">
                Цвет
              </Text>
              <Popover width={220} position="top" withArrow shadow="md">
                <Popover.Target>
                  <Tooltip label="Цвет текста">
                    <ActionIcon
                      variant="default"
                      aria-label="Цвет текста баннера"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        border: '2px solid var(--mantine-color-gray-3)',
                        background: value.bannerTextColor,
                      }}
                    />
                  </Tooltip>
                </Popover.Target>
                <Popover.Dropdown>
                  <ColorPicker
                    format="hex"
                    value={value.bannerTextColor}
                    onChange={(c) => set({ bannerTextColor: c })}
                    withPicker
                    fullWidth
                  />
                </Popover.Dropdown>
              </Popover>
            </Box>
          </Group>
        </Box>
      )}

      {/* 11. Изображение (только bannerType='image') */}
      {value.bannerType === 'image' && (
        <Box>
          <Text size="xs" fw={500} mb="xs" c="dimmed">
            Изображение
          </Text>
          <Group wrap="nowrap" gap="sm" align="flex-start">
            <FileInput
              placeholder="Выберите изображение"
              accept="image/*"
              onChange={onFileChange}
              label={null}
              style={{ flex: 1 }}
            />
            {value.bannerImageUrl && (
              <Button
                variant="subtle"
                color="red"
                size="xs"
                onClick={onClearFile}
                aria-label="Удалить изображение"
              >
                ✕
              </Button>
            )}
          </Group>
          {value.bannerImageName && (
            <Text size="xs" c="dimmed" mt="xs">
              Файл: {value.bannerImageName}
            </Text>
          )}
        </Box>
      )}
    </Stack>
  );
}
