import { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Screen, Text } from "@/components"
import Language from "@/internationalization/Language"
import LANGUAGE_COPY from "@/internationalization/LanguageCopy"
import SettingRow from "./components/SettingRow"
import { useThemeSettingConfig, useTestSettingConfig, useTestModalSettingConfig } from "./configs"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"

interface SettingsScreenProps extends AppStackScreenProps<"Settings"> {}

export const SettingsScreen: FC<SettingsScreenProps> = observer(function SettingsScreen() {
  const { themed } = useAppTheme()

  // Get setting configurations
  const themeSetting = useThemeSettingConfig()
  const testSetting = useTestSettingConfig()
  const testModalSetting = useTestModalSettingConfig()

  const settings = [themeSetting, testSetting, testModalSetting]

  return (
    <Screen style={themed($root)} preset="scroll">
      <Text
        text={(LANGUAGE_COPY.words as any).settings[Language.current]}
        preset="heading"
        style={themed($heading)}
      />
      {settings.map((setting) => (
        <SettingRow key={setting.title} config={setting} value={setting.getValue()} />
      ))}
    </Screen>
  )
})

const $root: ThemedStyle<ViewStyle> = (theme) => ({
  flex: 1,
  padding: 16,
  backgroundColor: theme.colors.background,
})

const $heading: ThemedStyle<TextStyle> = (theme) => ({
  marginTop: 16,
  color: theme.colors.text,
})
