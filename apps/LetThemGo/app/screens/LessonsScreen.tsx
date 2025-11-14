import { FC, useMemo, useState, useContext } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, View, ViewStyle, TouchableOpacity } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Screen } from "@/components/Screen"
import { Text } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import { LESSONS } from "@/data/LessonRegistry"
import { MODULE_DISPLAY_NAMES, MODULE_ORDER } from "@/data/ModuleDisplayNames"
import { ModuleId } from "@/types/lessons/ModuleId"
import { navigate } from "@/navigators/navigationUtilities"
import TodaysLessonManager from "@/managers/TodaysLessonManager"
import { Icon } from "@/components"
import { ThemedFontAwesome5Icon } from "@/components/ThemedFontAwesome5Icon"
import { $styles } from "@/theme/styles"
import { useStores } from "@/models"
import FreeUserUsageManager from "@/managers/FreeUserUsageManager"
import { useEntitlements } from "@/entitlements/useEntitlements"
import { FEATURES } from "@/entitlements/constants/features"
import { presentPaywallSafely } from "@/thirdParty/revenueCatUtils"
import { FlagContext } from "@/hooks/useFlags"

interface LessonsScreenProps extends AppStackScreenProps<"Lessons"> {}

export const LessonsScreen: FC<LessonsScreenProps> = observer(function LessonsScreen() {
  const { theme, themed } = useAppTheme()
  const { lessonStore } = useStores()
  const completedLessons = lessonStore.getCompletedLessons()
  const todaysLessonId = TodaysLessonManager.getTodaysLesson()
  const { hasFeatureAccess } = useEntitlements()
  const flagContext = useContext(FlagContext)
  if (!flagContext) {
    throw new Error("LessonsScreen must be used within a FlagProvider")
  }
  const flags = flagContext.useFeatureFlags()

  // Get the task limit from feature flags, fallback to default if not available
  const taskLimit = flags.task_limit_free_users ?? FreeUserUsageManager.getDefaultFreeLimit()

  // Initialize expanded modules - start with all modules collapsed
  const [expandedModules, setExpandedModules] = useState<Set<ModuleId>>(() => {
    return new Set<ModuleId>()
  })

  // Group lessons by module
  const lessonsByModule = useMemo(() => {
    const grouped: Record<ModuleId, (typeof LESSONS)[string][]> = {} as any

    // Create a map of lesson ID to its index in LESSONS to preserve original order
    const allLessonIds = Object.keys(LESSONS)
    const lessonOrderMap = new Map<string, number>()
    allLessonIds.forEach((lessonId, index) => {
      lessonOrderMap.set(lessonId, index)
    })

    for (const lesson of Object.values(LESSONS)) {
      if (!grouped[lesson.moduleId]) {
        grouped[lesson.moduleId] = []
      }
      grouped[lesson.moduleId].push(lesson)
    }

    // Sort lessons within each module by their original order in LESSONS
    // This preserves the order from the source module files, matching how today's lesson is selected
    for (const moduleId in grouped) {
      grouped[moduleId as ModuleId].sort((a, b) => {
        const orderA = lessonOrderMap.get(a.id) ?? Infinity
        const orderB = lessonOrderMap.get(b.id) ?? Infinity
        return orderA - orderB
      })
    }

    return grouped
  }, [])

  const toggleModule = (moduleId: ModuleId) => {
    setExpandedModules((prev) => {
      const next = new Set(prev)
      if (next.has(moduleId)) {
        next.delete(moduleId)
      } else {
        next.add(moduleId)
      }
      return next
    })
  }

  const handleLessonPress = async (lessonId: string) => {
    const hasPremium = hasFeatureAccess(FEATURES.PREMIUM_FEATURES)
    const isCompleted = completedLessons.includes(lessonId)

    // Check paygate for free users before starting a new lesson
    // Allow access if lesson is already completed (can review)
    if (
      !hasPremium &&
      !isCompleted &&
      FreeUserUsageManager.hasReachedLessonCompletionLimit(taskLimit)
    ) {
      await presentPaywallSafely()
      return
    }

    navigate("SingleLesson", { lessonId })
  }

  const isTodaysLessonCompleted = todaysLessonId ? completedLessons.includes(todaysLessonId) : false

  return (
    <Screen preset="scroll" style={themed($screen)}>
      <View style={themed($header)}>
        <Text text="Lessons" preset="heading" style={themed({ color: theme.colors.text })} />
        {todaysLessonId && (
          <>
            {isTodaysLessonCompleted ? (
              <View
                style={themed([
                  $dailyLessonBanner,
                  {
                    backgroundColor: theme.colors.card,
                    borderColor: theme.colors.tint,
                    opacity: 0.7,
                  },
                ])}
              >
                <Icon icon="check" size={16} color={theme.colors.tint} />
                <Text
                  text={`Completed: ${LESSONS[todaysLessonId]?.title || "Daily Lesson"}`}
                  size="sm"
                  style={themed({ color: theme.colors.textDim, marginLeft: 8 })}
                />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => handleLessonPress(todaysLessonId)}
                style={themed([
                  $dailyLessonBanner,
                  {
                    backgroundColor: theme.colors.card,
                    borderColor: theme.colors.tint,
                  },
                ])}
                activeOpacity={0.7}
              >
                <ThemedFontAwesome5Icon name="star" size={16} color={theme.colors.tint} solid />
                <Text
                  text={`Today's Lesson: ${LESSONS[todaysLessonId]?.title || "Daily Lesson"}`}
                  size="sm"
                  style={themed({ color: theme.colors.text, marginLeft: 8 })}
                />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>

      <ScrollView style={themed($content)} showsVerticalScrollIndicator={false}>
        {MODULE_ORDER.map((moduleId) => {
          const lessons = lessonsByModule[moduleId] || []
          if (lessons.length === 0) return null

          const isExpanded = expandedModules.has(moduleId)
          const completedCount = lessons.filter((l) => completedLessons.includes(l.id)).length
          const progress = lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0

          return (
            <View key={moduleId} style={themed($moduleContainer)}>
              <TouchableOpacity
                onPress={() => toggleModule(moduleId)}
                style={themed($moduleHeader)}
                activeOpacity={0.7}
              >
                <View style={themed($moduleHeaderContent)}>
                  <View style={themed($moduleTitleRow)}>
                    <Text
                      text={MODULE_DISPLAY_NAMES[moduleId]}
                      preset="subheading"
                      style={themed({ color: theme.colors.text })}
                    />
                    <Icon
                      icon={isExpanded ? "caretRight" : "caretRight"}
                      size={16}
                      color={theme.colors.text}
                      style={themed({ transform: [{ rotate: isExpanded ? "90deg" : "0deg" }] })}
                    />
                  </View>
                  <Text
                    text={`${completedCount}/${lessons.length} completed`}
                    size="xs"
                    style={themed({ color: theme.colors.textDim })}
                  />
                  <View style={themed($progressBarContainer)}>
                    <View
                      style={[
                        themed($progressBar),
                        { width: `${progress}%`, backgroundColor: theme.colors.tint },
                      ]}
                    />
                  </View>
                </View>
              </TouchableOpacity>

              {isExpanded && (
                <View style={themed($lessonsList)}>
                  {lessons.map((lesson) => {
                    const isCompleted = completedLessons.includes(lesson.id)
                    const isTodaysLesson = lesson.id === todaysLessonId

                    return (
                      <TouchableOpacity
                        key={lesson.id}
                        onPress={() => handleLessonPress(lesson.id)}
                        style={themed([
                          $lessonItem,
                          isTodaysLesson && {
                            borderWidth: 2,
                            borderColor: theme.colors.tint,
                          },
                          {
                            backgroundColor: theme.colors.card,
                          },
                          $styles.borderRadius,
                        ])}
                        activeOpacity={0.7}
                      >
                        <View style={themed($lessonItemContent)}>
                          <View style={themed($lessonItemLeft)}>
                            {isTodaysLesson && (
                              <ThemedFontAwesome5Icon
                                name="star"
                                size={14}
                                color={theme.colors.tint}
                                solid
                                style={themed({ marginRight: 8 })}
                              />
                            )}
                            <View style={themed($lessonTextContainer)}>
                              <Text
                                text={lesson.title}
                                weight="medium"
                                style={themed({ color: theme.colors.text })}
                              />
                              <Text
                                text={lesson.goal}
                                size="xs"
                                style={themed({ color: theme.colors.textDim, marginTop: 2 })}
                              />
                              <Text
                                text={`${lesson.estMinutes} min`}
                                size="xs"
                                style={themed({ color: theme.colors.textDim, marginTop: 4 })}
                              />
                            </View>
                          </View>
                          <View style={themed($lessonItemRight)}>
                            {isCompleted && (
                              <Icon icon="check" size={20} color={theme.colors.tint} />
                            )}
                            <Icon
                              icon="caretRight"
                              size={12}
                              color={theme.colors.textDim}
                              style={themed({ marginLeft: 8 })}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              )}
            </View>
          )
        })}
      </ScrollView>
    </Screen>
  )
})

const $screen: ViewStyle = {
  flex: 1,
}

const $header: ViewStyle = {
  paddingHorizontal: 20,
  paddingTop: 20,
  paddingBottom: 16,
}

const $dailyLessonBanner: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 12,
  padding: 12,
  borderRadius: 8,
  borderWidth: 1,
}

const $content: ViewStyle = {
  flex: 1,
  paddingHorizontal: 20,
}

const $moduleContainer: ViewStyle = {
  marginBottom: 16,
  borderRadius: 12,
  overflow: "hidden",
}

const $moduleHeader: ViewStyle = {
  padding: 16,
}

const $moduleHeaderContent: ViewStyle = {
  width: "100%",
}

const $moduleTitleRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 8,
}

const $progressBarContainer: ViewStyle = {
  height: 4,
  borderRadius: 2,
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  marginTop: 8,
  overflow: "hidden",
}

const $progressBar: ViewStyle = {
  height: "100%",
  borderRadius: 2,
}

const $lessonsList: ViewStyle = {
  paddingHorizontal: 16,
  paddingBottom: 16,
}

const $lessonItem: ViewStyle = {
  marginTop: 8,
  padding: 16,
  borderRadius: 8,
  ...$styles.dropShadow,
}

const $lessonItemContent: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $lessonItemLeft: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
  flex: 1,
}

const $lessonTextContainer: ViewStyle = {
  flex: 1,
}

const $lessonItemRight: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}
