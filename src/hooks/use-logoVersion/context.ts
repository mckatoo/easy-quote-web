import { createContext } from "react"

type LogoVersionContextProps = {
  logoVersion: number
  refreshLogoVersion: () => void
} | null

export const LogoVersionContext = createContext<LogoVersionContextProps>(null)

