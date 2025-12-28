import { FC, useMemo, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, Alert } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Screen, Text } from "@/components"
import Language from "@/internationalization/Language"
import LANGUAGE_COPY from "@/internationalization/LanguageCopy"
import SettingRow from "./components/SettingRow"
import {
  useThemeSettingConfig,
  useDeleteAccountSettingConfig,
  useMoodReminderFrequencySettingConfig,
} from "./configs"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import LoadingModal from "@/components/modals/LoadingModal"
import EventRegister from "@/utils/EventEmitter"
import { GLOBAL_EVENTS } from "@/constants/events"

interface SettingsScreenProps extends AppStackScreenProps<"Settings"> {}

export const SettingsScreen: FC<SettingsScreenProps> = observer(function SettingsScreen() {
  const { themed } = useAppTheme()
  const [isDeleting, setIsDeleting] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  // Listen for UPDATE_ALL event to refresh settings
  useEffect(() => {
    const handleUpdateAll = () => {
      setRefreshKey((prev) => prev + 1)
    }

    EventRegister.on(GLOBAL_EVENTS.UPDATE_ALL, handleUpdateAll)

    return () => {
      EventRegister.off(GLOBAL_EVENTS.UPDATE_ALL, handleUpdateAll)
    }
  }, [])

  // Get setting configurations
  const themeSetting = useThemeSettingConfig()
  const moodReminderFrequencySetting = useMoodReminderFrequencySettingConfig()
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
                  deleteAccountSetting.onPress?.()
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

  // Recalculate settings array when refreshKey changes to ensure getValue() is called fresh
  const settings = useMemo(
    () => [themeSetting, moodReminderFrequencySetting, deleteSettingWithConfirm],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [themeSetting, moodReminderFrequencySetting, deleteSettingWithConfirm, refreshKey],
  )

  return (
    <Screen style={themed($root)} preset="scroll" safeAreaEdges={["bottom", "left", "right"]}>
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
