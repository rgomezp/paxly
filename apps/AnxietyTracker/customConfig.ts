interface CustomConfig {
  /**
   * The URL of the terms of service
   */
  termsOfServiceUrl: string
  privacyPolicyUrl: string
  /**
   * EAS project ID
   */
  eas: {
    projectId: string
  }
  /**
   * Whether to include the login screen
   */
  includeLoginScreen?: boolean
  /**
   * Whether to include the settings screen
   */
  includeSettingsScreen?: boolean
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
  /**
   * The support email address
   */
  supportEmail?: string
}

export default function customConfig(): CustomConfig {
  return {
    termsOfServiceUrl: "https://paxly-terms.carrd.co/",
    privacyPolicyUrl: "https://paxly-privacy.carrd.co/",
    eas: {
      projectId: "06db5f25-8ccd-4ef5-9bd7-0867e2caca83",
    },
    includeLoginScreen: true,
    includeSettingsScreen: true,
    startingTheme: "auto", // Options: 'light', 'dark', or 'auto' (follows system)
    primaryFont: "spaceGrotesk", // Options: 'poppins', 'inter', 'roboto', or 'spaceGrotesk'
    oneSignalAppId: "a8148f93-f3a7-42fc-85cd-3801756416f6",
    iosAppStoreUrl: "https://apps.apple.com/us/app/anxiety-tracker-paxly/id6757827361",
    androidAppStoreUrl:
      "https://play.google.com/store/apps/details?id=com.honeywolf.anxietytracker",
    useReferrals: false,
    supportEmail: "team@anxietytracker.com",
  }
}
