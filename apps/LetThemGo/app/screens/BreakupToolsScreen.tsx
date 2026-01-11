import { FC } from "react"
import { View, ViewStyle, ScrollView, useWindowDimensions } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { useAppTheme } from "@/utils/useAppTheme"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import {
  PaperPlaneTiltIcon,
  XCircleIcon,
  EnvelopeIcon,
  FlagPennantIcon,
} from "phosphor-react-native"
import { navigate } from "@/navigators/navigationUtilities"
import { ActionCard } from "@/components/buttons/ActionCard"
import { Text } from "@/components"
import { observer } from "mobx-react-lite"
import LetterToMyselfManager from "@/managers/LetterToMyselfManager"

interface BreakupToolsScreenProps extends AppStackScreenProps<"BreakupTools"> {}

export const BreakupToolsScreen: FC<BreakupToolsScreenProps> = observer(
  function BreakupToolsScreen() {
    const contentInsets = useSafeAreaInsetsStyle([])
    const { themed, theme } = useAppTheme()
    const { width } = useWindowDimensions()
    const hasUnreadLetters = LetterToMyselfManager.hasUnreadLetters()

    // Calculate card width and container width for centering
    // For 3 cards, we'll use a 2-column layout with wrapping
    const gap = 10
    const horizontalPadding = 32
    const cardWidth = (width - horizontalPadding - gap) / 2
    const containerWidth = 2 * cardWidth + gap

    return (
      <ScrollView style={[themed($container), contentInsets]}>
        <View style={themed($headerSection)}>
          <Text
            text="Healing Tools"
            preset="heading"
            style={themed({
              color: theme.colors.text,
              fontSize: 24,
              paddingHorizontal: 20,
              textAlign: "center",
            })}
          />
        </View>
        <View style={[themed($buttonsWrapper), { width: containerWidth, gap }]}>
          <ActionCard
            onPress={() => navigate("MessageIntoTheVoid", undefined)}
            icon={PaperPlaneTiltIcon}
            label="Send to the Void"
            style={{ width: cardWidth, maxWidth: cardWidth }}
          />
          <ActionCard
            onPress={() => navigate("WhyItDidntWork", undefined)}
            icon={XCircleIcon}
            label="Why it Didn't Work"
            style={{ width: cardWidth, maxWidth: cardWidth }}
          />
          <ActionCard
            onPress={() => navigate("RedFlags", undefined)}
            icon={FlagPennantIcon}
            label="Red Flags"
            style={{ width: cardWidth, maxWidth: cardWidth }}
          />
          <ActionCard
            onPress={() => navigate("LetterToMyself", undefined)}
            icon={EnvelopeIcon}
            label="Letter to Myself"
            badge={hasUnreadLetters}
            style={{ width: cardWidth, maxWidth: cardWidth }}
          />
        </View>
      </ScrollView>
    )
  },
)

const $container: ViewStyle = {
  flex: 1,
}

const $headerSection: ViewStyle = {
  marginVertical: 24,
  paddingHorizontal: 20,
}

const $buttonsWrapper: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "stretch",
  marginTop: 20,
  marginBottom: 34,
  alignSelf: "center",
}
