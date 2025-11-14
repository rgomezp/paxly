import { ConfigPlugin, withAndroidManifest } from "expo/config-plugins"

/**
 * Expo Config Plugin to add Android queries for mailto: links
 * Required for Android 11+ (API 30+) to allow querying and opening mailto: links
 */
export const withAndroidQueries: ConfigPlugin = (config) => {
  return withAndroidManifest(config, (modConfig) => {
    const manifest = modConfig.modResults.manifest

    // Ensure queries element exists
    if (!manifest.queries) {
      manifest.queries = []
    }

    // Check if mailto query already exists
    const queries = Array.isArray(manifest.queries) ? manifest.queries : [manifest.queries]
    const hasMailtoQuery = queries.some((query: any) => {
      if (!query.intent) return false
      const intents = Array.isArray(query.intent) ? query.intent : [query.intent]
      return intents.some((intent: any) => {
        if (!intent.data) return false
        const dataArray = Array.isArray(intent.data) ? intent.data : [intent.data]
        return dataArray.some(
          (data: any) => data.$?.["android:scheme"] === "mailto",
        )
      })
    })

    // Add mailto query if it doesn't exist
    if (!hasMailtoQuery) {
      const mailtoIntent = {
        action: [{ $: { "android:name": "android.intent.action.VIEW" } }],
        category: [{ $: { "android:name": "android.intent.category.BROWSABLE" } }],
        data: [{ $: { "android:scheme": "mailto" } }],
      }

      if (Array.isArray(manifest.queries)) {
        // If queries is an array of intents
        manifest.queries.push({ intent: mailtoIntent })
      } else if (manifest.queries && typeof manifest.queries === "object") {
        // If queries is a single object, convert to array
        manifest.queries = [manifest.queries, { intent: mailtoIntent }]
      } else {
        // If queries doesn't exist, create it
        manifest.queries = [{ intent: mailtoIntent }]
      }
    }

    return modConfig
  })
}

