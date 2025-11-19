import { ISlide } from "@/types/ISlide"
import Log from "@/utils/Log"
import { Alert } from "react-native"
import { OneSignal } from "react-native-onesignal"

type ReminderBellSlideProps = {
  onSelection?: () => void
}

export function reminderBellSlide({ onSelection: _onSelection }: ReminderBellSlideProps): ISlide {
  return {
    id: "reminderBell",
    title: "We'll send you a reminder before your trial ends",
    description: "You can cancel anytime.",
    nextButtonText: "Try for $0.00",
    image: require("../../../../assets/images/onboarding/bell.png"),
    textPlacement: "bottom",
    textAlignment: "center",
    onLoad: async () => {
      const checkPermission = async () => {
        const permission = await OneSignal.Notifications.getPermissionAsync()

        if (!permission) {
          const requestPermission = () => {
            OneSignal.Notifications.requestPermission(true)
              .then((permission) => {
                if (!permission) {
                  Alert.alert(
                    "Permission not granted",
                    "Please grant permission to receive your reminder",
                  )
                  return
                }
              })
              .catch((error) => {
                Log.error(`Error requesting notification permission: ${error}`)
              })
          }
          setTimeout(requestPermission, 1000)
        }
      }
      await checkPermission()
    },
  }
}
