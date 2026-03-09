import Log from "@/utils/Log"
import Purchases, { PurchasesOffering } from "react-native-purchases"

const DEFAULT_TO_ABANDONMENT_OFFERINGS_MAP = {
  default: "abandonment_offering",
  // add other offering mappings here
} as const

type DefaultOfferingId = keyof typeof DEFAULT_TO_ABANDONMENT_OFFERINGS_MAP

export default class RevenueCatManager {
  /**
   * Gets the current offering from RevenueCat
   *
   * When A/B testing, this will automatically return the offering for the customer
   * based on the variant they are assigned to.
   * @returns The current offering
   */
  static getCurrentOffering = async (): Promise<PurchasesOffering | null> => {
    const offerings = await Purchases.getOfferings()
    return offerings.current
  }

  static getAbandonmentOfferingForDefault = async (
    defaultOffering: PurchasesOffering,
  ): Promise<PurchasesOffering | null> => {
    // Extract the identifier from the default offering
    const defaultOfferingId = defaultOffering.identifier

    // Validate that the default offering ID exists in our mapping
    if (!RevenueCatManager._isValidDefaultOfferingId(defaultOfferingId)) {
      Log.error(`Invalid default offering ID: ${defaultOfferingId}`)
      return null
    }

    // Look up the corresponding abandonment offering ID from the map
    const abandonmentOfferingId = DEFAULT_TO_ABANDONMENT_OFFERINGS_MAP[defaultOfferingId]

    // Fetch all available offerings from RevenueCat
    const offerings = await Purchases.getOfferings()

    // Retrieve the abandonment offering using the mapped ID
    const abandonmentOffering = offerings.all[abandonmentOfferingId]

    // Verify that the abandonment offering was found
    if (!abandonmentOffering) {
      Log.error(
        `Abandonment offering not found. Default: ${defaultOfferingId}, Abandonment: ${abandonmentOfferingId}`,
      )
      return null
    }

    return abandonmentOffering
  }

  /**
   * Type predicate to check if an identifier is a valid default offering ID.
   * This helps catch regressions if the map changes or offerings are deleted.
   */
  private static _isValidDefaultOfferingId(identifier: string): identifier is DefaultOfferingId {
    return identifier in DEFAULT_TO_ABANDONMENT_OFFERINGS_MAP
  }
}
