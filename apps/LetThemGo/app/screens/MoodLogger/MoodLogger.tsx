import { FC, useEffect, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  Animated,
  ImageStyle,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
  TextStyle,
} from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Text } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import { ISlide } from "@/types/ISlide"
import { MOOD_TO_EMOJI, MoodId, MOODS } from "@/types/Moods"
import { MoodCategory } from "@/types/MoodCategory"
import { ACTIVITY_TO_EMOJI, Activity } from "@/types/Activities"
import MoodManager from "@/managers/MoodManager"
import { ProgressBar, PlantyFromCurrentGoal } from "@/components"
import FloatingCenterButton from "@/components/buttons/FloatingCenterButton"
import { $styles } from "@/theme"

interface MoodLoggerProps extends AppStackScreenProps<"MoodLogger"> {}

export const MoodLogger: FC<MoodLoggerProps> = observer(function MoodLogger({ navigation }) {
  const { width } = useWindowDimensions()
  const { theme } = useAppTheme()
  const scrollX = useRef(new Animated.Value(0)).current
  const pagerRef = useRef<ScrollView>(null)

  const [selectedMood, setSelectedMood] = useState<MoodId | null>(null)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [notes, setNotes] = useState("")
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const slides: ISlide[] = useMemo(
    () => [
      { id: "mood", title: "select mood" },
      { id: "activity", title: "what were you doing?" },
      { id: "notes", title: "add notes (optional)" },
    ],
    [],
  )

  // Get sorted moods and activities with top 3 most logged first (if at least 10 total logs)
  const sortedMoods = useMemo(() => MoodManager.getSortedMoods(), [])
  const sortedActivities = useMemo(() => MoodManager.getSortedActivities(), [])

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

  const isValid = selectedMood !== null && selectedActivity !== null

  // Track current slide index based on scroll position
  useEffect(() => {
    const listener = scrollX.addListener(({ value }) => {
      const slideIndex = Math.round(value / width)
      setCurrentSlideIndex(slideIndex)
    })

    return () => {
      scrollX.removeListener(listener)
    }
  }, [scrollX, width])

  const isOnFinalSlide = currentSlideIndex === slides.length - 1

  return (
    <View
      style={[$container, { backgroundColor: theme.colors.background }]}
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
        <ScrollView style={[$slideContainer, { width }]} contentContainerStyle={$slideContent}>
          <View style={$moodHeader}>
            {/* Image of planty here */}
            <PlantyFromCurrentGoal style={$plantyImage} />
            <Text
              text="How are you feeling?"
              preset="bold"
              style={[$moodHeaderText, { color: theme.colors.text }]}
            />
          </View>
          <Grid>
            {sortedMoods.map((m) => {
              const category = MOODS[m].category
              const categoryTextColor =
                category === MoodCategory.Positive
                  ? theme.colors.palette.positive
                  : category === MoodCategory.Negative
                    ? theme.colors.palette.negative
                    : theme.colors.palette.neutral

              return (
                <EmojiTile
                  key={m}
                  label={m.replace(/_/g, " ")}
                  emoji={MOOD_TO_EMOJI[m]}
                  selected={selectedMood === m}
                  onPress={() => onPickMood(m)}
                  themeBackground={theme.colors.card}
                  themeText={categoryTextColor}
                />
              )
            })}
          </Grid>
        </ScrollView>

        {/* Step 2 - Activity */}
        <ScrollView style={[$slideContainer, { width }]} contentContainerStyle={$slideContent}>
          <Text
            text="what were you doing?"
            preset="bold"
            style={[$activityHeaderText, { color: theme.colors.text }]}
          />
          <Grid>
            {sortedActivities.map((a) => (
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
        <ScrollView style={[$slideContainer, { width }]} contentContainerStyle={$notesContent}>
          <View style={[$notesContainer, { width }]}>
            <Text
              text="Notes (optional)"
              preset="bold"
              style={[$notesHeaderText, { color: theme.colors.text }]}
            />
            <TextInput
              placeholder="Notes (optional)"
              placeholderTextColor={theme.colors.textDim}
              value={notes}
              onChangeText={setNotes}
              multiline
              style={[$textInput, { color: theme.colors.text, backgroundColor: theme.colors.card }]}
            />
          </View>
        </ScrollView>
      </Animated.ScrollView>
      {isOnFinalSlide && <FloatingCenterButton isValid={isValid} text="Save" onPress={onSave} />}
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
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[$tile, { backgroundColor: themeBackground }]}
    >
      <Text style={$emojiText}>{emoji}</Text>
      <Text
        weight="bold"
        text={label}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.75}
        style={[$emojiLabel, { color: themeText }]}
      />
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
  ...$styles.dropShadow,
}

const $slideContainer: ViewStyle = {
  // width will be set dynamically
}

const $slideContent: ViewStyle = {
  paddingBottom: 20,
}

const $moodHeader: ViewStyle = {
  margin: 20,
  flexDirection: "row",
  alignItems: "flex-end",
}

const $plantyImage: ImageStyle = {
  width: 48,
  height: 68,
  marginRight: 12,
}

const $moodHeaderText: TextStyle = {
  paddingBottom: 10,
}

const $activityHeaderText: TextStyle = {
  margin: 20,
}

const $notesContainer: ViewStyle = {
  padding: 20,
  // width will be set dynamically
}

const $notesContent: ViewStyle = {
  paddingBottom: 120, // Add padding to prevent content from being hidden behind the button
}

const $notesHeaderText: TextStyle = {
  marginBottom: 12,
}

const $textInput: TextStyle = {
  minHeight: 120,
  borderRadius: 12,
  padding: 12,
}

const $emojiText: TextStyle = {
  fontSize: 30,
  lineHeight: 36,
  textAlign: "center",
}

const $emojiLabel: TextStyle = {
  marginTop: 8,
  textTransform: "lowercase",
}
