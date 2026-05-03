import type { LucideIcon } from 'lucide-react';

export interface CardListColumnItem {
  id: string;
  title: string;
  description?: string;
  searchText?: string;
  status?: string;
  createdAt?: string;
  /** URL изображения для аватара в списке и сетке. */
  imageUrl?: string;
  /** Иконка в аватаре, если нет `imageUrl`. */
  avatarIcon?: LucideIcon;
}
