import { ganon } from "@/services/ganon/ganon"
import StorageMapping from "@/services/ganon/StorageMapping"

export default class SettingManager {
  static saveSetting<K extends keyof StorageMapping>(key: K, value: StorageMapping[K]) {
    ganon.set(key, value)
  }

  static getSetting<K extends keyof StorageMapping>(key: K): StorageMapping[K] | undefined {
    return ganon.get(key)
  }
}
