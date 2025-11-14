import { NativeStackScreenProps } from "@react-navigation/native-stack"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  // 🔥 Your screens go here
  Home: { rc_offering_id?: string } | undefined
  Me: undefined
  Settings: undefined
  TabNavigator: undefined
  Login: undefined
  Onboarding: undefined
  MoodLogger: undefined
  Journal: { mode?: "edit"; date?: number; initialText?: string } | undefined
  JournalReader: { date: number }
  Lessons: undefined
  SingleLesson: { lessonId: string }
  Membership: undefined
  MessageIntoTheVoid: undefined
  ComposeMessage: undefined
  MoodLogs: undefined
  JournalLogs: undefined
  MyStuff: undefined
  ClaimAward: undefined
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>
