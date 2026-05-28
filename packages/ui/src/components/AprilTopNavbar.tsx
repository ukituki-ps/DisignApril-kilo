import type { ReactNode } from 'react';
import { Box, useMantineTheme, useComputedColorScheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

/** Элемент таба в верхней навигации. */
export interface AprilTopNavbarItem {
  /** Уникальный ключ таба. */
  key: string;
  /** Текстовая подпись. */
  label: string;
  /** Опциональная иконка слева от текста. */
  icon?: ReactNode;
}

export interface AprilTopNavbarProps {
  /** Логотип слева (SVG, иконка, ReactNode). Кликабельный → onClickLogo. */
  logo: ReactNode;
  /** Callback при клике на логотип (часто — переход на главную). */
  onClickLogo?: () => void;
  /** Табы навигации. */
  tabs: AprilTopNavbarItem[];
  /** Ключ активного таба. */
  activeTab: string;
  /** Callback при смене таба. */
  onTabChange: (key: string) => void;
  /** Правый слот: баланс, уведомления, аватар и т.д. */
  rightSection?: ReactNode;
  /** Максимальная ширина контейнера. По умолчанию 1100px. */
  maxWidth?: string | number;
  /** Высота панели. По умолчанию 58px. */
  height?: string | number;
  /** Sticky-панель. По умолчанию true. */
  sticky?: boolean;
}

/* ──────────────────────────────────────────── */

const NAV_HEIGHT = 58;
const NAV_Z_INDEX = 100;

/**
 * AprilTopNavbar — sticky-панель «хеддер + навбар» для портальных приложений.
 *
 * Layout:  logo (left) | tabs (center, flex: 1) | rightSection (margin-left: auto)
 *
 * Альтернатива sidebar-layout для ЛК, портальных приложений:
 *   — единая строка с логотипом, табами и действиями
 *   — max-width контейнер (по умолчанию 1100px)
 *   — underline-индикатор активного таба (teal)
 *
 * Цвета — из Mantine theme (адаптивные к light/dark):
 *   active borderBottom → theme.colors.teal[6]
 *   hover color          → theme.colors.green[6]
 *   inactive (light)     → theme.colors.gray[6]  / (dark) → theme.colors.dark[2]
 *   text active (light)  → theme.colors.gray[9]  / (dark) → theme.colors.dark[0]
 *   borderBottom panel   → theme.colors.gray[2]  / (dark) → theme.colors.dark[4]
 *
 * Мобильный fallback:
 *   <768px — тексты табов скрыты, остаются только иконки.
 *   <480px — табы полностью скрыты (приложение использует AprilMobileShellBar).
 */
export function AprilTopNavbar({
  logo,
  onClickLogo,
  tabs,
  activeTab,
  onTabChange,
  rightSection,
  maxWidth = 1100,
  height: heightProp,
  sticky = true,
}: AprilTopNavbarProps) {
  const theme = useMantineTheme();
  const isSmall = useMediaQuery('(max-width: 767px)');
  const isXSmall = useMediaQuery('(max-width: 479px)');
  const colorScheme = useComputedColorScheme('light');
  const isDark = colorScheme === 'dark';

  const h = heightProp ?? NAV_HEIGHT;

  // Цвета, адаптивные к light/dark теме
  const borderColor = isDark ? theme.colors.dark[4] : theme.colors.gray[2];
  const activeBorderColor = theme.colors.teal[6];
  const hoverColor = theme.colors.green[6];
  const mutedColor = isDark ? theme.colors.dark[2] : theme.colors.gray[6];
  const textColor = isDark ? theme.colors.dark[0] : theme.colors.gray[9];

  /* ── Render tab links ─────────────────────── */
  const tabsContent = !isXSmall ? (
    <nav aria-label="Основная навигация" style={{ flex: 1, display: 'flex', overflowX: 'auto' }}>
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
        {tabs.map((item) => {
          const active = item.key === activeTab;
          const showOnlyIcon = isSmall;

          return (
            <li key={item.key}>
              <button
                type="button"
                role="tab"
                aria-current={active ? 'page' : undefined}
                onClick={() => onTabChange(item.key)}
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
      component="header"
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
          maxWidth: maxWidth,
          margin: '0 auto',
          padding: '0 28px',
          display: 'flex',
          alignItems: 'center',
          height: h,
        }}
      >
        {/* Logo */}
        {onClickLogo ? (
          <Box
            component="button"
            type="button"
            onClick={onClickLogo}
            style={{
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              marginRight: 32,
              lineHeight: 0,
            }}
            aria-label="На главную"
          >
            {logo}
          </Box>
        ) : (
          <Box
            style={{
              flexShrink: 0,
              marginRight: 32,
              lineHeight: 0,
            }}
          >
            {logo}
          </Box>
        )}

        {/* Tabs */}
        {tabsContent}

        {/* Right section */}
        {rightSection && (
          <Box
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flexShrink: 0,
            }}
          >
            {rightSection}
          </Box>
        )}
      </Box>
    </Box>
  );
}
