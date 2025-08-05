interface CustomConfig {
  termsOfServiceUrl: string
  privacyPolicyUrl: string
  includeLoginScreen?: boolean
  includeSettingsScreen?: boolean
}

export default function customConfig(): CustomConfig {
  return {
    termsOfServiceUrl: "https://www.google.com",
    privacyPolicyUrl: "https://www.google.com",
    includeLoginScreen: true,
    includeSettingsScreen: true,
  }
}
