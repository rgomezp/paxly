import IUser from "@/models/IUser"
import { ModelSnapshotType } from "mobx-state-tree"

interface StorageMapping {
  // v1
  email: string | null
  lastBackup: number
  user: IUser
  rootState: ModelSnapshotType<any>
}

export default StorageMapping
