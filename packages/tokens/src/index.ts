/** Accent scale (Mantine `teal` covers most; these document product names). */
export const accent = {
  teal1: '#C3FAE8',
  teal3: '#63E6BE',
  teal6: '#12B886',
  teal8: '#0CA678',
  teal9: '#099268'
} as const;

export const semantic = {
  danger: { light: '#FA5252', dark: '#FF6B6B' },
  warning: { light: '#FD7E14', dark: '#FFA94D' },
  success: { light: '#40C057', dark: '#51CF66' }
} as const;

/** Mantine `gray` scale override (10 shades). */
export const mantineGray: [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
] = [
  '#F8F9FA',
  '#F1F3F5',
  '#E9ECEF',
  '#DEE2E6',
  '#CED4DA',
  '#ADB5BD',
  '#868E96',
  '#495057',
  '#343A40',
  '#212529'
];

/** Mantine `dark` scale override (10 shades). */
export const mantineDark: [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
] = [
  '#C1C2C5',
  '#A6A7AB',
  '#909296',
  '#5C5F66',
  '#373A40',
  '#2C2E33',
  '#25262B',
  '#1A1B1E',
  '#141517',
  '#101113'
];

/** CSS filters for SVG logos (`currentColor` assets). */
export const logoFilters = {
  primary:
    'brightness(0) saturate(100%) invert(65%) sepia(51%) saturate(552%) hue-rotate(118deg) brightness(92%) contrast(87%)',
  onDark: 'brightness(0) saturate(100%) invert(1)',
  monochrome: 'brightness(0) saturate(100%)'
} as const;

/** Density spec — use with Mantine `size` props and spacing. */
export const densityComfortable = {
  tableRowPx: 44,
  buttonPadding: '8px 16px',
  gapMin: 12,
  gapMax: 16,
  inputHeight: 36,
  bodyPx: 14,
  sidebarWidth: 250,
  headerHeight: 56
} as const;

export const densityCompact = {
  tableRowPx: 32,
  buttonPadding: '4px 12px',
  gapMin: 8,
  gapMax: 8,
  inputHeight: 28,
  bodyPx: 13,
  sidebarWidth: 220,
  headerHeight: 48
} as const;
