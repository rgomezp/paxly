import { useEffect, useState, useCallback } from "react"
import { useNavigation, NavigationContainerRef, useNavigationState } from "@react-navigation/native"
import { GLOBAL_EVENTS } from "@/constants/events"
import Log from "@/utils/Log"
import { modalRegistry } from "@/modalQueue/ModalRegistry"
import { IModalQueueState, ModalPriority, IModal } from "@/types/modals/modals"
import { ganon } from "@/services/ganon/ganon"
import { AppStackParamList } from "@/navigators"
import { EventRegister } from "@/utils/EventEmitter"

// Polling interval for state updates (1 second)
const STATE_UPDATE_INTERVAL = 1000

export default function ModalQueue() {
  // state
  const [modalQueue, setModalQueue] = useState<IModalQueueState>({ queue: [] })
  const navigationRef = useNavigation<NavigationContainerRef<AppStackParamList>>()
  const currentRoute = navigationRef.getState()?.routes[navigationRef.getState().index]

  // Listen for navigation state changes
  const navigationState = useNavigationState((state) => state)

  Log.info(`ModalQueue mounted - Current route: ${String(currentRoute?.name)}`)

  // Update React state periodically and handle expired modals
  useEffect(() => {
    const updateState = () => {
      try {
        const storedQueue = ganon.get("modalQueue") as IModalQueueState | undefined
        if (!storedQueue) {
          return
        }

        const now = Date.now()
        const validModals = storedQueue.queue.filter((modal) => {
          const isValid = modal.expiryTime > now
          if (!isValid) {
            Log.info(`Modal ${modal.id} (${modal.componentName}) has expired`)
          }
          return isValid
        })

        // Only update if there are expired modals to remove
        if (validModals.length !== storedQueue.queue.length) {
          Log.info(
            `Removing ${storedQueue.queue.length - validModals.length} expired modals from queue`,
          )
          ganon.set("modalQueue", {
            ...storedQueue,
            queue: validModals,
          })
          setModalQueue({ queue: validModals })
        } else {
          // Just update the React state
          setModalQueue(storedQueue)
        }
      } catch (error) {
        Log.error(`Failed to update modal queue state: ${error}`)
      }
    }

    // Initial update
    updateState()

    // Set up polling for state updates
    const interval = setInterval(updateState, STATE_UPDATE_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  // Listen for new modals
  useEffect(() => {
    const enqueueModalListener = (modal: IModal<Record<string, any>>) => {
      try {
        Log.info(
          `Enqueueing modal: ${modal.componentName} (id: ${modal.id}) for screen: ${String(modal.targetScreen)}`,
        )

        if (!modalRegistry.has(modal.componentName)) {
          Log.error(`Invalid modal component name: ${modal.componentName}`)
          return
        }

        const currentQueue = (ganon.get("modalQueue") as IModalQueueState | undefined) || {
          queue: [],
        }

        // Check for existing modal with same ID
        const existingModalIndex = currentQueue.queue.findIndex((m) => m.id === modal.id)
        if (existingModalIndex !== -1) {
          Log.info(`Modal with id ${modal.id} already exists, updating instead of adding`)
          const updatedQueue = [...currentQueue.queue]
          updatedQueue[existingModalIndex] = modal
          try {
            ganon.set("modalQueue", {
              ...currentQueue,
              queue: updatedQueue as IModal<any>[],
            })
            setModalQueue({ queue: updatedQueue })
            Log.info(`Modal queue updated, now contains ${updatedQueue.length} modals`)
          } catch (error) {
            Log.error(`Failed to update modal queue: ${error}`)
          }
        } else {
          const newQueue = [...currentQueue.queue, modal]
          try {
            ganon.set("modalQueue", {
              ...currentQueue,
              queue: newQueue as IModal<any>[],
            })
            setModalQueue({ queue: newQueue })
            Log.info(`Modal queue updated, now contains ${newQueue.length} modals`)
          } catch (error) {
            Log.error(`Failed to add modal to queue: ${error}`)
          }
        }
      } catch (error) {
        Log.error(`Failed to enqueue modal: ${error}`)
      }
    }

    EventRegister.on(GLOBAL_EVENTS.ENQUEUE_MODAL, enqueueModalListener)
    return () => {
      EventRegister.rm(GLOBAL_EVENTS.ENQUEUE_MODAL)
    }
  }, [])

  const dequeueModal = useCallback((modalToRemove: IModal<Record<string, any>>) => {
    Log.info(`Dequeueing modal: ${modalToRemove.componentName} (id: ${modalToRemove.id})`)
    try {
      const currentQueue = (ganon.get("modalQueue") as IModalQueueState | undefined) || {
        queue: [],
      }
      if (!currentQueue) {
        Log.info("No modal queue found when trying to dequeue")
        return
      }

      const updatedQueue = currentQueue.queue.filter((modal) => modal.id !== modalToRemove.id)
      ganon.set("modalQueue", {
        ...currentQueue,
        queue: updatedQueue as IModal<any>[],
      })
      Log.info(`Modal queue updated, now contains ${updatedQueue.length} modals`)
    } catch (error) {
      Log.error(`Failed to dequeue modal: ${error}`)
    }
  }, [])

  // Re-check modal queue when navigation state changes
  useEffect(() => {
    // This will trigger a re-render and re-evaluation of the visible modal
    setModalQueue((prev) => ({ ...prev }))
  }, [navigationState])

  if (modalQueue.queue.length === 0 || !currentRoute) {
    Log.info(
      `No modals to show - Queue length: ${modalQueue.queue.length}, Current route: ${String(currentRoute?.name)}`,
    )
    return null
  }

  // Find the highest priority modal that matches the current screen and hasn't expired
  const now = Date.now()
  const validModals = modalQueue.queue
    .filter(
      (modal) =>
        String(modal.targetScreen) === String(currentRoute.name) &&
        modal.expiryTime > now &&
        (modal.showAfter === undefined || now >= modal.showAfter),
    )
    .sort((a, b) => {
      // Sort by priority (higher priority first), then by queue order
      const priorityA = a.priority ?? ModalPriority.NORMAL
      const priorityB = b.priority ?? ModalPriority.NORMAL
      if (priorityA !== priorityB) {
        return priorityB - priorityA // Higher priority first
      }
      // If same priority, maintain original order
      return 0
    })

  if (validModals.length === 0) {
    Log.info(`No valid modals found for current route: ${String(currentRoute.name)}`)
    return null
  }

  // Get the highest priority modal to show
  const visibleModal = validModals[0]

  Log.info(
    `Rendering modal: ${visibleModal.componentName} (id: ${visibleModal.id}) for screen: ${String(currentRoute.name)}`,
  )

  const registration = modalRegistry.get(visibleModal.componentName)
  if (!registration) {
    Log.error(`No modal component found for name: ${visibleModal.componentName}`)
    return null
  }

  const ModalComponent = registration.component
  try {
    return (
      <ModalComponent
        key={`${visibleModal.id}-${visibleModal.componentName}`}
        {...visibleModal.props}
        onClose={(reason?: "dismiss" | "completed") => {
          try {
            if (reason === "completed" || !visibleModal.reShowOnDismiss) {
              dequeueModal(visibleModal)
              return
            }

            const currentQueue = ganon.get("modalQueue") as IModalQueueState | undefined
            if (!currentQueue) {
              return
            }

            const updatedQueue = currentQueue.queue.map((m) => {
              if (m.id !== visibleModal.id) return m
              const snoozeMs = m.snoozeMsOnDismiss ?? 30000 // default 30s
              return {
                ...m,
                showAfter: Date.now() + snoozeMs,
              } as IModal<any>
            })

            ganon.set("modalQueue", {
              ...currentQueue,
              queue: updatedQueue as IModal<any>[],
            })
            setModalQueue({ queue: updatedQueue })
          } catch (error) {
            Log.error(`Failed to handle modal onClose for ${visibleModal.componentName}: ${error}`)
          }
        }}
      />
    )
  } catch (error) {
    Log.error(`Failed to render modal ${visibleModal.componentName}: ${error}`)
    return null
  }
}
