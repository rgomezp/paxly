import { useEffect, useState } from "react"
import { PurchasesOffering } from "react-native-purchases"
import Log from "@/utils/Log"
import { ensureRevenueCatConfigured } from "@/thirdParty/revenueCatUtils"
import { fetchPlacementOffering } from "@/utils/paywallUtils"
import { paywallAnalytics } from "@/utils/paywallAnalytics"

interface UseOfferingResult {
  offering: PurchasesOffering | null
  isLoading: boolean
}

/**
 * Custom hook to fetch and manage RevenueCat offering based on age range placement
 */
export const useOffering = (): UseOfferingResult => {
  const [offering, setOffering] = useState<PurchasesOffering | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOffering = async () => {
      try {
        await ensureRevenueCatConfigured()
        const fetchedOffering = await fetchPlacementOffering()
        setOffering(fetchedOffering)
      } catch (error) {
        Log.error(`Error fetching offering: ${error}`)
        paywallAnalytics.error(String(error), "fetch_offering")
        setOffering(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOffering()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { offering, isLoading }
}
