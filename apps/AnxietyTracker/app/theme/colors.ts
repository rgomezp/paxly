const palette = {
  // Neutral grays - soft and calming
  neutral100: "#FFFFFF",
  neutral200: "#F8F9FA",
  neutral300: "#E8EDF2",
  neutral400: "#D1D9E0",
  neutral500: "#9CA8B5",
  neutral600: "#6B7A8A",
  neutral700: "#4A5568",
  neutral800: "#2D3748",
  neutral900: "#1A202C",

  // Primary - bright blue (calming, trustworthy, clear)
  primary100: "#E6F4FC",
  primary200: "#CDE9F9",
  primary300: "#9BD3F3",
  primary400: "#69BDED",
  primary500: "#27A7E0",
  primary600: "#1F85B3",

  // Secondary - light cyan (soft, airy, gentle)
  secondary100: "#F0FAFB",
  secondary200: "#E1F5F7",
  secondary300: "#C3EBEF",
  secondary400: "#A5E1E7",
  secondary500: "#B1EBF3",
  secondary600: "#8DD8E3",

  // Accent - warm coral/salmon (warm, inviting, friendly)
  accent100: "#FFF5F2",
  accent200: "#FFEBE5",
  accent300: "#FFD7CB",
  accent400: "#FFC3B1",
  accent500: "#FF967D",
  accent600: "#FF7A5C",

  // Background - soft, calming light blue-white
  backgroundLight: "#F8FCFE",

  // Error - soft coral (gentle, not alarming)
  angry100: "#FEF2F2",
  angry500: "#F87171",

  // Overlays - soft and subtle
  overlay20: "rgba(26, 32, 44, 0.2)",
  overlay50: "rgba(26, 32, 44, 0.5)",

  // Semantic colors - calming and positive
  positive: "#27A7E0", // Soft green
  negative: "#FF7A5C", // Soft coral
  neutral: "#E0C988", // Soft yellow
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
   * The default color of the screen background - soft, calming light blue-white
   */
  background: palette.backgroundLight,
  /**
   * The default background color of the text input.
   */
  textInputBackground: palette.neutral100,
  /**
   * Card/surface background color.
   */
  card: palette.neutral100,
  /**
   * The default border color.
   */
  border: palette.neutral300,
  /**
   * The main tinting color - bright blue.
   */
  tint: palette.primary500,
  /**
   * The inactive tinting color.
   */
  tintInactive: palette.neutral400,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
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
  dailyTasksTimelineBackground: palette.neutral100,
} as const
