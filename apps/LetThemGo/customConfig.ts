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
  /**
   * The OneSignal app ID
   */
  oneSignalAppId?: string
  /**
   * iOS App Store URL for leaving a review
   */
  iosAppStoreUrl?: string
  /**
   * Android Play Store URL for leaving a review
   */
  androidAppStoreUrl?: string
  /**
   * Whether to use referrals
   */
  useReferrals?: boolean
}

export default function customConfig(): CustomConfig {
  return {
    termsOfServiceUrl: "https://www.google.com",
    privacyPolicyUrl: "https://www.google.com",
    includeLoginScreen: true,
    includeSettingsScreen: true,
    localGanon: false,
    startingTheme: "dark", // Options: 'light', 'dark', or 'auto' (follows system)
    primaryFont: "spaceGrotesk", // Options: 'poppins', 'inter', 'roboto', or 'spaceGrotesk'
    oneSignalAppId: "2236d12a-343d-4638-9804-17f4a4473504",
    iosAppStoreUrl: "https://apps.apple.com/us/app/no-contact-tracker-letthemgo/id6754750980",
    androidAppStoreUrl: "https://play.google.com/store/apps/details?id=com.honeywolf.letthemgo",
    useReferrals: false,
  }
}
