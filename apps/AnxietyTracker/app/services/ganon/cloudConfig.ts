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
      "finishedOnboarding",
      "lastWateredData",
      "goals",
      "gender",
      "ageRange",
      "anxietySeverity",
      "anxietyDuration",
      "mascotName",
      "isFirstTimeTracking",
      "trackingGoal",
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
    subcollectionKeys: ["whyItDidntWork", "redFlags", "letterToMyself"],
  },
}

export default CLOUD_BACKUP_CONFIG
