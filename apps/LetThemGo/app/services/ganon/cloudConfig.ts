import { CloudBackupConfig } from "@potionforge/ganon"
import StorageMapping from "./StorageMapping"

const CLOUD_BACKUP_CONFIG: CloudBackupConfig<StorageMapping> = {
  // v1
  user: {
    docKeys: [
      "user",
      "entitlementId",
      "dailyTasks",
      "noContactData",
      "messageIntoTheVoidDraft",
      "finishedOnboarding",
      "lastWateredData",
      "goals",
      "gender",
      "ageRange",
      "relationshipDuration",
      "whoEndedIt",
      "mascotName",
      "isFirstBreakup",
      "noContactReason",
      "checkSocialMedia",
      "contactTemptationSituation",
      "appMainGoal",
    ],
    subcollectionKeys: ["moodHistory", "journalEntries", "lessonResponses"],
  },
  settings: {
    docKeys: ["theme"],
  },
  utils: {
    docKeys: ["lastRunMigration"],
  },
}

export default CLOUD_BACKUP_CONFIG
