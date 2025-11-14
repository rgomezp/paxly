import { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, ScrollView, Pressable, TextStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { MoodGraph, Quote } from "@/components"
import { HomeDrawer } from "../drawers/HomeDrawer"
import type { Theme } from "@/theme"
import { useHomeDrawerSections } from "./HomeDrawerSections"
import NoContactManager from "@/managers/NoContactManager"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemedPhosphorIcon } from "@/components/ThemedPhosphorIcon"
import { Smiley, BookOpen } from "phosphor-react-native"
import { navigate } from "@/navigators/navigationUtilities"
import { Text } from "@/components/Text"

interface MeScreenProps extends AppStackScreenProps<"Me"> {}

export const MeScreen: FC<MeScreenProps> = observer(function MeScreen() {
  const sections = useHomeDrawerSections()
  // Content should not add its own top inset; header already accounts for it
  const contentInsets = useSafeAreaInsetsStyle([])
  const { theme, themed } = useAppTheme()

  useEffect(() => {
    NoContactManager.initializeNoContactData()
  }, [])

  return (
    <>
      <HomeDrawer
        sections={sections}
        renderContent={({
          themed: themedDrawer,
          theme: _theme,
          toggleDrawer: _toggleDrawer,
        }: {
          themed: any
          theme: Theme
          toggleDrawer: () => void
        }) => (
          <ScrollView style={[themedDrawer($container), contentInsets]}>
            <Quote />
            <MoodGraph />
            <View style={themed($buttonsWrapper)}>
              <Pressable
                onPress={() => navigate("MoodLogs", undefined)}
                style={themed($circularButton)}
              >
                <View style={[themed($buttonInner), { backgroundColor: theme.colors.card }]}>
                  <ThemedPhosphorIcon
                    Component={Smiley}
                    color={theme.colors.tint}
                    size={32}
                    weight="fill"
                  />
                  <Text style={themed([$buttonLabel, { color: theme.colors.text }])}>Moods</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => navigate("JournalLogs", undefined)}
                style={themed($circularButton)}
              >
                <View style={[themed($buttonInner), { backgroundColor: theme.colors.card }]}>
                  <ThemedPhosphorIcon
                    Component={BookOpen}
                    color={theme.colors.tint}
                    size={32}
                    weight="fill"
                  />
                  <Text style={themed([$buttonLabel, { color: theme.colors.text }])}>Journal</Text>
                </View>
              </Pressable>
            </View>
          </ScrollView>
        )}
      />
    </>
  )
})

const $container: ViewStyle = {
  flex: 1,
}

const $buttonsWrapper: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 32,
  marginBottom: 24,
  paddingHorizontal: 16,
  gap: 24,
}

const $circularButton: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
}

const $buttonInner: ViewStyle = {
  width: 100,
  height: 100,
  borderRadius: 50,
  alignItems: "center",
  justifyContent: "center",
  padding: 12,
}

const $buttonLabel: TextStyle = {
  marginTop: 8,
  fontSize: 14,
  fontWeight: "600",
}
