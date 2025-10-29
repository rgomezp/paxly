import ITheme from "@/types/ITheme"
import IUser from "@/types/IUser"
import { ModelSnapshotType } from "mobx-state-tree"
import { IModalQueueState } from "../../types/modals/modals"
import { IReferralData } from "@/types/IReferralData"
import IReviewBackoffData from "@/types/IReviewBackoffData"
import INoContactData from "@/types/INoContactData"
import { IMoodHistoryItem } from "@/types/IMoodHistoryItem"
import { IDailyTasks } from "@/types/IDailyTasks"
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
}

export default StorageMapping
