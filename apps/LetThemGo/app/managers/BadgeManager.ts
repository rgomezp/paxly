/**
 * This manager handles badge display logic for the Me tab and My Stuff button.
 * The badge appears when a user claims a new award and is cleared when they visit the My Stuff screen.
 * The badge has a time to live (TTL) of 1 week.
 */

import { ganon } from "@/services/ganon/ganon"
import Log from "@/utils/Log"
import { IBadgeData } from "@/types/IBadgeData"

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
  static setBadge(): void {
    const badgeData: IBadgeData = {
      shouldShow: true,
      timestamp: Date.now(),
    }
    this.saveBadgeData(badgeData)
    Log.info("BadgeManager: Badge set for Me tab")
  }

  /**
   * Clears the badge (called when user visits My Stuff screen)
   */
  static clearBadge(): void {
    const badgeData: IBadgeData = {
      shouldShow: false,
      timestamp: Date.now(),
    }
    this.saveBadgeData(badgeData)
    Log.info("BadgeManager: Badge cleared for Me tab")
  }

  /**
   * Checks if the badge should be displayed
   * Returns true if badge is set and hasn't expired (TTL check)
   */
  static shouldShowBadge(): boolean {
    const badgeData = this.getBadgeData()
    if (!badgeData || !badgeData.shouldShow) {
      return false
    }

    // Check if badge has expired (TTL check)
    const now = Date.now()
    const timeSinceSet = now - badgeData.timestamp
    if (timeSinceSet >= TTL_MS) {
      // Badge has expired, clear it
      this.clearBadge()
      Log.info("BadgeManager: Badge expired and cleared")
      return false
    }

    return true
  }
}
