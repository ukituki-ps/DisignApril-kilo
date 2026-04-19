import {
  Box,
  Card,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useComputedColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { useDensity } from '../DensityContext';

export type AprilEcosystemSimpleCardItem = {
  letter: string;
  title: string;
  product: string;
  description: string;
};

export type AprilEcosystemSimpleCardsProps = {
  cards: readonly AprilEcosystemSimpleCardItem[];
};

/**
 * Сетка карточек «Simple Info Card»: верхняя зона teal, крупная латинская буква, заголовок, продукт, описание.
 * Раскладка и тема согласованы с витриной (CardsSection).
 */
export function AprilEcosystemSimpleCards({ cards }: AprilEcosystemSimpleCardsProps) {
  const { density } = useDensity();
  const computedColorScheme = useComputedColorScheme('light');
  const theme = useMantineTheme();
  const isCompact = density === 'compact';
  const p = isCompact ? 'sm' : 'md';

  const sectionBg =
    computedColorScheme === 'dark' ? theme.colors.teal[9] : theme.colors.teal[1];
  const letterColor =
    computedColorScheme === 'dark' ? theme.colors.teal[2] : theme.colors.teal[8];

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
      {cards.map((item) => {
        const titleId = `ecosystem-card-title-${item.letter}-${item.product}`;
        return (
          <Card
            key={`${item.letter}-${item.product}`}
            component="article"
            shadow="sm"
            padding={0}
            radius="md"
            withBorder
            aria-labelledby={titleId}
          >
            <Card.Section>
              <Box
                aria-hidden
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: isCompact ? 100 : 120,
                  backgroundColor: sectionBg,
                }}
              >
                <Text
                  fz={isCompact ? 48 : 56}
                  fw={900}
                  lh={1}
                  style={{
                    color: letterColor,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {item.letter}
                </Text>
              </Box>
            </Card.Section>

            <Stack gap="xs" p={p}>
              <Title order={3} id={titleId} size={isCompact ? 'h5' : 'h4'}>
                {item.title}
              </Title>
              <Text size="xs" c="teal" fw={600}>
                {item.product}
              </Text>
              <Text size="sm" c="dimmed">
                {item.description}
              </Text>
            </Stack>
          </Card>
        );
      })}
    </SimpleGrid>
  );
}
