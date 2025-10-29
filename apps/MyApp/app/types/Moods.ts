import { IMood } from "./IMood"
import { MoodCategory } from "./MoodCategory"

enum MoodId {
  Anxious = "anxious",
  Sad = "sad",
  Angry = "angry",
  Frustrated = "frustrated",
  Lonely = "lonely",
  Guilty = "guilty",
  Overwhelmed = "overwhelmed",
  Disgusted = "disgusted",
  Empty = "empty",
  Bored = "bored",
  Content = "content",
  Calm = "calm",
  Alert = "alert",
  Curious = "curious",
  Reflective = "reflective",
  Indifferent = "indifferent",
  Balanced = "balanced",
  Focused = "focused",
  Joyful = "joyful",
  Grateful = "grateful",
  Peaceful = "peaceful",
}

const MOODS: Record<MoodId, IMood> = {
  [MoodId.Anxious]: { title: "anxious", category: MoodCategory.Negative },
  [MoodId.Sad]: { title: "sad", category: MoodCategory.Negative },
  [MoodId.Angry]: { title: "angry", category: MoodCategory.Negative },
  [MoodId.Frustrated]: { title: "frustrated", category: MoodCategory.Negative },
  [MoodId.Lonely]: { title: "lonely", category: MoodCategory.Negative },
  [MoodId.Guilty]: { title: "guilty", category: MoodCategory.Negative },
  [MoodId.Overwhelmed]: { title: "overwhelmed", category: MoodCategory.Negative },
  [MoodId.Disgusted]: { title: "disgusted", category: MoodCategory.Negative },
  [MoodId.Empty]: { title: "empty", category: MoodCategory.Negative },
  [MoodId.Bored]: { title: "bored", category: MoodCategory.Neutral },
  [MoodId.Content]: { title: "content", category: MoodCategory.Positive },
  [MoodId.Calm]: { title: "calm", category: MoodCategory.Positive },
  [MoodId.Alert]: { title: "alert", category: MoodCategory.Neutral },
  [MoodId.Curious]: { title: "curious", category: MoodCategory.Neutral },
  [MoodId.Reflective]: { title: "reflective", category: MoodCategory.Neutral },
  [MoodId.Indifferent]: { title: "indifferent", category: MoodCategory.Neutral },
  [MoodId.Balanced]: { title: "balanced", category: MoodCategory.Positive },
  [MoodId.Focused]: { title: "focused", category: MoodCategory.Positive },
  [MoodId.Joyful]: { title: "joyful", category: MoodCategory.Positive },
  [MoodId.Grateful]: { title: "grateful", category: MoodCategory.Positive },
  [MoodId.Peaceful]: { title: "peaceful", category: MoodCategory.Positive },
}

const MOOD_TO_EMOJI: Record<MoodId, string> = {
  [MoodId.Anxious]: "😰",
  [MoodId.Sad]: "😢",
  [MoodId.Angry]: "😠",
  [MoodId.Frustrated]: "😤",
  [MoodId.Lonely]: "😔",
  [MoodId.Guilty]: "😖",
  [MoodId.Overwhelmed]: "😵",
  [MoodId.Disgusted]: "🤢",
  [MoodId.Empty]: "😕",
  [MoodId.Bored]: "😴",
  [MoodId.Content]: "😐",
  [MoodId.Calm]: "😊",
  [MoodId.Alert]: "👁️",
  [MoodId.Curious]: "🤔",
  [MoodId.Reflective]: "🤨",
  [MoodId.Indifferent]: "😑",
  [MoodId.Balanced]: "⚖️",
  [MoodId.Focused]: "🧐",
  [MoodId.Joyful]: "🙂",
  [MoodId.Grateful]: "🙏",
  [MoodId.Peaceful]: "😌",
}

const ALL_MOODS: MoodId[] = Object.keys(MOODS) as MoodId[]

export { MoodId, MOODS, MOOD_TO_EMOJI, ALL_MOODS }
