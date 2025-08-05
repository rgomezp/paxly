interface CustomConfig {
  termsOfServiceUrl: string
  privacyPolicyUrl: string
}

export default function customConfig(): CustomConfig {
  return {
    termsOfServiceUrl: "https://www.google.com",
    privacyPolicyUrl: "https://www.google.com",
  }
}
