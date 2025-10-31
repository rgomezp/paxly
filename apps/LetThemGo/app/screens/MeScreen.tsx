import { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, ScrollView } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { MoodGraph, MoodLogList, Quote, JournalLogList, SegmentedSelector } from "@/components"
import { HomeDrawer } from "../drawers/HomeDrawer"
import type { Theme } from "@/theme"
import { useHomeDrawerSections } from "./HomeDrawerSections"
import NoContactManager from "@/managers/NoContactManager"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"

interface MeScreenProps extends AppStackScreenProps<"Me"> {}

export const MeScreen: FC<MeScreenProps> = observer(function MeScreen() {
  const sections = useHomeDrawerSections()
  // Content should not add its own top inset; header already accounts for it
  const contentInsets = useSafeAreaInsetsStyle([])
  const [selectedTab, setSelectedTab] = useState<"moods" | "journal">("moods")

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
          <ScrollView style={[themed($container), contentInsets]}>
            <Quote />
            <MoodGraph />
            <View style={themed($selectorWrapper)}>
              <SegmentedSelector
                options={[
                  { key: "moods", label: "Moods" },
                  { key: "journal", label: "Journal Entries" },
                ]}
                selectedKey={selectedTab}
                onSelect={(k) => setSelectedTab(k as "moods" | "journal")}
              />
            </View>
            {selectedTab === "moods" ? <MoodLogList /> : <JournalLogList />}
          </ScrollView>
        )}
      />
    </>
  )
})

const $container: ViewStyle = {
  flex: 1,
}

const $selectorWrapper: ViewStyle = {
  marginTop: 24,
  paddingHorizontal: 16,
}

// segmented selector styles moved into SegmentedSelector component
