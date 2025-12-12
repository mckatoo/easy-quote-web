import { useContext } from "react"
import { SettingsContext } from "./context"


export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context)
    throw new Error("Out of context");
  return context
}
