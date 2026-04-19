import { Stack } from '@mantine/core';
import {
  AprilEcosystemSimpleCards,
  type AprilEcosystemSimpleCardItem,
} from './AprilEcosystemSimpleCards';

const ECOSYSTEM_CARDS: readonly AprilEcosystemSimpleCardItem[] = [
  {
    letter: 'W',
    title: 'Процессы',
    product: 'AprilWorkFlow',
    description: 'Моделирование и исполнение бизнес-процессов.',
  },
  {
    letter: 'N',
    title: 'Коммуникации',
    product: 'AprilNFlow',
    description: 'Каналы уведомлений и согласований.',
  },
  {
    letter: 'O',
    title: 'Структура',
    product: 'AprilOrgFlow',
    description: 'Оргструктура и иерархия под задачи компании.',
  },
  {
    letter: 'P',
    title: 'Профиль',
    product: 'AprilProfile',
    description: 'Профили людей, роли и контекст доступа.',
  },
  {
    letter: 'I',
    title: 'Интеграции',
    product: 'AprilEDC',
    description: 'Внешний контур данных и обмен с системами.',
  },
  {
    letter: 'R',
    title: 'Отчётность',
    product: 'AprilReport',
    description: 'Регулярная и ad-hoc отчётность по процессам и данным.',
  },
];

export function CardsSection() {
  return (
    <Stack gap="xl">
      <AprilEcosystemSimpleCards cards={ECOSYSTEM_CARDS} />
    </Stack>
  );
}
