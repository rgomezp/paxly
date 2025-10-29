import { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { MoodGraph } from "@/components"
import { HomeDrawer } from "../drawers/HomeDrawer"
import type { Theme } from "@/theme"
import { getHomeDrawerSections } from "./HomeDrawerSections"
import NoContactManager from "@/managers/NoContactManager"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"

interface MeScreenProps extends AppStackScreenProps<"Me"> {}

export const MeScreen: FC<MeScreenProps> = observer(function MeScreen() {
  const sections = getHomeDrawerSections()
  // Content should not add its own top inset; header already accounts for it
  const contentInsets = useSafeAreaInsetsStyle([])

  useEffect(() => {
    NoContactManager.initializeNoContactData()
  }, [])

  return (
    <>
      <HomeDrawer
        sections={sections}
        renderContent={({
          themed,
          theme: _theme,
          toggleDrawer: _toggleDrawer,
        }: {
          themed: any
          theme: Theme
          toggleDrawer: () => void
        }) => (
          <View style={[themed($container), contentInsets]}>
            <MoodGraph />
          </View>
        )}
      />
    </>
  )
})

const $container: ViewStyle = {
  flex: 1,
}
