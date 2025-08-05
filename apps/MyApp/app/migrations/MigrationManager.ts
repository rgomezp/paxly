import { Singleton } from "@/scaffolding/Singleton"
import { ganon } from "@/services/ganon/ganon"
import Log from "@/utils/Log"

type IMigrations = {
  [version: string]: {
    [name: string]: (data?: any) => Promise<void>
  }
}

/*
// Example migration object
const EXAMPLE: IMigrations = {
  "1.0.0": {
    "2025_01_17_convert_object_to_array": async (data) => {
      // migration logic
    },
    "2025_01_20_delete_array": async (data) => {
      // migration logic
    },
  },
};
*/

export default class MigrationManager extends Singleton {
  private _migrations: IMigrations = {}
  private _migrationPromise: Promise<void> | null = null

  public constructor() {
    super()
  }

  public addMigration<T>(
    version: string,
    name: string,
    migration: (data?: T) => Promise<void>,
  ): void {
    if (!this._migrations[version]) {
      this._migrations[version] = {}
    }
    this._migrations[version][name] = migration
  }

  public newDeviceSkipMigrations(): void {
    const orderedKeys = this._getOrderedMigrationKeys()
    // Ensure latestMigrationKey is not undefined if orderedKeys is empty
    const latestMigrationKey =
      orderedKeys.length > 0 ? orderedKeys[orderedKeys.length - 1] : undefined

    if (latestMigrationKey !== undefined) {
      this._setLastRunMigration(latestMigrationKey)
    } else {
      Log.info(
        "MigrationManager: newDeviceSkipMigrations called with no migrations registered. 'lastRunMigration' will not be set by this operation.",
      )
    }
  }

  public isRunningMigrations(): boolean {
    return this._isMigrationLocked()
  }

  public async waitForMigrations(): Promise<void> {
    if (this._migrationPromise) {
      await this._migrationPromise
    }
  }

  public async runMigrations(): Promise<void> {
    if (this._isMigrationLocked()) {
      // If migrations are already running, wait for them to complete
      await this.waitForMigrations()
      return
    }

    try {
      this._setMigrationLock()
      this._migrationPromise = this._runMigrationsInternal()
      await this._migrationPromise
    } finally {
      this._migrationPromise = null
      this._clearMigrationLock()
    }
  }

  private async _runMigrationsInternal(): Promise<void> {
    const lastRunMigration = this._getLastRunMigration()
    const migrationKeys = this._getOrderedMigrationKeys()

    for (const key of migrationKeys) {
      if (lastRunMigration && key <= lastRunMigration) {
        Log.info(`Skipping migration: ${key}`)
        continue // Skip already-run migrations
      }

      const [version, name] = key.split(":")
      const migration = this._migrations[version]?.[name]
      if (!migration) {
        throw new Error(`Migration ${key} not found.`)
      }

      // Execute the migration
      Log.info(`Running migration: ${key}`)
      await migration()
      this._setLastRunMigration(key)
    }
  }

  public async runIndividualMigration(version: string, name: string): Promise<void> {
    const migration = this._migrations[version]?.[name]
    if (!migration) {
      throw new Error(`Migration ${version}:${name} not found.`)
    }

    await migration()
  }

  private _getLastRunMigration(): string | undefined {
    return ganon.get("lastRunMigration")
  }

  private _setLastRunMigration(migrationKey: string): void {
    Log.info(
      `MigrationManager: _setLastRunMigration(${migrationKey}) with type ${typeof migrationKey}`,
    )
    ganon.set("lastRunMigration", migrationKey)
  }

  private _setMigrationLock(): void {
    ganon.set("migrationLock", true)
  }

  private _clearMigrationLock(): void {
    ganon.remove("migrationLock")
  }

  private _isMigrationLocked(): boolean {
    return !!ganon.get("migrationLock")
  }

  private _getOrderedMigrationKeys(): string[] {
    const migrationKeys: string[] = []
    for (const [version, migrations] of Object.entries(this._migrations)) {
      for (const name of Object.keys(migrations)) {
        migrationKeys.push(`${version}:${name}`)
      }
    }
    return migrationKeys.sort() // Ensure migrations are applied in order
  }
}
