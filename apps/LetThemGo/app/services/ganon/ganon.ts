import { Ganon, LogLevel } from "@potionforge/ganon"
import CLOUD_BACKUP_CONFIG from "./cloudConfig"
import StorageMapping from "./StorageMapping"

const logLevel = process.env.NODE_ENV === "development" ? LogLevel.INFO : LogLevel.NONE

// Initialize Ganon instance
const ganonInstance = new Ganon<StorageMapping>({
  identifierKey: "email",
  cloudConfig: CLOUD_BACKUP_CONFIG,
  logLevel,
  autoStartSync: true,
  // remoteReadonly: true,
})

export const ganon = ganonInstance
