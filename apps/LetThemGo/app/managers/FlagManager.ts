import { IFlags, isFeatureFlags } from "@/types/IFlags"
import Log from "../utils/Log"
import { getFirestore, doc, getDoc } from "@react-native-firebase/firestore"
import { ganon } from "@/services/ganon/ganon"

export default class FlagManager {
  private static _cache: IFlags | null = null
  private static _localOverrides: Partial<IFlags> = {}

  static loadLocalOverrides() {
    const overrides = ganon.get("flagOverrides")
    if (overrides) {
      this._localOverrides = overrides
    }
  }

  static setLocalOverride<K extends keyof IFlags>(flag: K, value: IFlags[K]) {
    this._localOverrides[flag] = value
    ganon.set("flagOverrides", this._localOverrides)
  }

  static clearLocalOverride<K extends keyof IFlags>(flag: K) {
    delete this._localOverrides[flag]
    ganon.set("flagOverrides", this._localOverrides)
  }

  static clearAllLocalOverrides() {
    this._localOverrides = {}
    ganon.set("flagOverrides", {})
  }

  static async getFeatureFlags(): Promise<IFlags | void> {
    if (this._cache) {
      return this._cache
    }

    const db = getFirestore()
    const docRef = doc(db, "feature_flags", "flags")
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists) {
      Log.error("FlagManager: getFeatureFlags: no data found")
      return
    }

    const data = docSnap.data()

    if (!isFeatureFlags(data)) {
      Log.error("FlagManager: getFeatureFlags: invalid data type")
      return
    }

    this._cache = data // Cache the flags for the session
    return data
  }

  static async get<K extends keyof IFlags>(flag: K): Promise<IFlags[K]> {
    if (flag in this._localOverrides) {
      return this._localOverrides[flag] as IFlags[K]
    }
    const flags = await this.getFeatureFlags()
    if (!flags) {
      return false as IFlags[K]
    }
    return flags[flag] ?? (false as IFlags[K])
  }

  static clearCache(): void {
    this._cache = null
  }
}
