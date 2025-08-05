import { MigrationDirector } from "@/migrations"

export default class DataInitializationManager {
  static async initializeData() {
    await MigrationDirector.runMigrations()
  }
}
