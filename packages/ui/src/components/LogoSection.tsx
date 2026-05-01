import { Stack, SimpleGrid, Box, Text, Paper, Group } from '@mantine/core';
const SVG_FULL = '/logo-full.svg';
const SVG_ICON = '/logo-icon.svg';
const SVG_WORDMARK = '/logo-wordmark.svg';

const ACCENT = '#12B886';
export function LogoSection() {
  return (
    <Stack gap="xl">
      <Box>
        <Text fw={500} size="sm" mb="md">
          Основной вариант (бирюзовый акцент)
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
          <LogoCard
            label="Полный логотип"
            description="Основной знак. Маркетинг, экран входа, документы."
            src={SVG_FULL}
            width={220}
            color={ACCENT}
            bg="var(--mantine-color-gray-0)"
          />
          <LogoCard
            label="Только значок"
            description="Компактный знак: фавикон, иконка приложения, аватар."
            src={SVG_ICON}
            width={72}
            color={ACCENT}
            bg="var(--mantine-color-gray-0)"
          />
          <LogoCard
            label="Словесный знак"
            description="Текстовый вариант для шапок, навигации, встроенных ссылок."
            src={SVG_WORDMARK}
            width={180}
            color={ACCENT}
            bg="var(--mantine-color-gray-0)"
          />
        </SimpleGrid>
      </Box>

      <Box>
        <Text fw={500} size="sm" mb="md">
          На тёмном фоне
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
          <LogoCard
            label="Полный логотип"
            description="Белый вариант для тёмных поверхностей."
            src={SVG_FULL}
            width={220}
            color="#FFFFFF"
            bg="#1A1B1E"
          />
          <LogoCard
            label="Только значок"
            description="Белый значок на тёмном фоне."
            src={SVG_ICON}
            width={72}
            color="#FFFFFF"
            bg="#1A1B1E"
          />
          <LogoCard
            label="Словесный знак"
            description="Белый словесный знак на тёмном фоне."
            src={SVG_WORDMARK}
            width={180}
            color="#FFFFFF"
            bg="#1A1B1E"
          />
        </SimpleGrid>
      </Box>

      <Box>
        <Text fw={500} size="sm" mb="md">
          Монохром (тёмный на светлом)
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
          <LogoCard
            label="Полный логотип"
            description="Один цвет для печати и официальных документов."
            src={SVG_FULL}
            width={220}
            color="#212529"
            bg="#F8F9FA"
          />
          <LogoCard
            label="Только значок"
            description="Монохромный значок."
            src={SVG_ICON}
            width={72}
            color="#212529"
            bg="#F8F9FA"
          />
          <LogoCard
            label="Словесный знак"
            description="Монохромный словесный знак."
            src={SVG_WORDMARK}
            width={180}
            color="#212529"
            bg="#F8F9FA"
          />
        </SimpleGrid>
      </Box>

      <Stack gap="xs">
        <Text fw={500} size="sm">
          Рекомендации
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <Box>
            <Text size="sm" c="dimmed">
              ✅ Основной цвет: бирюза (#12B886) — предпочтительно для всех цифровых носителей.
            </Text>
            <Text size="sm" c="dimmed">
              ✅ Белый вариант на тёмных фонах (тёмная тема, фото).
            </Text>
            <Text size="sm" c="dimmed">
              ✅ Монохром для печати, факса, официальных бумаг.
            </Text>
            <Text size="sm" c="dimmed">
              ✅ Минимальное свободное поле: не меньше высоты значка со всех сторон.
            </Text>
          </Box>
          <Box>
            <Text size="sm" c="dimmed">
              ❌ Не использовать градиенты и произвольные цвета на логотипе.
            </Text>
            <Text size="sm" c="dimmed">
              ❌ Не растягивать, не поворачивать и не добавлять эффекты.
            </Text>
            <Text size="sm" c="dimmed">
              ❌ Не размещать на «шумном» фоне без контейнера.
            </Text>
            <Text size="sm" c="dimmed">
              ❌ Не использовать словесный знак один при размере крупнее 48px.
            </Text>
          </Box>
        </SimpleGrid>
      </Stack>
    </Stack>
  );
}
function LogoCard({
  label,
  description,
  src,
  width,
  color,
  bg,
}: {
  label: string;
  description: string;
  src: string;
  width: number;
  color: string;
  bg: string;
}) {
  return (
    <Stack gap="sm">
      <Paper
        p="xl"
        radius="md"
        style={{
          border: '1px dashed var(--mantine-color-default-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 140,
          backgroundColor: bg,
          color: color,
        }}>
        <img
          src={src}
          alt={label}
          style={{
            height: 72,
            width: width,
            objectFit: 'contain',
            filter:
              color === '#FFFFFF'
                ? 'brightness(0) saturate(100%) invert(1)'
                : color === '#12B886'
                  ? 'brightness(0) saturate(100%) invert(65%) sepia(51%) saturate(552%) hue-rotate(118deg) brightness(92%) contrast(87%)'
                  : 'brightness(0) saturate(100%)',
          }}
        />
      </Paper>
      <Group gap="xs" align="center">
        <Box
          w={12}
          h={12}
          style={{
            borderRadius: 2,
            backgroundColor: color,
            border: '1px solid var(--mantine-color-default-border)',
          }}
        />
        <Text size="xs" c="dimmed" style={{ fontFamily: 'monospace' }}>
          {color}
        </Text>
      </Group>
      <Box>
        <Text fw={500} size="sm">
          {label}
        </Text>
        <Text size="xs" c="dimmed">
          {description}
        </Text>
      </Box>
    </Stack>
  );
}
