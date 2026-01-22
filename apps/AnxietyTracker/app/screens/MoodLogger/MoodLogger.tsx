import { FC, useEffect, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  Animated,
  Pressable,
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
import { ProgressBar } from "@/components"
import FloatingCenterButton from "@/components/buttons/FloatingCenterButton"
import { $styles } from "@/theme"
import { useHeader } from "@/utils/useHeader"
import { ThemedFontAwesome5Icon } from "@/components/ThemedFontAwesome5Icon"

interface MoodLoggerProps extends AppStackScreenProps<"MoodLogger"> {}

export const MoodLogger: FC<MoodLoggerProps> = observer(function MoodLogger({ navigation }) {
  const { width } = useWindowDimensions()
  const { theme, themed } = useAppTheme()
  const scrollX = useRef(new Animated.Value(0)).current
  const pagerRef = useRef<ScrollView>(null)

  const [selectedMood, setSelectedMood] = useState<MoodId | null>(null)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [selectedAnxietyRating, setSelectedAnxietyRating] = useState<number | null>(null)
  const [notes, setNotes] = useState("")
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const slides: ISlide[] = useMemo(
    () => [
      { id: "mood", title: "select mood" },
      { id: "activity", title: "What were you doing?" },
      { id: "anxiety", title: "Rate your anxiety" },
      { id: "notes", title: "Add notes (optional)" },
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

  function onPickAnxietyRating(rating: number) {
    setSelectedAnxietyRating(rating)
    goTo(3)
  }

  function onSave() {
    if (!selectedMood || !selectedActivity) return

    MoodManager.create({
      moodId: selectedMood,
      activity: selectedActivity,
      anxietyRating: selectedAnxietyRating ?? undefined,
      notes,
    })
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

  useHeader(
    {
      LeftActionComponent: (
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
          style={themed($headerAction)}
        >
          <ThemedFontAwesome5Icon name="chevron-left" color={theme.colors.text} size={18} solid />
        </Pressable>
      ),
    },
    [navigation, theme.colors.text],
  )

  return (
    <View style={[$container, { backgroundColor: theme.colors.background }]}>
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
            text={slides[1].title}
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

        {/* Step 3 - Anxiety Rating */}
        <ScrollView style={[$slideContainer, { width }]} contentContainerStyle={$slideContent}>
          <Text
            text={slides[2].title}
            preset="bold"
            style={[$activityHeaderText, { color: theme.colors.text }]}
          />
          <View>
            <View style={$anxietyRatingContainer}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <TouchableOpacity
                  key={rating}
                  onPress={() => onPickAnxietyRating(rating)}
                  activeOpacity={0.7}
                  style={[
                    $anxietyRatingButton,
                    {
                      backgroundColor:
                        selectedAnxietyRating === rating
                          ? theme.colors.palette.negative
                          : theme.colors.card,
                    },
                  ]}
                >
                  <Text
                    text={rating.toString()}
                    weight="bold"
                    style={[
                      $anxietyRatingText,
                      {
                        color:
                          selectedAnxietyRating === rating
                            ? theme.colors.background
                            : theme.colors.text,
                      },
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View style={$anxietyRatingLabelContainer}>
              <Text
                text="No anxiety"
                size="xs"
                style={[$anxietyRatingLabel, { color: theme.colors.textDim }]}
              />
              <View style={$anxietyRatingLabelSpacer} />
              <View style={$anxietyRatingLabelSpacer} />
              <View style={$anxietyRatingLabelSpacer} />
              <Text
                text="Most anxious"
                size="xs"
                style={[$anxietyRatingLabel, { color: theme.colors.textDim }]}
              />
            </View>
          </View>
        </ScrollView>

        {/* Step 4 - Notes */}
        <ScrollView style={[$slideContainer, { width }]} contentContainerStyle={$notesContent}>
          <View style={[$notesContainer, { width }]}>
            <Text
              text={slides[3].title}
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

const $headerAction: any = ({ spacing }: any) => ({
  paddingHorizontal: spacing.md,
  height: 56,
  alignItems: "center",
  justifyContent: "center",
})

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

const $anxietyRatingContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: 20,
  marginTop: 20,
}

const $anxietyRatingButton: ViewStyle = {
  width: 60,
  height: 60,
  borderRadius: 30,
  alignItems: "center",
  justifyContent: "center",
  ...$styles.dropShadow,
}

const $anxietyRatingLabelContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: 20,
  marginTop: 8,
}

const $anxietyRatingLabelSpacer: ViewStyle = {
  width: 60,
}

const $anxietyRatingText: TextStyle = {
  fontSize: 24,
  lineHeight: 24,
  textAlign: "center",
  includeFontPadding: false,
  textAlignVertical: "center",
}

const $anxietyRatingLabel: TextStyle = {
  marginTop: 8,
  textAlign: "center",
}
