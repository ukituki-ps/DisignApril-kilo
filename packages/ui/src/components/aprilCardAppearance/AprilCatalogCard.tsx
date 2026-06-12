import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import type { AprilCardAppearanceState, AprilCatalogCardContent, AprilCatalogCardVariant } from './aprilCardAppearance.types';
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

  /** Вариант отображения: каталог, папка, бейдж. */
  variant?: AprilCatalogCardVariant;

  /** Показать футер с ценой и статусом. По умолчанию true. */
  showFooter?: boolean;

  /** Показать статус-бейдж. По умолчанию true. */
  showStatus?: boolean;

  /** Дополнительные CSS-классы. */
  className?: string;

  /** Инлайн-стили. */
  style?: CSSProperties;
}

/**
 * Карточка каталога льгот.
 *
 * Содержит баннер (AprilCardBanner) и тело с названием, категорией, ценой, статусом и плагином.
 *
 * @param variant - вид карточки: 'catalog' (полная), 'folder' (без футера), 'badge' (без футера и статуса)
 * @param showFooter - скрыть/показать футер с ценой и статусом
 * @param showStatus - скрыть/показать статус-бейдж
 */
export function AprilCatalogCard({
  appearance,
  content,
  variant = 'catalog',
  showFooter = true,
  showStatus = true,
  className,
  style,
}: AprilCatalogCardProps) {
  const priceStr = useMemo(
    () => formatPrice(content.price, content.currency, content.period),
    [content.price, content.currency, content.period],
  );

  const statusLabel = STATUS_LABELS[content.status] ?? content.status;

  /* variant переопределяет showFooter/showStatus, если они явно не заданы */
  const isCatalog = variant === 'catalog';
  const renderFooter = showFooter && isCatalog;
  const renderStatus = showStatus && (isCatalog || variant === 'folder');

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
        {renderFooter ? (
          <div className="april-card-footer">
            <span className="april-card-price">{priceStr}</span>
            {renderStatus ? (
              <span className={`april-card-status badge-${content.status}`}>
                {statusLabel}
              </span>
            ) : null}
          </div>
        ) : null}
        {renderStatus && !renderFooter ? (
          <span className={`april-card-status badge-${content.status}`}>
            {statusLabel}
          </span>
        ) : null}
        {content.plugin ? (
          <div className="april-card-plugin">{content.plugin}</div>
        ) : null}
      </div>
    </div>
  );
}
