import { GoogleSignin } from "@react-native-google-signin/google-signin"
import {
  getAuth,
  GoogleAuthProvider,
  AppleAuthProvider,
  signInWithCredential,
  signOut,
  onAuthStateChanged,
} from "@react-native-firebase/auth"
import type { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { Alert, Platform } from "react-native"
import * as AppleAuthentication from "expo-apple-authentication"
import Log from "../utils/Log"
import LoginError, { LoginErrors } from "../utils/errors/LoginErrors"
import { OneSignal } from "react-native-onesignal"
import Purchases from "react-native-purchases"
import Subscribable from "@/scaffolding/Subscribable"
import { ganon } from "@/services/ganon/ganon"
import MigrationManager from "@/migrations/MigrationManager"
import UserManager from "./UserManager"
import { EventRegister } from "@/utils/EventEmitter"
import { GLOBAL_EVENTS, TEST_EVENTS } from "@/constants/events"
import DataInitializationManager from "./DataInitializationManager"
import { ensureRevenueCatConfigured } from "@/thirdParty/revenueCatUtils"

export default class LoginManager extends Subscribable<FirebaseAuthTypes.User | null> {
  private static instance: LoginManager | null = null
  private user: FirebaseAuthTypes.User | null = getAuth().currentUser

  private constructor() {
    super()

    // Configure Google Sign in
    const iosClientId = process.env.EXPO_PUBLIC_IOS_CLIENT_ID
    // webClientId should ALWAYS be the Firebase Web client ID for Firebase Auth
    // On iOS, iosClientId is used for the iOS OAuth client, but webClientId is still needed for Firebase
    const webClientId = process.env.EXPO_PUBLIC_FIREBASE_WEB_CLIENT_ID

    const missingVars = []
    if (Platform.OS === "ios" && !iosClientId) {
      missingVars.push("EXPO_PUBLIC_IOS_CLIENT_ID")
    }
    if (!webClientId) {
      missingVars.push("EXPO_PUBLIC_FIREBASE_WEB_CLIENT_ID")
    }

    if (missingVars.length > 0) {
      const errorMessage = `LoginManager: Missing required environment variables: ${missingVars.join(", ")}`
      Log.error(errorMessage)
      // Don't configure if critical vars are missing
      return
    }

    try {
      GoogleSignin.configure({
        iosClientId: Platform.OS === "ios" ? iosClientId : undefined,
        webClientId,
      })
      Log.info("LoginManager: GoogleSignin configured successfully")
    } catch (error) {
      Log.error(`LoginManager: Failed to configure GoogleSignin: ${error}`)
    }
  }

  static getInstance(): LoginManager {
    if (!this.instance) {
      this.instance = new LoginManager()
    }
    return this.instance
  }

  static resetInstance(): void {
    this.instance = null
  }

  /* F I R E B A S E */
  setupAuthListener(): () => void {
    Log.info("LoginManager: setting up onAuthStateChanged")
    this._setupAuthStateChangedListenerForTesting(this.onAuthStateChanged)
    return onAuthStateChanged(getAuth(), this.onAuthStateChanged)
  }

  /**
   * Auth state changed listener
   * @param user - user object
   * @param override - whether to override the current user
   * @returns
   */
  onAuthStateChanged = async (user: FirebaseAuthTypes.User | null, override?: boolean) => {
    Log.info(`LoginManager: onAuthStateChanged: ${JSON.stringify(user)}`)
    // Wait for migrations to complete
    if (MigrationManager.getInstance().isRunningMigrations()) {
      Log.info("LoginManager: onAuthStateChanged: migrations are running")
      await MigrationManager.getInstance().waitForMigrations()
    }

    // identify the user in 3rd party services
    if (user?.email) {
      OneSignal.login(user.email)
      OneSignal.User.addEmail(user.email)
      OneSignal.User.removeTag("onboard_no_login")
      const onesignalId = await OneSignal.User.getOnesignalId()

      // Ensure RevenueCat is configured before calling its methods
      try {
        await ensureRevenueCatConfigured()
        Purchases.setEmail(user.email)
        Purchases.setOnesignalID(onesignalId)
      } catch (error) {
        Log.error(`Error configuring RevenueCat in LoginManager: ${error}`)
        // Continue with login process even if RevenueCat fails
      }
    }

    // If user is already logged in, do nothing. `user` being truthy intends to log in the user (again)
    const loggedIn = this.isLoggedIn()
    if (loggedIn && user && !override) {
      Log.info("LoginManager: onAuthStateChanged: user is already logged in")
      OneSignal.User.removeTag("onboard_no_login")
      this.broadcast(user) // Always broadcast the user state
      return
    }

    // save email to async storage
    if (user?.email) {
      ganon.set("email", user.email)
      this.user = user
      await ganon.restore()
      await DataInitializationManager.initializeData()
      EventRegister.emit(GLOBAL_EVENTS.UPDATE_ALL)

      // Logged in
      Log.info("LoginManager: onAuthStateChanged: user is logged in")
    } else {
      Log.info("LoginManager: onAuthStateChanged: user.email is null")
      this.user = user
    }

    EventRegister.emit(GLOBAL_EVENTS.AUTH_STATE_CHANGED_FINISHED)
    this.broadcast(user)
  }

  /* G O O G L E */

  async loginGoogle() {
    Log.info("LoginManager: loginGoogle()")
    try {
      // Check if your device supports Google Play (Android only)
      if (Platform.OS === "android") {
        Log.info("LoginManager: Checking Play Services...")
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
        Log.info("LoginManager: Play Services check passed")
      }

      // Ensure we're signed out first (sometimes helps with hanging issues)
      try {
        const currentUser = await GoogleSignin.getCurrentUser()
        if (currentUser) {
          Log.info("LoginManager: Already signed in to Google, signing out first")
          await GoogleSignin.signOut()
        }
      } catch {
        // Ignore errors from getCurrentUser/signOut - might not be signed in
        Log.info("LoginManager: No existing Google session")
      }

      // Get the users ID token with timeout protection
      Log.info("LoginManager: Initiating Google Sign In...")
      const signInPromise = GoogleSignin.signIn()

      // Add a timeout wrapper (15 seconds)
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(
            new Error(
              "Google Sign-In timeout: The sign-in process took too long. Please check your configuration.",
            ),
          )
        }, 30000)
      })

      const { type, data } = await Promise.race([signInPromise, timeoutPromise])
      Log.info("LoginManager: Google Sign In completed")
      Log.info(`LoginManager: User info received: ${JSON.stringify({ type, data })}`)

      if (type === "cancelled") {
        Log.info("LoginManager: Google Sign In was cancelled by user")
        throw new LoginError(LoginErrors.LoginCancelled)
      }

      if (type !== "success" || !data.idToken) {
        Log.error("LoginManager: No ID token received from Google Sign In")
        Alert.alert("Google Sign-In failed")
        throw new Error("Google Sign-In failed")
      }

      // save user info
      if (data.user) {
        Log.info("LoginManager: Saving user info...")
        UserManager.setUser({
          first: data.user.givenName,
          last: data.user.familyName,
          photoUrl: data.user.photo,
        })
        Log.info("LoginManager: User info saved")
      }

      const credential = GoogleAuthProvider.credential(data.idToken)
      if (credential.token) {
        Log.info("LoginManager: Signing in with Firebase credential...")
        await signInWithCredential(getAuth(), credential)
        Log.info("LoginManager: Firebase sign in complete")
      } else {
        Log.error("LoginManager: No token in credential")
        Alert.alert("Google Sign-In failed")
        throw new Error("Google Sign-In failed")
      }
    } catch (error: any) {
      if (error.code && error.code === 12501) {
        throw new LoginError(LoginErrors.LoginCancelled)
      }
      throw error
    }
  }

  /* A P P L E */

  async loginApple(): Promise<void> {
    Log.info("LoginManager: loginApple()")

    try {
      // Apple Sign-In is iOS only
      if (Platform.OS !== "ios") {
        const error = "Apple Sign-In is only available on iOS"
        Log.error(`LoginManager: ${error}`)
        throw new Error(error)
      }
      // Check if Apple Sign-In is available on this device
      Log.info("LoginManager: Checking Apple Sign-In availability...")
      const isAvailable = await AppleAuthentication.isAvailableAsync()
      if (!isAvailable) {
        const error = "Apple Sign-In is not available on this device"
        Log.error(`LoginManager: ${error}`)
        Alert.alert("Apple Sign-In not available", "Apple Sign-In is not available on this device.")
        throw new Error(error)
      }
      Log.info("LoginManager: Apple Sign-In is available")

      // no user info is returned as plaintext here. need to use authStateChanged which parses JWT data
      Log.info("LoginManager: Initiating Apple Sign In...")
      const signInPromise = AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })

      // Add a timeout wrapper (15 seconds)
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(
            new Error(
              "Apple Sign-In timeout: The sign-in process took too long. Please check your configuration.",
            ),
          )
        }, 30000)
      })

      const {
        identityToken: jwtToken,
        state,
        fullName,
      } = await Promise.race([signInPromise, timeoutPromise])

      Log.info("LoginManager: Apple Sign In completed")
      Log.info(
        `LoginManager: loginApple(): jwtToken: ${jwtToken ? "present" : "missing"}, state: ${state || "none"}`,
      )

      if (!jwtToken) {
        const error = "No identity token received from Apple Sign-In"
        Log.error(`LoginManager: ${error}`)
        Alert.alert("Apple Sign-In failed", "No identity token received.")
        throw new Error(error)
      }

      // store user info in async storage
      if (fullName) {
        Log.info("LoginManager: Saving user info...")
        UserManager.setUser({
          first: fullName.givenName,
          last: fullName.familyName,
        })
        Log.info("LoginManager: User info saved")
      }

      Log.info("LoginManager: Creating Firebase credential...")
      const credential = AppleAuthProvider.credential(jwtToken, state || "")

      Log.info("LoginManager: Signing in with Firebase credential...")
      await signInWithCredential(getAuth(), credential)
      Log.info("LoginManager: Firebase sign in complete")
    } catch (e: any) {
      if (e.code === "ERR_REQUEST_CANCELED") {
        Log.info("LoginManager: Apple Sign In was cancelled by user")
        throw new LoginError(LoginErrors.LoginCancelled)
      }
      Log.error(`LoginManager: Apple Sign-In error: ${e.message || e}`)
      throw e
    }
  }

  // for easier spying. DON'T MODIFY
  async appleSignInAsync(
    options: AppleAuthentication.AppleAuthenticationSignInOptions | undefined,
  ): Promise<AppleAuthentication.AppleAuthenticationCredential> {
    return AppleAuthentication.signInAsync(options)
  }

  /* G E N E R A L */

  /**
   * Logout the user
   * @param backup - whether to backup data to Firestore before logging out
   * @param retryWithoutGoogleSignin - https://github.com/react-native-google-signin/google-signin/issues/571
   */
  async logout(backup: boolean = true, retryWithoutGoogleSignin: number = 0) {
    Log.info("LoginManager: logout()")
    try {
      if (backup) {
        await ganon.backup()
      }
      // No current way of knowing which provider we have, so we sign out of Google just in case
      // Check if the user is signed in to Google
      const currentUser = GoogleSignin.getCurrentUser()
      const isGoogleSignedIn = currentUser !== null
      if (isGoogleSignedIn && retryWithoutGoogleSignin === 0) {
        // Revoke Google access if the user is signed in
        await GoogleSignin.revokeAccess()
        await GoogleSignin.signOut()
      }
      await signOut(getAuth())
      OneSignal.logout()
      ganon.clearAllData()
      await DataInitializationManager.initializeData()
      EventRegister.emit(GLOBAL_EVENTS.UPDATE_ALL)
    } catch (error) {
      if (retryWithoutGoogleSignin === 0) {
        Log.error("LoginManager: logout(): retrying without Google Sign-In")
        await this.logout(backup, 1)
      } else {
        Alert.alert("Logout", "Something went wrong. Please try again. " + JSON.stringify(error), [
          { text: "OK" },
        ])
      }
      Log.error(JSON.stringify(error))
    } finally {
      if (process.env.NODE_ENV === "test") {
        EventRegister.emit(TEST_EVENTS.AUTH_STATE_CHANGED, null)
      }
    }
  }

  isLoggedIn(): boolean {
    const email = ganon.get("email")
    Log.info(`LoginManager: isLoggedIn(): email: ${email}, user: ${this.user ? "exists" : "null"}`)
    return this.user != null && email != null
  }

  _setupAuthStateChangedListenerForTesting(
    onAuthStateChanged: (user: FirebaseAuthTypes.User | null) => void,
  ) {
    if (process.env.NODE_ENV === "test") {
      EventRegister.on(TEST_EVENTS.AUTH_STATE_CHANGED, onAuthStateChanged)
    }
  }
}
