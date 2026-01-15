import { IAppSettingsModalConfig, IAppSettingsThemeConfig } from "@/types/IAppSettingsConfig"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemeContexts } from "@/theme"
import Language from "@/internationalization/Language"
import LANGUAGE_COPY from "@/internationalization/LanguageCopy"
import { ganon } from "@/services/ganon/ganon"
import LoginManager from "@/managers/LoginManager"
import DataInitializationManager from "@/managers/DataInitializationManager"
import EventRegister from "@/utils/EventEmitter"
import { GLOBAL_EVENTS } from "@/constants/events"
import { reloadAllStores } from "@/models/helpers/useStores"
import {
  MoodReminderFrequency,
  MoodReminderFrequencyShorthand,
} from "@/types/MoodReminderFrequency"
import { MoodReminderFrequencyModal } from "@/components/settings/MoodReminderFrequencyModal"
import { LowContactModal } from "@/components/settings/LowContactModal"
import { createElement } from "react"

export const useThemeSettingConfig = (): IAppSettingsThemeConfig => {
  const { setThemeContextOverride } = useAppTheme()
  // Read persisted preference directly so we can show "system" when set
  const persistedPref = (ganon.get("theme") as ThemeContexts | undefined) ?? "auto"

  const getThemeDisplayValue = (): string => {
    // Show based on persisted preference (not resolved scheme)
    switch (persistedPref) {
      case "light":
        return (LANGUAGE_COPY.words.light as any)[Language.current]
      case "dark":
        return (LANGUAGE_COPY.words.dark as any)[Language.current]
      default:
        return (LANGUAGE_COPY.words.system as any)[Language.current]
    }
  }

  const toggleTheme = () => {
    const themeCycle: ThemeContexts[] = ["light", "dark", "auto"]
    const currentIndex = themeCycle.indexOf(persistedPref)
    const nextIndex = (currentIndex + 1) % themeCycle.length
    setThemeContextOverride(themeCycle[nextIndex])
  }

  return {
    title: (LANGUAGE_COPY.words.theme as any)[Language.current],
    iconName: "palette",
    iconType: "font-awesome",
    getValue: getThemeDisplayValue,
    toggleTheme,
  }
}

export const useMoodReminderFrequencySettingConfig = (): IAppSettingsModalConfig => {
  const getValue = () => {
    const frequency = ganon.get("moodReminderFrequency") as MoodReminderFrequency | null
    if (!frequency) {
      return "Not set"
    }
    return MoodReminderFrequencyShorthand[frequency] || "Not set"
  }

  return {
    title: "Mood reminders",
    iconName: "bell",
    iconType: "font-awesome",
    getValue,
    modalContent: (onClose: () => void) => createElement(MoodReminderFrequencyModal, { onClose }),
  }
}

export const useLowContactSettingConfig = (): IAppSettingsModalConfig => {
  const getValue = () => {
    const isLowContact = ganon.get("lowContact") ?? false
    return isLowContact ? "On" : "Off"
  }

  return {
    title: "Low contact",
    iconName: "handshake",
    iconType: "font-awesome",
    getValue,
    modalContent: (onClose: () => void) => createElement(LowContactModal, { onClose }),
  }
}

export const useDeleteAccountSettingConfig = (): IAppSettingsModalConfig => {
  const getValue = () => (ganon.get("email") as string | undefined) ?? ""

  const onPress = async () => {
    const loggedIn = LoginManager.getInstance().isLoggedIn()
    if (loggedIn) {
      await ganon.dangerouslyDelete()
      await LoginManager.getInstance().logout(false)
    }
    ganon.clearAllData()
    await DataInitializationManager.initializeData()
    // Reload stores from ganon to ensure UI reflects cleared state
    reloadAllStores()
    EventRegister.emit(GLOBAL_EVENTS.UPDATE_ALL)
  }

  return {
    title: "Delete account",
    iconName: "trash",
    iconType: "font-awesome",
    getValue,
    modalContent: null,
    onPress,
    danger: true,
  } as IAppSettingsModalConfig & { danger: boolean }
}
