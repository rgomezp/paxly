// prettier-ignore
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"

type ScrollContextType = {
  scrollEnabled: boolean
  setScrollEnabled: (enabled: boolean) => void // Correct function type
}

const ScrollContext = createContext<ScrollContextType>({
  scrollEnabled: true,
  setScrollEnabled: () => {}, // Placeholder function
})

export const useScrollContext = () => useContext(ScrollContext)

type ScrollProviderProps = {
  children: ReactNode // Correctly typed children
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
  const [scrollEnabled, setScrollEnabled] = useState(true)

  useEffect(() => {}, [scrollEnabled])

  return (
    <ScrollContext.Provider value={{ scrollEnabled, setScrollEnabled }}>
      {children}
    </ScrollContext.Provider>
  )
}
