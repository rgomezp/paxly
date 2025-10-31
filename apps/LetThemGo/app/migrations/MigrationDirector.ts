import { GLOBAL_EVENTS } from "@/constants/events"
import Log from "@/utils/Log"
import { EventRegister } from "@/utils/EventEmitter"
import MigrationManager from "./MigrationManager"
import MIGRATIONS from "./migrations"

export default class MigrationDirector {
  private static didRegisterMigrations = false

  static registerMigrations(): void {
    if (this.didRegisterMigrations) {
      return
    }

    for (const migration of MIGRATIONS) {
      migration()
    }

    this.didRegisterMigrations = true
  }

  static async runMigrations(): Promise<void> {
    Log.info(`MigrationManager: runMigrations()`)

    if (!this.didRegisterMigrations) {
      this.registerMigrations()
    }

    const migrationManager = MigrationManager.getInstance()

    // Then run them
    await migrationManager.runMigrations()
    EventRegister.emit(GLOBAL_EVENTS.UPDATE_ALL)
  }

  static newDeviceSkipMigrations(): void {
    Log.info(`MigrationManager: newDeviceSkipMigrations()`)

    if (!this.didRegisterMigrations) {
      this.registerMigrations()
    }

    const migrationManager = MigrationManager.getInstance()
    migrationManager.newDeviceSkipMigrations()
  }
}
