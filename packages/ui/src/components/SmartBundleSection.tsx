import { useState } from 'react';
import { Box, Stack, Text } from '@mantine/core';
import {
  Brain,
  Dumbbell,
  HeartPulse,
  ShieldPlus,
  Smile,
  Users,
} from 'lucide-react';
import { SmartBundle } from './SmartBundle';

export function SmartBundleSection() {
  const [added, setAdded] = useState<string | null>(null);

  return (
    <Stack gap="xl">
      {/* Basic: пакет с 3 items, без скидки */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Базовый пакет (3 элемента)
        </Text>
        <SmartBundle
          title="Семейный пакет"
          description="ДМС, фитнес и стоматология для всей семьи"
          items={[
            {
              id: 'family-dms',
              name: 'ДМС — Базовая программа',
              status: 'active',
              icon: <HeartPulse size={18} aria-hidden />,
              price: 'Включено в пакет',
            },
            {
              id: 'family-fitness',
              name: 'Фитнес — World Class',
              status: 'available',
              icon: <Dumbbell size={18} aria-hidden />,
              price: '500 баллов / мес',
            },
            {
              id: 'family-dental',
              name: 'Стоматология',
              status: 'available',
              icon: <Smile size={18} aria-hidden />,
              price: '950 баллов / год',
            },
          ]}
          bundlePrice="12 000 ₽ / год"
          defaultExpanded={true}
          onAddBundle={() => setAdded('family')}
        />
        {added === 'family' && (
          <Text size="xs" c="teal">
            ✓ Семейный пакет добавлен
          </Text>
        )}
      </Stack>

      {/* Discounted: пакет со скидкой 30% */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Пакет со скидкой 30%
        </Text>
        <SmartBundle
          title="Спорт"
          description="Расширенный спортивный пакет с персональным тренером"
          items={[
            {
              id: 'sport-gym',
              name: 'Тренажёрный зал',
              status: 'active',
              icon: <Dumbbell size={18} aria-hidden />,
              price: '3 000 ₽ / мес',
            },
            {
              id: 'sport-pool',
              name: 'Бассейн',
              status: 'active',
              icon: <HeartPulse size={18} aria-hidden />,
              price: '1 500 ₽ / мес',
            },
            {
              id: 'sport-trainer',
              name: 'Персональный тренер',
              status: 'available',
              icon: <Brain size={18} aria-hidden />,
              price: '5 000 ₽ / мес',
            },
            {
              id: 'sport-sauna',
              name: 'Сауна',
              status: 'available',
              icon: <Smile size={18} aria-hidden />,
              price: '800 ₽ / мес',
            },
          ]}
          bundlePrice="7 000 ₽ / мес"
          isDiscounted
          discountPercent={30}
          defaultExpanded={true}
          onAddBundle={() => setAdded('sport')}
        />
        {added === 'sport' && (
          <Text size="xs" c="teal">
            ✓ Спорт добавлен
          </Text>
        )}
      </Stack>

      {/* Expanded/collapsed states: свёрнутый пакет */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Свёрнутое состояние (нажмите для раскрытия)
        </Text>
        <SmartBundle
          title="Для новичков"
          description="Базовые льготы для старта"
          items={[
            {
              id: 'newbie-dms',
              name: 'ДМС — Лёгкая программа',
              status: 'available',
              icon: <ShieldPlus size={18} aria-hidden />,
              price: '1 200 ₽ / мес',
            },
            {
              id: 'newbie-psych',
              name: 'Психолог онлайн',
              status: 'available',
              icon: <Brain size={18} aria-hidden />,
              price: '600 баллов',
            },
            {
              id: 'newbie-family',
              name: 'ДМС Семья',
              status: 'available',
              icon: <Users size={18} aria-hidden />,
              price: 'от 1 800 ₽ / мес',
            },
          ]}
          bundlePrice="3 500 ₽ / мес"
          defaultExpanded={false}
          onAddBundle={() => setAdded('newbie')}
        />
        {added === 'newbie' && (
          <Text size="xs" c="teal">
            ✓ Для новичков добавлен
          </Text>
        )}
      </Stack>

      {/* Mobile preview: свёрнуто по умолчанию, раскрытие по тапу */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Mobile preview (свёрнуто по умолчанию)
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
          <SmartBundle
            title="Мобильный пакет"
            description="Компактный пакет для мобильного просмотра"
            items={[
              {
                id: 'mob-dms',
                name: 'ДМС',
                status: 'active',
                icon: <HeartPulse size={18} aria-hidden />,
                price: 'Включено',
              },
              {
                id: 'mob-fitness',
                name: 'Фитнес',
                status: 'available',
                icon: <Dumbbell size={18} aria-hidden />,
                price: '500 баллов',
              },
              {
                id: 'mob-dental',
                name: 'Стоматология',
                status: 'expired',
                icon: <Smile size={18} aria-hidden />,
                included: false,
              },
            ]}
            bundlePrice="5 000 ₽"
            isDiscounted
            discountPercent={20}
            onAddBundle={() => setAdded('mobile')}
          />
        </Box>
        {added === 'mobile' && (
          <Text size="xs" c="teal" ta="center">
            ✓ Мобильный пакет добавлен
          </Text>
        )}
      </Stack>
    </Stack>
  );
}
