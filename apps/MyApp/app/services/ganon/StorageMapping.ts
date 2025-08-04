import ITheme from "@/types/ITheme"
import IUser from "@/types/IUser"
import { ModelSnapshotType } from "mobx-state-tree"

interface StorageMapping {
  // v1
  email: string | null
  lastBackup: number
  user: IUser
  rootState: ModelSnapshotType<any>
  theme: ITheme
}

export default StorageMapping
