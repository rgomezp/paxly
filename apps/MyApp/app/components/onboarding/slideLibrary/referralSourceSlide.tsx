import type { ISlide } from "@/types/ISlide"
import ReferralSourceSelector from "../referral/ReferralSourceSelector"

type ReferralSourceSlideProps = {
  onSelection?: () => void
}

export function referralSourceSlide({ onSelection }: ReferralSourceSlideProps): ISlide {
  return {
    id: "referralSource",
    title: "How did you hear about us?",
    component: <ReferralSourceSelector showTitle={false} onSelection={onSelection} />,
  }
}
