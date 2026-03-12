const palette = {
  // Neutral grays - inverted for dark mode, soft and easy on eyes
  neutral900: "#FFFFFF",
  neutral800: "#E2E8F0",
  neutral700: "#CBD5E0",
  neutral600: "#A0AEC0",
  neutral500: "#718096",
  neutral400: "#4A5568",
  neutral300: "#2D3748",
  neutral200: "#1A202C",
  neutral100: "#0F1419",

  // Primary - bright blue (calming, trustworthy, clear in dark mode)
  primary600: "#69BDED",
  primary500: "#27A7E0",
  primary400: "#1F85B3",
  primary300: "#176386",
  primary200: "#0F4159",
  primary100: "#153A4D",

  // Secondary - light cyan (soft, airy, gentle in dark)
  secondary500: "#B1EBF3",
  secondary400: "#8DD8E3",
  secondary300: "#69C5D3",
  secondary200: "#45B2C3",
  secondary100: "#2D9FB0",

  // Accent - warm coral/salmon (warm, inviting, friendly in dark)
  accent600: "#FFF5F2",
  accent500: "#FFEBE5",
  accent400: "#FFD7CB",
  accent300: "#FFC3B1",
  accent200: "#FF967D",
  accent100: "#FF7A5C",

  // Error - soft coral (gentle, not jarring)
  angry100: "#FEE2E2",
  angry500: "#F87171",

  // Overlays - soft and subtle
  overlay20: "rgba(15, 20, 25, 0.2)",
  overlay50: "rgba(15, 20, 25, 0.5)",

  // Semantic colors - calming and positive
  positive: "#27A7E0", // Soft green
  negative: "#FF7A5C", // Soft coral
  neutral: "#E0C988", // Soft yellow

  // Anxiety levels 1–5 (dark mode: muted → strong, all visible on dark background)
  anxietyLevel1: "#6B4A42",
  anxietyLevel2: "#8F5A4A",
  anxietyLevel3: "#B86B55",
  anxietyLevel4: "#E07D62",
  anxietyLevel5: "#FF9070",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background - deep, calming dark blue-gray.
   */
  background: palette.neutral200,
  /**
   * The default background color of the text input.
   */
  textInputBackground: palette.neutral300,
  /**
   * Card/surface background color.
   */
  card: palette.neutral300,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color - bright blue.
   */
  tint: palette.secondary300,
  /**
   * The inactive tinting color.
   */
  tintInactive: palette.neutral500,
  /**
   * Secondary tinting color - soft cyan
   */
  secondaryTint: palette.secondary400,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral400,
  /**
   * Error messages - gentle coral, not alarming.
   */
  error: palette.angry500,
  /**
   * Error Background.
   */
  errorBackground: palette.angry100,
  /**
   * The default background color of the daily tasks timeline.
   */
  dailyTasksTimelineBackground: palette.neutral300,
  /**
   * Anxiety level colors (1 = lowest, 5 = highest). Use these for grids and charts.
   */
  anxietyLevel1: palette.anxietyLevel1,
  anxietyLevel2: palette.anxietyLevel2,
  anxietyLevel3: palette.anxietyLevel3,
  anxietyLevel4: palette.anxietyLevel4,
  anxietyLevel5: palette.anxietyLevel5,
} as const
