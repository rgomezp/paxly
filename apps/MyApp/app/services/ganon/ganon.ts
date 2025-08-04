import { Ganon, LogLevel } from "@rgomezp/ganon"
import CLOUD_BACKUP_CONFIG from "./cloudConfig"
import StorageMapping from "./StorageMapping"

const logLevel = process.env.NODE_ENV === "development" ? LogLevel.VERBOSE : LogLevel.NONE

// Initialize once using your specialized type.
export const ganon: Ganon<StorageMapping> = new Ganon<StorageMapping>({
  identifierKey: "email",
  cloudConfig: CLOUD_BACKUP_CONFIG,
  logLevel,
  autoStartSync: false,
  // remoteReadonly: true,
})
