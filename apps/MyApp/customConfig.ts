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
}

export default function customConfig(): CustomConfig {
  return {
    termsOfServiceUrl: "https://www.google.com",
    privacyPolicyUrl: "https://www.google.com",
    includeLoginScreen: true,
    includeSettingsScreen: true,
    localGanon: true,
    startingTheme: "dark", // Options: 'light', 'dark', or 'auto' (follows system)
  }
}
