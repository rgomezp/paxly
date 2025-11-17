import { ModuleId } from "@/types/lessons/ModuleId"

/**
 * Display names for lesson modules/categories
 */
export const MODULE_DISPLAY_NAMES: Record<ModuleId, string> = {
  stabilize: "Stabilize",
  body_downshift: "Body Downshift",
  cognitive_aid: "Cognitive Aid",
  attachment: "Attachment",
  no_contact: "No Contact",
  identity: "Identity",
  narrative: "Narrative",
  boundaries: "Boundaries",
  joy_competence: "Joy & Competence",
  dating_ready: "Dating Ready",
  maintenance: "Maintenance",
  mini_interventions: "Mini Interventions",
  special_cases: "Special Cases",
}

/**
 * Order in which modules should appear in the lessons screen
 * Ordered by science-backed breakup recovery stages:
 * 1. Crisis Management (immediate stabilization)
 * 2. Safety & Boundaries (establishing no-contact)
 * 3. Understanding (attachment patterns, identity)
 * 4. Rebuilding (narrative, boundaries)
 * 5. Growth (joy, dating readiness)
 * 6. Ongoing Support (maintenance, quick tools, special cases)
 */
export const MODULE_ORDER: ModuleId[] = [
  // Phase 1: Crisis Management (Days 1-7)
  "no_contact", // Critical early - establish safety
  "stabilize", // Immediate crisis intervention
  "body_downshift", // Physical regulation
  "cognitive_aid", // Mental/thought management

  // Phase 2: Understanding (Week 2-4)
  "attachment", // Understanding attachment patterns
  "identity", // Rebuilding sense of self

  // Phase 3: Rebuilding (Month 2-3)
  "narrative", // Reframing the story
  "boundaries", // Setting healthy boundaries

  // Phase 4: Growth (Month 3+)
  "joy_competence", // Finding joy and rebuilding competence
  "dating_ready", // Only when ready

  // Phase 5: Ongoing Support
  "maintenance", // Ongoing work

  // Not part of any phase for daily lesson selection, but a module
  "special_cases", // Specific situations
]

// used for daily lesson selection
export const MODULE_PHASES: Record<Exclude<ModuleId, "special_cases">, number> = {
  no_contact: 1,
  stabilize: 1,
  body_downshift: 1,
  cognitive_aid: 1,
  attachment: 2,
  identity: 2,
  narrative: 3,
  boundaries: 3,
  joy_competence: 4,
  dating_ready: 4,
  maintenance: 5,
  mini_interventions: 5,
}
