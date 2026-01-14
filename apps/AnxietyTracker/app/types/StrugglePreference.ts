export enum StrugglePreference {
  CONTACT = "contact",
  CHECK_SOCIALS = "check_socials",
}

export const StrugglePreferenceLabels: Record<StrugglePreference, string> = {
  [StrugglePreference.CONTACT]: "No contact",
  [StrugglePreference.CHECK_SOCIALS]: "Checking socials",
}
