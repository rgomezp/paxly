import { CloudBackupConfig } from "@potionforge/ganon"
import StorageMapping from "./StorageMapping"

const CLOUD_BACKUP_CONFIG: CloudBackupConfig<StorageMapping> = {
  // v1
  user: {
    docKeys: [
      "user",
      "entitlementId",
      "dailyTasks",
      "finishedOnboarding",
      "lastWateredData",
      "goals",
      "gender",
      "ageRange",
      "anxietySeverity",
      "anxietyDuration",
      "mascotName",
      "anxietyTriggerSituation",
      "appMainGoal",
      "awardData",
      "moodReminderFrequency",
      "lowContact",
      "trialStatus",
    ],
    subcollectionKeys: ["moodHistory", "journalEntries"],
  },
  lessons: {
    subcollectionKeys: ["completedLessons", "lessonResponses", "dailyLesson"],
  },
  settings: {
    docKeys: ["theme"],
  },
  utils: {
    docKeys: ["lastRunMigration"],
  },
  tools: {
    docKeys: ["letterToMyselfDraft", "messageIntoTheVoidDraft"],
    subcollectionKeys: ["letterToMyself"],
  },
}

export default CLOUD_BACKUP_CONFIG
