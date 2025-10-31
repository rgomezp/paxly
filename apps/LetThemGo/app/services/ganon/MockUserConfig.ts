import type { FirebaseAuthTypes } from "@react-native-firebase/auth"
import Log from "@/utils/Log"

/**
 * Centralized configuration for mock user authentication
 * This allows us to use a single file to configure mock user behavior
 *
 * IMPORTANT: Mock users are for testing/development only and should NOT make
 * real API calls that require authentication. TokenManager is disabled when
 * mock user mode is enabled to prevent accidental production API calls.
 */

export interface MockUserConfig {
  /** Whether to use mock user authentication */
  enabled: boolean
  /** The mock user object */
  user: Partial<FirebaseAuthTypes.User>
}

/**
 * Default mock user configuration
 * Set enabled to true to use mock user, false to use real authentication
 */
export const MOCK_USER_CONFIG: MockUserConfig = {
  enabled: false,
  user: {
    uid: "mockUid",
    email: "user@example.com",
  },
}

/**
 * Helper function to check if mock user is enabled
 */
export const isMockUserEnabled = (): boolean => {
  return MOCK_USER_CONFIG.enabled
}

/**
 * Helper function to get the mock user object
 */
export const getMockUser = (): Partial<FirebaseAuthTypes.User> => {
  return MOCK_USER_CONFIG.user
}

/**
 * Helper function to enable mock user mode
 */
export const enableMockUser = (): void => {
  MOCK_USER_CONFIG.enabled = true
  Log.info("✅ Mock user mode enabled - ganon will be in readonly mode")
}

/**
 * Helper function to disable mock user mode
 */
export const disableMockUser = (): void => {
  MOCK_USER_CONFIG.enabled = false
  Log.info("✅ Mock user mode disabled - ganon will allow read/write operations")
}
