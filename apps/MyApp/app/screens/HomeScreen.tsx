import { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Text } from "@/components"
import { HomeDrawer } from "../drawers/HomeDrawer"
import type { Theme } from "@/theme"
import Language from "@/internationalization/Language"
import LANGUAGE_COPY from "@/internationalization/LanguageCopy"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "@/models"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const sections = [
    {
      name: "Getting Started",
      description: "homeScreen.gettingStarted",
      data: ({ themed, theme }: { themed: any; theme: Theme }) => [
        <Text
          key="welcome"
          text={(LANGUAGE_COPY.homeScreen as any).welcome[Language.current]}
          style={themed({ color: theme.colors.text })}
        />,
        <Text key="setup" text="Setup" style={themed({ color: theme.colors.text })} />,
      ],
    },
    {
      name: "Features",
      description: "homeScreen.features",
      data: ({ themed, theme }: { themed: any; theme: Theme }) => [
        <Text key="drawer" text="Drawer Navigation" style={themed({ color: theme.colors.text })} />,
        <Text key="theming" text="Theming" style={themed({ color: theme.colors.text })} />,
      ],
    },
  ]

  return (
    <HomeDrawer
      sections={sections}
      renderContent={({ themed, theme }: { themed: any; theme: Theme }) => (
        <View style={themed([$contentContainer, { backgroundColor: theme.colors.background }])}>
          <Text
            text={(LANGUAGE_COPY.homeScreen as any).welcome[Language.current]}
            preset="heading"
            style={themed({ color: theme.colors.text })}
          />
          <Text
            text={(LANGUAGE_COPY.homeScreen as any).selectOption[Language.current]}
            style={themed({ color: theme.colors.text })}
          />
        </View>
      )}
    />
  )
})

const $contentContainer: ViewStyle = {
  flex: 1,
  padding: 20,
  alignItems: "center",
  justifyContent: "center",
}
