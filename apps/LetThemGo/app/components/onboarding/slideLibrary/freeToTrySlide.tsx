import { ISlide } from "@/types/ISlide"

type FreeToTrySlideProps = {
  onSelection?: () => void
}

export function freeToTrySlide({ onSelection: _onSelection }: FreeToTrySlideProps): ISlide {
  return {
    id: "reminderBell",
    title: "Try Let Them Go for free",
    description: "No risk, no commitment.",
    image: require("../../../../assets/images/onboarding/device.png"),
    textPlacement: "bottom",
    textAlignment: "center",
  }
}
