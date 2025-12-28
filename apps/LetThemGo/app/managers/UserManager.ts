import { OneSignal } from "react-native-onesignal"
import { ganon } from "@/services/ganon/ganon"
import IUser from "@/types/IUser"
import Log from "@/utils/Log"

export default class UserManager {
  static upsertUser(user: Partial<IUser>) {
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

  static setUser(user: IUser) {
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

  static getUser(): IUser | undefined {
    return ganon.get("user")
  }

  static setFirstName(firstName: string) {
    const user = UserManager.getUser()
    if (user) {
      user.first = firstName
      UserManager.setUser(user)
    }
  }

  static setLastName(lastName: string) {
    const user = UserManager.getUser()
    if (user) {
      user.last = lastName
      UserManager.setUser(user)
    }
  }

  static setNickname(nickname: string) {
    const existingUser = UserManager.getUser()
    if (existingUser) {
      existingUser.nickname = nickname
      UserManager.setUser(existingUser)
      return
    }
    // If no user exists yet, create or merge a minimal user with the nickname
    UserManager.upsertUser({ nickname })
  }
}
