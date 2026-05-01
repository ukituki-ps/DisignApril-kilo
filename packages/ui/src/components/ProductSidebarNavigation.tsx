import type { ComponentType, MouseEvent } from "react";
import { useState } from "react";
import {
  Box,
  NavLink,
  Stack,
  Text,
  Badge,
  Divider,
  Group,
  ScrollArea,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { SettingsIcon, ChevronLeftIcon, ChevronRightIcon, type LucideIcon } from "lucide-react";
import { useDensity } from "../DensityContext";

export type ProductSidebarNavEntry =
  | {
      id: string;
      type: "link";
      label: string;
      icon: LucideIcon | ComponentType<{ size?: number }>;
      href: string;
      badge?: string;
    }
  | {
      id: string;
      type: "divider";
      label: string;
    };

export type ProductSidebarNavigationLabels = {
  settings: string;
  expandSidebar: string;
  collapseSidebar: string;
};

const DEFAULT_SIDEBAR_LABELS: ProductSidebarNavigationLabels = {
  settings: "Настройки",
  expandSidebar: "Развернуть панель",
  collapseSidebar: "Свернуть панель",
};

export type ProductSidebarNavigationProps = {
  items: ProductSidebarNavEntry[];
  activeId: string;
  labels?: Partial<ProductSidebarNavigationLabels>;
  /**
   * Режим демо без навигации (UIKit): блокируем переход по `href`,
   * вызываем обработчик — родитель управляет выбранным пунктом.
   */
  onDemoActivate?: (id: string) => void;
};

/**
 * Колонка «3. Sidebar» из Design System Reference: схлопывание, иконки, ScrollArea.
 */
export function ProductSidebarNavigation({
  items,
  activeId,
  labels: labelsProp,
  onDemoActivate,
}: ProductSidebarNavigationProps) {
  const L = { ...DEFAULT_SIDEBAR_LABELS, ...labelsProp };
  const { density } = useDensity();
  const isCompact = density === "compact";
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 60 : isCompact ? 220 : 250;

  return (
    <Box
      component="aside"
      role="navigation"
      style={{
        width: sidebarWidth,
        alignSelf: "stretch",
        minHeight: 0,
        border: "1px solid var(--mantine-color-default-border)",
        borderRadius: "var(--mantine-radius-md)",
        backgroundColor: "var(--mantine-color-body)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "width 200ms ease",
      }}
      aria-label="Основная навигация"
    >
      <Group justify="flex-end" p="xs" style={{ borderBottom: "1px solid var(--mantine-color-default-border)" }}>
        <Tooltip label={collapsed ? L.expandSidebar : L.collapseSidebar}>
          <ActionIcon variant="subtle" color="gray" size="sm" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRightIcon size={16} /> : <ChevronLeftIcon size={16} />}
          </ActionIcon>
        </Tooltip>
      </Group>

      <ScrollArea style={{ flex: 1 }} p="xs">
        <Stack gap={2}>
          {items.map((item) => {
            if (item.type === "divider") {
              if (collapsed) return <Divider key={item.id} my={4} />;
              return (
                <Text key={item.id} size="xs" fw={600} c="dimmed" tt="uppercase" mt="md" mb={4} px="sm">
                  {item.label}
                </Text>
              );
            }
            const Icon = item.icon;
            const handleActivate = (): void => {
              void onDemoActivate?.(item.id);
            };

            const blockNav = Boolean(onDemoActivate);

            if (collapsed) {
              return (
                <Tooltip key={item.id} label={item.label} position="right">
                  <ActionIcon
                    component={blockNav ? "button" : "a"}
                    type={blockNav ? "button" : undefined}
                    href={blockNav ? undefined : item.href}
                    onClick={(e: MouseEvent) => {
                      if (blockNav) {
                        e.preventDefault();
                        handleActivate();
                      }
                    }}
                    variant={activeId === item.id ? "light" : "subtle"}
                    color={activeId === item.id ? "teal" : "gray"}
                    size={isCompact ? "md" : "lg"}
                    style={{ width: "100%" }}
                    aria-current={activeId === item.id ? "page" : undefined}
                  >
                    <Icon size={isCompact ? 16 : 18} />
                  </ActionIcon>
                </Tooltip>
              );
            }
            return (
              <NavLink
                key={item.id}
                component={blockNav ? "button" : "a"}
                type={blockNav ? "button" : undefined}
                href={blockNav ? undefined : item.href}
                onClick={(e) => {
                  if (blockNav) {
                    e.preventDefault();
                    handleActivate();
                  }
                }}
                label={item.label}
                leftSection={<Icon size={isCompact ? 16 : 18} />}
                rightSection={
                  item.badge ? (
                    <Badge size="xs" variant="filled" color="teal" circle>
                      {item.badge}
                    </Badge>
                  ) : undefined
                }
                active={activeId === item.id}
                color="teal"
                variant="light"
                style={{
                  borderRadius: "var(--mantine-radius-sm)",
                  padding: isCompact ? "4px 8px" : "8px 12px",
                  fontSize: isCompact ? 13 : 14,
                }}
                aria-current={activeId === item.id ? "page" : undefined}
              />
            );
          })}
        </Stack>
      </ScrollArea>

      <Box p="xs" style={{ borderTop: "1px solid var(--mantine-color-default-border)" }}>
        {collapsed ? (
          <Tooltip label={L.settings} position="right">
            <ActionIcon
              variant="subtle"
              color="gray"
              size={isCompact ? "md" : "lg"}
              style={{ width: "100%" }}
              disabled
            >
              <SettingsIcon size={isCompact ? 16 : 18} />
            </ActionIcon>
          </Tooltip>
        ) : (
          <NavLink
            label={L.settings}
            leftSection={<SettingsIcon size={isCompact ? 16 : 18} />}
            style={{
              borderRadius: "var(--mantine-radius-sm)",
              padding: isCompact ? "4px 8px" : "8px 12px",
              fontSize: isCompact ? 13 : 14,
            }}
            disabled
          />
        )}
      </Box>
    </Box>
  );
}
