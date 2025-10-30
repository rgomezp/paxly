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
import { useThemeProvider } from "./utils/useAppTheme"
import customConfig from "../customConfig"
import type { ThemeContexts } from "./theme"

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
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <KeyboardProvider>
          <OnboardingScreen />
        </KeyboardProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  )
}

function AppContent() {
  const { isInitialized, isOnboardingComplete } = useAppInitialization()
  const { rehydrated } = useInitialRootStore(() => {
    // This runs after the root store has been initialized and rehydrated.

    // If your initialization scripts run very fast, it's good to show the splash screen for just a bit longer to prevent flicker.
    // Slightly delaying splash screen hiding for better UX; can be customized or removed as needed,
    setTimeout(SplashScreen.hideAsync, 500)
  })

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!rehydrated || !isInitialized) {
    return null
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
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <KeyboardProvider>
          <AppNavigator linking={linking} />
        </KeyboardProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  )
}

export function App() {
  const config = customConfig()
  const { ThemeProvider, themeScheme, setThemeContextOverride, navigationTheme } = useThemeProvider(
    config.startingTheme,
  )

  return (
    <ThemeProvider value={{ themeScheme, setThemeContextOverride, navigationTheme }}>
      <InitializationProvider>
        <AppContent />
      </InitializationProvider>
    </ThemeProvider>
  )
}
