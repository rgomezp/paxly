import { ModuleId } from "@/types/lessons/ModuleId"

/**
 * Display names for lesson modules/categories
 */
export const MODULE_DISPLAY_NAMES: Record<ModuleId, string> = {
  mini_interventions: "Mini Interventions",
}

/**
 * Order in which modules should appear in the lessons screen
 */
export const MODULE_ORDER: ModuleId[] = [
  "mini_interventions",
]

// used for daily lesson selection
export const MODULE_PHASES: Record<ModuleId, number> = {
  mini_interventions: 1,
}
