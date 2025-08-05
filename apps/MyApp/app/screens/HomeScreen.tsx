import { FC } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Text } from "@/components"
import { HomeDrawer } from "../drawers/HomeDrawer"
import type { Theme } from "@/theme"
import Language from "@/internationalization/Language"
import LANGUAGE_COPY from "@/internationalization/LanguageCopy"
import { getHomeScreenSections } from "./HomeScreenSections"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "@/models"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const sections = getHomeScreenSections()

  return (
    <HomeDrawer
      sections={sections}
      renderContent={({ themed, theme }: { themed: any; theme: Theme }) => (
        <ScrollView>
          <View style={themed([$contentContainer, { backgroundColor: theme.colors.background }])}>
            <Text
              text={LANGUAGE_COPY.homeScreen.welcome[Language.current]}
              preset="heading"
              style={themed({ color: theme.colors.text })}
            />
            <Text
              text={LANGUAGE_COPY.homeScreen.selectOption[Language.current]}
              style={themed({ color: theme.colors.text })}
            />
          </View>
        </ScrollView>
      )}
    />
  )
})

const $contentContainer: ViewStyle = {
  flex: 1,
  padding: 16,
}
