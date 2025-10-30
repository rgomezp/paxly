import {
  IAppSettingsBinaryConfig,
  IAppSettingsModalConfig,
  IAppSettingsThemeConfig,
} from "@/types/IAppSettingsConfig"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemeContexts } from "@/theme"
import Language from "@/internationalization/Language"
import LANGUAGE_COPY from "@/internationalization/LanguageCopy"
import { ganon } from "@/services/ganon/ganon"

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

export const useTestSettingConfig = (): IAppSettingsBinaryConfig => {
  return {
    title: "Test",
    iconName: "search",
    iconType: "font-awesome",
    getValue: () => "Test Value",
    toggleBinarySetting: () => {
      console.log("Test setting toggled")
    },
  }
}

export const useTestModalSettingConfig = (): IAppSettingsModalConfig => {
  return {
    title: "Test Modal",
    iconName: "search",
    iconType: "font-awesome",
    getValue: () => "Test Modal",
    modalContent: null, // Simplified for now
  }
}
