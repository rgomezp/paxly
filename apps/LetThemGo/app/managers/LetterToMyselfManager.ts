import { ganon } from "@/services/ganon/ganon"
import { rootStoreSingleton } from "@/models/helpers/useStores"
import AnalyticsManager from "./AnalyticsManager"
import BadgeManager from "./BadgeManager"
import { BadgeType } from "@/types/IBadgeData"
import { ILetterToMyself, LetterDeliveryTime } from "@/types/ILetterToMyself"
import { LetterDraft } from "@/models/letterToMyself/LetterToMyselfStore"
import { OneSignal } from "react-native-onesignal"

export default class LetterToMyselfManager {
  static createLetter(text: string, deliveryTimeMonths: LetterDeliveryTime): ILetterToMyself {
    const now = Date.now()
    const millisecondsPerMonth = 30 * 24 * 60 * 60 * 1000 // Approximate
    const deliverAt = now + deliveryTimeMonths * millisecondsPerMonth

    const letter: ILetterToMyself = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text: text.trim(),
      deliveryTimeMonths,
      createdAt: now,
      deliverAt,
      isRead: false,
    }

    // Delete the draft when sending
    LetterToMyselfManager.clearDraft()

    // Update both ganon and the store for reactivity
    rootStoreSingleton.letterToMyselfStore.addLetter(letter)
    AnalyticsManager.getInstance().logEvent("letter_to_myself_created", {
      deliveryTimeMonths,
    })

    switch (deliveryTimeMonths) {
      case 1:
        OneSignal.User.trackEvent("letter_to_myself_1m")
        break
      case 3:
        OneSignal.User.trackEvent("letter_to_myself_3m")
        break
      case 12:
        OneSignal.User.trackEvent("letter_to_myself_12m")
        break
    }

    return letter
  }

  static getDeliveredLetters(): ILetterToMyself[] {
    return rootStoreSingleton.letterToMyselfStore.deliveredLetters.slice()
  }

  static getUnreadLetters(): ILetterToMyself[] {
    return rootStoreSingleton.letterToMyselfStore.unreadLetters.slice()
  }

  static hasUnreadLetters(): boolean {
    return rootStoreSingleton.letterToMyselfStore.hasUnreadLetters
  }

  static hasDeliveredLetters(): boolean {
    return rootStoreSingleton.letterToMyselfStore.hasDeliveredLetters
  }

  static markAsRead(letterId: string): void {
    rootStoreSingleton.letterToMyselfStore.markAsRead(letterId)
    // Clear badge when letter is read, but only if there are no more unread letters
    if (!rootStoreSingleton.letterToMyselfStore.hasUnreadLetters) {
      BadgeManager.clearBadge(BadgeType.LETTER_TO_MYSELF)
    }
    AnalyticsManager.getInstance().logEvent("letter_to_myself_read")
  }

  static getPendingLetters(): ILetterToMyself[] {
    return rootStoreSingleton.letterToMyselfStore.pendingLetters.slice()
  }

  static getDraft(): LetterDraft | null {
    return ganon.get("letterToMyselfDraft") ?? null
  }

  static saveDraft(text: string, deliveryTimeMonths: LetterDeliveryTime): void {
    const draft: LetterDraft = { text, deliveryTimeMonths }
    // Update both ganon and the store for reactivity
    ganon.set("letterToMyselfDraft", draft)
    rootStoreSingleton.letterToMyselfStore.setDraft(draft)
  }

  static clearDraft(): void {
    ganon.set("letterToMyselfDraft", null)
    rootStoreSingleton.letterToMyselfStore.clearDraft()
  }
}
