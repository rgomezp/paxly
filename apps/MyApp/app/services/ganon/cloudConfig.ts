import { CloudBackupConfig } from "@rgomezp/ganon"
import StorageMapping from "./StorageMapping"

const CLOUD_BACKUP_CONFIG: CloudBackupConfig<StorageMapping> = {
  // v1
  user: {
    docKeys: ["user"],
  },
}

export default CLOUD_BACKUP_CONFIG
