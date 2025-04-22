import { FC, ReactElement, useCallback, useRef, useState } from "react"
import { Image, ImageStyle, Platform, View, ViewStyle } from "react-native"
import { Drawer } from "react-native-drawer-layout"
import { type ContentStyle } from "@shopify/flash-list"
import { ListView, ListViewRef, Screen, Text, DrawerIconButton } from "@/components"
import type { Theme, ThemedStyle } from "@/theme"
import { $styles } from "@/theme"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { useAppTheme } from "@/utils/useAppTheme"
import { MenuItem } from "@/components/MenuItem"

/**
 * Props interface for the HomeDrawer component.
 * @property {any} logo - Optional logo image to display in the drawer
 * @property {Array} sections - Array of sections to display in the drawer menu
 * @property {Function} renderContent - Function to render the main content of the screen
 */
interface HomeDrawerProps {
  logo?: any
  sections: {
    name: string
    description: string
    data: ({ themed, theme }: { themed: any; theme: Theme }) => ReactElement[]
  }[]
  renderContent: (props: { themed: any; theme: Theme }) => ReactElement
}

/**
 * Interface representing a menu item in the drawer.
 * @property {string} name - The name/title of the menu section
 * @property {Array} useCases - Array of use cases/items within the menu section
 */
interface MenuItem {
  name: string
  useCases: { text: string; key: string; route: string; params?: any }[]
}

/**
 * Web-specific implementation of the menu item component.
 * This version is simpler as it doesn't need to handle touch interactions.
 * Use this component when rendering menu items in a web environment.
 *
 * @param {MenuItem} item - The menu item data to display
 * @param {number} sectionIndex - The index of the current section
 * @param {any} themed - The themed styling function
 */
const WebMenuItem: FC<{
  item: MenuItem
  sectionIndex: number
  themed: any
}> = ({ item, sectionIndex, themed }) => {
  return (
    <View>
      <Text preset="bold" style={themed($menuContainer)}>
        {item.name}
      </Text>
      {item.useCases.map((u) => (
        <MenuItem
          key={`section${sectionIndex}-${u.key}`}
          text={u.text}
          route={u.route as any}
          params={u.params}
        />
      ))}
    </View>
  )
}

/**
 * Native-specific implementation of the menu item component.
 * This version includes touch interactions (onPress handlers) for both
 * the section header and individual items.
 * Use this component when rendering menu items in a native mobile environment.
 *
 * @param {MenuItem} item - The menu item data to display
 * @param {number} sectionIndex - The index of the current section
 * @param {any} themed - The themed styling function
 */
const NativeMenuItem: FC<{
  item: MenuItem
  sectionIndex: number
  themed: any
}> = ({ item, sectionIndex, themed }) => {
  return (
    <View>
      <Text preset="bold" style={themed($menuContainer)}>
        {item.name}
      </Text>
      {item.useCases.map((u) => (
        <MenuItem
          key={`section${sectionIndex}-${u.key}`}
          text={u.text}
          route={u.route as any}
          params={u.params}
        />
      ))}
    </View>
  )
}

/**
 * Platform-specific menu item component that adapts to web or native environments.
 * Uses WebMenuItem for web platform and NativeMenuItem for native platforms.
 */
const PlatformMenuItem = Platform.select({
  web: WebMenuItem,
  native: NativeMenuItem,
}) as FC<{
  item: MenuItem
  sectionIndex: number
  themed: any
}>

export const HomeDrawer: FC<HomeDrawerProps> = ({ logo, sections, renderContent }) => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<ListViewRef<MenuItem>>(null)
  const { themed, theme } = useAppTheme()

  const toggleDrawer = useCallback(() => {
    setOpen(!open)
  }, [open])

  const $drawerInsets = useSafeAreaInsetsStyle(["top"])

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      drawerType="back"
      drawerPosition="right"
      renderDrawerContent={() => (
        <View style={themed([$drawer, $drawerInsets])}>
          {logo && (
            <View style={themed($logoContainer)}>
              <Image source={logo} style={$logoImage} />
            </View>
          )}
          <ListView<MenuItem>
            ref={menuRef}
            contentContainerStyle={themed($listContentContainer)}
            estimatedItemSize={250}
            data={sections.map((d) => ({
              name: d.name,
              useCases: d.data({ theme, themed }).map((u) => ({
                text: u.props.text as string,
                key: u.key as string,
                route: u.props.route as string,
                params: u.props.params,
              })),
            }))}
            keyExtractor={(item) => item.name}
            renderItem={({ item, index: sectionIndex }) => (
              <PlatformMenuItem {...{ item, sectionIndex, themed }} />
            )}
          />
        </View>
      )}
    >
      <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$styles.flex1}>
        <View style={themed($headerContainer)}>
          <View style={$styles.flex1} />
          <DrawerIconButton onPress={toggleDrawer} />
        </View>
        {renderContent({ themed, theme })}
      </Screen>
    </Drawer>
  )
}

/**
 * Styled object for the drawer container.
 * Sets the background color and flex properties for the drawer.
 */
const $drawer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  flex: 1,
})

/**
 * Styled object for the list content container.
 * Adds horizontal padding to the list items.
 */
const $listContentContainer: ThemedStyle<ContentStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
})

/**
 * Styled object for the logo image.
 * Defines the dimensions of the logo image.
 */
const $logoImage: ImageStyle = {
  height: 42,
  width: 77,
}

/**
 * Styled object for the logo container.
 * Positions and sizes the container for the logo.
 */
const $logoContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignSelf: "flex-start",
  justifyContent: "center",
  height: 56,
  paddingHorizontal: spacing.lg,
})

/**
 * Styled object for the menu container.
 * Adds vertical padding to menu items.
 */
const $menuContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingBottom: spacing.xs,
  paddingTop: spacing.lg,
})

/**
 * Styled object for the header container.
 * Defines the layout and spacing of the header section.
 */
const $headerContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
})
