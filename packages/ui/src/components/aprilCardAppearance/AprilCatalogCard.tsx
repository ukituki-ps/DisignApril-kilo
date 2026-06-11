import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import type { AprilCardAppearanceState, AprilCatalogCardContent } from './aprilCardAppearance.types';
import { AprilCardBanner } from './AprilCardBanner';
import './aprilCardAppearance.css';

/* ─── Форматтеры ─── */

const PERIOD_LABELS: Record<string, string> = {
  monthly: '/мес',
  yearly: '/год',
  'one-time': '',
  daily: '/день',
};

const STATUS_LABELS: Record<string, string> = {
  active: 'Активен',
  draft: 'Черновик',
  archived: 'Архив',
};

/** Форматирует цену с валютой и периодом. */
function formatPrice(
  price: number | undefined,
  currency: string | undefined,
  period: string | undefined,
): string {
  if (currency === 'included') return 'Включено';
  const periodSuffix = PERIOD_LABELS[period ?? 'one-time'] ?? '';

  switch (currency) {
    case 'points':
      return `${price} баллов${periodSuffix}`;
    case 'rub':
      return `${price} ₽${periodSuffix}`;
    default:
      return `${price ?? 0}${periodSuffix}`;
  }
}

/* ─── Компонент ─── */

/** Пропсы компонента AprilCatalogCard. */
export interface AprilCatalogCardProps {
  /** Настройки внешнего вида баннера. */
  appearance: AprilCardAppearanceState;

  /** Данные тела карточки. */
  content: AprilCatalogCardContent;

  /** Дополнительные CSS-классы. */
  className?: string;

  /** Инлайн-стили. */
  style?: CSSProperties;
}

/**
 * Карточка каталога льгот.
 *
 * Содержит баннер (AprilCardBanner) и тело с названием, категорией, ценой, статусом и плагином.
 */
export function AprilCatalogCard({
  appearance,
  content,
  className,
  style,
}: AprilCatalogCardProps) {
  const priceStr = useMemo(
    () => formatPrice(content.price, content.currency, content.period),
    [content.price, content.currency, content.period],
  );

  const statusLabel = STATUS_LABELS[content.status] ?? content.status;

  return (
    <div
      className={`april-card-catalog ${className ?? ''}`}
      style={style}
      onClick={content.onClick}
      role={content.onClick ? 'button' : undefined}
      tabIndex={content.onClick ? 0 : undefined}
      onKeyDown={
        content.onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                content.onClick?.();
              }
            }
          : undefined
      }
    >
      <AprilCardBanner appearance={appearance} />
      <div className="april-card-body">
        <div className="april-card-name">{content.name}</div>
        {content.category ? (
          <div className="april-card-category">{content.category}</div>
        ) : null}
        <div className="april-card-footer">
          <span className="april-card-price">{priceStr}</span>
          <span className={`april-card-status badge-${content.status}`}>
            {statusLabel}
          </span>
        </div>
        {content.plugin ? (
          <div className="april-card-plugin">{content.plugin}</div>
        ) : null}
      </div>
    </div>
  );
}
