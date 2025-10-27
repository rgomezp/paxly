import { useContext } from "react"
import { InitializationContext } from "./InitializationProvider"

export function useAppInitialization() {
  const context = useContext(InitializationContext)
  if (!context) {
    throw new Error("useAppInitialization must be used within InitializationProvider")
  }
  return context
}
