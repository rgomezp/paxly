import MigrationManager from "./MigrationManager"

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
      console.log("Migration 1.0.0")
    }),
]

export default MIGRATIONS
