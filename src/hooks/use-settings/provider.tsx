import { useState } from "react"
import { SettingsContext } from "./context"
import { ThemeProvider } from "styled-components"

type SettingsProviderProps = {
  children: React.ReactElement
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [settings, setSettings] = useState<CustomSettings>()

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      <ThemeProvider theme={{ customColor: settings?.color || "#fff" }}>
        {children}
      </ThemeProvider>
    </SettingsContext.Provider>
  )
}
