import ITheme from "@/types/ITheme"
import IUser from "@/types/IUser"
import { ModelSnapshotType } from "mobx-state-tree"
import { IModalQueueState } from "../../types/modals/modals"
import { IReferralData } from "@/types/IReferralData"
import IReviewBackoffData from "@/types/IReviewBackoffData"
import { IMoodHistoryItem } from "@/types/IMoodHistoryItem"
import { IDailyTasks } from "@/types/IDailyTasks"
import { IDailyLessonState } from "@/types/IDailyLessonState"
import IJournalEntry from "@/types/IJournalEntry"
import { GoalChoices } from "@/types/GoalChoice"
import { Genders } from "@/types/Gender"
import { AgeRanges } from "@/types/AgeRange"
import { RelationshipDurations } from "@/types/RelationshipDuration"
import { WhoEndedItChoices } from "@/types/WhoEndedIt"
import { ContactTemptationSituationsChoices } from "@/types/ContactTemptationSituations"
import { AppMainGoalChoices } from "@/types/AppMainGoal"
import { MoodReminderFrequency } from "@/types/MoodReminderFrequency"
import { IFlags } from "@/types/IFlags"
import { ILessonResponses } from "@/types/ILessonResponses"
import { IAwardData } from "@/types/IAwardData"
import { IBadgeData } from "@/types/IBadgeData"
import { ILetterToMyself } from "@/types/ILetterToMyself"

// Storage key constants
export const STORAGE_KEYS = {
  completedLessons: "completedLessons",
  dailyLesson: "dailyLesson",
} as const

interface CompletedLessonsState {
  lessonIds: string[]
  lastUpdated: number
}

interface StorageMapping {
  // v1
  email: string | null
  lastBackup: number
  user: IUser
  rootState: ModelSnapshotType<any>
  theme: ITheme
  themeColor: string
  lastRunMigration: string
  migrationLock: boolean
  modalQueue: IModalQueueState
  onboardCompleted: boolean
  referralData: IReferralData
  entitlementId: string | null
  trialStatus: "started" | "lapsed" | null
  premiumOverride: boolean
  reviewBackoff: IReviewBackoffData
  passedAppCheck: boolean
  finishedOnboarding: boolean
  moodHistory: IMoodHistoryItem[]
  dailyTasks: IDailyTasks
  journalEntries: IJournalEntry[]
  goals: GoalChoices[]
  gender: Genders | null
  ageRange: AgeRanges | null
  anxietySeverity: RelationshipDurations | null
  anxietyDuration: WhoEndedItChoices | null
  anxietyTriggerSituation: ContactTemptationSituationsChoices | null
  appMainGoal: AppMainGoalChoices | null
  moodReminderFrequency: MoodReminderFrequency | null
  lowContact: boolean
  flagOverrides: Partial<IFlags>
  dailyLesson: IDailyLessonState | null
  completedLessons: CompletedLessonsState
  lessonResponses: ILessonResponses
  awardData: IAwardData
  meTabBadgeData: IBadgeData | null
  letterToMyself: { letters: ILetterToMyself[] } | null
  letterToMyselfDraft: { text: string; deliveryTimeMonths: 1 | 3 | 12 } | null
  lessonsEncouragementDismissed: boolean
  natureSoundsEnabled: boolean
  natureSoundType: "waves" | "birds"
  hasAcceptedMedicalDisclaimer: boolean
}

export default StorageMapping
