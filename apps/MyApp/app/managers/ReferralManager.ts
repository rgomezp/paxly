import Log from "../utils/Log"
import { ganon } from "@/services/ganon/ganon"
import AnalyticsManager from "./AnalyticsManager"
import { debounce } from "lodash"
import { isMockUserEnabled } from "@/services/ganon/MockUserConfig"
import TokenManager from "./TokenManager"
import { FEATURES } from "@/entitlements/constants/features"
import { SERVER_URL } from "@/constants/endpoints"
import { getReferralThreshold } from "@/entitlements/constants/featureDefinitions"
export interface ReferralData {
  message: string
  referringEmail: string
}

interface ReferralCountCache {
  count: number
  timestamp: number
}

export class ReferralManager {
  private static referralCountCache: Map<string, ReferralCountCache> = new Map()
  private static CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes in milliseconds
  private static referralIdPromise: Promise<string> | null = null
  private static debouncedRefresh = debounce(async (referralId: string) => {
    try {
      await ReferralManager.getReferralCount(referralId)
    } catch (error) {
      if (isMockUserEnabled()) {
        Log.info(`ReferralManager: Background refresh failed (mock user mode - expected): ${error}`)
      } else {
        Log.error(`ReferralManager: Background refresh failed: ${error}`)
      }
    }
  }, 1000)

  static async getReferralId(): Promise<string> {
    const referralData = ganon.get("referralData")
    const referralId = referralData?.referralId
    if (referralId) {
      return referralId
    }

    // Coalesce concurrent calls to a single in-flight request
    if (this.referralIdPromise) {
      return this.referralIdPromise
    }

    this.referralIdPromise = (async () => {
      try {
        const newId = await this.generateReferralId()
        ganon.upsert("referralData", { referralId: newId, count: 0 })
        return newId
      } finally {
        this.referralIdPromise = null
      }
    })()

    return this.referralIdPromise
  }

  private static async getAuthHeaders(): Promise<HeadersInit> {
    const token = await TokenManager.getInstance().getToken()
    if (!token) {
      if (isMockUserEnabled()) {
        // In mock user mode, suppress authentication errors since API calls shouldn't happen
        Log.info(
          "ReferralManager: No authentication token available (mock user mode - API calls disabled)",
        )
        throw new Error("No authentication token available")
      } else {
        // In production, this is a real error
        Log.error("ReferralManager: No authentication token available - authentication required")
        throw new Error("No authentication token available")
      }
    }

    return {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  }

  static async getReferralCount(referralId: string): Promise<number> {
    Log.info(`ReferralManager: Getting referral count for ${referralId}`)
    try {
      // Check cache first
      const cachedData = this.referralCountCache.get(referralId)
      const now = Date.now()

      if (cachedData && now - cachedData.timestamp < this.CACHE_TTL_MS) {
        Log.info(`ReferralManager: Using cached referral count for ${referralId}`)
        return cachedData.count
      }

      const headers = await this.getAuthHeaders()
      const response = await fetch(`${SERVER_URL}/referral/count?id=${referralId}`, {
        headers,
      })

      if (!response.ok) {
        throw new Error(`Failed to get referral count: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      ganon.upsert("referralData", { count: data.count })

      // Update cache
      this.referralCountCache.set(referralId, {
        count: data.count,
        timestamp: now,
      })

      return data.count
    } catch (error) {
      if (isMockUserEnabled()) {
        Log.info(
          `ReferralManager: Error getting referral count (mock user mode - expected): ${error}`,
        )
      } else {
        Log.error(`ReferralManager: Error getting referral count: ${error}`)
      }
      throw error
    }
  }

  static async generateReferralId(): Promise<string> {
    try {
      const headers = await this.getAuthHeaders()
      const response = await fetch(`${SERVER_URL}/referral/generate`, {
        method: "POST",
        headers,
      })

      if (!response.ok) {
        throw new Error(`Failed to generate referral ID: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      return data.referralId
    } catch (error) {
      if (isMockUserEnabled()) {
        Log.info(
          `ReferralManager: Error generating referral ID (mock user mode - expected): ${error}`,
        )
      } else {
        Log.error(`ReferralManager: Error generating referral ID: ${error}`)
      }
      throw error
    }
  }

  static async processReferral(referralId: string): Promise<ReferralData> {
    try {
      const headers = await this.getAuthHeaders()
      const response = await fetch(`${SERVER_URL}/referral/refer?id=${referralId}`, {
        headers,
      })

      if (!response.ok) {
        throw new Error(`Failed to process referral: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      return {
        message: data.message,
        referringEmail: data.referringEmail,
      }
    } catch (error) {
      if (isMockUserEnabled()) {
        Log.info(`ReferralManager: Error processing referral (mock user mode - expected): ${error}`)
      } else {
        Log.error(`ReferralManager: Error processing referral: ${error}`)
      }
      throw error
    }
  }

  static async isFeatureUnlocked(feature: keyof typeof FEATURES): Promise<boolean> {
    Log.info(`ReferralManager: Checking if feature ${String(feature)} is unlocked`)

    // First check if we have a cached count for the current referral ID
    const referralData = ganon.get("referralData")
    const currentReferralId = referralData?.referralId
    const cachedCount = referralData?.count

    if (currentReferralId && cachedCount !== undefined) {
      // Check if we have a valid cached count in memory
      const memoryCache = this.referralCountCache.get(currentReferralId)
      const now = Date.now()

      if (memoryCache && now - memoryCache.timestamp < this.CACHE_TTL_MS) {
        Log.info(`ReferralManager: Using memory cached referral count for feature check`)
        return this.checkFeatureThreshold(feature, memoryCache.count)
      }

      // If memory cache is expired but we have a local count, use it for immediate response
      // This provides faster UI response while we refresh in background
      if (cachedCount !== null && cachedCount !== undefined) {
        Log.info(`ReferralManager: Using local storage referral count for immediate feature check`)

        // Refresh the count in background for next time
        this.refreshReferralCountInBackground(currentReferralId)

        return this.checkFeatureThreshold(feature, cachedCount)
      }
    }

    // If no cached data available, get it fresh
    const referralCount = await this.getReferralCount(await this.getReferralId())
    return this.checkFeatureThreshold(feature, referralCount)
  }

  private static checkFeatureThreshold(
    feature: keyof typeof FEATURES,
    referralCount: number,
  ): boolean {
    if (!referralCount) {
      return false
    }

    // Get the referral threshold for this feature
    const threshold = getReferralThreshold(feature as string)
    
    // If no threshold is defined, feature cannot be unlocked via referrals
    if (threshold === undefined) {
      return false
    }

    // Check if the referral count meets or exceeds the threshold
    return referralCount >= threshold
  }

  private static async refreshReferralCountInBackground(referralId: string): Promise<void> {
    // Use the debounced refresh function
    this.debouncedRefresh(referralId)
  }

  static async validateReferralCode(referralCode: string): Promise<{ success: boolean }> {
    Log.info(`ReferralManager: Validating referral code: ${referralCode}`)
    try {
      const response = await fetch(`${SERVER_URL}/referral/refer?id=${referralCode}`, {
        method: "GET",
      })

      if (!response.ok) {
        return { success: false }
      }

      AnalyticsManager.getInstance().logEvent("referral_code_success", {
        referralCode: referralCode,
      })

      ganon.upsert("referralData", { wasReferralUsed: true })

      return { success: true }
    } catch (error) {
      Log.error(`Error validating referral code: ${error}`)
      return { success: false }
    }
  }
}
