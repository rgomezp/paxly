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
import { useContext, useMemo, ComponentProps, useRef } from "react"
import { ThemedPhosphorIcon } from "@/components/ThemedPhosphorIcon"
import { House, BookOpen, User } from "phosphor-react-native"
import Log from "@/utils/Log"
import { isOneSignalAdditionalData } from "@/types/IOneSignalAdditionalData"
import { OneSignal } from "react-native-onesignal"
import type { AppStackParamList } from "./navigationTypes"

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

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
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
              Component={House}
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
              Component={BookOpen}
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
              Component={User}
              color={color}
              size={size ?? 22}
              weight={focused ? "fill" : "regular"}
            />
          ),
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

  OneSignal.Notifications.addEventListener("click", (event) => {
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

      try {
        if (rcOfferingId) {
          // Throttle identical offering navigations within 2s window
          const now = Date.now()
          if (
            lastPlacementRef.current.value === rcOfferingId &&
            now - lastPlacementRef.current.ts < 2000
          ) {
            return
          }
          lastPlacementRef.current = { value: rcOfferingId, ts: now }
          Log.info(`OneSignal: Navigating to Home with rc_offering_id: ${rcOfferingId}`)
          // @ts-ignore
          navigation.navigate("Home", { rc_offering_id: rcOfferingId })
          return
        }
        if (route) {
          Log.info(`OneSignal: Clicked notification with route: ${route}`)
          // @ts-ignore
          navigation.navigate(route)
        }
      } catch (error) {
        Log.error(`OneSignal: Error navigating: ${error}`)
      }
    }
  })

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
