import MigrationManager from "./MigrationManager"
import { ganon } from "@/services/ganon/ganon"
import { AnxietyDurationChoices } from "@/types/WhoEndedIt"

const addMigration = (
  version: string,
  name: string,
  migration: (data?: unknown) => Promise<void>,
) => {
  MigrationManager.getInstance().addMigration(version, name, migration)
}

const MIGRATIONS: (() => void)[] = [
  () =>
    addMigration("1.0.0", "Add migration", async () => {
      // No-op migration
    }),
  () =>
    addMigration("1.0.3", "2026_03_10_rename_anxiety_duration_enum", async () => {
      const current = ganon.get("anxietyDuration") as string | null | undefined
      if (!current) {
        return
      }

      let mapped: AnxietyDurationChoices | null = null

      switch (current) {
        case "me":
          mapped = AnxietyDurationChoices.LESS_THAN_6_MONTHS
          break
        case "them":
          mapped = AnxietyDurationChoices.SIX_MONTHS_TO_TWO_YEARS
          break
        case "mutual":
          mapped = AnxietyDurationChoices.MORE_THAN_TWO_YEARS
          break
        default: {
          const validValues = Object.values(AnxietyDurationChoices)
          if (validValues.includes(current as AnxietyDurationChoices)) {
            mapped = current as AnxietyDurationChoices
          }
        }
      }

      if (mapped) {
        ganon.set("anxietyDuration", mapped)
      }
    }),
]

export default MIGRATIONS
