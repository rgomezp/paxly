import { useEffect, useState, useRef, useCallback } from "react"
import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { MoodReminderFrequency, MoodReminderFrequencyLabels } from "@/types/MoodReminderFrequency"
import { ganon } from "@/services/ganon/ganon"
import { OneSignal } from "react-native-onesignal"
import { View, ViewStyle, TextStyle, AppState, AppStateStatus } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import { Text } from "@/components"
import RectangularButton from "@/components/buttons/RectangularButton"

type MoodReminderFrequencySlideProps = {
  onSelection?: () => void
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

function MoodReminderFrequencyComponent({ onSelection }: MoodReminderFrequencySlideProps) {
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
      Log.error(`MoodReminderFrequencySlide: Error checking permission: ${error}`)
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
        Log.info("MoodReminderFrequencySlide: App came to foreground, re-checking permission")
        checkPermission()
      }
      appState.current = nextAppState
    })

    return () => {
      subscription.remove()
    }
  }, [checkPermission])

  // Periodically check permission while slide is visible and permission is not granted
  useEffect(() => {
    // Only set up interval if permission is not granted
    if (hasPermission === false) {
      const interval = setInterval(() => {
        Log.info("MoodReminderFrequencySlide: Periodic permission check")
        checkPermission()
      }, 2000) // Check every 2 seconds

      return () => {
        clearInterval(interval)
      }
    }
    return undefined
  }, [hasPermission, checkPermission])

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
      const updatedPermissionStatus = await OneSignal.Notifications.getPermissionAsync()
      const isGrantedAfterRequest = Boolean(updatedPermissionStatus)

      setHasPermission(isGrantedAfterRequest)
      setIsRequestingPermission(false)
    } catch (error) {
      Log.error(`MoodReminderFrequencySlide: Error requesting permission: ${error}`)
      setHasPermission(false)
      setIsRequestingPermission(false)
    }
  }

  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`MoodReminderFrequencySlide: buttonPressed: ${optionId}`)

    const selectedFrequency = optionId as MoodReminderFrequency

    // Save to ganon
    try {
      ganon.set("moodReminderFrequency", selectedFrequency)
      Log.info(`MoodReminderFrequencySlide: Saved moodReminderFrequency: ${selectedFrequency}`)
    } catch (e) {
      Log.error(`MoodReminderFrequencySlide: Error saving moodReminderFrequency: ${e}`)
    }

    // Add OneSignal tag
    try {
      OneSignal.User.addTag("mood_reminder_frequency", selectedFrequency)
      Log.info(
        `MoodReminderFrequencySlide: Added OneSignal tag: mood_reminder_frequency=${selectedFrequency}`,
      )
    } catch (e) {
      Log.error(`MoodReminderFrequencySlide: Error adding OneSignal tag: ${e}`)
    }

    // Auto-advance when shouldAutoAdvance is true
    if (shouldAutoAdvance) {
      onSelection?.()
    }
  }

  // Show loading state while checking permission (initial check only)
  if (hasPermission === null) {
    return (
      <View style={themed($loadingContainer)}>
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
    <MultipleChoiceSelector
      options={options}
      onSelection={buttonPressed}
      allowMultiple={false}
      initialSelectedOptions={initialSelected}
      onAutoAdvance={onSelection}
    />
  )
}

export function moodReminderFrequencySlide({
  onSelection,
}: MoodReminderFrequencySlideProps): ISlide {
  return {
    id: "moodReminderFrequency",
    title: "How often would you like tracking reminders?",
    description: "We'll send you gentle reminders to log your mood and anxiety",
    component: <MoodReminderFrequencyComponent onSelection={onSelection} />,
  }
}

const $loadingContainer: ThemedStyle<ViewStyle> = (_theme) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 40,
})

const $loadingText: ThemedStyle<TextStyle> = (theme) => ({
  textAlign: "center",
  fontSize: 16,
  color: theme.colors.text,
})

const $permissionContainer: ThemedStyle<ViewStyle> = (_theme) => ({
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

const $buttonContainer: ThemedStyle<ViewStyle> = (_theme) => ({
  alignItems: "center",
  marginTop: 8,
})
