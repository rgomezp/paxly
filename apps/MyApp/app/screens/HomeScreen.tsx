import { FC } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Text, Card, Button, Icon, EmptyState } from "@/components"
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
        <ScrollView
          style={themed([$contentContainer, { backgroundColor: theme.colors.background }])}
        >
          <View style={themed({ backgroundColor: theme.colors.background })}>
            {/* Header Section */}
            <View style={themed($headerSection)}>
              <Text
                text={LANGUAGE_COPY.homeScreen.welcome[Language.current]}
                preset="heading"
                style={themed({ color: theme.colors.text })}
              />
              <Text
                text={LANGUAGE_COPY.homeScreen.selectOption[Language.current]}
                style={themed({ color: theme.colors.text, marginTop: 8 })}
              />
            </View>

            {/* Quick Actions Section */}
            <View style={themed($sectionContainer)}>
              <Text
                text="Quick Actions"
                preset="subheading"
                style={themed({ color: theme.colors.text, marginBottom: 16 })}
              />
              <View style={themed($buttonRow)}>
                <Button
                  preset="filled"
                  style={themed($actionButton)}
                  textStyle={themed({ color: theme.colors.background })}
                  onPress={() => console.log("Get Started pressed")}
                >
                  Get Started
                </Button>
                <Button
                  preset="default"
                  style={themed($actionButton)}
                  onPress={() => console.log("Learn More pressed")}
                >
                  Learn More
                </Button>
              </View>
            </View>

            {/* Feature Cards Section */}
            <View style={themed($sectionContainer)}>
              <Text
                text="Featured Features"
                preset="subheading"
                style={themed({ color: theme.colors.text, marginBottom: 16 })}
              />

              <Card
                style={themed($card)}
                heading="🚀 Fast Performance"
                content="Experience lightning-fast loading times and smooth interactions throughout the app."
                LeftComponent={
                  <Icon
                    icon="components"
                    size={32}
                    color={theme.colors.palette.primary600}
                    containerStyle={themed($cardIcon)}
                  />
                }
                onPress={() => console.log("Performance card pressed")}
              />

              <Card
                style={themed($card)}
                heading="🎨 Beautiful Design"
                content="Modern, intuitive interface designed with user experience in mind."
                LeftComponent={
                  <Icon
                    icon="heart"
                    size={32}
                    color={theme.colors.palette.primary600}
                    containerStyle={themed($cardIcon)}
                  />
                }
                onPress={() => console.log("Design card pressed")}
              />

              <Card
                style={themed($card)}
                heading="🔒 Secure & Private"
                content="Your data is protected with industry-standard security measures."
                LeftComponent={
                  <Icon
                    icon="lock"
                    size={32}
                    color={theme.colors.palette.primary600}
                    containerStyle={themed($cardIcon)}
                  />
                }
                onPress={() => console.log("Security card pressed")}
              />
            </View>

            {/* Stats Section */}
            <View style={themed($sectionContainer)}>
              <Text
                text="App Statistics"
                preset="subheading"
                style={themed({ color: theme.colors.text, marginBottom: 16 })}
              />
              <View style={themed($statsContainer)}>
                <View style={themed($statItem)}>
                  <Text text="1.2M" preset="heading" style={themed({ color: theme.colors.tint })} />
                  <Text
                    text="Active Users"
                    style={themed({ color: theme.colors.text, fontSize: 14 })}
                  />
                </View>
                <View style={themed($statItem)}>
                  <Text
                    text="4.8★"
                    preset="heading"
                    style={themed({ color: theme.colors.palette.primary500 })}
                  />
                  <Text
                    text="App Rating"
                    style={themed({ color: theme.colors.text, fontSize: 14 })}
                  />
                </View>
                <View style={themed($statItem)}>
                  <Text
                    text="99.9%"
                    preset="heading"
                    style={themed({ color: theme.colors.palette.accent500 })}
                  />
                  <Text text="Uptime" style={themed({ color: theme.colors.text, fontSize: 14 })} />
                </View>
              </View>
            </View>

            {/* Empty State Example */}
            <View style={themed($sectionContainer)}>
              <Text
                text="Empty State Example"
                preset="subheading"
                style={themed({ color: theme.colors.text, marginBottom: 16 })}
              />
              <EmptyState
                heading="No Items Found"
                content="Try adjusting your search criteria or create a new item to get started."
                button="Create New Item"
                buttonOnPress={() => console.log("Create new item pressed")}
                style={themed($emptyStateContainer)}
              />
            </View>

            {/* Footer */}
            <View style={themed($footerContainer)}>
              <Text
                text="Made with ❤️ using React Native"
                style={themed({ color: theme.colors.textDim, textAlign: "center" })}
              />
            </View>
          </View>
        </ScrollView>
      )}
    />
  )
})

const $contentContainer: ViewStyle = {
  flex: 1,
  padding: 20,
}

const $headerSection: ViewStyle = {
  marginBottom: 24,
}

const $sectionContainer: ViewStyle = {
  marginBottom: 32,
}

const $buttonRow: ViewStyle = {
  flexDirection: "row",
  gap: 12,
}

const $actionButton: ViewStyle = {
  flex: 1,
}

const $card: ViewStyle = {
  marginBottom: 16,
}

const $cardIcon: ViewStyle = {
  margin: 12,
}

const $statsContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-around",
  backgroundColor: "rgba(0, 0, 0, 0.05)",
  borderRadius: 12,
  padding: 20,
}

const $statItem: ViewStyle = {
  alignItems: "center",
}

const $emptyStateContainer: ViewStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.02)",
  borderRadius: 12,
  padding: 20,
}

const $footerContainer: ViewStyle = {
  marginTop: 16,
  paddingTop: 16,
  borderTopWidth: 1,
  borderTopColor: "rgba(0, 0, 0, 0.1)",
}
