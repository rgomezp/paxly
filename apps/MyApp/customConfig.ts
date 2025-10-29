interface CustomConfig {
  /**
   * The URL of the terms of service
   */
  termsOfServiceUrl: string
  privacyPolicyUrl: string
  /**
   * Whether to include the login screen
   */
  includeLoginScreen?: boolean
  /**
   * Whether to include the settings screen
   */
  includeSettingsScreen?: boolean
  /**
   * Whether to use local Ganon
   */
  localGanon?: boolean
  /**
   * The starting theme
   */
  startingTheme?: "light" | "dark" | "auto"
  /**
   * The primary font family to use throughout the app
   */
  primaryFont?: "poppins" | "inter" | "roboto" | "spaceGrotesk"
}

export default function customConfig(): CustomConfig {
  return {
    termsOfServiceUrl: "https://www.google.com",
    privacyPolicyUrl: "https://www.google.com",
    includeLoginScreen: true,
    includeSettingsScreen: true,
    localGanon: true,
    startingTheme: "dark", // Options: 'light', 'dark', or 'auto' (follows system)
    primaryFont: "inter", // Options: 'poppins', 'inter', 'roboto', or 'spaceGrotesk'
  }
}
