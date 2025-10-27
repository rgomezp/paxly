import type { FirebaseAuthTypes } from "@react-native-firebase/auth"
import LoginManager from "./LoginManager"
import Subscribable from "@/scaffolding/Subscribable"
import Log from "../utils/Log"
import { getAuth } from "@react-native-firebase/auth"
import { jwtDecode } from "jwt-decode"
import { isMockUserEnabled } from "@/services/ganon/MockUserConfig"

interface JwtPayload {
  exp: number
  iat: number
  sub: string
  iss: string
  aud: string
}

export default class TokenManager extends Subscribable<string | null> {
  private static instance: TokenManager | null = null
  private user: FirebaseAuthTypes.User | null = null
  private unsubscribeFromLogin: (() => void) | null = null
  private tokenRefreshPromise: Promise<string | null> | null = null
  private tokenExpirationTime: number = 0
  private lastTokenRefresh: number = 0
  private lastToken: string | null = null
  private lastTokenTime: number = 0

  // Constants
  private static readonly TOKEN_BUFFER_TIME = 5 * 60 * 1000 // 5 minutes buffer
  private static readonly MAX_RETRIES = 3
  private static readonly MIN_REFRESH_INTERVAL = 60 * 1000 // 1 minute minimum between refreshes
  private static readonly TOKEN_CACHE_WINDOW = 1000 // 1 second cache window

  private constructor() {
    super()
    this.unsubscribeFromLogin = LoginManager.getInstance().subscribe(this._handleUserChange)
    const currentUser = getAuth().currentUser
    if (currentUser) {
      Log.info("TokenManager: Initial user state found")
      this._handleUserChange(currentUser)
    }
  }

  static getInstance(): TokenManager {
    if (!this.instance) {
      this.instance = new TokenManager()
    }
    return this.instance
  }

  static resetInstance(): void {
    if (this.instance) {
      this.instance.cleanup()
      this.instance = null
    }
  }

  private cleanup(): void {
    this.unsubscribeFromLogin?.()
    this.unsubscribeFromLogin = null
    this.invalidateToken()
  }

  /**
   * Invalidates the current token and forces a refresh on next getToken call
   */
  invalidateToken(): void {
    this.tokenExpirationTime = 0
    this.tokenRefreshPromise = null
    this.lastTokenRefresh = 0
    this.lastToken = null
    this.lastTokenTime = 0
    this.broadcast(null)
  }

  /**
   * Gets a valid JWT token for the current user, refreshing if necessary
   * @returns Promise<string | null> - The JWT token if user is logged in, null otherwise
   */
  async getToken(): Promise<string | null> {
    if (!this.user) {
      Log.info("TokenManager: No user logged in - authentication required")
      return null
    }

    // MOCK USER MODE: Disable token functionality entirely
    // When using mock users, we shouldn't make real API calls that require authentication
    // Mock users are for testing/development and shouldn't interact with production services
    if (isMockUserEnabled()) {
      Log.info(
        "TokenManager: Mock user mode enabled - token functionality disabled (expected behavior)",
      )
      Log.info("TokenManager: Mock users should not make real API calls requiring authentication")
      return null
    }

    // Check short-lived cache first
    const now = Date.now()
    if (
      this.lastToken &&
      this.lastTokenTime > 0 &&
      now - this.lastTokenTime < TokenManager.TOKEN_CACHE_WINDOW
    ) {
      Log.info("TokenManager: Using cached token (within 1s window)")
      return this.lastToken
    }

    try {
      // If we have an ongoing token refresh, wait for it
      if (this.tokenRefreshPromise) {
        Log.info("TokenManager: Waiting for ongoing token refresh")
        try {
          const token = await this.tokenRefreshPromise
          // Even if we got a token from the refresh, validate it again
          // This handles the race condition where token expires between refresh and return
          if (token && this._validateToken(token)) {
            this._updateTokenCache(token)
            return token
          }
        } catch (error) {
          Log.error(`TokenManager: Ongoing refresh failed: ${error}`)
          // Clear the failed refresh promise
          this.tokenRefreshPromise = null
          // Check if it's an expiration error
          const isExpired =
            error instanceof Error &&
            (error.message.includes("expired") || error.message.includes("Expired"))
          this._handleTokenError(error as Error, isExpired)
        }
      }

      // Check if we need to refresh the token
      if (!this._isTokenStillValid() || this._shouldRefreshToken()) {
        Log.info("TokenManager: Token needs refresh")
        this.tokenRefreshPromise = this._refreshTokenWithRetry()

        try {
          const newToken = await this.tokenRefreshPromise
          if (!newToken) {
            throw new Error("Failed to refresh token after all retries")
          }

          if (!this._validateToken(newToken)) {
            throw new Error("Refreshed token failed validation")
          }

          this._updateTokenState(newToken)
          this._updateTokenCache(newToken)
          this.broadcast(newToken)
          return newToken
        } catch (error) {
          Log.error(`TokenManager: Token refresh failed: ${error}`)
          const isExpired =
            error instanceof Error &&
            (error.message.includes("expired") || error.message.includes("Expired"))
          this._handleTokenError(error as Error, isExpired)
          throw error
        } finally {
          this.tokenRefreshPromise = null
        }
      }

      // If we have a valid token, get a fresh one without forcing refresh
      const currentUser = this.user // Capture user reference
      if (!currentUser) {
        throw new Error("User became null during token refresh")
      }

      const token = await currentUser.getIdToken(false)
      if (!this._validateToken(token)) {
        throw new Error("Current token failed validation")
      }

      this._updateTokenState(token)
      this._updateTokenCache(token)
      this.broadcast(token)
      return token
    } catch (error) {
      Log.error(`TokenManager: Error getting token: ${error}`)
      const isExpired =
        error instanceof Error &&
        (error.message.includes("expired") || error.message.includes("Expired"))
      this._handleTokenError(error as Error, isExpired)
      return null
    }
  }

  /**
   * Updates the token state including expiration and refresh time
   */
  private _updateTokenState(token: string): void {
    try {
      const decoded = this._decodeToken(token)
      this.tokenExpirationTime = decoded.exp * 1000
      this.lastTokenRefresh = Date.now()
    } catch (error) {
      Log.error(`TokenManager: Error updating token state: ${error}`)
      this.invalidateToken()
    }
  }

  /**
   * Decodes and validates a JWT token
   */
  private _validateToken(token: string): boolean {
    try {
      const decoded = this._decodeToken(token)

      // Validate required claims
      if (!decoded.exp || !decoded.iat || !decoded.sub || !decoded.iss || !decoded.aud) {
        Log.error("TokenManager: Token missing required claims")
        this._handleTokenError(new Error("Token missing required claims"), false)
        return false
      }

      // Validate expiration
      const expirationTime = decoded.exp * 1000
      const currentTime = Date.now()

      if (expirationTime <= currentTime) {
        Log.info("TokenManager: Token has expired")
        this._handleTokenError(new Error("Token expired"), true)
        return false
      }

      // Check if token expires within the buffer time
      if (expirationTime <= currentTime + TokenManager.TOKEN_BUFFER_TIME) {
        Log.info("TokenManager: Token expires soon, will need refresh")
        return false
      }

      return true
    } catch (error) {
      Log.error(`TokenManager: Token validation failed: ${error}`)
      // If it's a JWT decode error, it's likely malformed
      const isExpired =
        error instanceof Error &&
        (error.message.includes("expired") || error.message.includes("Expired"))
      this._handleTokenError(error as Error, isExpired)
      return false
    }
  }

  /**
   * Decodes a JWT token with type safety
   */
  private _decodeToken(token: string): JwtPayload {
    try {
      return jwtDecode<JwtPayload>(token)
    } catch (error) {
      Log.error(`TokenManager: Error decoding token: ${error}`)
      throw new Error("Invalid token format")
    }
  }

  /**
   * Checks if the current token is still valid at the current time
   */
  private _isTokenStillValid(): boolean {
    const currentTime = Date.now()
    return this.tokenExpirationTime > currentTime + TokenManager.TOKEN_BUFFER_TIME
  }

  /**
   * Determines if we should refresh the token based on time since last refresh
   */
  private _shouldRefreshToken(): boolean {
    return Date.now() - this.lastTokenRefresh > TokenManager.MIN_REFRESH_INTERVAL
  }

  /**
   * Attempts to refresh the token with retry logic and exponential backoff
   */
  private async _refreshTokenWithRetry(
    retries: number = TokenManager.MAX_RETRIES,
  ): Promise<string | null> {
    if (!this.user) return null

    let lastError: Error | null = null

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        Log.info(`TokenManager: Token refresh attempt ${attempt}/${retries}`)
        const currentUser = this.user // Capture user reference
        if (!currentUser) {
          throw new Error("User became null during token refresh")
        }

        const token = await currentUser.getIdToken(true) // Force refresh

        if (!token) {
          throw new Error("Firebase returned null token")
        }

        if (!this._validateToken(token)) {
          // _validateToken will handle the error appropriately
          throw new Error("Refreshed token failed validation")
        }

        Log.info("TokenManager: Token refresh successful")
        return token
      } catch (error) {
        lastError = error as Error
        Log.error(`TokenManager: Token refresh attempt ${attempt} failed: ${error}`)

        // Check if it's an expiration error
        const isExpired =
          error instanceof Error &&
          (error.message.includes("expired") || error.message.includes("Expired"))

        // For expired tokens, we can retry immediately
        // For other errors, use exponential backoff
        if (attempt < retries) {
          const delay = isExpired ? 0 : Math.pow(2, attempt - 1) * 1000 // 0s for expired, 1s, 2s, 4s for others
          if (delay > 0) {
            Log.info(`TokenManager: Waiting ${delay}ms before retry`)
            await new Promise((resolve) => setTimeout(resolve, delay))
          }
        }
      }
    }

    // If we get here, all retries failed
    const finalError = new Error(
      `Token refresh failed after ${retries} attempts: ${lastError?.message}`,
    )
    const isExpired =
      lastError instanceof Error &&
      (lastError.message.includes("expired") || lastError.message.includes("Expired"))
    this._handleTokenError(finalError, isExpired)
    throw finalError
  }

  /**
   * Updates the short-lived token cache
   */
  private _updateTokenCache(token: string): void {
    this.lastToken = token
    this.lastTokenTime = Date.now()
  }

  /**
   * Handles token errors differently based on whether they're expiration-related
   * or structural issues
   */
  private _handleTokenError(error: Error, isExpired: boolean): void {
    // Clear the token cache on any error
    this.lastToken = null
    this.lastTokenTime = 0

    if (isExpired) {
      // For expired tokens, just clear the expiration time to force a refresh
      Log.info("TokenManager: Token expired, will refresh on next request")
      this.tokenExpirationTime = 0
    } else {
      // For malformed/invalid tokens, do a full invalidation
      Log.error("TokenManager: Token invalid, performing full invalidation")
      this.invalidateToken()
    }
  }

  private _handleUserChange = async (user: FirebaseAuthTypes.User | null) => {
    Log.info(`TokenManager: User changed: ${user ? "logged in" : "logged out"}`)
    this.user = user
    this.invalidateToken()

    // if user is logged in, get token asynchronously
    if (user) {
      // Don't await here to avoid blocking the user change handler
      // The token will be fetched when needed by other services
      this.getToken().catch((error) => {
        Log.error(`TokenManager: Error getting initial token: ${error}`)
      })
    }
  }
}
