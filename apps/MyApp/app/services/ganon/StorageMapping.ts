import IUser from "@/types/IUser"
import { ModelSnapshotType } from "mobx-state-tree"

interface StorageStaticMapping {
  // v1
  email: string | null
  lastBackup: number
  user: IUser
  rootState: ModelSnapshotType<any>
}

type StorageMapping = StorageStaticMapping & {
  [key: `setting:${string}`]: any
}

export default StorageMapping
