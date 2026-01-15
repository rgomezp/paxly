import { ILessonConfig } from "@/types/lessons/ILessonConfig"
import { STABILIZE_LESSONS } from "./StabilizeLessons"
import { BODY_DOWNSHIFT_LESSONS } from "./BodyDownshiftLessons"
import { COGNITIVE_AID_LESSONS } from "./CognitiveAidLessons"
import { ATTACHMENT_LESSONS } from "./AttachmentLessons"
import { NO_CONTACT_LESSONS } from "./NoContactLessons"
import { IDENTITY_LESSONS } from "./IdentityLessons"
import { NARRATIVE_LESSONS } from "./NarrativeLessons"
import { BOUNDARIES_LESSONS } from "./BoundariesLessons"
import { JOY_COMPETENCE_LESSONS } from "./JoyCompetenceLessons"
import { DATING_READY_LESSONS } from "./DatingReadyLessons"
import { MAINTENANCE_LESSONS } from "./MaintenanceLessons"
import { IM_HAVING_A_PANIC_ATTACK_LESSON_DEFINITIONS } from "./ImHavingAPanicAttackLessons"
import { SPECIAL_CASES_LESSONS } from "./SpecialCasesLessons"

/**
 * Registry of all daily lessons (accessible via the daily lesson system).
 * Urge lessons are handled separately and accessed via the panic button.
 */
export const LESSONS: Record<string, ILessonConfig> = {
  // Module lessons organized by recovery phase
  ...STABILIZE_LESSONS,
  ...BODY_DOWNSHIFT_LESSONS,
  ...COGNITIVE_AID_LESSONS,
  ...ATTACHMENT_LESSONS,
  ...NO_CONTACT_LESSONS,
  ...IDENTITY_LESSONS,
  ...NARRATIVE_LESSONS,
  ...BOUNDARIES_LESSONS,
  ...JOY_COMPETENCE_LESSONS,
  ...DATING_READY_LESSONS,
  ...MAINTENANCE_LESSONS,
  ...IM_HAVING_A_PANIC_ATTACK_LESSON_DEFINITIONS,
  ...SPECIAL_CASES_LESSONS,
}
