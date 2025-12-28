import * as StoreReview from "expo-store-review"
import { ganon } from "@/services/ganon/ganon"
import IReviewBackoffData from "@/types/IReviewBackoffData"
import AnalyticsManager from "./AnalyticsManager"
import Log from "@/utils/Log"

/**
 * StoreReviewManager
 * DB Data:
 * {
 *  lastPrompted: Date;
 *  timesPrompted: number;
 *  completed: boolean;
 * }
 *
 *  Backoff strategy:
 *   - If dismissed, request after a week, then two weeks, then every month
 *   - Do not prompt more than once per month
 */

export default class StoreReviewManager {
  public static async requestReview(force?: boolean): Promise<boolean> {
    Log.info("StoreReviewManager: requestReview", { force })
    if (!force && !(await this.canRequestReview())) {
      Log.info("StoreReviewManager: requestReview - cannot request review at this time")
      return false
    }

    try {
      const isSupported = await StoreReview.isAvailableAsync()
      Log.info("StoreReviewManager: isAvailableAsync", { isSupported })

      const canShowReviewPrompt = await StoreReview.hasAction()
      Log.info("StoreReviewManager: hasAction", { canShowReviewPrompt })

      if (isSupported && canShowReviewPrompt) {
        Log.info("StoreReviewManager: Calling requestReview()")
        await StoreReview.requestReview()
        await this.updateReviewBackoffData()
        const analytics = AnalyticsManager.getInstance()
        analytics.logEvent("store_review_prompted")
        Log.info("StoreReviewManager: Review prompt shown successfully")
        return true
      } else {
        Log.info("StoreReviewManager: Cannot show review prompt", {
          isSupported,
          canShowReviewPrompt,
        })
        return false
      }
    } catch (error) {
      Log.error("StoreReviewManager: Error in requestReview", error)
      return false
    }
  }

  private static async getReviewBackoffData(): Promise<IReviewBackoffData | undefined> {
    const data = ganon.get("reviewBackoff")
    if (data) {
      data.lastPrompted = new Date(data.lastPrompted)
    }
    return data
  }

  private static async setReviewBackoffData(data: IReviewBackoffData): Promise<void> {
    ganon.set("reviewBackoff", data)
  }

  private static async canRequestReview(): Promise<boolean> {
    const data = await this.getReviewBackoffData()

    if (!data) {
      return true
    }

    const { lastPrompted, timesPrompted, completed } = data

    if (completed) {
      return false
    }

    const now = new Date()
    const daysSinceLastPrompt = Math.floor(
      (now.getTime() - lastPrompted.getTime()) / (1000 * 60 * 60 * 24),
    )
    const daysBetweenPrompts = [1, 1, 2, 4, 7, 7, 14]
    const backoffDays = daysBetweenPrompts[timesPrompted - 1] || 14

    return daysSinceLastPrompt >= backoffDays
  }

  private static async updateReviewBackoffData(): Promise<void> {
    let data = await this.getReviewBackoffData()

    if (data) {
      data.lastPrompted = new Date()
      data.timesPrompted += 1
    } else {
      data = {
        lastPrompted: new Date(),
        timesPrompted: 1,
        completed: false,
      }
    }

    await this.setReviewBackoffData(data)
  }
}
