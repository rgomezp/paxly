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
import { useContext, useMemo, ComponentProps } from "react"
import { ThemedFontAwesome5Icon } from "@/components/ThemedFontAwesome5Icon"
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
          tabBarIcon: ({ color, size }) => (
            <ThemedFontAwesome5Icon name="home" color={color} size={size ?? 22} solid />
          ),
        }}
      />
      <Tab.Screen
        name="Me"
        component={Screens.MeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ThemedFontAwesome5Icon name="user" color={color} size={size ?? 22} solid />
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

  OneSignal.Notifications.addEventListener("click", (event) => {
    if (isOneSignalAdditionalData(event.notification.additionalData)) {
      const route = event?.notification?.additionalData?.route
      Log.info(`OneSignal: Clicked notification with route: ${route}`)
      try {
        if (route) {
          // @ts-ignore
          navigation.navigate(route)
        }
      } catch (error) {
        Log.error(`OneSignal: Error navigating to route: ${route}`, error)
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
