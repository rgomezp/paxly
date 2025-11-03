import { Ganon, LocalGanon, LogLevel } from "@potionforge/ganon"
import CLOUD_BACKUP_CONFIG from "./cloudConfig"
import StorageMapping from "./StorageMapping"
import customConfig from "../../../customConfig"

const logLevel = process.env.NODE_ENV === "development" ? LogLevel.VERBOSE : LogLevel.NONE
const config = customConfig()

// Initialize based on localGanon setting
const ganonInstance = config.localGanon
  ? new LocalGanon<StorageMapping>({
      identifierKey: "email",
      logLevel,
    })
  : new Ganon<StorageMapping>({
      identifierKey: "email",
      cloudConfig: CLOUD_BACKUP_CONFIG,
      logLevel,
      autoStartSync: true,
      // remoteReadonly: true,
    })

export const ganon = ganonInstance
