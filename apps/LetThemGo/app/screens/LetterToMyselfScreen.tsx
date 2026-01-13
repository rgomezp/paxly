import { FC, useMemo, useState, useEffect, useRef, useCallback } from "react"
import { observer } from "mobx-react-lite"
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Image,
  AppState,
  AppStateStatus,
} from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Text } from "@/components"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import RectangularButton from "@/components/buttons/RectangularButton"
import { useStores } from "@/models"
import { useHeader } from "@/utils/useHeader"
import { Pressable } from "react-native"
import { ThemedFontAwesome5Icon } from "@/components/ThemedFontAwesome5Icon"
import { ThemedPhosphorIcon } from "@/components/ThemedPhosphorIcon"
import { EnvelopeIcon, EnvelopeOpenIcon } from "phosphor-react-native"
import { OneSignal } from "react-native-onesignal"
import Log from "@/utils/Log"

// Conditionally import expo-image for animated WebP support
let ExpoImage: any = null
try {
  ExpoImage = require("expo-image").Image
} catch {}

interface LetterToMyselfScreenProps extends AppStackScreenProps<"LetterToMyself"> {}

const HEADER_COPY =
  "Write a letter to your future self. Choose when you want to receive it—1 month, 3 months, or 1 year from now. When the time comes, you'll find it waiting in your inbox. This is a powerful way to reflect on your growth and see how far you've come."

export const LetterToMyselfScreen: FC<LetterToMyselfScreenProps> = observer(
  function LetterToMyselfScreen({ navigation }) {
    const { themed, theme } = useAppTheme()
    const insets = useSafeAreaInsets()
    const { letterToMyselfStore } = useStores()
    const hasDeliveredLetters = letterToMyselfStore.hasDeliveredLetters
    const hasUnreadLetters = letterToMyselfStore.hasUnreadLetters
    const hasDraft = letterToMyselfStore.hasDraft

    const [hasPermission, setHasPermission] = useState<boolean | null>(null)
    const [isRequestingPermission, setIsRequestingPermission] = useState(false)
    const appState = useRef(AppState.currentState)

    const checkPermission = useCallback(async () => {
      try {
        const permissionStatus = await OneSignal.Notifications.getPermissionAsync()

        // getPermissionAsync returns a boolean indicating if permission is granted
        const isGranted = Boolean(permissionStatus)

        setHasPermission(isGranted)
        setIsRequestingPermission(false)
      } catch (error) {
        Log.error(`LetterToMyselfScreen: Error checking permission: ${error}`)
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
          Log.info("LetterToMyselfScreen: App came to foreground, re-checking permission")
          checkPermission()
        }
        appState.current = nextAppState
      })

      return () => {
        subscription.remove()
      }
    }, [checkPermission])

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
        Log.error(`LetterToMyselfScreen: Error requesting permission: ${error}`)
        setHasPermission(false)
        setIsRequestingPermission(false)
      }
    }

    const handleStartWriting = () => {
      navigation.navigate("ComposeLetter")
    }

    const handleOpenInbox = () => {
      navigation.navigate("LetterInbox")
    }

    const $containerInsetStyle = useMemo(() => ({ paddingTop: 16 }), [])
    const $contentInsetStyle = useMemo(
      () => ({ paddingBottom: insets.bottom + 120 }),
      [insets.bottom],
    )

    // Set up header with inbox icon if letters are available
    useHeader(
      {
        LeftActionComponent: (
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.goBack()}
            style={themed($headerAction)}
          >
            <ThemedFontAwesome5Icon name="chevron-left" color={theme.colors.text} size={18} solid />
          </Pressable>
        ),
        RightActionComponent: hasDeliveredLetters ? (
          <Pressable
            accessibilityRole="button"
            onPress={handleOpenInbox}
            style={themed($headerAction)}
          >
            <View style={$iconContainer}>
              <ThemedPhosphorIcon
                Component={hasUnreadLetters ? EnvelopeIcon : EnvelopeOpenIcon}
                color={hasUnreadLetters ? theme.colors.tint : theme.colors.text}
                size={30}
              />
              {hasUnreadLetters && <View style={themed($badge)} />}
            </View>
          </Pressable>
        ) : undefined,
      },
      [hasDeliveredLetters, hasUnreadLetters],
    )

    // Show loading state while checking permission (initial check only)
    if (hasPermission === null) {
      return (
        <KeyboardAvoidingView
          style={themed($container)}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <View style={[themed($innerContainer), $containerInsetStyle]}>
            <View style={themed($permissionContainer)}>
              <Text style={themed($loadingText)}>Checking notification permissions...</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      )
    }

    // Show permission request UI if permission is not granted
    if (!hasPermission) {
      return (
        <KeyboardAvoidingView
          style={themed($container)}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <View style={[themed($innerContainer), $containerInsetStyle]}>
            <ScrollView
              style={themed($scroll)}
              contentContainerStyle={$contentInsetStyle}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="interactive"
              showsVerticalScrollIndicator={true}
            >
              <Text text="Letter to Myself" preset="heading" style={themed($title)} />
              <View style={$graphicContainer}>
                {ExpoImage ? (
                  <ExpoImage
                    source={require("../../assets/images/letter_to_myself_graphic.png")}
                    style={$graphic}
                    contentFit="contain"
                    transition={0}
                    cachePolicy="memory"
                  />
                ) : (
                  <Image
                    source={require("../../assets/images/letter_to_myself_graphic.png")}
                    style={$graphic}
                    resizeMode="contain"
                  />
                )}
              </View>
              <View style={themed($permissionContainer)}>
                <Text style={themed($permissionText)}>
                  Notification permission is required to receive your letter.
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
                    width="100%"
                  />
                </View>
                {isRequestingPermission && (
                  <Text style={themed($loadingText)}>Requesting notification permission...</Text>
                )}
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      )
    }

    return (
      <KeyboardAvoidingView
        style={themed($container)}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={[themed($innerContainer), $containerInsetStyle]}>
          <ScrollView
            style={themed($scroll)}
            contentContainerStyle={$contentInsetStyle}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            showsVerticalScrollIndicator={true}
          >
            <Text text="Letter to Myself" preset="heading" style={themed($title)} />
            <View style={$graphicContainer}>
              {ExpoImage ? (
                <ExpoImage
                  source={require("../../assets/images/letter_to_myself_graphic.png")}
                  style={$graphic}
                  contentFit="contain"
                  transition={0}
                  cachePolicy="memory"
                />
              ) : (
                <Image
                  source={require("../../assets/images/letter_to_myself_graphic.png")}
                  style={$graphic}
                  resizeMode="contain"
                />
              )}
            </View>
            <Text text={HEADER_COPY} style={themed($headerCopy)} />

            <View style={themed($createButtonContainer)}>
              <RectangularButton
                buttonText={hasDraft ? "Continue draft" : "Write a Letter"}
                onClick={handleStartWriting}
                width="100%"
                icon={hasDraft ? "edit" : "edit"}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    )
  },
)

const $container: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $innerContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $scroll: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  paddingHorizontal: 26,
})

const $title: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  marginBottom: 12,
})

const $headerCopy: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  fontSize: 16,
  lineHeight: 24,
  marginBottom: 24,
})

const $createButtonContainer: ThemedStyle<ViewStyle> = () => ({
  marginTop: 12,
  marginBottom: 24,
  alignItems: "center",
})

const $graphicContainer: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 20,
  minHeight: 200,
}

const $graphic: ImageStyle = {
  width: 250,
  height: 200,
}

const $headerAction: ThemedStyle<ViewStyle> = () => ({
  padding: 8,
  minWidth: 40,
  alignItems: "center",
  justifyContent: "center",
})

const $iconContainer: ViewStyle = {
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
}

const $badge: ThemedStyle<ViewStyle> = (theme) => ({
  position: "absolute",
  top: -4,
  right: -4,
  minWidth: 18,
  height: 18,
  borderRadius: 9,
  backgroundColor: theme.colors.palette.accent100,
  zIndex: 1,
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
  width: "100%",
})

const $loadingText: ThemedStyle<TextStyle> = (theme) => ({
  textAlign: "center",
  fontSize: 16,
  color: theme.colors.text,
  marginTop: 12,
})
