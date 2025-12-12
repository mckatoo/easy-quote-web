import { createContext } from "react"

type SettingsContextProps = {
  settings?: CustomSettings
  setSettings: (settings?: CustomSettings) => void
} | null

export const SettingsContext = createContext<SettingsContextProps>(null)

