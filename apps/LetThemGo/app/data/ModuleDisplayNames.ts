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
  "stabilize", // Immediate crisis intervention
  "body_downshift", // Physical regulation
  "cognitive_aid", // Mental/thought management

  // Phase 2: Safety & Boundaries (Week 1-2)
  "no_contact", // Critical early - establish safety

  // Phase 3: Understanding (Week 2-4)
  "attachment", // Understanding attachment patterns
  "identity", // Rebuilding sense of self

  // Phase 4: Rebuilding (Month 2-3)
  "narrative", // Reframing the story
  "boundaries", // Setting healthy boundaries

  // Phase 5: Growth (Month 3+)
  "joy_competence", // Finding joy and rebuilding competence
  "dating_ready", // Only when ready

  // Phase 6: Ongoing Support
  "maintenance", // Ongoing work
  "special_cases", // Specific situations
]
