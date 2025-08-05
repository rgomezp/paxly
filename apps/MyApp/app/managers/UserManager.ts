import { OneSignal } from "react-native-onesignal"
import { ganon } from "@/services/ganon/ganon"
import IUser from "@/types/IUser"
import Log from "@/utils/Log"

export default class UserManager {
  static async upsertUser(user: Partial<IUser>) {
    Log.info(`UserManager: upsertUser: ${JSON.stringify(user)}`)
    if (!user) {
      return
    }

    if (user.first) {
      OneSignal.User.addTag("first", user.first)
    }

    if (user.last) {
      OneSignal.User.addTag("last", user.last)
    }

    // Save user to async storage
    ganon.upsert("user", user)
  }

  static async setUser(user: IUser) {
    Log.info(`UserManager: setUser: ${JSON.stringify(user)}`)
    if (!user) {
      return
    }

    if (user.first) {
      OneSignal.User.addTag("first", user.first)
    }

    if (user.last) {
      OneSignal.User.addTag("last", user.last)
    }

    // Save user to async storage
    ganon.set("user", user)
  }

  static async getUser(): Promise<IUser | undefined> {
    return ganon.get("user")
  }

  static async setFirstName(firstName: string) {
    const user = await UserManager.getUser()
    if (user) {
      user.first = firstName
      await UserManager.setUser(user)
    }
  }

  static async setLastName(lastName: string) {
    const user = await UserManager.getUser()
    if (user) {
      user.last = lastName
      await UserManager.setUser(user)
    }
  }

  static async setNickname(nickname: string) {
    const user = await UserManager.getUser()
    if (user) {
      user.nickname = nickname
      await UserManager.setUser(user)
    }
  }
}
