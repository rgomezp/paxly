/**
 * This manager handles badge display logic for the Me tab and My Stuff button.
 * The badge appears when a user claims a new award and is cleared when they visit the My Stuff screen.
 * The badge has a time to live (TTL) of 1 week.
 */

import { ganon } from "@/services/ganon/ganon"
import Log from "@/utils/Log"
import { BadgeType, IBadgeData } from "@/types/IBadgeData"

const TTL_MS = 2 * 24 * 60 * 60 * 1000 // 2 days in milliseconds

export default class BadgeManager {
  /**
   * Gets the badge data from storage
   */
  private static getBadgeData(): IBadgeData | null {
    return (ganon.get("meTabBadgeData") as IBadgeData | undefined) || null
  }

  /**
   * Saves the badge data to storage
   */
  private static saveBadgeData(data: IBadgeData): void {
    ganon.set("meTabBadgeData", data)
  }

  /**
   * Sets the badge to show (called when an award is claimed)
   */
  static setBadge(badgeType: BadgeType): void {
    const badgeData: IBadgeData = {
      shouldShow: true,
      timestamp: Date.now(),
      badgeType,
    }
    this.saveBadgeData(badgeData)
    Log.info("BadgeManager: Badge set for Me tab")
  }

  /**
   * Clears the badge (called when user visits a screen that clears the badge)
   */
  static clearBadge(badgeType: BadgeType): void {
    const badgeData = this.getBadgeData()
    if (badgeData?.badgeType === badgeType) {
      badgeData.shouldShow = false
      badgeData.timestamp = Date.now()
      this.saveBadgeData(badgeData)
      Log.info("BadgeManager: Badge cleared for Me tab")
    }
  }

  /**
   * Checks if the badge should be displayed
   * Returns true if badge is set and hasn't expired (TTL check)
   */
  static shouldShowBadgeWithType(): BadgeType | null {
    const badgeData = this.getBadgeData()
    if (!badgeData || !badgeData.shouldShow) {
      return null
    }

    // Check if badge has expired (TTL check)
    const now = Date.now()
    const timeSinceSet = now - badgeData.timestamp
    if (timeSinceSet >= TTL_MS) {
      // Badge has expired, clear it
      if (badgeData.badgeType) {
        this.clearBadge(badgeData.badgeType)
      }
      Log.info("BadgeManager: Badge expired and cleared")
      return null
    }

    return badgeData.badgeType ?? null
  }
}
