import { MigrationDirector } from "@/migrations"
import LetterToMyselfManager from "./LetterToMyselfManager"
import BadgeManager from "./BadgeManager"
import { BadgeType } from "@/types/IBadgeData"

export default class DataInitializationManager {
  static async initializeData() {
    await MigrationDirector.runMigrations()

    // check for unread delivered letters and set badge if any
    if (LetterToMyselfManager.hasUnreadLetters()) {
      BadgeManager.setBadge(BadgeType.LETTER_TO_MYSELF)
    }
  }
}
