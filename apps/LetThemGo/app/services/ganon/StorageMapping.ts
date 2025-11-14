import ITheme from "@/types/ITheme"
import IUser from "@/types/IUser"
import { ModelSnapshotType } from "mobx-state-tree"
import { IModalQueueState } from "../../types/modals/modals"
import { IReferralData } from "@/types/IReferralData"
import IReviewBackoffData from "@/types/IReviewBackoffData"
import INoContactData from "@/types/INoContactData"
import { IMoodHistoryItem } from "@/types/IMoodHistoryItem"
import { IDailyTasks } from "@/types/IDailyTasks"
import { ITodaysLessonState } from "@/types/ITodaysLessonState"
import IJournalEntry from "@/types/IJournalEntry"
import { ILastWateredData } from "@/types/ILastWateredData"
import { GoalChoices } from "@/types/GoalChoice"
import { Genders } from "@/types/Gender"
import { AgeRanges } from "@/types/AgeRange"
import { RelationshipDurations } from "@/types/RelationshipDuration"
import { WhoEndedItChoices } from "@/types/WhoEndedIt"
import { MascotNames } from "@/types/MascotName"
import { YesNoChoices } from "@/types/YesNo"
import { NoContactReasonChoices } from "@/types/NoContactReason"
import { ContactTemptationSituationsChoices } from "@/types/ContactTemptationSituations"
import { AppMainGoalChoices } from "@/types/AppMainGoal"
import { MoodReminderFrequency } from "@/types/MoodReminderFrequency"
import { IFlags } from "@/types/IFlags"
import { ILessonResponses } from "@/types/ILessonResponses"
import { IAwardData } from "@/types/IAwardData"
import { IBadgeData } from "@/types/IBadgeData"

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
  premiumOverride: boolean
  reviewBackoff: IReviewBackoffData
  passedAppCheck: boolean
  finishedOnboarding: boolean
  noContactData: INoContactData
  moodHistory: IMoodHistoryItem[]
  dailyTasks: IDailyTasks
  journalEntries: IJournalEntry[]
  messageIntoTheVoidDraft: string | null
  lastWateredData: ILastWateredData
  goals: GoalChoices[]
  gender: Genders | null
  ageRange: AgeRanges | null
  relationshipDuration: RelationshipDurations | null
  whoEndedIt: WhoEndedItChoices | null
  mascotName: MascotNames | null
  isFirstBreakup: YesNoChoices | null
  noContactReason: NoContactReasonChoices | null
  checkSocialMedia: YesNoChoices | null
  contactTemptationSituation: ContactTemptationSituationsChoices | null
  appMainGoal: AppMainGoalChoices | null
  moodReminderFrequency: MoodReminderFrequency | null
  flagOverrides: Partial<IFlags>
  dailyLesson: ITodaysLessonState | null
  completedLessons: CompletedLessonsState
  lessonResponses: ILessonResponses
  awardData: IAwardData
  meTabBadgeData: IBadgeData | null
}

export default StorageMapping
