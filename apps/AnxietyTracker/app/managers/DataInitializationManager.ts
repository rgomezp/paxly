import { MigrationDirector } from "@/migrations"
import LetterToMyselfManager from "./LetterToMyselfManager"
import BadgeManager from "./BadgeManager"
import { BadgeType } from "@/types/IBadgeData"
import { ganon } from "@/services/ganon/ganon"

export default class DataInitializationManager {
  static async initializeData() {
    await MigrationDirector.runMigrations()

    // check for unread delivered letters and set badge if any
    if (LetterToMyselfManager.hasUnreadLetters()) {
      BadgeManager.setBadge(BadgeType.LETTER_TO_MYSELF)
    }

    // set waves sound as default (sounds on)
    ganon.set("natureSoundsEnabled", true)
    ganon.set("natureSoundType", "waves")
  }
}
