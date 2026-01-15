import { ModuleId } from "@/types/lessons/ModuleId"

/**
 * Display names for lesson modules/categories
 */
export const MODULE_DISPLAY_NAMES: Record<ModuleId, string> = {
  // Phase 1: Foundations
  what_anxiety_is: "What Anxiety Actually Is",
  nervous_system_101: "The Nervous System 101",
  anxiety_vs_panic: "Anxiety vs Panic",
  mood_vs_emotion_vs_state: "Mood vs Emotion vs State",
  // Phase 2: Awareness
  anxiety_escalation_ladder: "The Anxiety Escalation Ladder",
  triggers: "Triggers (Internal vs External)",
  safety_behaviors: "Safety Behaviors",
  // Phase 3: Regulation
  body_first_regulation: "Body-First Regulation",
  attention_skills: "Attention Skills",
  emotion_surfing: "Emotion Surfing",
  // Phase 4: Relationship
  anxiety_about_anxiety: "Anxiety About Anxiety",
  acceptance_vs_resignation: "Acceptance vs Resignation",
  self_talk: "Self-Talk That Helps (and Hurts)",
  // Phase 5: Action
  avoidance_and_anxiety_loop: "Avoidance & the Anxiety Loop",
  exposure_explained: "Exposure Explained (Without Fear)",
  values_over_comfort: "Values Over Comfort",
  // Phase 6: Integration
  building_self_trust: "Building Self-Trust",
  setbacks_without_spiral: "Setbacks Without Spiral",
  personal_playbook: "Your Personal Playbook",
  new_relationship_with_mind: "A New Relationship With Your Mind",
  // On-demand help modules (not part of curriculum)
  im_anxious: "I'm Anxious",
  im_having_a_panic_attack: "I'm Having a Panic Attack",
}

/**
 * Order in which modules should appear in the lessons screen
 */
export const MODULE_ORDER: ModuleId[] = [
  // Phase 1: Foundations
  "what_anxiety_is",
  "nervous_system_101",
  "anxiety_vs_panic",
  "mood_vs_emotion_vs_state",
  // Phase 2: Awareness
  "anxiety_escalation_ladder",
  "triggers",
  "safety_behaviors",
  // Phase 3: Regulation
  "body_first_regulation",
  "attention_skills",
  "emotion_surfing",
  // Phase 4: Relationship
  "anxiety_about_anxiety",
  "acceptance_vs_resignation",
  "self_talk",
  // Phase 5: Action
  "avoidance_and_anxiety_loop",
  "exposure_explained",
  "values_over_comfort",
  // Phase 6: Integration
  "building_self_trust",
  "setbacks_without_spiral",
  "personal_playbook",
  "new_relationship_with_mind",
]

// used for daily lesson selection
// Note: On-demand help modules (im_anxious, im_having_a_panic_attack) are excluded
// from phases as they are not part of the curriculum
export const MODULE_PHASES: Record<ModuleId, number> = {
  // Phase 1: Foundations
  what_anxiety_is: 1,
  nervous_system_101: 1,
  anxiety_vs_panic: 1,
  mood_vs_emotion_vs_state: 1,
  // Phase 2: Awareness
  anxiety_escalation_ladder: 2,
  triggers: 2,
  safety_behaviors: 2,
  // Phase 3: Regulation
  body_first_regulation: 3,
  attention_skills: 3,
  emotion_surfing: 3,
  // Phase 4: Relationship
  anxiety_about_anxiety: 4,
  acceptance_vs_resignation: 4,
  self_talk: 4,
  // Phase 5: Action
  avoidance_and_anxiety_loop: 5,
  exposure_explained: 5,
  values_over_comfort: 5,
  // Phase 6: Integration
  building_self_trust: 6,
  setbacks_without_spiral: 6,
  personal_playbook: 6,
  new_relationship_with_mind: 6,
  // On-demand help modules (not part of curriculum - no phase assigned)
  im_anxious: 0,
  im_having_a_panic_attack: 0,
}
