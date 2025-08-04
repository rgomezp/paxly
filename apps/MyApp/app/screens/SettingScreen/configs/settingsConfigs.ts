import {
  IAppSettingsBinaryConfig,
  IAppSettingsModalConfig,
  IAppSettingsThemeConfig,
} from "@/types/IAppSettingsConfig"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemeContexts } from "@/theme"
import Language from "@/internationalization/Language"
import LANGUAGE_COPY from "@/internationalization/LanguageCopy"

export const useThemeSettingConfig = (): IAppSettingsThemeConfig => {
  const { themeContext, setThemeContextOverride } = useAppTheme()

  const getThemeDisplayValue = (): string => {
    switch (themeContext) {
      case "light":
        return (LANGUAGE_COPY.words.light as any)[Language.current]
      case "dark":
        return (LANGUAGE_COPY.words.dark as any)[Language.current]
      default:
        return (LANGUAGE_COPY.words.system as any)[Language.current]
    }
  }

  const toggleTheme = () => {
    const themeCycle: ThemeContexts[] = ["light", "dark", undefined]
    const currentIndex = themeCycle.indexOf(themeContext)
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
