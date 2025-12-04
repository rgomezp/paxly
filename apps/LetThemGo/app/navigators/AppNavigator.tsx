/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  NavigationContainer,
  useNavigation,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { observer } from "mobx-react-lite"
import * as Screens from "@/screens"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { ThemeContext } from "@/utils/useAppTheme"
import { lightTheme, darkTheme } from "@/theme"
import { useContext, useMemo, ComponentProps, useRef, useState, useEffect } from "react"
import { ThemedPhosphorIcon } from "@/components/ThemedPhosphorIcon"
import { HouseIcon, UserIcon, BooksIcon } from "phosphor-react-native"
import Log from "@/utils/Log"
import BadgeManager from "@/managers/BadgeManager"
import { isOneSignalAdditionalData } from "@/types/IOneSignalAdditionalData"
import { OneSignal } from "react-native-onesignal"
import type { AppStackParamList } from "./navigationTypes"
import { useAppInitialization } from "@/initialization/useAppInitialization"
import { useInitialRootStore } from "@/models"
import * as SplashScreen from "expo-splash-screen"

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()
const Tab = createBottomTabNavigator<AppStackParamList>()

const TabNavigator = observer(function TabNavigator() {
  const context = useContext(ThemeContext)
  const theme = useMemo(
    () => (context?.themeScheme === "dark" ? darkTheme : lightTheme),
    [context?.themeScheme],
  )
  const navigation = useNavigation()

  // State for badge visibility (updates when navigation state changes)
  const [shouldShowBadge, setShouldShowBadge] = useState(() => BadgeManager.shouldShowBadge())

  // Update badge state when navigation changes (e.g., when user navigates between tabs)
  useEffect(() => {
    const unsubscribe = navigation.addListener("state", () => {
      setShouldShowBadge(BadgeManager.shouldShowBadge())
    })

    // Also check on mount and when component updates
    setShouldShowBadge(BadgeManager.shouldShowBadge())

    return unsubscribe
  }, [navigation])

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          paddingTop: 10,
        },
        tabBarActiveTintColor: theme.colors.tint,
        tabBarInactiveTintColor: theme.colors.text,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Screens.HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <ThemedPhosphorIcon
              Component={HouseIcon}
              color={color}
              size={size ?? 22}
              weight={focused ? "fill" : "regular"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Lessons"
        component={Screens.LessonsScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <ThemedPhosphorIcon
              Component={BooksIcon}
              color={color}
              size={size ?? 22}
              weight={focused ? "fill" : "regular"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Me"
        component={Screens.MeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <ThemedPhosphorIcon
              Component={UserIcon}
              color={color}
              size={size ?? 22}
              weight={focused ? "fill" : "regular"}
            />
          ),
          tabBarBadge: shouldShowBadge ? "" : undefined,
          tabBarBadgeStyle: {
            backgroundColor: theme.colors.palette.accent100,
          },
        }}
      />
    </Tab.Navigator>
  )
})

const AppStack = observer(function AppStack() {
  const context = useContext(ThemeContext)
  const theme = useMemo(
    () => (context?.themeScheme === "dark" ? darkTheme : lightTheme),
    [context?.themeScheme],
  )
  const navigation = useNavigation()
  const lastPlacementRef = useRef<{ value: string; ts: number }>({ value: "", ts: 0 })
  const { isInitialized } = useAppInitialization()
  const { rehydrated } = useInitialRootStore()
  const pendingNavigationRef = useRef<{ route?: string; rcOfferingId?: string } | null>(null)

  // Use refs to track current state so event handler always has latest values
  const isInitializedRef = useRef(isInitialized)
  const rehydratedRef = useRef(rehydrated)
  const navigationRef = useRef(navigation)

  // Keep refs in sync with current values
  useEffect(() => {
    isInitializedRef.current = isInitialized
    rehydratedRef.current = rehydrated
    navigationRef.current = navigation
  }, [isInitialized, rehydrated, navigation])

  // Helper function to execute navigation
  const executeNavigation = (route?: string, rcOfferingId?: string) => {
    // Throttle identical offering navigations within 2s window
    if (rcOfferingId) {
      const now = Date.now()
      if (
        lastPlacementRef.current.value === rcOfferingId &&
        now - lastPlacementRef.current.ts < 2000
      ) {
        return
      }
      lastPlacementRef.current = { value: rcOfferingId, ts: now }
    }

    // Small delay to ensure splash screen is visible briefly
    setTimeout(() => {
      try {
        if (rcOfferingId) {
          Log.info(`OneSignal: Navigating to Home with rc_offering_id: ${rcOfferingId}`)
          // @ts-ignore
          navigationRef.current.navigate("Home", { rc_offering_id: rcOfferingId })
          return
        }
        if (route) {
          Log.info(`OneSignal: Clicked notification with route: ${route}`)
          // @ts-ignore
          navigationRef.current.navigate(route)
        }
      } catch (error) {
        Log.error(`OneSignal: Error navigating: ${error}`)
      }
    }, 500)
  }

  // Handle pending navigation once app is initialized
  useEffect(() => {
    if (rehydrated && isInitialized && pendingNavigationRef.current) {
      const pending = pendingNavigationRef.current
      pendingNavigationRef.current = null
      executeNavigation(pending.route, pending.rcOfferingId)
    }
  }, [rehydrated, isInitialized])

  useEffect(() => {
    const handleNotificationClick = async (event: any) => {
      if (isOneSignalAdditionalData(event.notification.additionalData)) {
        const data = event.notification.additionalData
        const route = data?.route as string | undefined
        const rcOfferingId = data?.rc_offering_id as string | undefined

        // Check for conflicting parameters
        if (route && rcOfferingId && route !== "Home") {
          Log.error(
            `OneSignal: Both route (${route}) and rc_offering_id provided. Overriding to Home.`,
          )
        }

        // Ensure splash screen is shown when opening from notification
        try {
          await SplashScreen.preventAutoHideAsync()
        } catch {
          // Ignore if already prevented
        }

        // If app is not initialized, queue the navigation
        if (!rehydratedRef.current || !isInitializedRef.current) {
          Log.info("OneSignal: App not initialized, queuing navigation")
          pendingNavigationRef.current = { route, rcOfferingId }

          // Re-check initialization after setting pending navigation to avoid race condition
          if (rehydratedRef.current && isInitializedRef.current) {
            executeNavigation(route, rcOfferingId)
            pendingNavigationRef.current = null
            return
          }
          return
        }

        executeNavigation(route, rcOfferingId)
      }
    }

    OneSignal.Notifications.addEventListener("click", handleNotificationClick)

    return () => {
      OneSignal.Notifications.removeEventListener("click", handleNotificationClick)
    }
  }, []) // Empty deps - we use refs for current values

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: theme.colors.background,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
      initialRouteName="TabNavigator"
    >
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="Settings" component={Screens.SettingsScreen} />
      <Stack.Screen name="Login" component={Screens.LoginScreen} />
      <Stack.Screen name="MoodLogger" component={Screens.MoodLogger} />
      <Stack.Screen name="Journal" component={Screens.JournalScreen} />
      <Stack.Screen name="JournalReader" component={Screens.JournalReaderScreen} />
      <Stack.Screen name="Lessons" component={Screens.LessonsScreen} />
      <Stack.Screen name="SingleLesson" component={Screens.SingleLessonScreen} />
      <Stack.Screen name="Membership" component={Screens.MembershipScreen} />
      <Stack.Screen name="MessageIntoTheVoid" component={Screens.MessageIntoTheVoidScreen} />
      <Stack.Screen name="ComposeMessage" component={Screens.ComposeMessageScreen} />
      <Stack.Screen name="MoodLogs" component={Screens.MoodLogsScreen} />
      <Stack.Screen name="JournalLogs" component={Screens.JournalLogsScreen} />
      <Stack.Screen name="MyStuff" component={Screens.MyStuffScreen} />
      <Stack.Screen name="ClaimAward" component={Screens.ClaimAwardScreen} />
      <Stack.Screen name="RateLesson" component={Screens.RateLessonScreen} />
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<ComponentProps<typeof NavigationContainer<AppStackParamList>>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const context = useContext(ThemeContext)

  const navigationTheme = useMemo(
    () => (context?.themeScheme === "dark" ? DarkTheme : DefaultTheme),
    [context?.themeScheme],
  )

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme} {...props}>
      <AppStack />
    </NavigationContainer>
  )
})
