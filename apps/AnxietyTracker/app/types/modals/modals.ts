import { ComponentType } from "react"

// Modal priority enum
export enum ModalPriority {
  NORMAL = 0,
  HIGH = 1,
  URGENT = 2,
}

// Base props that all modals must have
export interface BaseModalProps {
  onClose: (reason?: "dismiss" | "completed") => void
}

// Type for modal component registration
export type ModalComponent<T extends BaseModalProps = BaseModalProps> = ComponentType<T>

// Type for modal data in the queue
export interface IModal<T extends Record<string, any> = Record<string, any>> {
  id: string
  componentName: string
  targetScreen: string // Changed from keyof RootStackParamList | string to just string
  expiryTime: number
  props: T
  priority?: ModalPriority // Optional priority enum, defaults to NORMAL
  reShowOnDismiss?: boolean // If true, do not remove from queue on dismiss; snooze instead
  snoozeMsOnDismiss?: number // How long to snooze before showing again after a dismiss
  showAfter?: number // Timestamp after which the modal can be shown (snooze mechanism)
}

// Type for the modal queue state
export interface IModalQueueState {
  queue: IModal<any>[]
}

// Type for modal registration metadata
export interface ModalRegistration<T extends BaseModalProps = BaseModalProps> {
  component: ModalComponent<T>
  defaultProps?: Partial<T>
}

// Type for the modal registry
export type ModalRegistry = Map<string, ModalRegistration>
