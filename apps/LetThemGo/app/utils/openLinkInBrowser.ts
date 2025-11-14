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
      await Linking.openURL(url)
    } else {
      Log.warn(`Cannot open URL: ${url}`)
      // On Android, try opening anyway for mailto: links as canOpenURL might be overly restrictive
      if (Platform.OS === "android" && url.startsWith("mailto:")) {
        try {
          await Linking.openURL(url)
        } catch (error) {
          Log.error(`Failed to open mailto link: ${error}`)
        }
      }
    }
  } catch (error) {
    Log.error(`Error opening URL ${url}: ${error}`)
  }
}
