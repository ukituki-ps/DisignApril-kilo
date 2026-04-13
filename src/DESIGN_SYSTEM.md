

# April Design System
## Corporate Productivity Platform — Task Manager, CRM, HRM, Documents

---

## 1. Brand

### Logo
- **Full logo**: Icon + wordmark "APRIL"
- **Icon only**: Swirl mark — for favicons, app icons, avatars (sizes < 32px)
- **Wordmark**: Text "APRIL" — for headers, navigation bars

**SVG Assets (currentColor, transparent background):**
- Full: `https://cdn.magicpatterns.com/uploads/dJgrjp8tndRZRo2oRP9GS8/Снимок_экрана_от_2026-04-13_13-09-29_(1).svg`
- Icon: `https://cdn.magicpatterns.com/uploads/ihXLwzWKZUxRyBjR8idwXK/g12875-8.svg`
- Wordmark: `https://cdn.magicpatterns.com/uploads/6jsbtPR7PU1xG4G37cnm51/g12875.svg`

**Logo Colors:**
| Context | Color | CSS Filter |
|---------|-------|-----------|
| Primary (digital) | `#12B886` | `brightness(0) saturate(100%) invert(65%) sepia(51%) saturate(552%) hue-rotate(118deg) brightness(92%) contrast(87%)` |
| On dark background | `#FFFFFF` | `brightness(0) saturate(100%) invert(1)` |
| Monochrome (print) | `#212529` | `brightness(0) saturate(100%)` |

**Rules:**
- ✅ Minimum clear space: equal to icon height on all sides
- ✅ Use icon variant at sizes below 32px
- ✅ Full logo preferred when space allows
- ❌ Do not stretch, rotate, or add effects
- ❌ Do not use gradients or custom colors
- ❌ Do not place on busy backgrounds without a container

---

## 2. Color Palette

### Accent
| Token | Hex | Usage |
|-------|-----|-------|
| `teal-1` | `#C3FAE8` | Light backgrounds, hover states |
| `teal-3` | `#63E6BE` | Secondary accents |
| `teal-6` | `#12B886` | **Primary accent** — buttons, links, active states |
| `teal-8` | `#0CA678` | Hover on primary |
| `teal-9` | `#099268` | Active/pressed on primary |

### Semantic
| Role | Light | Dark |
|------|-------|------|
| Danger | `#FA5252` | `#FF6B6B` |
| Warning | `#FD7E14` | `#FFA94D` |
| Success | `#40C057` | `#51CF66` |

### Neutrals — Light Theme
| Role | Hex | Mantine Token |
|------|-----|--------------|
| Background | `#FFFFFF` / `#F8F9FA` | `white` / `gray.0` |
| Surface (cards, panels) | `#FFFFFF` | `white` |
| Border | `#DEE2E6` | `gray.3` |
| Text primary | `#212529` | `gray.9` |
| Text secondary | `#868E96` | `gray.6` |

### Neutrals — Dark Theme
| Role | Hex | Mantine Token |
|------|-----|--------------|
| Background | `#1A1B1E` / `#25262B` | `dark.7` / `dark.6` |
| Surface | `#2C2E33` | `dark.5` |
| Border | `#373A40` | `dark.4` |
| Text primary | `#C1C2C5` | `dark.0` |
| Text secondary | `#909296` | `dark.2` |

---

## 3. Typography

**Font:** Inter (Google Fonts)
```
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

| Role | Size | Weight | Mantine |
|------|------|--------|---------|
| H1 — Page title | 24px | 700 | `<Title order={1}>` |
| H2 — Section heading | 18px | 600 | `<Title order={2}>` |
| H3 — Subsection | 16px | 600 | `<Title order={3}>` |
| Body | 14px | 400 | `<Text size="sm">` |
| Body compact | 13px | 400 | `<Text size="xs">` |
| Caption | 12px | 400 | `<Text size="xs" c="dimmed">` |
| Label | 12px | 500 | `<Text size="xs" fw={500}>` |

---

## 4. Density Modes

Two modes: **Comfortable** (default) and **Compact** (for power users).

| Parameter | Comfortable | Compact |
|-----------|-------------|---------|
| Table row height | 44px | 32px |
| Button padding | 8px 16px | 4px 12px |
| Gap between elements | 12–16px | 8px |
| Input height | 36px | 28px |
| Body font size | 14px | 13px |
| Sidebar width | 250px | 220px |
| Header height | 56px | 48px |

**Implementation:** `useDensity()` hook from `DensityContext.tsx`
```tsx
const { density, toggleDensity } = useDensity();
const isCompact = density === 'compact';
const size = isCompact ? 'xs' : 'sm';
```

---

## 5. Themes

### Light (default)
- `MantineProvider defaultColorScheme="light"`
- Background: white/gray.0
- Cards: white with border

### Dark
- Toggle via `useMantineColorScheme()`
- Background: dark.7
- Cards: dark.5 with dark.4 border
- React Flow: `colorMode={colorScheme}` for proper dark mode support

---

## 6. Layout & Breakpoints

| Breakpoint | Device | Layout |
|------------|--------|--------|
| `≥1280px` | Desktop | Sidebar (250px) + content + optional panel |
| `768–1279px` | Tablet | Collapsible sidebar + content |
| `<768px` | Mobile | Bottom tab bar + full-screen pages |

### Header
- Left: Logo + app name
- Center: Global search (collapses to icon on mobile)
- Right: Messages, notifications (with indicator), help, user menu

### Sidebar
- Sections: Dashboard, Tasks, Inbox, Calendar → CRM → HRM → Documents, Projects, Reports
- Collapsible to 60px icon-only mode
- Active state: teal accent
- Badge counters on actionable items
- Settings pinned to bottom

---

## 7. Component Library

### Tech Stack
- **UI Framework:** Mantine v7 (`@mantine/core`, `@mantine/hooks`)
- **Styling:** Mantine style props first, Tailwind CSS for minor tweaks
- **Icons:** `lucide-react` (import with `Icon` suffix)
- **Animations:** `framer-motion`
- **Charts:** `recharts`
- **Node diagrams:** `@xyflow/react`
- **Drag & drop:** `@dnd-kit/core`, `@dnd-kit/sortable`
- **Toasts:** `sonner`

### Buttons
| Variant | Usage |
|---------|-------|
| `filled` | Primary actions (Save, Create, Submit) |
| `light` | Secondary actions |
| `outline` | Tertiary actions |
| `subtle` | Inline/contextual actions |
| `default` | Neutral actions (Cancel) |
| `filled` + `color="red"` | Destructive actions (Delete) |

### Badges
| Color | Meaning |
|-------|---------|
| `teal` | Active, Done, Success |
| `blue` | In Progress |
| `orange` | Warning, Review, On Leave |
| `red` | Failed, Blocked, High Priority |
| `gray` | Archived, Inactive, Low Priority |

### Cards
- Simple info card — title, description, action button
- Stat card — metric number, trend indicator, comparison text
- Task card — title, status badge, assignee avatar, due date

### Table
- Striped rows, highlight on hover
- Checkbox selection column
- Status badges in cells
- Action buttons (edit, delete, more) right-aligned
- Responds to density mode (row height, padding, font size)

---

## 8. Safety Patterns

### Destructive Actions
| Action | Pattern |
|--------|---------|
| Delete single item | Confirm dialog with item name displayed |
| Delete with confirmation | Text input — user must type item name to enable delete button |
| Mass actions | Show count of affected items + confirm |
| Irreversible actions | Red button + text confirmation |

### Data Protection
- **Autosave** with status indicator ("Saved", "Saving...")
- **Undo toast** — 5-second window after destructive action
- **Unsaved changes warning** — prompt on navigation away

---

## 9. Interactive Patterns

### Kanban Board
- 4 columns: To Do (gray), In Progress (blue), Review (orange), Done (teal)
- Drag & drop via `@dnd-kit/core`
- Cards: title, priority badge, assignee avatar, due date
- Column counters update on move

### React Flow Diagrams
- CRM Pipeline — horizontal sales funnel
- Org Chart — vertical tree structure
- Task Dependencies — DAG with status colors
- Custom Nodes — showcase of node types
- All use Mantine components inside custom nodes
- `colorMode` synced with Mantine theme

---

## 10. Mantine Theme Configuration

```tsx
const theme = createTheme({
  primaryColor: 'teal',
  fontFamily: 'Inter, sans-serif',
  headings: {
    fontFamily: 'Inter, sans-serif',
    sizes: {
      h1: { fontSize: '24px', fontWeight: '700' },
      h2: { fontSize: '18px', fontWeight: '600' },
      h3: { fontSize: '16px', fontWeight: '600' },
    },
  },
  colors: {
    gray: ['#F8F9FA', '#F1F3F5', '#E9ECEF', '#DEE2E6', '#CED4DA', '#ADB5BD', '#868E96', '#495057', '#343A40', '#212529'],
    dark: ['#C1C2C5', '#A6A7AB', '#909296', '#5C5F66', '#373A40', '#2C2E33', '#25262B', '#1A1B1E', '#141517', '#101113'],
  },
});
```

---

## 11. File Structure

```
├── index.tsx                          # Entry point
├── index.css                          # Fonts, Tailwind, Mantine styles
├── App.tsx                            # MantineProvider, theme, layout shell
├── DensityContext.tsx                  # Density mode context
├── tailwind.config.js                 # Tailwind configuration
├── DESIGN_SYSTEM.md                   # This document
│
├── components/
│   ├── UIKit.tsx                      # Main UI Kit page (all sections)
│   ├── LogoSection.tsx                # Logo variants & guidelines
│   ├── HeaderSection.tsx              # Product header example
│   ├── SidebarSection.tsx             # Product sidebar example
│   ├── ColorPalette.tsx               # Color swatches
│   ├── TypographySection.tsx          # Type scale
│   ├── ButtonsSection.tsx             # Button variants & states
│   ├── InputsSection.tsx              # Form controls
│   ├── BadgesSection.tsx              # Status indicators
│   ├── CardsSection.tsx               # Card patterns
│   ├── TableSection.tsx               # Data table
│   ├── AlertsSection.tsx              # Alerts & notifications
│   ├── ModalSection.tsx               # Modal demo
│   ├── SafetyPatterns.tsx             # Destructive action patterns
│   ├── ReactFlowSection.tsx           # React Flow tabs
│   ├── KanbanSection.tsx              # Kanban board with DnD
│   │
│   └── flow/
│       ├── nodeTypes.tsx              # Custom node definitions
│       ├── CrmPipeline.tsx            # CRM funnel flow
│       ├── OrgChart.tsx               # Org structure flow
│       ├── TaskDependencies.tsx        # Task DAG flow
│       └── CustomNodes.tsx            # Node types showcase
```

---

*Last updated: April 13, 2026*
*Product: April — Corporate Productivity Platform*


