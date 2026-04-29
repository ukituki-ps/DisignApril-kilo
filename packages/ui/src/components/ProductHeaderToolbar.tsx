import type { ReactNode } from "react";
import { Box, Group, Text, TextInput, ActionIcon, Tooltip, Indicator } from "@mantine/core";
import { SearchIcon, BellIcon, HelpCircleIcon, MessageSquareIcon } from "lucide-react";
import { useDensity } from "../DensityContext";

const LOGO_ICON = "/logo-icon.svg";

const TEAL_FILTER =
  "brightness(0) saturate(100%) invert(65%) sepia(51%) saturate(552%) hue-rotate(118deg) brightness(92%) contrast(87%)";

export type ProductHeaderToolbarLabels = {
  searchPlaceholder: string;
  messages: string;
  notifications: string;
  help: string;
};

const DEFAULT_LABELS_EN: ProductHeaderToolbarLabels = {
  searchPlaceholder: "Search tasks, contacts, documents...",
  messages: "Messages",
  notifications: "Notifications",
  help: "Help",
};

export type ProductHeaderToolbarProps = {
  /** Название продукта рядом с иконкой (в AprilHub — «AprilHub»). */
  appName: string;
  /** Подпись под именем приложения (узкий служебный статус, опционально). */
  appSubtitle?: string;
  /** Слот справа — меню профиля (`ProfileAccountMenu`) и т.п. */
  userSlot: ReactNode;
  labels?: Partial<ProductHeaderToolbarLabels>;
  /** В демо-секции UIKit — подложка «Page content area» под панелью. */
  demoPageContent?: ReactNode;
};

/**
 * Панель «2. Header» из Design System Reference (`UIKit`): поиск, действия, слот пользователя.
 * Без обёртки с «анатомией» — для встраивания в AprilHub и демо `HeaderSection`.
 */
export function ProductHeaderToolbar({
  appName,
  appSubtitle,
  userSlot,
  labels: labelsProp,
  demoPageContent,
}: ProductHeaderToolbarProps) {
  const { density } = useDensity();
  const isCompact = density === "compact";
  const h = isCompact ? 48 : 56;
  const labels = { ...DEFAULT_LABELS_EN, ...labelsProp };

  const toolbarRow = (
    <Box
      px={isCompact ? "sm" : "md"}
      style={{
        height: h,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid var(--mantine-color-default-border)",
        backgroundColor: "var(--mantine-color-body)",
      }}
    >
      <Group gap={isCompact ? "xs" : "sm"} wrap="nowrap">
        <img
          src={LOGO_ICON}
          alt=""
          style={{
            height: isCompact ? 22 : 26,
            width: isCompact ? 22 : 26,
            objectFit: "contain",
            filter: TEAL_FILTER,
          }}
        />
        <Box style={{ lineHeight: 1.15 }}>
          <Text fw={700} size={isCompact ? "sm" : "md"}>
            {appName}
          </Text>
          {appSubtitle ? (
            <Text size="xs" c="dimmed" lineClamp={1}>
              {appSubtitle}
            </Text>
          ) : null}
        </Box>
      </Group>

      <Box
        style={{
          flex: 1,
          maxWidth: 480,
          margin: "0 16px",
        }}
      >
        <TextInput
          placeholder={labels.searchPlaceholder}
          leftSection={<SearchIcon size={16} />}
          size={isCompact ? "xs" : "sm"}
          radius="md"
          variant="filled"
        />
      </Box>

      <Group gap={isCompact ? 6 : 10} wrap="nowrap">
        <Tooltip label={labels.messages}>
          <ActionIcon variant="subtle" color="gray" size={isCompact ? "sm" : "md"}>
            <MessageSquareIcon size={isCompact ? 16 : 18} />
          </ActionIcon>
        </Tooltip>

        <Tooltip label={labels.notifications}>
          <Indicator color="red" size={8} offset={4} processing>
            <ActionIcon variant="subtle" color="gray" size={isCompact ? "sm" : "md"}>
              <BellIcon size={isCompact ? 16 : 18} />
            </ActionIcon>
          </Indicator>
        </Tooltip>

        <Tooltip label={labels.help}>
          <ActionIcon variant="subtle" color="gray" size={isCompact ? "sm" : "md"}>
            <HelpCircleIcon size={isCompact ? 16 : 18} />
          </ActionIcon>
        </Tooltip>

        {userSlot}
      </Group>
    </Box>
  );

  if (demoPageContent !== undefined) {
    return (
      <Box style={{ overflow: "hidden" }}>
        {toolbarRow}
        {demoPageContent}
      </Box>
    );
  }

  return toolbarRow;
}
