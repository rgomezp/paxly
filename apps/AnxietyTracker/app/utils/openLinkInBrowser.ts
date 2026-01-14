import { Linking, Platform } from "react-native"
import Log from "@/utils/Log"

/**
 * Helper for opening a given URL in an external browser or appropriate app.
 * Handles mailto: links, https: links, and other URL schemes.
 */
export async function openLinkInBrowser(url: string) {
  try {
    const canOpen = await Linking.canOpenURL(url)
    if (canOpen) {
      Log.info(`openLinkInBrowser: Opening URL (canOpen=true)`, { url })
      await Linking.openURL(url)
    } else {
      Log.warn(`openLinkInBrowser: canOpenURL returned false, attempting anyway`, { url })
      // Try opening anyway for certain URL types as canOpenURL might be overly restrictive
      const shouldTryAnyway = 
        url.startsWith("mailto:") ||
        url.includes("apps.apple.com") ||
        url.includes("play.google.com") ||
        url.startsWith("https://") ||
        url.startsWith("http://")
      
      if (shouldTryAnyway) {
        try {
          await Linking.openURL(url)
          Log.info(`openLinkInBrowser: Successfully opened URL despite canOpenURL=false`, { url })
        } catch (error) {
          Log.error(`openLinkInBrowser: Failed to open URL: ${error}`, { url })
          throw error
        }
      } else {
        Log.error(`openLinkInBrowser: Cannot open URL and no fallback available`, { url })
      }
    }
  } catch (error) {
    Log.error(`openLinkInBrowser: Error opening URL ${url}: ${error}`)
    throw error
  }
}
