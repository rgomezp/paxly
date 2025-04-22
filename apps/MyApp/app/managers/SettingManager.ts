import { ganon } from "@/services/ganon/ganon"
import ITheme from "@/models/ITheme"

type SettingMapping = {
  theme: ITheme
}

export default class SettingManager {
  static saveSetting<K extends keyof SettingMapping>(key: K, value: SettingMapping[K]) {
    ganon.set(`setting:${key}`, value)
  }

  static getSetting<K extends keyof SettingMapping>(key: K): SettingMapping[K] | undefined {
    return ganon.get(`setting:${key}`)
  }
}
