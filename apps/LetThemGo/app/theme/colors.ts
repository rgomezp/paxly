const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F5F5F5",
  neutral300: "#E0E0E0",
  neutral400: "#BDBDBD",
  neutral500: "#9E9E9E",
  neutral600: "#757575",
  neutral700: "#616161",
  neutral800: "#424242",
  neutral900: "#000000",

  primary100: "#F5F7F8",
  primary200: "#E8ECF0",
  primary300: "#D1DCE3",
  primary400: "#A3B8C7",
  primary500: "#5A7A8F",
  primary600: "#2a3845",

  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",

  accent100: "#A54F31",
  accent200: "#C76542",
  accent300: "#D28468",
  accent400: "#DDA28E",
  accent500: "#E8C1B4",
  accent600: "#FAF0EC",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",

  positive: "#5E9C7E",
  negative: "#E09F88",
  neutral: "#E0C988",
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
   * The default color of the screen background.
   */
  background: palette.accent600,
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
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * The inactive tinting color.
   */
  tintInactive: palette.neutral300,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
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
