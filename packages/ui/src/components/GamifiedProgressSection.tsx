import { Award, Star, Trophy, Zap } from 'lucide-react';
import { Box, Stack, Text } from '@mantine/core';
import { GamifiedProgress } from './GamifiedProgress';

export function GamifiedProgressSection() {
  return (
    <Stack gap="xl">
      {/* Basic: progress с иконкой */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Базовый (3/5 с иконкой)
        </Text>
        <GamifiedProgress
          value={3}
          max={5}
          label="Посещения фитнеса"
          icon={<Award size={20} aria-hidden />}
        />
      </Stack>

      {/* Completed: 5/5 с accent подсветкой */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Завершён (5/5, accent подсветка)
        </Text>
        <GamifiedProgress
          value={5}
          max={5}
          label="Курс пройден!"
          icon={<Trophy size={20} aria-hidden />}
        />
      </Stack>

      {/* Без иконки */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Без иконки
        </Text>
        <GamifiedProgress
          value={2}
          max={10}
          label="Прогресс чтения"
        />
      </Stack>

      {/* Zero value */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Нулевой прогресс (0/5)
        </Text>
        <GamifiedProgress
          value={0}
          max={5}
          label="Нет прогресса"
          icon={<Zap size={20} aria-hidden />}
        />
      </Stack>

      {/* Размеры: sm / md / lg */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Размеры (sm / md / lg)
        </Text>
        <Stack gap="md">
          <GamifiedProgress
            value={2}
            max={5}
            size="sm"
            icon={<Star size={18} aria-hidden />}
            label="Маленький"
          />
          <GamifiedProgress
            value={3}
            max={5}
            size="md"
            icon={<Star size={22} aria-hidden />}
            label="Средний"
          />
          <GamifiedProgress
            value={4}
            max={5}
            size="lg"
            icon={<Star size={24} aria-hidden />}
            label="Большой"
          />
        </Stack>
      </Stack>

      {/* Разные цвета */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Цвета
        </Text>
        <Stack gap="md">
          <GamifiedProgress
            value={3}
            max={5}
            color="teal"
            label="Teal (по умолчанию)"
            icon={<Award size={20} aria-hidden />}
          />
          <GamifiedProgress
            value={4}
            max={5}
            color="orange"
            label="Orange"
            icon={<Zap size={20} aria-hidden />}
          />
          <GamifiedProgress
            value={5}
            max={5}
            color="blue"
            label="Blue (завершён)"
            icon={<Trophy size={20} aria-hidden />}
          />
        </Stack>
      </Stack>

      {/* Без showValue */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Без значения (showValue=false)
        </Text>
        <GamifiedProgress
          value={3}
          max={5}
          showValue={false}
          label="Только прогресс-бар"
          icon={<Star size={20} aria-hidden />}
        />
      </Stack>

      {/* Mobile preview: вертикальная ориентация */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Mobile preview (вертикальная ориентация)
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
          <Stack gap="md">
            <GamifiedProgress
              value={3}
              max={5}
              label="Посещения фитнеса"
              icon={<Award size={20} aria-hidden />}
            />
            <GamifiedProgress
              value={5}
              max={5}
              label="Курс пройден!"
              icon={<Trophy size={20} aria-hidden />}
            />
            <GamifiedProgress
              value={0}
              max={8}
              label="Нет активности"
              icon={<Zap size={20} aria-hidden />}
            />
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}
