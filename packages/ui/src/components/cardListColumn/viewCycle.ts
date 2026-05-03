export type CardListColumnView = 'list' | 'grid';

const VIEW_ORDER: CardListColumnView[] = ['list', 'grid'];

export function getNextCardListColumnView(current: CardListColumnView): CardListColumnView {
  const i = VIEW_ORDER.indexOf(current);
  return VIEW_ORDER[(i + 1) % VIEW_ORDER.length];
}

/** Короткое имя следующего вида для `aria-label` / тултипа. */
export function cardListColumnViewLabelRu(view: CardListColumnView): string {
  switch (view) {
    case 'list':
      return 'список';
    case 'grid':
      return 'сетку карточек';
    default:
      return view;
  }
}
