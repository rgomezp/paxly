/**
 * This manager is responsible for awarding awards to users.
 *
 * Awards are given in order, after lessons are completed.
 *
 * Special case: The first two awards are guaranteed on the first two lesson completions
 * (bypasses all normal requirements to introduce the notification system).
 *
 * Normal requirements for subsequent awards:
 * - It has been at least 3 days since the last award was given.
 * - The user has completed at least 2 total lessons.
 * - There's a 50% chance to give an award.
 */

import { ganon } from "@/services/ganon/ganon"
import { IAwardData } from "@/types/IAwardData"
import { IAward } from "@/types/IAward"
import { AWARD_SEQUENCE } from "@/data/AwardSequence"
import LessonManager from "./LessonManager"
import Log from "@/utils/Log"

export default class AwardManager {
  /**
   * Gets the award data from storage
   */
  private static getAwardData(): IAwardData {
    const stored = ganon.get("awardData") as IAwardData | undefined
    if (!stored) {
      const fresh: IAwardData = {
        earnedAwardIds: [],
        lastAwardDate: 0,
      }
      ganon.set("awardData", fresh)
      return fresh
    }
    return stored
  }

  /**
   * Saves the award data to storage
   */
  private static saveAwardData(data: IAwardData): void {
    ganon.set("awardData", data)
  }

  /**
   * Checks the deterministic requirements for an award (without random chance)
   * @returns true if all deterministic requirements are met
   */
  private static checkDeterministicRequirements(): boolean {
    const awardData = this.getAwardData()
    const completedLessons = LessonManager.getCompletedLessons()

    // Check if user has completed at least 2 lessons
    if (completedLessons.length < 2) {
      return false
    }

    // Check if it has been at least 3 days since the last award
    const today = Date.now()
    const diffTime = Math.abs(today - awardData.lastAwardDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays < 3) {
      return false
    }

    // Check if there are any awards left to give
    if (awardData.earnedAwardIds.length >= AWARD_SEQUENCE.length) {
      return false
    }

    return true
  }

  /**
   * Checks if an award should be given on the first or second lesson completion
   * This bypasses all normal requirements to guarantee the first two awards
   * @returns true if this is the first or second lesson completion and the corresponding award hasn't been given yet
   */
  static shouldAwardOnFirstTwoLessons(): boolean {
    const awardData = this.getAwardData()
    const completedLessons = LessonManager.getCompletedLessons()

    // First lesson completion should give the first award
    if (completedLessons.length === 1 && awardData.earnedAwardIds.length === 0) {
      return true
    }

    // Second lesson completion should give the second award
    if (completedLessons.length === 2 && awardData.earnedAwardIds.length === 1) {
      return true
    }

    return false
  }

  /**
   * Checks if an award is available based on the requirements (includes random chance)
   * @returns true if an award should be given, false otherwise
   */
  static checkAwardAvailability(): boolean {
    // First, check if we should award on first or second lesson completion
    if (this.shouldAwardOnFirstTwoLessons()) {
      const completedLessons = LessonManager.getCompletedLessons()
      Log.info(
        `AwardManager: checkAwardAvailability: awarding award on lesson ${completedLessons.length} completion`,
      )
      return true
    }

    if (!this.checkDeterministicRequirements()) {
      return false
    }

    // 50% chance to give an award
    const shouldAward = Math.random() < 0.5
    Log.info(`AwardManager: checkAwardAvailability: shouldAward: ${shouldAward}`)
    return shouldAward
  }

  /**
   * Gets the next award that would be given without actually awarding it
   * This only checks deterministic requirements (no random check)
   * @returns The next award metadata, or null if no award is available
   */
  static getNextAward(): IAward | null {
    const awardData = this.getAwardData()
    const nextAwardIndex = awardData.earnedAwardIds.length

    // Check if there are any awards left
    if (nextAwardIndex >= AWARD_SEQUENCE.length) {
      return null
    }

    // If this is the first or second award on first two lessons, return it without checking other requirements
    if (this.shouldAwardOnFirstTwoLessons()) {
      return AWARD_SEQUENCE[nextAwardIndex]
    }

    // For subsequent awards, check deterministic requirements
    if (!this.checkDeterministicRequirements()) {
      return null
    }

    return AWARD_SEQUENCE[nextAwardIndex]
  }

  /**
   * Awards the next award in the sequence to the user
   * @param skipAvailabilityCheck - If true, skips the availability check (used when award was already confirmed available)
   * @returns The awarded award metadata, or null if no award was given
   */
  static award(skipAvailabilityCheck: boolean = false): IAward | null {
    if (!skipAvailabilityCheck && !this.checkAwardAvailability()) {
      return null
    }

    // If this is the first or second award on first two lessons, bypass normal requirements
    const shouldAwardOnFirstTwoLessons = this.shouldAwardOnFirstTwoLessons()
    if (!shouldAwardOnFirstTwoLessons) {
      // Even if skipping availability check, verify deterministic requirements
      if (!this.checkDeterministicRequirements()) {
        return null
      }
    }

    const awardData = this.getAwardData()
    const nextAwardIndex = awardData.earnedAwardIds.length
    Log.info(`AwardManager: award: awarding award: ${AWARD_SEQUENCE[nextAwardIndex].name}`)

    // Check if there are any awards left
    if (nextAwardIndex >= AWARD_SEQUENCE.length) {
      return null
    }

    const award = AWARD_SEQUENCE[nextAwardIndex]
    const updatedData: IAwardData = {
      earnedAwardIds: [...awardData.earnedAwardIds, award.id],
      lastAwardDate: Date.now(),
    }

    this.saveAwardData(updatedData)
    return award
  }

  /**
   * Gets all earned awards
   */
  static getEarnedAwards(): IAward[] {
    const awardData = this.getAwardData()
    return AWARD_SEQUENCE.filter((award) => awardData.earnedAwardIds.includes(award.id))
  }

  /**
   * Gets all awards (earned and unearned)
   */
  static getAllAwards(): IAward[] {
    return AWARD_SEQUENCE
  }
}
