import { ComponentType } from "react"
import { IconProps } from "phosphor-react-native"
import { ModuleId } from "@/types/lessons/ModuleId"
import {
  Brain,
  Heartbeat,
  Scales,
  ChartLine,
  Ladder,
  Lightning,
  Shield,
  Pulse,
  Eye,
  Waves,
  CircleDashed,
  Handshake,
  ChatCircle,
  ArrowCircleLeft,
  DoorOpen,
  Star,
  ShieldCheck,
  ArrowBendUpRight,
  BookOpen,
  Lightbulb,
  Warning,
  WarningCircle,
} from "phosphor-react-native"

/**
 * Mapping of module IDs to their corresponding Phosphor icons
 */
export const MODULE_ICONS: Record<ModuleId, ComponentType<IconProps>> = {
  // Phase 1: Foundations
  what_anxiety_is: Brain,
  nervous_system_101: Heartbeat,
  anxiety_vs_panic: Scales,
  mood_vs_emotion_vs_state: ChartLine,
  // Phase 2: Awareness
  anxiety_escalation_ladder: Ladder,
  triggers: Lightning,
  safety_behaviors: Shield,
  // Phase 3: Regulation
  body_first_regulation: Pulse,
  attention_skills: Eye,
  emotion_surfing: Waves,
  // Phase 4: Relationship
  anxiety_about_anxiety: CircleDashed,
  acceptance_vs_resignation: Handshake,
  self_talk: ChatCircle,
  // Phase 5: Action
  avoidance_and_anxiety_loop: ArrowCircleLeft,
  exposure_explained: DoorOpen,
  values_over_comfort: Star,
  // Phase 6: Integration
  building_self_trust: ShieldCheck,
  setbacks_without_spiral: ArrowBendUpRight,
  personal_playbook: BookOpen,
  new_relationship_with_mind: Lightbulb,
  // On-demand help modules (not part of curriculum)
  im_anxious: Warning,
  im_having_a_panic_attack: WarningCircle,
}
