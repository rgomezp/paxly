export type WhyItDidntWorkSection =
  | "needsNotMet"
  | "valuesDidntAlign"
  | "repeatedConflicts"
  | "thingsIKeptExcusing"
  | "howIFeltMostOfTheTime"

export interface IWhyItDidntWorkReason {
  id: string
  section: WhyItDidntWorkSection
  text: string
  createdAt: number
  isLocked: boolean // Once locked, cannot be edited
}
