import { FEATURES } from "./features"

export interface IFeatureDefinition {
  referralThreshold?: number // Optional: if undefined, feature cannot be unlocked via referrals
  entitlements: string[] // List of entitlements that grant access to this feature
}

export const FEATURE_DEFINITIONS = {
  [FEATURES.PREMIUM_FEATURES]: {
    entitlements: ["pro", "elite"],
  },
} as Record<string, IFeatureDefinition>

// Helper to get all features that can be unlocked via referrals
export const getReferralUnlockableFeatures = (): string[] => {
  return Object.entries(FEATURE_DEFINITIONS)
    .filter(([_, def]) => def.referralThreshold !== undefined)
    .map(([key, _]) => key)
}

// Helper to get referral threshold for a feature
export const getReferralThreshold = (feature: string): number | undefined => {
  return FEATURE_DEFINITIONS[feature]?.referralThreshold
}

// Helper to get entitlements for a feature
export const getFeatureEntitlements = (feature: string): string[] => {
  return FEATURE_DEFINITIONS[feature]?.entitlements || []
}

// Helper to check if feature can be unlocked via referrals
export const canFeatureBeUnlockedViaReferrals = (feature: string): boolean => {
  return FEATURE_DEFINITIONS[feature]?.referralThreshold !== undefined
}
