import type { ReactNode } from 'react';
import { Box, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

/** Элемент таба в верхней навигации. */
export interface TopTabItem {
  /** Уникальный ключ таба. */
  key: string;
  /** Текстовая подпись. */
  label: string;
  /** Опциональная иконка слева от текста. */
  icon?: ReactNode;
}

export interface TopTabNavigationProps {
  /** Список табов. */
  items: TopTabItem[];
  /** Ключ активного таба. */
  activeKey: string;
  /** Callback при смене таба. */
  onChange: (key: string) => void;
  /** Слот справа — действия / пользовательский контент. */
  rightSection?: ReactNode;
  /** Логотип / бренд слева. */
  logo?: ReactNode;
  /** Высота панели. По умолчанию 58px. */
  height?: string | number;
  /** Sticky-панель. По умолчанию true. */
  sticky?: boolean;
}

/* ──────────────────────────────────────────── */

const NAV_HEIGHT = 58;
const NAV_Z_INDEX = 100;

/**
 * TopTabNavigation — горизонтальная навигация в header.
 *
 * Альтернатива sidebar для ЛК физлица:
 *   logo (left) | tabs (center, flex: 1) | rightSection (margin-left: auto)
 *
 * Цвета — из Mantine theme:
 *   active borderBottom → theme.colors.teal[6]
 *   hover color          → theme.colors.green[6]
 *   inactive color       → theme.colors.dimensions[5]  (muted)
 *   text color (active)  → theme.colors.text
 *   borderBottom panel   → theme.colors.gray[2]
 *
 * Мобильный fallback:
 *   <768px — тексты табов скрыты, остаются только иконки.
 *   <480px — табы полностью скрыты (приложение использует AprilMobileShellBar).
 */
export function TopTabNavigation({
  items,
  activeKey,
  onChange,
  rightSection,
  logo,
  height: heightProp,
  sticky = true,
}: TopTabNavigationProps) {
  const theme = useMantineTheme();
  const isSmall = useMediaQuery('(max-width: 767px)');
  const isXSmall = useMediaQuery('(max-width: 479px)');

  const h = heightProp ?? NAV_HEIGHT;

  const borderColor = theme.colors.gray[2];
  const activeBorderColor = theme.colors.teal[6];
  const hoverColor = theme.colors.green[6];
  const mutedColor = theme.colors.gray[6];
  const textColor = theme.colors.gray[9];

  /* ── Render tab links ─────────────────────── */
  const tabs = !isXSmall ? (
    <nav aria-label="Верхняя навигация" style={{ flex: 1, display: 'flex', overflowX: 'auto' }}>
      <Box
        component="ul"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {items.map((item) => {
          const active = item.key === activeKey;
          const showOnlyIcon = isSmall;

          return (
            <li key={item.key}>
              <button
                type="button"
                role="tab"
                aria-current={active ? 'page' : undefined}
                onClick={() => onChange(item.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '0 14px',
                  height: h,
                  fontSize: 13,
                  fontWeight: active ? 600 : 500,
                  color: active
                    ? (textColor as unknown as string)
                    : (mutedColor as unknown as string),
                  borderBottom: `2px solid ${active ? activeBorderColor : 'transparent'}`,
                  background: 'transparent',
                  border: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderTop: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.15s, border-bottom-color 0.15s',
                  fontFamily: 'inherit',
                  whiteSpace: 'nowrap',
                  /* Когда тексты скрыты — центрируем иконку */
                  justifyContent: showOnlyIcon ? 'center' : 'flex-start',
                  minWidth: showOnlyIcon ? h : undefined,
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = hoverColor as unknown as string;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = mutedColor as unknown as string;
                  }
                }}
              >
                {item.icon && showOnlyIcon ? (
                  <span aria-hidden>{item.icon}</span>
                ) : (
                  <>
                    {item.icon && <span aria-hidden>{item.icon}</span>}
                    <span>{item.label}</span>
                  </>
                )}
              </button>
            </li>
          );
        })}
      </Box>
    </nav>
  ) : null;

  /* ── Shell ────────────────────────────────── */
  return (
    <Box
      style={{
        position: sticky ? 'sticky' : 'relative',
        top: sticky ? 0 : undefined,
        zIndex: NAV_Z_INDEX,
        borderBottom: `1px solid ${borderColor}`,
        backgroundColor: 'var(--mantine-color-body)',
      }}
    >
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          height: h,
          padding: '0 16px',
        }}
      >
        {logo && <Box className="nav-logo">{logo}</Box>}

        {tabs}

        {rightSection && (
          <Box ml="auto" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {rightSection}
          </Box>
        )}
      </Box>
    </Box>
  );
}
