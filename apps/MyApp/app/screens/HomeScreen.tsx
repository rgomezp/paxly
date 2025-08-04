import { FC } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Text } from "@/components"
import { HomeDrawer } from "../drawers/HomeDrawer"
import type { Theme } from "@/theme"
import Language from "@/internationalization/Language"
import LANGUAGE_COPY from "@/internationalization/LanguageCopy"
import { MenuItem } from "@/components/MenuItem"
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
      name: "Welcome",
      data: ({ themed, theme }: { themed: any; theme: Theme }) => [
        <MenuItem
          key="login"
          text={(LANGUAGE_COPY.homeScreen as any).loginCreateAccount[Language.current]}
          style={themed({ color: theme.colors.text })}
          route="Login"
        />,
        <MenuItem
          key="settings"
          text={(LANGUAGE_COPY.words as any).settings[Language.current]}
          style={themed({ color: theme.colors.text })}
          route="Settings"
        />,
      ],
    },
    {
      name: "Features",
      data: ({ themed, theme }: { themed: any; theme: Theme }) => [
        <MenuItem
          key="drawer"
          text="Drawer Navigation"
          style={themed({ color: theme.colors.text })}
          route="MyTab"
        />,
        <MenuItem
          key="theming"
          text="Theming"
          style={themed({ color: theme.colors.text })}
          route="MyTab"
        />,
      ],
    },
  ]

  return (
    <HomeDrawer
      sections={sections}
      renderContent={({ themed, theme }: { themed: any; theme: Theme }) => (
        <ScrollView>
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
        </ScrollView>
      )}
    />
  )
})

const $contentContainer: ViewStyle = {
  flex: 1,
  padding: 16,
}
