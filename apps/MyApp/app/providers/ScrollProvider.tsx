import { ReactNode, createContext, useContext, useEffect, useState } from "react"

type ScrollContextType = {
  scrollEnabled: boolean
  setScrollEnabled: (scrollEnabled: boolean) => void
}

export interface ScrollProviderProps {
  children: ReactNode
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined)

export const ScrollProvider = (props: ScrollProviderProps) => {
  const [scrollEnabled, setScrollEnabled] = useState(true)

  useEffect(() => {}, [])

  return (
    <ScrollContext.Provider value={{ scrollEnabled, setScrollEnabled }}>
      {props.children}
    </ScrollContext.Provider>
  )
}

export const useScroll = () => {
  const context = useContext(ScrollContext)
  if (!context) {
    throw new Error("useScroll must be used within a ScrollProvider")
  }
  return context
}
