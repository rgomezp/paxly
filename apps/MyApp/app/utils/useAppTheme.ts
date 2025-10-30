import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { StyleProp, useColorScheme } from "react-native"
import { DarkTheme, DefaultTheme } from "@react-navigation/native"
import {
  type Theme,
  type ThemeContexts,
  type ThemedStyle,
  type ThemedStyleArray,
  lightTheme,
  darkTheme,
} from "@/theme"
import * as SystemUI from "expo-system-ui"
import { ganon } from "@/services/ganon/ganon"
import customConfig from "../../customConfig"

type ThemeContextType = {
  // Resolved theme scheme used across the app; always "light" or "dark"
  themeScheme: Exclude<ThemeContexts, "auto">
  // Accepts "light" | "dark" | "auto"; "auto" clears override (follows system)
  setThemeContextOverride: (newTheme: ThemeContexts) => void
  // Navigation theme to be used by NavigationContainer
  navigationTheme: typeof DefaultTheme
}

// create a React context and provider for the current theme
export const ThemeContext = createContext<ThemeContextType>({
  themeScheme: "light",
  setThemeContextOverride: (_newTheme: ThemeContexts) => {
    console.error("Tried to call setThemeContextOverride before the ThemeProvider was initialized")
  },
  navigationTheme: DefaultTheme,
})

const themeContextToTheme = (themeContext: Exclude<ThemeContexts, "auto">): Theme =>
  themeContext === "dark" ? darkTheme : lightTheme

const setImperativeTheming = (theme: Theme) => {
  SystemUI.setBackgroundColorAsync(theme.colors.background)
}

export const useThemeProvider = (initialTheme?: ThemeContexts) => {
  const colorScheme = useColorScheme()
  // Initialize from persisted preference, falling back to provided initialTheme, then config
  const [overrideTheme, setTheme] = useState<Exclude<ThemeContexts, "auto"> | undefined>(() => {
    const config = customConfig()
    const persisted =
      (ganon.get("theme") as ThemeContexts | undefined) ??
      initialTheme ??
      config.startingTheme ??
      "auto"
    return persisted === "auto" ? undefined : persisted
  })

  const setThemeContextOverride = useCallback((newTheme: ThemeContexts) => {
    // Persist preference
    ganon.set("theme", newTheme)
    // Update override state (undefined means follow system)
    if (newTheme === "auto") {
      setTheme(undefined)
    } else {
      setTheme(newTheme)
    }
  }, [])

  const themeScheme = (overrideTheme ?? colorScheme ?? "light") as Exclude<ThemeContexts, "auto">
  const navigationTheme = themeScheme === "dark" ? DarkTheme : DefaultTheme

  useEffect(() => {
    setImperativeTheming(themeContextToTheme(themeScheme))
  }, [themeScheme])

  return {
    themeScheme,
    navigationTheme,
    setThemeContextOverride,
    ThemeProvider: ThemeContext.Provider,
  }
}

interface UseAppThemeValue {
  // The theme object from react-navigation
  navTheme: typeof DefaultTheme
  // A function to set the theme context override (for switching modes)
  setThemeContextOverride: (newTheme: ThemeContexts) => void
  // The current theme object
  theme: Theme
  // The current resolved theme context (never "auto")
  themeContext: Exclude<ThemeContexts, "auto">
  // A function to apply the theme to a style object.
  // See examples in the components directory or read the docs here:
  // https://docs.infinite.red/ignite-cli/boilerplate/app/utils/
  themed: <T>(styleOrStyleFn: ThemedStyle<T> | StyleProp<T> | ThemedStyleArray<T>) => T
}

/**
 * Custom hook that provides the app theme and utility functions for theming.
 *
 * @returns {UseAppThemeReturn} An object containing various theming values and utilities.
 * @throws {Error} If used outside of a ThemeProvider.
 */
export const useAppTheme = (): UseAppThemeValue => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  const { themeScheme: resolvedScheme, setThemeContextOverride, navigationTheme } = context

  const themeContext: Exclude<ThemeContexts, "auto"> = useMemo(
    () => resolvedScheme,
    [resolvedScheme],
  )

  const themeVariant: Theme = useMemo(() => themeContextToTheme(themeContext), [themeContext])

  const themed = useCallback(
    <T>(styleOrStyleFn: ThemedStyle<T> | StyleProp<T> | ThemedStyleArray<T>) => {
      const flatStyles = [styleOrStyleFn].flat(3)
      const stylesArray = flatStyles.map((f) => {
        if (typeof f === "function") {
          return (f as ThemedStyle<T>)(themeVariant)
        } else {
          return f
        }
      })

      // Flatten the array of styles into a single object
      return Object.assign({}, ...stylesArray) as T
    },
    [themeVariant],
  )

  return {
    navTheme: navigationTheme,
    setThemeContextOverride,
    theme: themeVariant,
    themeContext,
    themed,
  }
}
