import { useState, useEffect, useRef, useCallback } from "react"
import { View, ViewStyle, AppState, AppStateStatus } from "react-native"
import {
  MultipleChoiceSelector,
  type MultipleChoiceOption,
} from "@/components/onboarding/shared/MultipleChoiceSelector"
import { MoodReminderFrequency, MoodReminderFrequencyLabels } from "@/types/MoodReminderFrequency"
import { ganon } from "@/services/ganon/ganon"
import { OneSignal } from "react-native-onesignal"
import Log from "@/utils/Log"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import { Text } from "@/components"
import { TextStyle } from "react-native"
import EventRegister from "@/utils/EventEmitter"
import { GLOBAL_EVENTS } from "@/constants/events"
import RectangularButton from "@/components/buttons/RectangularButton"

interface MoodReminderFrequencyModalProps {
  onClose: () => void
}

const options: MultipleChoiceOption<MoodReminderFrequency>[] = [
  {
    id: MoodReminderFrequency.EVERY_HOUR,
    label: MoodReminderFrequencyLabels[MoodReminderFrequency.EVERY_HOUR],
  },
  {
    id: MoodReminderFrequency.THREE_TIMES_DAY,
    label: MoodReminderFrequencyLabels[MoodReminderFrequency.THREE_TIMES_DAY],
  },
  {
    id: MoodReminderFrequency.SIX_TIMES_DAY,
    label: MoodReminderFrequencyLabels[MoodReminderFrequency.SIX_TIMES_DAY],
  },
  {
    id: MoodReminderFrequency.ONCE_DAY,
    label: MoodReminderFrequencyLabels[MoodReminderFrequency.ONCE_DAY],
  },
]

export function MoodReminderFrequencyModal({ onClose }: MoodReminderFrequencyModalProps) {
  const { themed } = useAppTheme()
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [isRequestingPermission, setIsRequestingPermission] = useState(false)
  const appState = useRef(AppState.currentState)

  // Read saved frequency from ganon
  const savedFrequency = ganon.get("moodReminderFrequency") as MoodReminderFrequency | null
  const initialSelected = savedFrequency ? [savedFrequency] : []

  const checkPermission = useCallback(async () => {
    try {
      const permissionStatus = await OneSignal.Notifications.getPermissionAsync()

      // getPermissionAsync returns a boolean indicating if permission is granted
      const isGranted = Boolean(permissionStatus)

      setHasPermission(isGranted)
      setIsRequestingPermission(false)
    } catch (error) {
      Log.error(`MoodReminderFrequencyModal: Error checking permission: ${error}`)
      setHasPermission(false)
      setIsRequestingPermission(false)
    }
  }, [])

  // Check permission status on mount
  useEffect(() => {
    checkPermission()
  }, [checkPermission])

  // Listen for app state changes to re-check permission when app comes back to foreground
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        // App has come to the foreground - re-check permission
        Log.info("MoodReminderFrequencyModal: App came to foreground, re-checking permission")
        checkPermission()
      }
      appState.current = nextAppState
    })

    return () => {
      subscription.remove()
    }
  }, [checkPermission])

  // Periodically check permission while modal is visible and permission is not granted
  useEffect(() => {
    // Only set up interval if permission is not granted
    if (hasPermission === false) {
      const interval = setInterval(() => {
        Log.info("MoodReminderFrequencyModal: Periodic permission check")
        checkPermission()
      }, 2000) // Check every 2 seconds

      return () => {
        clearInterval(interval)
      }
    }
    return undefined
  }, [hasPermission, checkPermission])

  const buttonPressed = (optionId: string) => {
    Log.info(`MoodReminderFrequencyModal: buttonPressed: ${optionId}`)

    const selectedFrequency = optionId as MoodReminderFrequency

    // Save to ganon
    try {
      ganon.set("moodReminderFrequency", selectedFrequency)
      Log.info(`MoodReminderFrequencyModal: Saved moodReminderFrequency: ${selectedFrequency}`)
    } catch (e) {
      Log.error(`MoodReminderFrequencyModal: Error saving moodReminderFrequency: ${e}`)
    }

    // Add OneSignal tag
    try {
      OneSignal.User.addTag("mood_reminder_frequency", selectedFrequency)
      Log.info(
        `MoodReminderFrequencyModal: Added OneSignal tag: mood_reminder_frequency=${selectedFrequency}`,
      )
    } catch (e) {
      Log.error(`MoodReminderFrequencyModal: Error adding OneSignal tag: ${e}`)
    }

    // Trigger update event to refresh settings screen
    EventRegister.emit(GLOBAL_EVENTS.UPDATE_ALL)

    // Close modal after selection
    onClose()
  }

  // Show loading state while checking permission (initial check only)
  if (hasPermission === null) {
    return (
      <View style={themed($container)}>
        <Text style={themed($loadingText)}>Checking notification permissions...</Text>
      </View>
    )
  }

  // Show loading state while requesting permission
  if (isRequestingPermission) {
    return (
      <View style={themed($permissionContainer)}>
        <Text style={themed($loadingText)}>Requesting notification permission...</Text>
      </View>
    )
  }

  const handleRequestPermission = async () => {
    try {
      setIsRequestingPermission(true)

      // Add timeout to prevent infinite loading if requestPermission hangs
      const timeoutPromise = new Promise<boolean>((resolve) => {
        setTimeout(() => {
          resolve(false)
        }, 10000) // 10 second timeout
      })

      const permissionPromise = OneSignal.Notifications.requestPermission(true)

      // Race between permission request and timeout
      await Promise.race([permissionPromise, timeoutPromise])

      // Re-check permission status after request to get accurate state
      await checkPermission()
    } catch (error) {
      Log.error(`MoodReminderFrequencyModal: Error requesting permission: ${error}`)
      setHasPermission(false)
      setIsRequestingPermission(false)
    }
  }

  // Show options only if permission is granted
  if (!hasPermission) {
    return (
      <View style={themed($permissionContainer)}>
        <Text style={themed($permissionText)}>
          Notification permission is required for mood reminders.
        </Text>
        <Text style={themed($permissionHelpText)}>
          Tap the button below to enable notifications, or enable it manually in your device
          settings.
        </Text>
        <View style={themed($buttonContainer)}>
          <RectangularButton
            buttonText="Enable Notifications"
            onClick={handleRequestPermission}
            isDisabled={isRequestingPermission}
            width={280}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={themed($container)}>
      <MultipleChoiceSelector
        options={options}
        onSelection={buttonPressed}
        allowMultiple={false}
        initialSelectedOptions={initialSelected}
        maxOptions={10}
      />
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = () => ({
  width: "100%",
})

const $loadingText: ThemedStyle<TextStyle> = (theme) => ({
  textAlign: "center",
  fontSize: 16,
  color: theme.colors.text,
})

const $permissionContainer: ThemedStyle<ViewStyle> = () => ({
  width: "100%",
  alignItems: "center",
  paddingVertical: 20,
})

const $permissionText: ThemedStyle<TextStyle> = (theme) => ({
  textAlign: "center",
  marginBottom: 12,
  fontSize: 16,
  color: theme.colors.text,
})

const $permissionHelpText: ThemedStyle<TextStyle> = (theme) => ({
  textAlign: "center",
  marginBottom: 24,
  fontSize: 14,
  color: theme.colors.textDim,
  paddingHorizontal: 20,
})

const $buttonContainer: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  marginTop: 8,
})
