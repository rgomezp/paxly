import { FC, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  Animated,
  ScrollView,
  Text as RNText,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Text } from "@/components"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAppTheme } from "@/utils/useAppTheme"
import { ISlide } from "@/types/ISlide"
import { ALL_MOODS, MOOD_TO_EMOJI, MoodId } from "@/types/Moods"
import { ACTIVITY_TO_EMOJI, ALL_ACTIVITIES, Activity } from "@/types/Activities"
import MoodManager from "@/managers/MoodManager"
import { ProgressBar } from "@/components"

interface MoodLoggerProps extends AppStackScreenProps<"MoodLogger"> {}

export const MoodLogger: FC<MoodLoggerProps> = observer(function MoodLogger({ navigation }) {
  const { width } = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const { theme } = useAppTheme()
  const scrollX = useRef(new Animated.Value(0)).current
  const pagerRef = useRef<ScrollView>(null)

  const [selectedMood, setSelectedMood] = useState<MoodId | null>(null)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [notes, setNotes] = useState("")

  const slides: ISlide[] = useMemo(
    () => [
      { id: "mood", title: "select mood" },
      { id: "activity", title: "what were you doing?" },
      { id: "notes", title: "add notes (optional)" },
    ],
    [],
  )

  function goTo(index: number) {
    pagerRef.current?.scrollTo({ x: width * index, animated: true })
  }

  function onPickMood(m: MoodId) {
    setSelectedMood(m)
    goTo(1)
  }

  function onPickActivity(a: Activity) {
    setSelectedActivity(a)
    goTo(2)
  }

  function onSave() {
    if (!selectedMood || !selectedActivity) return
    MoodManager.create({ moodId: selectedMood, activity: selectedActivity, notes })
    navigation.goBack()
  }

  return (
    <View
      style={[$container, { paddingTop: insets.top, backgroundColor: theme.colors.background }]}
    >
      <ProgressBar data={slides} scrollX={scrollX} />

      <Animated.ScrollView
        ref={pagerRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={16}
      >
        {/* Step 1 - Mood */}
        <ScrollView style={{ width }} contentContainerStyle={{ paddingBottom: 20 }}>
          <Text text="Select mood" preset="bold" style={{ color: theme.colors.text, margin: 20 }} />
          <Grid>
            {ALL_MOODS.map((m) => (
              <EmojiTile
                key={m}
                label={m.replace(/_/g, " ")}
                emoji={MOOD_TO_EMOJI[m]}
                selected={selectedMood === m}
                onPress={() => onPickMood(m)}
                themeBackground={theme.colors.card}
                themeText={theme.colors.text}
              />
            ))}
          </Grid>
        </ScrollView>

        {/* Step 2 - Activity */}
        <ScrollView style={{ width }} contentContainerStyle={{ paddingBottom: 20 }}>
          <Text
            text="what were you doing?"
            preset="bold"
            style={{ color: theme.colors.text, margin: 20 }}
          />
          <Grid>
            {ALL_ACTIVITIES.map((a) => (
              <EmojiTile
                key={a}
                label={a.replace(/_/g, " ")}
                emoji={ACTIVITY_TO_EMOJI[a]}
                selected={selectedActivity === a}
                onPress={() => onPickActivity(a)}
                themeBackground={theme.colors.card}
                themeText={theme.colors.text}
              />
            ))}
          </Grid>
        </ScrollView>

        {/* Step 3 - Notes */}
        <View style={{ width, padding: 20 }}>
          <Text
            text="Notes (optional)"
            preset="bold"
            style={{ color: theme.colors.text, marginBottom: 12 }}
          />
          <TextInput
            placeholder="Notes (optional)"
            placeholderTextColor={theme.colors.textDim}
            value={notes}
            onChangeText={setNotes}
            multiline
            style={{
              minHeight: 120,
              borderRadius: 12,
              padding: 12,
              color: theme.colors.text,
              backgroundColor: theme.colors.card,
            }}
          />
          <TouchableOpacity
            onPress={onSave}
            style={{
              marginTop: 20,
              borderRadius: 12,
              paddingVertical: 14,
              alignItems: "center",
              backgroundColor: theme.colors.tint,
            }}
          >
            <Text text="Save" preset="bold" style={{ color: theme.colors.background }} />
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </View>
  )
})

function Grid({ children }: { children: React.ReactNode }) {
  return <View style={$grid}>{children}</View>
}

function EmojiTile(props: {
  emoji: string
  label: string
  selected?: boolean
  onPress: () => void
  themeBackground: string
  themeText: string
}) {
  const { emoji, label, selected, onPress, themeBackground, themeText } = props
  return (
    <TouchableOpacity onPress={onPress} style={[$tile, { backgroundColor: themeBackground }]}>
      <RNText style={{ fontSize: 30, textAlign: "center" }}>{emoji}</RNText>
      <Text text={label} style={{ color: themeText, marginTop: 8, textTransform: "lowercase" }} />
      {selected ? <View /> : null}
    </TouchableOpacity>
  )
}

const $container: ViewStyle = {
  flex: 1,
}

const $grid: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  paddingHorizontal: 20,
}

const $tile: ViewStyle = {
  width: "30%",
  paddingVertical: 16,
  borderRadius: 16,
  alignItems: "center",
  marginBottom: 16,
}
