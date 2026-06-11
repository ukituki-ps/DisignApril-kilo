import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { AprilIcon } from '../../icons/AprilIcon';
import type { AprilCardAppearanceState } from './aprilCardAppearance.types';
import { BANNER_ICONS } from './AprilIconPicker';
import './aprilCardAppearance.css';

/**
 * Разрешает строковое имя иконки в Lucide-компонент.
 * Fallback на Sparkles.
 */
function resolveBannerIcon(name: string) {
  return BANNER_ICONS[name] ?? BANNER_ICONS['sparkles'];
}

/* ─── Компонент ─── */

/** Пропсы компонента AprilCardBanner. */
export interface AprilCardBannerProps {
  /** Настройки внешнего вида карточки. */
  appearance: AprilCardAppearanceState;

  /** Высота баннера в пикселях. По умолчанию 90. */
  height?: number;

  /** Дополнительные CSS-классы. */
  className?: string;

  /** Инлайн-стили. */
  style?: CSSProperties;
}

/**
 * Баннер карточки каталога льгот.
 *
 * Рендерит фон (solid / gradient), CSS-паттерн-оверлей и контент (изображение / иконка / текст).
 */
export function AprilCardBanner({
  appearance,
  height = 90,
  className,
  style,
}: AprilCardBannerProps) {
  /* Фон */
  const bgStyle = useMemo<CSSProperties>(() => {
    if (appearance.colorMode === 'gradient' && appearance.color2) {
      return {
        background: `linear-gradient(135deg, ${appearance.color}, ${appearance.color2})`,
      };
    }
    return { background: appearance.color };
  }, [appearance.color, appearance.color2, appearance.colorMode]);

  /* Паттерн */
  const hasPattern = !!appearance.pattern;
  const patternStyle: React.CSSProperties | undefined = hasPattern
    ? ({
        opacity: appearance.patternOpacity,
        ['--april-pattern-scale' as string]: appearance.patternScale,
        ['--april-pattern-ratio' as string]: appearance.patternRatio,
      } as React.CSSProperties)
    : undefined;

  /* Контент (только один) */
  const bannerContent = useMemo(() => {
    switch (appearance.bannerType) {
      case 'image':
        if (appearance.bannerImageUrl) {
          return (
            <img
              src={appearance.bannerImageUrl}
              alt={appearance.bannerImageName || 'banner'}
              className="april-card-banner-image"
            />
          );
        }
        return null;
      case 'icon': {
        const Icon = resolveBannerIcon(appearance.bannerIcon);
        return (
          <AprilIcon
            icon={Icon}
            size={36}
            className="april-card-banner-icon"
            aria-label={appearance.bannerIcon}
          />
        );
      }
      case 'text':
        if (appearance.bannerText) {
          return (
            <div
              className="april-card-banner-text"
              style={{
                color: appearance.bannerTextColor,
                opacity: appearance.bannerTextOpacity,
                fontSize: `${appearance.bannerTextSize}px`,
              }}
            >
              {appearance.bannerText}
            </div>
          );
        }
        return null;
      default:
        return null;
    }
  }, [appearance]);

  return (
    <div
      className={`april-card-banner ${className ?? ''}`}
      style={{ ...bgStyle, height, ...style }}
    >
      {hasPattern && (
        <div
          className={`april-pattern-overlay april-pattern-${appearance.pattern}`}
          style={patternStyle}
        />
      )}
      {bannerContent}
    </div>
  );
}
