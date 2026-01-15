import { ILessonConfig } from "@/types/lessons/ILessonConfig"
import { WHAT_ANXIETY_IS_LESSON_DEFINITIONS } from "./lessons/WhatAnxietyIsLessons"
import { NERVOUS_SYSTEM_101_LESSON_DEFINITIONS } from "./lessons/NervousSystem101Lessons"
import { ANXIETY_VS_PANIC_LESSON_DEFINITIONS } from "./lessons/AnxietyVsPanicLessons"
import { MOOD_VS_EMOTION_VS_STATE_LESSON_DEFINITIONS } from "./lessons/MoodVsEmotionVsStateLessons"
import { ANXIETY_ESCALATION_LADDER_LESSON_DEFINITIONS } from "./lessons/AnxietyEscalationLadderLessons"
import { TRIGGERS_LESSON_DEFINITIONS } from "./lessons/TriggersLessons"
import { SAFETY_BEHAVIORS_LESSON_DEFINITIONS } from "./lessons/SafetyBehaviorsLessons"
import { BODY_FIRST_REGULATION_LESSON_DEFINITIONS } from "./lessons/BodyFirstRegulationLessons"

/**
 * Registry of all daily lessons (accessible via the daily lesson system).
 * I'm anxious and I'm having a panic attack lessons are handled separately and accessed via the panic button.
 */
export const LESSONS: Record<string, ILessonConfig> = {
  ...WHAT_ANXIETY_IS_LESSON_DEFINITIONS,
  ...NERVOUS_SYSTEM_101_LESSON_DEFINITIONS,
  ...ANXIETY_VS_PANIC_LESSON_DEFINITIONS,
  ...MOOD_VS_EMOTION_VS_STATE_LESSON_DEFINITIONS,
  ...ANXIETY_ESCALATION_LADDER_LESSON_DEFINITIONS,
  ...TRIGGERS_LESSON_DEFINITIONS,
  ...SAFETY_BEHAVIORS_LESSON_DEFINITIONS,
  ...BODY_FIRST_REGULATION_LESSON_DEFINITIONS,
}
