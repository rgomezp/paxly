import { useState, useEffect, useCallback } from "react"
import Log from "../utils/Log"
import { FEATURES } from "./constants/features"
import { getReferralUnlockableFeatures } from "./constants/featureDefinitions"
import Constants from "expo-constants"

type ReferralHook = {
  referralUnlockedFeatures: Set<keyof typeof FEATURES>
  checkReferralUnlocks: () => Promise<void>
}

export function useReferralUnlocks(): ReferralHook {
  const [referralUnlockedFeatures, setReferralUnlockedFeatures] = useState<
    Set<keyof typeof FEATURES>
  >(new Set())

  const checkReferralUnlocks = useCallback(async () => {
    // Early return if referrals are disabled
    if (!Constants?.expoConfig?.extra?.useReferrals) {
      Log.info("useReferralUnlocks: Referrals are disabled - skipping unlock checks")
      setReferralUnlockedFeatures(new Set())
      return
    }

    try {
      // Lazy require to avoid require cycle at module eval time
      const LoginManager = require("../managers/LoginManager")
        .default as typeof import("../managers/LoginManager").default

      if (!LoginManager.getInstance().isLoggedIn()) {
        return
      }

      // Lazy require to avoid require cycle at module eval time
      const ReferralManager = require("../managers/ReferralManager").ReferralManager

      const unlockedFeatures = new Set<keyof typeof FEATURES>()

      // Check each feature that can be unlocked via referrals
      const referralUnlockableFeatures = getReferralUnlockableFeatures()
      for (const feature of referralUnlockableFeatures) {
        const isUnlocked = await ReferralManager.isFeatureUnlocked(feature as keyof typeof FEATURES)
        if (isUnlocked) {
          unlockedFeatures.add(feature as keyof typeof FEATURES)
        }
      }

      setReferralUnlockedFeatures(unlockedFeatures)
    } catch (err) {
      Log.error(`Error checking referral unlocks: ${err}`)
    }
  }, [])

  useEffect(() => {
    checkReferralUnlocks()
  }, [checkReferralUnlocks])

  return {
    referralUnlockedFeatures,
    checkReferralUnlocks,
  }
}
