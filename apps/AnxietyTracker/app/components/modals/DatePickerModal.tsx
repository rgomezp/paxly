import { useState, useEffect, useRef } from "react"
import NoContactManager from "@/managers/NoContactManager"
import DatePicker from "react-native-date-picker"

interface DatePickerModalProps {
  visible: boolean
  onClose: () => void
}

export default function DatePickerModal({ visible, onClose }: DatePickerModalProps) {
  const data = NoContactManager.getNoContactData()
  const initialDate = data ? new Date(data.lastContacted) : new Date()
  const [date, setDate] = useState(initialDate)
  const [open, setOpen] = useState(false)
  const mountedRef = useRef(false)

  // Reset date and open when modal becomes visible
  useEffect(() => {
    if (visible) {
      const data = NoContactManager.getNoContactData()
      const currentDate = data ? new Date(data.lastContacted) : new Date()
      setDate(currentDate)
      // Mark as mounted and delay opening to avoid nested modal issues
      mountedRef.current = true
      setTimeout(() => setOpen(true), 150)
    } else {
      setOpen(false)
    }
  }, [visible])

  const handleConfirm = (selectedDate: Date) => {
    // Prevent selecting a date in the future
    const today = new Date()
    today.setHours(23, 59, 59, 999) // End of today

    if (selectedDate > today) {
      // Reject future dates, but still close the modal
      setOpen(false)
      onClose()
      return
    }

    setDate(selectedDate)
    NoContactManager.updateLastContactedDate(selectedDate)
    setOpen(false)
    onClose()
  }

  const handleCancel = () => {
    setOpen(false)
    onClose()
  }

  // Don't render anything until we've been told to show
  if (!mountedRef.current) {
    return null
  }

  return (
    <DatePicker
      modal
      open={open}
      date={date}
      title="Select last contact date"
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      mode="date"
      locale="en"
      maximumDate={new Date()}
    />
  )
}
