import { ComponentType } from "react"
import { IconProps } from "phosphor-react-native"
import {
  ScalesIcon,
  HeartIcon,
  BrainIcon,
  ProhibitIcon,
  HandshakeIcon,
  BookOpenIcon,
  WarningIcon,
  SmileyIcon,
  WrenchIcon,
  QuestionMarkIcon,
  UserIcon,
  SparkleIcon,
  LightningIcon,
} from "phosphor-react-native"
import { ModuleId } from "@/types/lessons/ModuleId"

/**
 * Mapping of module IDs to their corresponding Phosphor icons
 */
export const MODULE_ICONS: Record<ModuleId, ComponentType<IconProps>> = {
  stabilize: ScalesIcon,
  body_downshift: HeartIcon,
  cognitive_aid: BrainIcon,
  attachment: HandshakeIcon,
  no_contact: ProhibitIcon,
  identity: UserIcon,
  narrative: BookOpenIcon,
  boundaries: WarningIcon,
  joy_competence: SmileyIcon,
  dating_ready: SparkleIcon,
  maintenance: WrenchIcon,
  mini_interventions: LightningIcon,
  special_cases: QuestionMarkIcon,
}
