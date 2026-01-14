# Feature Definitions System

This directory contains the centralized feature definition system for the app.

## Overview

The feature definitions system encapsulates all metadata about features in a single interface, providing a single source of truth for:
- Feature keys/identifiers
- Referral unlock thresholds
- Required entitlements

## File Structure

- `features.ts` - Defines the feature constants/keys
- `featureDefinitions.ts` - Contains the comprehensive feature definitions with all metadata
- `referralThresholds.ts` - Legacy file (kept for backward compatibility, but now derives from featureDefinitions)

## Usage

### Adding a New Feature

1. Add the feature key to `features.ts`:
```typescript
export const FEATURES = {
  EXAMPLE_FEATURE: "exampleFeature",
  NEW_FEATURE: "newFeature",  // Add here
} as const
```

2. Add the complete definition to `featureDefinitions.ts`:
```typescript
export const FEATURE_DEFINITIONS: Record<keyof typeof FEATURES, IFeatureDefinition> = {
  [FEATURES.EXAMPLE_FEATURE]: {
    key: FEATURES.EXAMPLE_FEATURE,
    referralThreshold: 1,
    entitlements: ["exampleEntitlement"],
  },
  [FEATURES.NEW_FEATURE]: {  // Add here
    key: FEATURES.NEW_FEATURE,
    referralThreshold: 5,  // Optional: undefined means no referral unlock
    entitlements: ["pro", "elite"],  // List of entitlements that grant access
  },
}
```

### Helper Functions

Use the provided helper functions instead of accessing the definitions directly:

- `getReferralUnlockableFeatures()` - Get all features that can be unlocked via referrals
- `getReferralThreshold(feature)` - Get the referral count threshold for a feature
- `getFeatureEntitlements(feature)` - Get the entitlements that grant access to a feature
- `canFeatureBeUnlockedViaReferrals(feature)` - Check if a feature can be unlocked via referrals

## Benefits

1. **Single Source of Truth**: All feature metadata is defined in one place
2. **Type Safety**: Strong typing ensures correctness
3. **Encapsulation**: Logic is encapsulated in helper functions
4. **Maintainability**: Easy to add/modify features without scattered logic
5. **Performance**: No repeated array declarations or object creations

