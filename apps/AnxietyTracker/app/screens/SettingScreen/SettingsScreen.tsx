import { FC, useMemo, useState, useEffect, useCallback, useRef } from "react"
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
  useNatureSoundsEnabledSettingConfig,
  useNatureSoundTypeSettingConfig,
} from "./configs"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import LoadingModal from "@/components/modals/LoadingModal"
import EventRegister from "@/utils/EventEmitter"
import { GLOBAL_EVENTS } from "@/constants/events"
import { useFocusEffect } from "@react-navigation/native"
import { ganon } from "@/services/ganon/ganon"

interface SettingsScreenProps extends AppStackScreenProps<"Settings"> {}

export const SettingsScreen: FC<SettingsScreenProps> = observer(function SettingsScreen({
  route,
  navigation,
}) {
  const { themed } = useAppTheme()
  const [isDeleting, setIsDeleting] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [modalToOpen, setModalToOpen] = useState<string | null>(null)
  const hasProcessedParamsRef = useRef<string | null>(null)

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
  const natureSoundsEnabledSetting = useNatureSoundsEnabledSettingConfig()
  const natureSoundTypeSetting = useNatureSoundTypeSettingConfig()
  const deleteAccountSetting = useDeleteAccountSettingConfig()

  // Check route params for opening a specific modal - only once per param value
  useFocusEffect(
    useCallback(() => {
      const params = route.params
      const openModal = params?.openModal

      // Only process if we have a param and haven't processed this specific value yet
      if (openModal && hasProcessedParamsRef.current !== openModal) {
        hasProcessedParamsRef.current = openModal

        // Delay to ensure component is fully rendered
        const timer = setTimeout(() => {
          setModalToOpen(openModal)
          // Clear the param after processing to prevent reopening
          navigation.setParams({ openModal: undefined })
        }, 300)

        return () => clearTimeout(timer)
      }
      return undefined
    }, [route.params, navigation]),
  )

  // Reset when modal closes
  const handleModalClose = useCallback(() => {
    setModalToOpen(null)
    hasProcessedParamsRef.current = null
  }, [])

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
  const settings = useMemo(() => {
    // Only show nature sound type setting if nature sounds are enabled
    const natureSoundsEnabled = (ganon.get("natureSoundsEnabled") as boolean | undefined) ?? false

    const baseSettings = [themeSetting, moodReminderFrequencySetting, natureSoundsEnabledSetting]

    // Conditionally include nature sound type setting
    if (natureSoundsEnabled) {
      baseSettings.push(natureSoundTypeSetting)
    }

    baseSettings.push(deleteSettingWithConfirm)

    return baseSettings
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    themeSetting,
    moodReminderFrequencySetting,
    natureSoundsEnabledSetting,
    natureSoundTypeSetting,
    deleteSettingWithConfirm,
    refreshKey,
  ])

  return (
    <Screen style={themed($root)} preset="scroll" safeAreaEdges={["bottom", "left", "right"]}>
      <Text
        text={(LANGUAGE_COPY.words as any).settings[Language.current]}
        preset="heading"
        style={themed($heading)}
      />
      {settings.map((setting) => (
        <SettingRow
          key={setting.title}
          config={setting}
          value={setting.getValue()}
          autoOpen={modalToOpen === setting.title}
          onModalClose={handleModalClose}
        />
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
