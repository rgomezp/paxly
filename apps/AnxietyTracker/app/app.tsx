/* eslint-disable import/first */
/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
if (__DEV__) {
  // Load Reactotron in development only.
  // Note that you must be using metro's `inlineRequires` for this to work.
  // If you turn it off in metro.config.js, you'll have to manually import it.
  require("./devtools/ReactotronConfig.ts")
}
import "./utils/gestureHandler"
import "./utils/ignoreWarnings"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import * as Linking from "expo-linking"
import * as SplashScreen from "expo-splash-screen"
import { useInitialRootStore } from "./models"
import { AppNavigator } from "./navigators"
import { ErrorBoundary } from "./screens/ErrorScreen/ErrorBoundary"
import Config from "./config"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { useAppInitialization } from "./initialization/useAppInitialization"
import { OnboardingScreen } from "./screens"
import { InitializationProvider } from "./initialization/InitializationProvider"
import { OnboardingProvider } from "./onboarding/state/OnboardingContext"
import { useThemeProvider } from "./utils/useAppTheme"
import customConfig from "../customConfig"
import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import LoginManager from "./managers/LoginManager"
import { FlagProvider } from "./hooks/useFlags"
import * as SystemUI from "expo-system-ui"
import { lightTheme, darkTheme } from "./theme"
import { useNatureSounds } from "./hooks/useNatureSounds"

// Prevent splash screen from auto-hiding before app is ready
// This MUST be called at module level to prevent any flash of blank screen
SplashScreen.preventAutoHideAsync().catch(() => {
  // Ignore errors if already prevented or not available
})

// Web linking configuration
const prefix = Linking.createURL("/")
const config = {
  screens: {
    Login: {
      path: "",
    },
    Welcome: "welcome",
    Demo: {
      screens: {
        DemoShowroom: {
          path: "showroom/:queryIndex?/:itemIndex?",
        },
        DemoDebug: "debug",
        DemoPodcastList: "podcast",
        DemoCommunity: "community",
      },
    },
  },
}

/**
 * This is the root component of our app.
 * @param {AppProps} props - The props for the `App` component.
 * @returns {JSX.Element} The rendered `App` component.
 */
function OnboardingWrapper() {
  return (
    <GestureHandlerRootView style={styles.flex1}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <FlagProvider>
          <ErrorBoundary catchErrors={Config.catchErrors}>
            <KeyboardProvider>
              <OnboardingProvider>
                <OnboardingScreen />
              </OnboardingProvider>
            </KeyboardProvider>
          </ErrorBoundary>
        </FlagProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

function AppContent() {
  const { isInitialized, isOnboardingComplete } = useAppInitialization()
  const { rehydrated } = useInitialRootStore()
  const [splashReady, setSplashReady] = useState(false)

  // Manage nature sounds at app level
  useNatureSounds()

  // Hide splash screen as soon as we're ready to avoid adding to cold start time
  useEffect(() => {
    if (rehydrated && isInitialized) {
      SplashScreen.hideAsync().catch(() => {
        // Ignore errors if splash screen is already hidden
      })
    }
  }, [rehydrated, isInitialized, splashReady])

  // Before we show the app, we have to wait for our state to be ready.
  // Show a view matching the splash screen background to prevent blank flash.
  if (!rehydrated || !isInitialized) {
    return <View style={styles.splashBackground} />
  }

  if (!isOnboardingComplete) {
    return <OnboardingWrapper />
  }

  const linking = {
    prefixes: [prefix],
    config,
  }

  // otherwise, we're ready to render the app
  return (
    <GestureHandlerRootView style={styles.flex1}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <FlagProvider>
          <ErrorBoundary catchErrors={Config.catchErrors}>
            <KeyboardProvider>
              <AppNavigator linking={linking} />
            </KeyboardProvider>
          </ErrorBoundary>
        </FlagProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export function App() {
  const config = customConfig()
  const { ThemeProvider, themeScheme, setThemeContextOverride, navigationTheme } = useThemeProvider(
    config.startingTheme,
  )

  // Set system UI background color (affects splash screen area) based on theme
  useEffect(() => {
    const theme = themeScheme === "dark" ? darkTheme : lightTheme
    SystemUI.setBackgroundColorAsync(theme.colors.background).catch(() => {
      // Ignore errors if not available
    })
  }, [themeScheme])

  // Setup auth listener once on mount
  useEffect(() => {
    const unsubscribe = LoginManager.getInstance().setupAuthListener()
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <ThemeProvider value={{ themeScheme, setThemeContextOverride, navigationTheme }}>
      <InitializationProvider>
        <AppContent />
      </InitializationProvider>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  splashBackground: {
    flex: 1,
    backgroundColor: "#191015", // Must match splash screen backgroundColor in app.config.ts
  },
})
