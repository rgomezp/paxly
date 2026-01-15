import { ILessonConfig } from "@/types/lessons/ILessonConfig"
import { WHAT_ANXIETY_IS_LESSON_DEFINITIONS } from "./lessons/WhatAnxietyIsLessons"
import { NERVOUS_SYSTEM_101_LESSON_DEFINITIONS } from "./lessons/NervousSystem101Lessons"
import { ANXIETY_VS_PANIC_LESSON_DEFINITIONS } from "./lessons/AnxietyVsPanicLessons"
import { MOOD_VS_EMOTION_VS_STATE_LESSON_DEFINITIONS } from "./lessons/MoodVsEmotionVsStateLessons"
import { ANXIETY_ESCALATION_LADDER_LESSON_DEFINITIONS } from "./lessons/AnxietyEscalationLadderLessons"
import { TRIGGERS_LESSON_DEFINITIONS } from "./lessons/TriggersLessons"
import { SAFETY_BEHAVIORS_LESSON_DEFINITIONS } from "./lessons/SafetyBehaviorsLessons"
import { BODY_FIRST_REGULATION_LESSON_DEFINITIONS } from "./lessons/BodyFirstRegulationLessons"
import { ATTENTION_SKILLS_LESSON_DEFINITIONS } from "./lessons/AttentionSkillsLessons"
import { EMOTION_SURFING_LESSON_DEFINITIONS } from "./lessons/EmotionSurfingLessons"
import { ANXIETY_ABOUT_ANXIETY_LESSON_DEFINITIONS } from "./lessons/AnxietyAboutAnxietyLessons"
import { ACCEPTANCE_VS_RESIGNATION_LESSON_DEFINITIONS } from "./lessons/AcceptanceVsResignationLessons"
import { SELF_TALK_LESSON_DEFINITIONS } from "./lessons/SelfTalkLessons"
import { AVOIDANCE_AND_ANXIETY_LOOP_LESSON_DEFINITIONS } from "./lessons/AvoidanceAndAnxietyLoopLessons"
import { EXPOSURE_EXPLAINED_LESSON_DEFINITIONS } from "./lessons/ExposureExplainedLessons"
import { VALUES_OVER_COMFORT_LESSON_DEFINITIONS } from "./lessons/ValuesOverComfortLessons"
import { BUILDING_SELF_TRUST_LESSON_DEFINITIONS } from "./lessons/BuildingSelfTrustLessons"
import { SETBACKS_WITHOUT_SPIRAL_LESSON_DEFINITIONS } from "./lessons/SetbacksWithoutSpiralLessons"
import { PERSONAL_PLAYBOOK_LESSON_DEFINITIONS } from "./lessons/PersonalPlaybookLessons"
import { NEW_RELATIONSHIP_WITH_MIND_LESSON_DEFINITIONS } from "./lessons/NewRelationshipWithMindLessons"

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
  ...ATTENTION_SKILLS_LESSON_DEFINITIONS,
  ...EMOTION_SURFING_LESSON_DEFINITIONS,
  ...ANXIETY_ABOUT_ANXIETY_LESSON_DEFINITIONS,
  ...ACCEPTANCE_VS_RESIGNATION_LESSON_DEFINITIONS,
  ...SELF_TALK_LESSON_DEFINITIONS,
  ...AVOIDANCE_AND_ANXIETY_LOOP_LESSON_DEFINITIONS,
  ...EXPOSURE_EXPLAINED_LESSON_DEFINITIONS,
  ...VALUES_OVER_COMFORT_LESSON_DEFINITIONS,
  ...BUILDING_SELF_TRUST_LESSON_DEFINITIONS,
  ...SETBACKS_WITHOUT_SPIRAL_LESSON_DEFINITIONS,
  ...PERSONAL_PLAYBOOK_LESSON_DEFINITIONS,
  ...NEW_RELATIONSHIP_WITH_MIND_LESSON_DEFINITIONS,
}
