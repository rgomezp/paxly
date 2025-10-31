import { FC, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, Alert } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Screen, Text } from "@/components"
import Language from "@/internationalization/Language"
import LANGUAGE_COPY from "@/internationalization/LanguageCopy"
import SettingRow from "./components/SettingRow"
import { useThemeSettingConfig, useDeleteAccountSettingConfig } from "./configs"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import LoadingModal from "@/components/modals/LoadingModal"

interface SettingsScreenProps extends AppStackScreenProps<"Settings"> {}

export const SettingsScreen: FC<SettingsScreenProps> = observer(function SettingsScreen() {
  const { themed } = useAppTheme()
  const [isDeleting, setIsDeleting] = useState(false)

  // Get setting configurations
  const themeSetting = useThemeSettingConfig()
  const deleteAccountSetting = useDeleteAccountSettingConfig()

  // Wrap delete onPress with confirm + loading modal
  const deleteSettingWithConfirm = useMemo(() => {
    return {
      ...deleteAccountSetting,
      onPress: () => {
        Alert.alert(
          "Delete account",
          "Are you sure you want to delete your account and all local data? This action cannot be undone.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Delete",
              style: "destructive",
              onPress: async () => {
                try {
                  setIsDeleting(true)
                  await deleteAccountSetting.onPress?.()
                } finally {
                  // Keep modal until app switches navigators (Onboarding)
                  // As a fallback, dismiss after a short delay
                  setTimeout(() => setIsDeleting(false), 2000)
                }
              },
            },
          ],
        )
      },
    }
  }, [deleteAccountSetting])

  const settings = [themeSetting, deleteSettingWithConfirm]

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
      <LoadingModal visible={isDeleting} text="Deleting account..." />
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
